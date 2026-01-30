import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import UserModel from "../models/user_model";
import PostModel from "../models/post_model";
import { Express } from "express";

let app: Express;
let accessToken: string;

beforeAll(async () => {
    app = await initApp();
    await UserModel.deleteMany();
    await PostModel.deleteMany();

    // Create a user and login to get a valid token for authenticated requests
    const user = {
        email: "test@posts.com",
        password: "password123",
        username: "post_tester"
    };
    await request(app).post("/auth/register").send(user);
    const loginRes = await request(app).post("/auth/login").send(user);
    accessToken = loginRes.body.accessToken;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Posts API Tests", () => {
    
    // Ensure the list is empty at start [cite: 318, 319]
    test("GET /posts - Should return an empty array initially", async () => {
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });

    // Create a new post [cite: 331, 333]
    test("POST /posts - Should create a new post when authenticated", async () => {
        const newPost = {
            title: "My First Test Post",
            content: "Hello World"
        };

        const response = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${accessToken}`) // Passing the JWT [cite: 376]
            .send(newPost);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newPost.title);
        expect(response.body._id).toBeDefined();
    });
});