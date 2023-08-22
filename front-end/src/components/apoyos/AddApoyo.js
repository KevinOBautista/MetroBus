import React, { useState } from "react";
import TopButtons from "../common/TopButtons";
import ApoyoForm from "./ApoyoForm";
import ErrorAlert from "../Layout/ErrorAlert";
import { createObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function AddApoyo() {
	const initialFormData = {
		apoyo_name: "",
		price: "",
		apoyo_mobile_number: "",
	};
	const [formData, setFormData] = useState({ ...initialFormData });
	const [apoyosError, setApoyosError] = useState(null);
	const navigate = useNavigate();
	function cancelHandler() {
		navigate("/apoyos");
	}
	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}
	async function submitHandler(event) {
		event.preventDefault();
		setApoyosError(null);
		try {
			formData.price = Number(formData.price);
			await createObj("apoyos", formData);
			setFormData({ ...initialFormData });
			navigate("/apoyos");
		} catch (error) {
			setApoyosError(error);
		}
	}
	return (
		<div className="addApoyo">
			<h1>Add Apoyo</h1>
			<TopButtons type={"apoyos"} />
			<ApoyoForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
			/>
			<ErrorAlert error={apoyosError} />
		</div>
	);
}

export default AddApoyo;
