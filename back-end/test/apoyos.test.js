const request = require("supertest");

const app = require("../src/app");
const db = require("../src/db/connection");

describe("Apoyo Routes", () => {
	beforeAll(() => {
		return db.migrate
			.forceFreeMigrationsLock()
			.then(() => db.migrate.rollback(null, true))
			.then(() => db.migrate.latest());
	});

	beforeEach(() => {
		return db.seed.run();
	});

	afterAll(async () => {
		return await db.migrate.rollback(null, true).then(() => db.destroy());
	});

	describe("App", () => {
		describe("not found handler", () => {
			test("returns 404 for non-existent route", async () => {
				const response = await request(app)
					.get("/fastidious")
					.set("Accept", "application/json");

				expect(response.status).toBe(404);
				expect(response.body.error).toBe("Path not found: /fastidious");
			});
		});
	});

	describe("GET /apoyos", () => {
		test("returns 404 for non-existent id", async () => {
			const response = await request(app)
				.get("/apoyos/99")
				.set("Accept", "application/json");

			expect(response.body.error).toContain("99");
			expect(response.status).toBe(404);
		});
		test("returns apoyos sorted by price", async () => {
			const response = await request(app)
				.get("/apoyos")
				.set("Accept", "application/json");

			expect(response.body.data).toHaveLength(8);
			expect(response.body.data[0].apoyo_name).toBe("THE DRIVER");
			expect(response.body.data[1].apoyo_name).toBe("UBER");
			expect(response.status).toBe(200);
		});
	});
	describe("POST /apoyos", () => {
		test("returns 400 if data is missing", async () => {
			const response = await request(app)
				.post("/apoyos")
				.set("Accept", "application/json")
				.send({ datum: {} });

			expect(response.body.error).toBeDefined();
			expect(response.status).toBe(400);
		});
		test("returns 400 if apoyo_name is missing", async () => {
			const data = {
				price: 50,
			};

			const response = await request(app)
				.post("/apoyos")
				.set("Accept", "application/json")
				.send({ data });

			expect(response.body.error).toContain("apoyo_name");
			expect(response.status).toBe(400);
		});
		test("returns 400 if price is missing", async () => {
			const data = {
				apoyo_name: "Omar B.",
			};

			const response = await request(app)
				.post("/apoyos")
				.set("Accept", "application/json")
				.send({ data });

			expect(response.body.error).toContain("price");
			expect(response.status).toBe(400);
		});
		test("returns 400 if apoyo_name is empty", async () => {
			const data = {
				apoyo_name: "",
				price: 50,
			};

			const response = await request(app)
				.post("/apoyos")
				.set("Accept", "application/json")
				.send({ data });

			expect(response.body.error).toContain("apoyo_name");
			expect(response.status).toBe(400);
		});
		test("returns 400 if price is empty", async () => {
			const data = {
				apoyo_name: "Eli B.",
				price: "",
			};

			const response = await request(app)
				.post("/apoyos")
				.set("Accept", "application/json")
				.send({ data });

			expect(response.body.error).toContain("price");
			expect(response.status).toBe(400);
		});
		test("returns 400 if price is not a number", async () => {
			const data = {
				apoyo_name: "Eli B.",
				price: "2",
			};

			const response = await request(app)
				.post("/apoyos")
				.set("Accept", "application/json")
				.send({ data });

			expect(response.body.error).toContain("Price");
			expect(response.status).toBe(400);
		});
		test("returns 201 if data is valid", async () => {
			const data = {
				apoyo_name: "Eli B",
				price: 100,
			};

			const response = await request(app)
				.post("/apoyos")
				.set("Accept", "application/json")
				.send({ data });

			expect(response.body.error).toBeUndefined();
			expect(response.body.data).toEqual(
				expect.objectContaining({
					apoyo_name: "Eli B",
					price: 100,
				})
			);
			expect(response.status).toBe(201);
		});
	});

	describe("PUT /apoyos/:apoyo_id", () => {
		test("should return a 404 if the ID given does not match any ID in the database", async () => {
			const response = await request(app).put("/apoyos/999999999", {});

			expect(response.body.error).toMatch(/cannot be found/i);
			expect(response.statusCode).toBe(404);
		});

		test("updates an existing apoyo, returning the updated apoyo", async () => {
			const data = {
				apoyo_name: "Kyara Bautista",
				price: 100,
			};

			const apoyo = await db("apoyos").where("apoyo_id", 1).first();

			expect(apoyo).not.toBeUndefined();

			Object.entries(data).forEach(([key, value]) => (apoyo[key] = value));
			const response = await request(app)
				.put("/apoyos/1")
				.set("Accept", "application/json")
				.send({ data: apoyo });
			expect(response.body.error).toBeUndefined();
			expect(response.body.data).toEqual(
				expect.objectContaining({
					apoyo_name: "Kyara Bautista",
					price: 100,
				})
			);
			expect(response.status).toBe(200);
		});
	});

	describe("DELETE /apoyos/:apoyo_id", () => {
		test("should return a 404 if the ID given does not match any ID in the database", async () => {
			const response = await request(app).delete("/apoyos/9999", {});
			expect(response.body.error).toBeDefined();
			expect(response.statusCode).toBe(404);
		});

		test("should delete the apoyo record when given an existing apoyo_id", async () => {
			const previous = await db("apoyos").first();

			const response = await request(app).delete(
				`/apoyos/${previous.apoyo_id}`
			);

			expect(response.body.error).toBeUndefined();
			expect(response.statusCode).toBe(204);

			const deletedApoyo = await db("apoyos")
				.where({
					apoyo_id: previous.apoyo_id,
				})
				.first();

			expect(deletedApoyo).toBeUndefined();
		});
	});
});
