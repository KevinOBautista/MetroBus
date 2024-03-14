import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editObj, listObj, readObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Layout/ErrorAlert";
import PathsForm2 from "./PathsForm2";
import { formatAs12HR } from "../../utils/date-time";
import AddCustomers from "./AddCustomers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const EditPaths = () => {
	const initialFormData = {
		route_name: "",
		route_date: "",
		route_time: "",
		dispatcher_id: "",
		vehicle_id: "",
		driver_id: "",
		route_status: "positive",
	};
	const [formData, setFormData] = useState({ ...initialFormData });

	const [pageError, setPageError] = useState(null);

	const { route_id } = useParams();

	const [drivers, setDrivers] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [dispatchers, setDispatchers] = useState([]);

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(loadRoute, [route_id]);

	function loadRoute() {
		const abortController = new AbortController();
		setPageError(null);
		readObj("routes", route_id).then(setFormData).catch(setPageError);
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

	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}

	function cancelHandler() {
		navigate("/routes");
	}

	async function submitHandler(event) {
		event.preventDefault();
		setPageError(null);
		try {
			await editObj("routes", formData);
			setFormData({ ...initialFormData });
			navigate("/routes");
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="edit-paths">
			<h1>
				Edit Route: {formatAs12HR(formData.route_time)} {formData.route_name}
			</h1>
			<PathsForm2
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
				drivers={drivers}
				dispatchers={dispatchers}
				vehicles={vehicles}
			/>

			{open ? (
				<div>
					<AddCustomers />
					<div className="button-container d-flex justify-content-center mt-3">
						<button onClick={() => setOpen(!open)} className="btn btn-danger">
							<FontAwesomeIcon icon={faXmarkCircle} /> Close
						</button>
					</div>
				</div>
			) : (
				<div className="button-container d-flex justify-content-center mt-3">
					<button
						onClick={() => setOpen(!open)}
						className="btn btn-success m-auto"
					>
						<FontAwesomeIcon icon={faPlusCircle} /> Customers
					</button>
				</div>
			)}
			<ErrorAlert error={pageError} />
		</div>
	);
};

export default EditPaths;
