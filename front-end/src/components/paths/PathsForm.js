import React from "react";
import FormSample from "../common/FormSample";

const routeNames = ["BOSTON", "NEW YORK", "EXTRA"];

const PathsForm = ({
	formData,
	handleChange,
	submitHandler,
	cancelHandler,
	drivers,
	dispatchers,
	vehicles,
}) => {
	const mappedTemplate = [];
	const driversMapped = drivers.map((driver) => [
		driver.driver_id,
		driver.driver_name,
	]);
	const dispatchersMapped = dispatchers.map((dispatcher) => [
		dispatcher.dispatcher_id,
		dispatcher.dispatcher_name,
	]);
	const vehiclesMapped = vehicles.map((vehicle) => [
		vehicle.vehicle_id,
		vehicle.vehicle_plate,
	]);
	const formTemplate = {
		route_name: routeNames,
		route_date: "date",
		route_time: "time",
		dispatcher_id: dispatchersMapped,
		vehicle_id: vehiclesMapped,
		driver_id: driversMapped,
	};
	for (const [key, value] of Object.entries(formTemplate)) {
		mappedTemplate.push(
			<FormSample
				handleChange={handleChange}
				name={key}
				value={value}
				formData={formData}
				key={key}
			/>
		);
	}
	return (
		<div className="Form d-flex justify-content-center">
			<form
				className="form m-3 p-3 rounded w-75 text-center"
				onSubmit={submitHandler}
			>
				{mappedTemplate}
				<div className="buttons row">
					<button
						className="btn btn-secondary col mx-2"
						onClick={cancelHandler}
					>
						Cancel
					</button>
					<button className="btn btn-primary col mx-2" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default PathsForm;
