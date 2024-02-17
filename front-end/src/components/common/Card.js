import React from "react";
import CardBody from "./CardBody";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Card = ({ type, obj, handleDelete }) => {
	const objKeys = Object.keys(obj);
	const bodys = [];
	const obj_id = obj[objKeys[0]];
	const obj_name = obj[objKeys[1]];

	for (let i = 2; i < objKeys.length; i++) {
		if (
			objKeys[i].includes("created_at") ||
			objKeys[i].includes("updated_at")
		) {
			continue;
		} else {
			bodys.push(
				<CardBody
					name={objKeys[i]}
					value={obj[objKeys[i]]}
					type={type}
					key={i}
				/>
			);
		}
	}

	function onDelete() {
		const result = window.confirm(
			`Delete this ${type.slice(0, -1)}? \n You will not be able to recover it!`
		);
		if (result) {
			handleDelete(obj_id);
		}
	}
	return (
		<div className="card text-center col-md-3 m-2 custom-shadow" id={obj_id}>
			<div className="card-header">
				<h4 className="card-title">{obj_name}</h4>
			</div>
			{bodys}
			<div className="card-body d-flex justify-content-between">
				<Link
					className="btn btn-warning shadow "
					to={`/${type}/${obj_id}/edit`}
				>
					<FontAwesomeIcon icon={faPencil} />
				</Link>
				<button className="btn btn-danger shadow" onClick={onDelete}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</div>
	);
};

export default Card;
