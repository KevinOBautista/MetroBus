import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editObj, readObj } from "../../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DefaultForm from "../common/DefaultForm";

function EditApoyo() {
	const initialFormData = {
		apoyo_name: "",
		price: "",
		apoyo_mobile_number: "",
	};
	const [apoyo, setApoyo] = useState({ ...initialFormData });
	const [apoyosError, setApoyosError] = useState(null);
	const { apoyo_id } = useParams();
	const navigate = useNavigate();

	useEffect(loadApoyo, [apoyo_id]);

	function loadApoyo() {
		const abortController = new AbortController();
		setApoyosError(null);
		readObj("apoyos", apoyo_id).then(setApoyo).catch(setApoyosError);
		return () => abortController.abort();
	}
	function handleChange({ target }) {
		setApoyo({
			...apoyo,
			[target.name]: target.value,
		});
	}

	function cancelHandler() {
		navigate("/apoyos");
	}

	async function submitHandler(event) {
		event.preventDefault();
		setApoyosError(null);
		try {
			apoyo.price = Number(apoyo.price);
			await editObj("apoyos", apoyo);
			setApoyo({ ...initialFormData });
			navigate("/apoyos");
		} catch (error) {
			setApoyosError(error);
		}
	}

	const formTemplate = {
		apoyo_name: "text",
		price: "number",
		apoyo_mobile_number: "text",
	};
	return (
		<div className="edit-apoyo">
			<h1>Edit Apoyo</h1>
			<DefaultForm
				formData={apoyo}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
				handleChange={handleChange}
				formTemplate={formTemplate}
			/>
			<ErrorAlert error={apoyosError} />
		</div>
	);
}

export default EditApoyo;
