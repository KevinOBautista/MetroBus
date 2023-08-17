/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("routes", (table) => {
		table.increments("route_id").primary();
		table.string("route_name").notNullable();
		table.date("route_date").notNullable();
		table.time("route_time").notNullable();
		table
			.integer("dispatcher_id")
			.notNullable()
			.references("dispatcher_id")
			.inTable("dispatchers");
		table
			.integer("vehicle_id")
			.notNullable()
			.references("vehicle_id")
			.inTable("vehicles");
		table
			.integer("driver_id")
			.notNullable()
			.references("driver_id")
			.inTable("drivers");
		table.string("route_status").defaultTo("positive").notNullable();
		table.integer("current_customers").unsigned().defaultTo(0);
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("routes");
};
