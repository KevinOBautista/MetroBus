const request = require("supertest");

const app = require("../src/app");
const db = require("../src/db/connection");

describe("Customers Routes", () => {
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

	describe("GET /customers", () => {
		test("returns 404 for non-existent id", async () => {
			const response = await request(app)
				.get("/customers/99")
				.set("Accept", "application/json");

			expect(response.body.error).toContain("99");
			expect(response.status).toBe(404);
		});
		test("returns customers", async () => {
			const response = await request(app)
				.get("/apoyos")
				.set("Accept", "application/json");

			expect(response.body.data).toHaveLength(8);
			expect(response.body.data[0].customer_name).toBe("Norlin");
			expect(response.body.data[1].customer_name).toBe("NELSA");
			expect(response.status).toBe(200);
		});
	});
});
