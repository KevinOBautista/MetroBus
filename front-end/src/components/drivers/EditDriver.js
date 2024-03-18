import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editObj, readObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import DefaultForm from "../common/DefaultForm";

function EditDriver() {
	const initialFormData = {
		driver_name: "",
		driver_mobile_number: "",
	};
	const [formData, setFormData] = useState({ ...initialFormData });
	const [pageError, setPageError] = useState(null);
	const { driver_id } = useParams();
	const navigate = useNavigate();

	useEffect(loadDriver, [driver_id]);

	function loadDriver() {
		const abortController = new AbortController();
		setPageError(null);
		readObj("drivers", driver_id).then(setFormData).catch(setPageError);
		return () => abortController.abort();
	}

	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}

	function cancelHandler() {
		navigate("/drivers");
	}

	async function submitHandler(event) {
		event.preventDefault();
		setPageError(null);
		try {
			await editObj("drivers", formData);
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
		<div className="edit-driver">
			<h1>Edit Driver {driver_id}</h1>
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
				name={"driver"}
				formTemplate={formTemplate}
			/>
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default EditDriver;
