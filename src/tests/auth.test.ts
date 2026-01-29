import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;

// before all tests: initialize the app
beforeAll(async () => {
    app = await initApp();
    console.log("Before all tests");
});

// after all tests: close the mongoose connection
afterAll(async () => {
    await mongoose.connection.close();
});

describe("Auth Tests", () => {
    // demo test to verify the test setup works
    test("Test 1 should pass", () => {
        expect(1).toBe(1);
    });
    
    // check that the /auth/login endpoint exists (does not return 404)
    test("POST /auth/login should not return 404", async () => {
        const response = await request(app).post("/auth/login"); // we're using GET here for simplicity
        expect(response.statusCode).not.toBe(404);
    });
});