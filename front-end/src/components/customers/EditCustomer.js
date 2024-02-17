import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editObj, readObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Layout/ErrorAlert";
import DefaultForm from "../common/DefaultForm";

const EditCustomer = () => {
	const initialFormData = {
		customer_name: "",
		customer_mobile_number: "",
		bos_address: "",
		ny_address: "",
		customer_status: "",
	};
	const [formData, setFormData] = useState({ ...initialFormData });
	const [pageError, setPageError] = useState(null);
	const { customer_id } = useParams();
	const navigate = useNavigate();
	const formTemplate = {
		customer_name: "text",
		customer_mobile_number: "text",
		bos_address: "text",
		ny_address: "text",
		customer_status: ["positive", "negative"],
	};

	useEffect(loadcustomer, [customer_id]);

	function loadcustomer() {
		const abortController = new AbortController();
		setPageError(null);
		readObj("customers", customer_id).then(setFormData).catch(setPageError);
		return () => abortController.abort();
	}

	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}

	function cancelHandler() {
		navigate("/customers");
	}

	async function submitHandler(event) {
		event.preventDefault();
		setPageError(null);
		try {
			await editObj("customers", formData);
			setFormData({ ...initialFormData });
			navigate("/customers");
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="edit-customer">
			<h1>Edit Customer {customer_id}</h1>
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

export default EditCustomer;
