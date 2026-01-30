import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import UserModel from "../models/user_model";
import PostModel from "../models/post_model";
import CommentModel from "../models/comment_model";
import { Express } from "express";

let app: Express;
let accessToken: string;
let postId: string;

const testUser = {
    email: "commenter@test.com",
    password: "password123",
    username: "commenter"
};

beforeAll(async () => {
    // Initialize application
    app = await initApp();
    
    // Clean all relevant collections
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    await CommentModel.deleteMany();

    // Register and login to get an access token
    await request(app).post("/auth/register").send(testUser);
    const loginRes = await request(app).post("/auth/login").send(testUser);
    accessToken = loginRes.body.accessToken;

    // Create a parent post for the comments
    const postRes = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ 
            title: "Post for Comments", 
            content: "Parent post content" 
        });
    
    postId = postRes.body._id;
});

afterAll(async () => {
    // Close database connection
    await mongoose.connection.close();
});

describe("Comments API Tests", () => {
    
    test("POST /comments - Should add a comment to a post", async () => {
        const comment = {
            postId: postId,
            content: "This is a test comment"
        };

        const response = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${accessToken}`)
            .send(comment);

        expect(response.statusCode).toBe(201);
        expect(response.body.content).toBe(comment.content);
        expect(response.body.postId).toBe(postId);
    });

    test("GET /comments - Should return comments for a specific post", async () => {
        // Querying comments linked to the created post
        const response = await request(app).get(`/comments?postId=${postId}`);
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].content).toBe("This is a test comment");
    });

    test("DELETE /comments/:id - Should delete a specific comment", async () => {
        // Create a temporary comment to delete
        const commentRes = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ postId: postId, content: "Delete this" });
            
        const commentId = commentRes.body._id;

        const response = await request(app)
            .delete(`/comments/${commentId}`)
            .set("Authorization", `Bearer ${accessToken}`);

        expect(response.statusCode).toBe(200);
    });

    test("DELETE /comments/:id - Should fail to delete another user's comment", async () => {
        // create a second user
        const hackerUser = {
            email: "hacker@test.com",
            password: "password123",
            username: "hacker"
        };
        await request(app).post("/auth/register").send(hackerUser);
        const hackerLogin = await request(app).post("/auth/login").send(hackerUser);
        const hackerToken = hackerLogin.body.accessToken;

        // create a comment with the original user
        const commentRes = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${accessToken}`) // הטוקן המקורי
            .send({ postId: postId, content: "Don't delete me!" });
        const commentId = commentRes.body._id;

        // try to delete the comment with the hacker user
        const response = await request(app)
            .delete(`/comments/${commentId}`)
            .set("Authorization", `Bearer ${hackerToken}`); // הטוקן של הפורץ

        // expect failure due to lack of permission
        expect(response.statusCode).toBe(403);
    });
});