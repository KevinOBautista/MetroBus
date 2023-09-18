import React from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Driver({ driver, handleDelete }) {
	const { driver_id, driver_name, driver_mobile_number } = driver;

	function onDelete() {
		const result = window.confirm(
			"Delete this driver? \n You will not be able to recover it!"
		);
		if (result) {
			handleDelete(driver_id);
		}
	}
	return (
		<div className="card text-center col-md-3 m-2 custom-shadow" id={driver_id}>
			<div className="card-header">
				<h4 className="card-title">{driver_name}</h4>
			</div>
			<div className="card-body">
				<h6 className="card-text">Mobile Number: {driver_mobile_number}</h6>
			</div>
			<div className="card-body d-flex justify-content-between">
				<Link
					className="btn btn-warning shadow "
					to={`/drivers/${driver_id}/edit`}
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

export default Driver;
