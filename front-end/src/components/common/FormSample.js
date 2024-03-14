import React from "react";
const _ = require("lodash");

const removeId = (text) => {
	if (text.includes("id")) {
		return text.replace("_id", "");
	}
	return text;
};

const FormSample = ({ name, value, handleChange, formData }) => {
	const selectMapped = Array.isArray(value)
		? value.map((option, index) =>
				Array.isArray(option) ? (
					<option value={option[0]} key={index}>
						{option[1]}
					</option>
				) : (
					<option value={option} key={index}>
						{option}
					</option>
				)
		  )
		: false;

	return (
		<div className="mb-3 row d-flex">
			<label htmlFor={name}>{_.startCase(removeId(name))}</label>
			{selectMapped && (
				<select
					className="form-select"
					id={name}
					name={name}
					onChange={handleChange}
					value={formData[name]}
				>
					<option value="">-- Select Your Option --</option>
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
