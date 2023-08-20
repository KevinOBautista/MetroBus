import React from "react";
import Vehicle from "./Vehicle";

function VehicleList({ vehicles }) {
	const mappedVehicles = vehicles.map((vehicle, index) => (
		<Vehicle vehicle={vehicle} key={index} />
	));

	return (
		<div className="vehicles row justify-content-center">
			{mappedVehicles.length > 0 && mappedVehicles}
			{mappedVehicles.length < 0 && "No Vehicles"}
		</div>
	);
}

export default VehicleList;
