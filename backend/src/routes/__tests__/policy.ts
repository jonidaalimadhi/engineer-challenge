import request from "supertest";
import express from "express";
const router = require("../policy.routes");

const app = express();
app.use("/", router);

describe("Testing /policies", function () {
  test("Request expect only active and pending status policies", async () => {
    const res = await request(app).get("/policies");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body.policies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ status: "ACTIVE" }),
        expect.objectContaining({ status: "PENDING" }),
      ])
    );
  });

  test("Request with name search param", async () => {
    const searchParams = { search: "Rozelle" };
    const res = await request(app)
      .get("/policies")
      .query({ ...searchParams });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body.policies).toHaveLength(2);
  });

  test("Request with surname search param", async () => {
    const searchParams = { search: "Harbour" };
    const res = await request(app)
      .get("/policies")
      .query({ ...searchParams });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body.policies).toHaveLength(1);
  });

  test("responds with no results", async () => {
    const searchParams = { search: "Test12*" };
    const res = await request(app)
      .get("/policies")
      .query({ ...searchParams });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body.policies).toHaveLength(0);
  });
});
