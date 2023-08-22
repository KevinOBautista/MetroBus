import React from "react";

function VehicleForm({ formData, handleChange, submitHandler, cancelHandler }) {
	return (
		<div className="d-flex justify-content-center Form">
			<form
				className="form m-3 p-3 rounded w-75 text-center"
				onSubmit={submitHandler}
			>
				<div className="mb-3 row d-flex ">
					<label htmlFor="vehicle_plate ">Vehicle Plate</label>
					<input
						className="form-control "
						id="vehicle_plate"
						name="vehicle_plate"
						type="text"
						onChange={handleChange}
						value={formData.vehicle_plate}
					/>
				</div>
				<div className="mb-3 row d-flex">
					<label htmlFor="vehicle_capacity">Vehicle Capacity</label>
					<input
						className="form-control"
						id="vehicle_capacity"
						name="vehicle_capacity"
						type="number"
						onChange={handleChange}
						value={formData.vehicle_capacity}
					/>
				</div>
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
}

export default VehicleForm;
