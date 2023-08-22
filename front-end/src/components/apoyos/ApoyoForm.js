import React from "react";

function ApoyoForm({ formData, handleChange, submitHandler, cancelHandler }) {
	return (
		<div className="d-flex justify-content-center Form">
			<form
				className="form m-3 p-3 rounded w-75 text-center"
				onSubmit={submitHandler}
			>
				<div className="mb-3 row d-flex ">
					<label htmlFor="apoyo_name">Name</label>
					<input
						className="form-control "
						id="apoyo_name"
						name="apoyo_name"
						type="text"
						onChange={handleChange}
						value={formData.apoyo_name}
					/>
				</div>
				<div className="mb-3 row d-flex">
					<label htmlFor="price">Price</label>
					<input
						className="form-control"
						id="price"
						name="price"
						type="number"
						onChange={handleChange}
						value={formData.price}
					/>
				</div>
				<div className="mb-3 row d-flex ">
					<label htmlFor="apoyo_mobile_number">Mobile Number</label>
					<input
						className="form-control "
						id="apoyo_mobile_number"
						name="apoyo_mobile_number"
						type="text"
						onChange={handleChange}
						value={formData.apoyo_mobile_number}
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

export default ApoyoForm;
