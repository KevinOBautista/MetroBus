import React from "react";

const PathsForm2 = ({
	formData,
	handleChange,
	submitHandler,
	cancelHandler,
	drivers,
	dispatchers,
	vehicles,
}) => {
	const routeNameMapped = ["BOSTON", "NEW YORK", "EXTRA"].map(
		(route, index) => (
			<option value={route} key={index}>
				{route}
			</option>
		)
	);
	const driversMapped = drivers.map((driver, index) => (
		<option value={driver.driver_id} key={index}>
			{driver.driver_name}
		</option>
	));
	const dispatchersMapped = dispatchers.map((dispatcher, index) => (
		<option value={dispatcher.dispatcher_id} key={index}>
			{dispatcher.dispatcher_name}
		</option>
	));
	const vehiclesMapped = vehicles.map((vehicle, index) => (
		<option value={vehicle.vehicle_id} key={index}>
			{vehicle.vehicle_plate}
		</option>
	));
	return (
		<form className="path-form container text-center" onSubmit={submitHandler}>
			<div className="row">
				<div className="p-4 m-1 col bg-dark rounded d-flex row">
					<label className="col-3 form-label" htmlFor="route_name">
						Route Name:
					</label>
					<select
						className="col form-select"
						id="route_name"
						name="route_name"
						onChange={handleChange}
						value={formData.route_name}
					>
						<option value="">-- Select Your Option --</option>
						{routeNameMapped}
					</select>
				</div>
			</div>
			<div className="row">
				<div className="p-4 m-1 col bg-dark rounded row">
					<label className="col-3 form-label" htmlFor="route_time">
						Route Time:{" "}
					</label>
					<input
						className="col form-control"
						id="route_time"
						name="route_time"
						onChange={handleChange}
						value={formData.route_time}
						type="time"
					/>
				</div>
				<div className="p-4 m-1 col bg-dark rounded d-flex row">
					<label className="col-3 form-label" htmlFor="route_date">
						Route Date:
					</label>
					<input
						className="col form-control"
						id="route_date"
						name="route_date"
						onChange={handleChange}
						value={formData.route_date.substring(0, 10)}
						type="date"
					/>
				</div>

				<div className="p-4 m-1 col bg-dark rounded d-flex row">
					<label className="col-3 form-label" htmlFor="vehicle_id">
						Vehicle Plate:
					</label>
					<select
						className="col form-select"
						id="vehicle_id"
						name="vehicle_id"
						onChange={handleChange}
						value={formData.vehicle_id}
					>
						<option value="">-- Select Your Option --</option>
						{vehiclesMapped}
					</select>
				</div>
			</div>
			<div className="row">
				<div className="p-4 m-1 col bg-dark rounded d-flex row">
					<label className="col-3 form-label" htmlFor="dispatcher_id">
						Dispatcher:
					</label>
					<select
						className="col form-select"
						id="dispatcher_id"
						name="dispatcher_id"
						onChange={handleChange}
						value={formData.dispatcher_id}
					>
						<option value="">-- Select Your Option --</option>
						{dispatchersMapped}
					</select>
				</div>
				<div className="p-4 m-1 col bg-dark rounded d-flex row">
					<label className="col-3 form-label" htmlFor="driver_id">
						Driver:
					</label>
					<select
						className="col form-select"
						id="driver_id"
						name="driver_id"
						onChange={handleChange}
						value={formData.driver_id}
					>
						<option value="">-- Select Your Option --</option>
						{driversMapped}
					</select>
				</div>
			</div>
			<div className="buttons row mt-1">
				<button className="btn btn-secondary col mx-2" onClick={cancelHandler}>
					Cancel
				</button>
				<button className="btn btn-primary col mx-2" type="submit">
					Submit
				</button>
			</div>
		</form>
	);
};

export default PathsForm2;
