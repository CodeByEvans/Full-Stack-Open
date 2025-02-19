const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

test("fails if username is not provided", async () => {
  const newUser = {
    name: "Test User",
    password: "password123",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(result.body.error.includes("Username and password are required"), "Error message mismatch");
});

test("fails if password is not provided", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(result.body.error.includes("Username and password are required"), "Error message mismatch");
});

test("fails if username is too short", async () => {
  const newUser = {
    username: "ab",
    name: "Test User",
    password: "password123",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(result.body.error.includes("Username and Password must be at least 3 characters long"), "Error message mismatch");
});

test("fails if password is too short", async () => {
  const newUser = {
    username: "validusername",
    name: "Test User",
    password: "ab",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(result.body.error.includes("Username and Password must be at least 3 characters long"), "Error message mismatch");
});

test("fails if username is already taken", async () => {
  const newUser = {
    username: "duplicateuser",
    name: "Test User",
    password: "password123",
  };

  await api.post("/api/users").send(newUser);

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(result.body.error.includes("Username already taken"), "Error message mismatch");
});

after(async () => {
  await mongoose.connection.close();
});
