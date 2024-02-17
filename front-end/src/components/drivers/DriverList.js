import React from "react";
import Card from "../common/Card";
function DriverList({ drivers, handleDelete }) {
	const mappedDrivers = drivers.map((driver, index) => (
		<Card
			type={"drivers"}
			obj={driver}
			handleDelete={handleDelete}
			key={index}
		/>
	));

	return (
		<div className="drivers row justify-content-center">
			{mappedDrivers.length > 0 && mappedDrivers}
			{mappedDrivers.length < 0 && "No Drivers"}
		</div>
	);
}

export default DriverList;
