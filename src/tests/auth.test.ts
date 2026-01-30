import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import UserModel from "../models/user_model";
import { Express } from "express";

let app: Express;

const testUser = {
    email: "shiri@test.com",
    password: "password123",
    username: "shiri_test"
};

beforeAll(async () => {
    // Initialize the app and wait for DB connection [cite: 238, 296]
    app = await initApp();
    // Clean the database before starting tests [cite: 234, 298]
    await UserModel.deleteMany(); 
});

afterAll(async () => {
    // Close MongoDB connection to allow Jest to exit [cite: 305]
    await mongoose.connection.close(); 
});

describe("Authentication API Tests", () => {
    
    // Test user registration [cite: 331]
    test("POST /auth/register - Should create a new user", async () => {
        const response = await request(app).post("/auth/register").send(testUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.email).toBe(testUser.email);
        expect(response.body.username).toBe(testUser.username);
    });

    // Test registration with existing credentials
    test("POST /auth/register - Should fail if user already exists", async () => {
        const response = await request(app).post("/auth/register").send(testUser);
        expect(response.statusCode).not.toBe(201);
    });

    // Test user login [cite: 315]
    test("POST /auth/login - Should login and return tokens", async () => {
        const response = await request(app).post("/auth/login").send({
            email: testUser.email,
            password: testUser.password
        });
        expect(response.statusCode).toBe(200);
        // Check for required JWT tokens [cite: 338]
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
    });

    // Test login failure
    test("POST /auth/login - Should fail with incorrect password", async () => {
        const response = await request(app).post("/auth/login").send({
            email: testUser.email,
            password: "wrong_password"
        });
        expect(response.statusCode).toBe(400);
    });
});