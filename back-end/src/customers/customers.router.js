/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const router = require("express").Router();
const controller = require("./customers.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
	.route("/:customer_id")
	.get(controller.read)
	.put(controller.update)
	.all(methodNotAllowed);

router
	.route("/")
	.get(controller.list)
	.post(controller.create)
	.all(methodNotAllowed);

module.exports = router;
