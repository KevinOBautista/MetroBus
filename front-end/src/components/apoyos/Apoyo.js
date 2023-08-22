import React from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Apoyo({ apoyo, handleDelete }) {
	const { apoyo_id, apoyo_name, price, apoyo_mobile_number } = apoyo;
	function onDelete() {
		const result = window.confirm(
			"Delete this apoyo? \n You will not be able to recover it!"
		);
		if (result) {
			handleDelete(apoyo_id);
		}
	}
	return (
		<div className="card text-center col-md-3 m-2 custom-shadow" id={apoyo_id}>
			<div className="card-header">
				<h4 className="card-title">{apoyo_name}</h4>
			</div>
			<div className="card-body">
				<h6 className="card-text">Name: {apoyo_name}</h6>
				<h6 className="card-text">Price: {price}</h6>
				<h6 className="card-text">Mobile Number: {apoyo_mobile_number}</h6>
			</div>
			<div className="card-body d-flex justify-content-between">
				<Link
					className="btn btn-warning shadow "
					to={`/apoyos/${apoyo_id}/edit`}
				>
					<FontAwesomeIcon icon={faPencil} />
				</Link>
				<button className="btn btn-danger shadow" onClick={onDelete}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</div>
	);
}

export default Apoyo;
