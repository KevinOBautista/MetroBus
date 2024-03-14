const customers = require("./00-customers.json");

exports.seed = function (knex) {
	console.log("Seeding customers table...");

	return knex
		.raw("TRUNCATE TABLE customers RESTART IDENTITY CASCADE")
		.then(function () {
			console.log("Truncated customers table...");
			return knex("customers").insert(customers);
		})
		.then(function () {
			console.log("Inserted data into customers table...");
		})
		.catch(function (error) {
			console.error("Error during customer seeding:", error);
		});
};
