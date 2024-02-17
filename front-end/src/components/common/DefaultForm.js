import React from "react";
import FormSample from "../common/FormSample";

const DefaultForm = ({
	formData,
	handleChange,
	submitHandler,
	cancelHandler,
	formTemplate,
	name,
}) => {
	const mappedTemplate = [];

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
				{/* <div className="mb-3 row d-flex ">
					<label htmlFor={`${name}_name`}>Name</label>
					<input
						className="form-control "
						id={`${name}_name`}
						name={`${name}_name`}
						type="text"
						onChange={handleChange}
						value={formData[`${name}_name`]}
					/>
				</div>
				<div className="mb-3 row d-flex">
					<label htmlFor={`${name}_mobile_number`}>Mobile Number</label>
					<input
						className="form-control"
						id={`${name}_mobile_number`}
						name={`${name}_mobile_number`}
						type="text"
						onChange={handleChange}
						value={formData[`${name}_mobile_number`]}
					/>
				</div> */}
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

export default DefaultForm;
