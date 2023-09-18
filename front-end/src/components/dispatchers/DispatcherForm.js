import React from "react";

function DispatcherForm({
	formData,
	handleChange,
	submitHandler,
	cancelHandler,
}) {
	return (
		<div className="d-flex justify-content-center Form">
			<form
				className="form m-3 p-3 rounded w-75 text-center"
				onSubmit={submitHandler}
			>
				<div className="mb-3 row d-flex ">
					<label htmlFor="dispatcher_name ">Dispatcher Name</label>
					<input
						className="form-control "
						id="dispatcher_name"
						name="dispatcher_name"
						type="text"
						onChange={handleChange}
						value={formData.dispatcher_name}
					/>
				</div>
				<div className="mb-3 row d-flex">
					<label htmlFor="dispatcher_mobile_number">Mobile Number</label>
					<input
						className="form-control"
						id="dispatcher_mobile_number"
						name="dispatcher_mobile_number"
						type="text"
						onChange={handleChange}
						value={formData.dispatcher_mobile_number}
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

export default DispatcherForm;
