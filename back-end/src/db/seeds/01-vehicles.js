const vehicles = require("./01-vehicles.json");
exports.seed = function (knex) {
	return knex
		.raw("TRUNCATE TABLE vehicles RESTART IDENTITY CASCADE")
		.then(function () {
			return knex("vehicles").insert(vehicles);
		});
};
