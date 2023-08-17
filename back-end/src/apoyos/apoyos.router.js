/**
 * Defines the router for apoyos resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./apoyos.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
	.route("/:apoyo_id")
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
