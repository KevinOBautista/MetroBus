import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editObj, readObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Layout/ErrorAlert";
import DispatcherForm from "./DispatcherForm";

function EditDispatcher() {
	const initialFormData = {
		dispatcher_name: "",
		dispatcher_mobile_number: "",
	};
	const [formData, setFormData] = useState({ ...initialFormData });
	const [pageError, setPageError] = useState(null);
	const { dispatcher_id } = useParams();
	const navigate = useNavigate();

	useEffect(loadDispatcher, [dispatcher_id]);

	function loadDispatcher() {
		const abortController = new AbortController();
		setPageError(null);
		readObj("dispatchers", dispatcher_id).then(setFormData).catch(setPageError);
		return () => abortController.abort();
	}

	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}

	function cancelHandler() {
		navigate("/dispatchers");
	}

	async function submitHandler(event) {
		event.preventDefault();
		setPageError(null);
		try {
			await editObj("dispatchers", formData);
			setFormData({ ...initialFormData });
			navigate("/dispatchers");
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="edit-dispatcher">
			<h1>Edit dispatcher {dispatcher_id}</h1>
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

export default EditDispatcher;
