import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Vehicle({ vehicle }) {
	const { vehicle_id, vehicle_plate, vehicle_capacity } = vehicle;
	return (
		<div
			className="card text-center col-md-3 m-2 custom-shadow"
			id={vehicle_id}
		>
			<div className="card-body">
				<h5 className="card-title">{vehicle_plate}</h5>
				<h6 className="card-text">Capacity: {vehicle_capacity}</h6>
			</div>
			<div className="card-body d-flex justify-content-between">
				<Link
					className="btn btn-warning shadow "
					to={`/vehicles/${vehicle_id}/edit`}
				>
					<FontAwesomeIcon icon={faPencil} />
				</Link>
				<Link
					className="btn btn-danger shadow "
					to={`/vehicles/${vehicle_id}/edit`}
				>
					<FontAwesomeIcon icon={faTrash} />
				</Link>
			</div>
		</div>
	);
}

export default Vehicle;
