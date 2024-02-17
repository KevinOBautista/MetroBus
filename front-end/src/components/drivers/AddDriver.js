import React, { useState } from "react";
import TopButtons from "../common/TopButtons";
import ErrorAlert from "../Layout/ErrorAlert";
import { createObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import DefaultForm from "../common/DefaultForm";

function AddDriver() {
	const initialFormData = {
		driver_name: "",
		driver_mobile_number: "",
	};
	const [formData, setFormData] = useState({ ...initialFormData });
	const [pageError, setPageError] = useState(null);
	const navigate = useNavigate();

	function cancelHandler() {
		navigate("/drivers");
	}
	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}

	async function submitHandler(event) {
		event.preventDefault();
		setPageError(null);
		console.log(formData);
		try {
			await createObj("drivers", formData);
			setFormData({ ...initialFormData });
			navigate("/drivers");
		} catch (error) {
			setPageError(error);
		}
	}
	const formTemplate = {
		driver_name: "text",
		driver_mobile_number: "text",
	};

	return (
		<div className="add-driver">
			<h1>Add Driver</h1>
			<TopButtons type={"drivers"} />
			{/* <DriverForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
			/> */}
			<DefaultForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
				name="driver"
				formTemplate={formTemplate}
			/>
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default AddDriver;
