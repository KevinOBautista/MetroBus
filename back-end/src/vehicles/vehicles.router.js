/**
 * Defines the router for vehicles resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./vehicles.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
	.route("/:vehicle_id")
	.get(controller.read)
	.delete(controller.delete)
	.put(controller.update)
	.all(methodNotAllowed);

router
	.route("/")
	.get(controller.list)
	.post(controller.create)
	.all(methodNotAllowed);

module.exports = router;
