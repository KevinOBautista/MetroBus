const customers = require("./00-customers.json");
exports.seed = function (knex) {
	return knex
		.raw("TRUNCATE TABLE customers RESTART IDENTITY CASCADE")
		.then(function () {
			return knex("customers").insert(customers);
		});
};
