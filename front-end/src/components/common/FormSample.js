import React from "react";
const _ = require("lodash");

const FormSample = ({ name, value, handleChange, formData }) => {
	const selectMapped = Array.isArray(value)
		? value.map((option, index) => <option value={option}>{option}</option>)
		: false;
	return (
		<div className="mb-3 row d-flex">
			<label htmlFor={name}>{_.startCase(name)}</label>
			{selectMapped && (
				<select
					className="form-select"
					id={name}
					name={name}
					onChange={handleChange}
					value={formData[name]}
				>
					{selectMapped}
				</select>
			)}
			{!selectMapped && (
				<input
					className="form-control"
					id={name}
					name={name}
					type={value}
					onChange={handleChange}
					value={formData[name]}
				/>
			)}
		</div>
	);
};

export default FormSample;
