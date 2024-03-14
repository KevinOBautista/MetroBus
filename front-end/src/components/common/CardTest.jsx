import React from "react";

const CardTest = ({ type, obj, handleDelete }) => {
	const obj_id = obj[`${type}_id`];
	//get all keys and puts it in a variable for first line
	const titles = Object.keys(obj).map((currentObj) => (
		<button className="btn btn-dark">{currentObj}</button>
	));

	function onDelete() {
		const result = window.confirm(
			`Delete this ${type.slice(0, -1)}? \n You will not be able to recover it!`
		);
		if (result) {
			handleDelete(obj_id);
		}
	}

	return <li className="list-group-item"></li>;
};

export default CardTest;
