import React, { useState } from "react";
import TopButtons from "../common/TopButtons";
import ErrorAlert from "../Layout/ErrorAlert";
import { createObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import DefaultForm from "../common/DefaultForm";

const AddPaths = () => {
	const initialFormData = {
		route_name: "",
		route_date: "",
		route_time: "",
		dispatcher_id: "",
		vehicle_id: "",
		driver_id: "",
		route_status: "positive",
	};
	const formTemplate = {
		route_name: "text",
		route_date: "date",
		route_time: "time",
		dispatcher_id: "number",
		vehicle_id: "number",
		driver_id: "number",
		route_status: ["positive", "negative"],
	};

	const [formData, setFormData] = useState({ ...initialFormData });
	const [pageError, setPageError] = useState(null);
	const navigate = useNavigate();

	function cancelHandler() {
		navigate("/routes");
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
			formData.vehicle_capacity = Number(formData.vehicle_capacity);
			await createObj("routes", formData);
			setFormData({ ...initialFormData });
			navigate("/routes");
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="add-routes">
			<h1>Add routes</h1>
			<TopButtons type={"routes"} />
			<DefaultForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
				formTemplate={formTemplate}
			/>
			<ErrorAlert error={pageError} />
		</div>
	);
};

export default AddPaths;
