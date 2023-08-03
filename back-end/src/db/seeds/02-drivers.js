const drivers = require("./02-drivers.json");
exports.seed = function (knex) {
	return knex
		.raw("TRUNCATE TABLE drivers RESTART IDENTITY CASCADE")
		.then(function () {
			return knex("drivers").insert(drivers);
		});
};
