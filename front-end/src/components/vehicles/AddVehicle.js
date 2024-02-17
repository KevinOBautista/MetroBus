import React, { useState } from "react";
import TopButtons from "../common/TopButtons";
import ErrorAlert from "../Layout/ErrorAlert";
import { createObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import DefaultForm from "../common/DefaultForm";

function AddVehicle() {
	const initialFormData = {
		vehicle_plate: "",
		vehicle_capacity: "",
	};
	const [formData, setFormData] = useState({ ...initialFormData });
	const [vehiclesError, setVehiclesError] = useState(null);
	const navigate = useNavigate();

	function cancelHandler() {
		navigate("/vehicles");
	}
	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}

	async function submitHandler(event) {
		event.preventDefault();
		setVehiclesError(null);
		try {
			formData.vehicle_capacity = Number(formData.vehicle_capacity);
			await createObj("vehicles", formData);
			setFormData({ ...initialFormData });
			navigate("/vehicles");
		} catch (error) {
			setVehiclesError(error);
		}
	}

	const formTemplate = {
		vehicle_plate: "text",
		vehicle_capacity: "number",
	};
	return (
		<div className="addVehicle">
			<h1>Add Vehicles</h1>
			<TopButtons type={"vehicles"} />
			<DefaultForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
				formTemplate={formTemplate}
			/>
			<ErrorAlert error={vehiclesError} />
		</div>
	);
}

export default AddVehicle;
