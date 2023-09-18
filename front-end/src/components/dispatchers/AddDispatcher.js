import React, { useState } from "react";
import TopButtons from "../common/TopButtons";
import ErrorAlert from "../Layout/ErrorAlert";
import { createObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import DispatcherForm from "./DispatcherForm";

function AddDispatcher() {
	const initialFormData = {
		dispatcher_name: "",
		dispatcher_mobile_number: "",
	};
	const [formData, setFormData] = useState({ ...initialFormData });
	const [pageError, setPageError] = useState(null);
	const navigate = useNavigate();

	function cancelHandler() {
		navigate("/dispatchers");
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
			await createObj("dispatchers", formData);
			setFormData({ ...initialFormData });
			navigate("/dispatchers");
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="add-dispatcher">
			<h1>Add dispatcher</h1>
			<TopButtons type={"dispatchers"} />
			<DispatcherForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
			/>
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default AddDispatcher;
