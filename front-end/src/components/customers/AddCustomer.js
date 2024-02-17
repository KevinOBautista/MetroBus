import React, { useState } from "react";
import TopButtons from "../common/TopButtons";
import ErrorAlert from "../Layout/ErrorAlert";
import { createObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import DefaultForm from "../common/DefaultForm";

const AddCustomer = () => {
	const initialFormData = {
		customer_name: "",
		customer_mobile_number: "",
		bos_address: "",
		ny_address: "",
		customer_status: "positive",
	};
	const [formData, setFormData] = useState({ ...initialFormData });
	const [pageError, setPageError] = useState(null);
	const navigate = useNavigate();
	const formTemplate = {
		customer_name: "text",
		customer_mobile_number: "text",
		bos_address: "text",
		ny_address: "text",
		customer_status: ["positive", "negative"],
	};

	function cancelHandler() {
		navigate("/customers");
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
			await createObj("customers", formData);
			setFormData({ ...initialFormData });
			navigate("/customers");
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="add-customer">
			<h1>Add customer</h1>
			<TopButtons type={"customers"} />
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

export default AddCustomer;
