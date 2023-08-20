import React from "react";

function VehicleForm({ formData, handleChange, submitHandler, cancelHandler }) {
	return (
		<div className="Form">
			<h1>Form</h1>
			<form className="form m-3 p-3 rounded w-50" onSubmit={submitHandler}>
				<div className="mb-3 row d-flex">
					<label htmlFor="vehicle_plate">Vehicle Plate</label>
					<input
						className="form-control"
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
				<button className="btn btn-secondary me-2" onClick={cancelHandler}>
					Cancel
				</button>
				<button className="btn btn-primary me-2" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default VehicleForm;
