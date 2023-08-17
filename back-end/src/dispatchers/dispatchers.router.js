/**
 * Defines the router for dispatchers resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./dispatchers.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
	.route("/:dispatcher_id")
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
