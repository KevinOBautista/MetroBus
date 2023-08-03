const dispatchers = require("./03-dispatchers.json");
exports.seed = function (knex) {
	return knex
		.raw("TRUNCATE TABLE dispatchers RESTART IDENTITY CASCADE")
		.then(function () {
			return knex("dispatchers").insert(dispatchers);
		});
};
