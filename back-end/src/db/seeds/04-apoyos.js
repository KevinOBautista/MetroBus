const apoyos = require("./04-apoyos.json");
exports.seed = function (knex) {
	return knex
		.raw("TRUNCATE TABLE apoyos RESTART IDENTITY CASCADE")
		.then(function () {
			return knex("apoyos").insert(apoyos);
		});
};
