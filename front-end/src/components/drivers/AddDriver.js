import React, { useState } from "react";
import TopButtons from "../common/TopButtons";
import DriverForm from "./DriverForm";
import ErrorAlert from "../Layout/ErrorAlert";
import { createObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
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
		try {
			await createObj("drivers", formData);
			setFormData({ ...initialFormData });
			navigate("/drivers");
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="add-driver">
			<h1>Add Driver</h1>
			<TopButtons type={"drivers"} />
			<DriverForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
			/>
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default AddDriver;
