const routes = require("./05-routes.json");
exports.seed = function (knex) {
	return knex
		.raw("TRUNCATE TABLE routes RESTART IDENTITY CASCADE")
		.then(function () {
			return knex("routes").insert(routes);
		});
};
