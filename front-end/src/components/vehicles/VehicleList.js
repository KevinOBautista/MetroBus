import React from "react";
import Card from "../common/Card";

function VehicleList({ vehicles, handleDelete }) {
	// const mappedVehicles = vehicles.map((vehicle, index) => (
	// 	<Vehicle vehicle={vehicle} key={index} handleDelete={handleDelete} />
	// ));

	const mappedVehicles = vehicles.map((vehicle, index) => (
		// <Vehicle vehicle={vehicle} key={index} handleDelete={handleDelete} />
		<Card
			type={"vehicles"}
			key={index}
			handleDelete={handleDelete}
			obj={vehicle}
		/>
	));

	return (
		<div className="vehicles row justify-content-center">
			{mappedVehicles.length > 0 && mappedVehicles}
			{mappedVehicles.length < 0 && "No Vehicles"}
		</div>
	);
}

export default VehicleList;
