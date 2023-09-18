import React from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Dispatcher({ dispatcher, handleDelete }) {
	const { dispatcher_id, dispatcher_name, dispatcher_mobile_number } =
		dispatcher;

	function onDelete() {
		const result = window.confirm(
			"Delete this dispatcher? \n You will not be able to recover it!"
		);
		if (result) {
			handleDelete(dispatcher_id);
		}
	}
	return (
		<div
			className="card text-center col-md-3 m-2 custom-shadow"
			id={dispatcher_id}
		>
			<div className="card-header">
				<h4 className="card-title">{dispatcher_name}</h4>
			</div>
			<div className="card-body">
				<h6 className="card-text">Mobile Number: {dispatcher_mobile_number}</h6>
			</div>
			<div className="card-body d-flex justify-content-between">
				<Link
					className="btn btn-warning shadow "
					to={`/dispatchers/${dispatcher_id}/edit`}
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

export default Dispatcher;
