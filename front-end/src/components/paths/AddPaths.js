import React, { useEffect, useState } from "react";
import TopButtons from "../common/TopButtons";
import ErrorAlert from "../Layout/ErrorAlert";
import { createObj, listObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import PathsForm from "./PathsForm";
import { today } from "../../utils/date-time";
import PathsForm2 from "./PathsForm2";

const AddPaths = () => {
	const initialFormData = {
		route_name: "",
		route_date: today(),
		route_time: "",
		dispatcher_id: "",
		vehicle_id: "",
		driver_id: "",
		route_status: "positive",
	};

	const [formData, setFormData] = useState({ ...initialFormData });
	const [pageError, setPageError] = useState(null);
	const [drivers, setDrivers] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [dispatchers, setDispatchers] = useState([]);
	const navigate = useNavigate();

	useEffect(loadPeople, []);

	function loadPeople() {
		const abortController = new AbortController();
		setPageError(null);
		listObj("vehicles", abortController.signal)
			.then(setVehicles)
			.catch(setPageError);
		listObj("drivers", abortController.signal)
			.then(setDrivers)
			.catch(setPageError);
		listObj("dispatchers", abortController.signal)
			.then(setDispatchers)
			.catch(setPageError);
		return () => abortController.abort();
	}

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
		console.log(formData);
		try {
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
			<PathsForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
				drivers={drivers}
				dispatchers={dispatchers}
				vehicles={vehicles}
				type="add"
			/>

			<ErrorAlert error={pageError} />
		</div>
	);
};

export default AddPaths;
