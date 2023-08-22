import React, { useEffect, useState } from "react";

import VehicleList from "./VehicleList";
import { deleteObj, listVehicles } from "../../utils/api";
import ErrorAlert from "../Layout/ErrorAlert";
import "./Vehicles.scss";
import TopButtons from "../common/TopButtons";

function Vehicles() {
	const [vehicles, setVehicles] = useState([]);
	const [vehiclesError, setVehiclesError] = useState(null);
	useEffect(loadVehicles, []);
	function loadVehicles() {
		const abortController = new AbortController();
		setVehiclesError(null);
		listVehicles(abortController.signal)
			.then(setVehicles)
			.catch(setVehiclesError);
		return () => abortController.abort();
	}

	async function handleDelete(id) {
		try {
			await deleteObj("vehicles", id);
			loadVehicles();
		} catch (error) {
			setVehiclesError(error);
		}
	}

	return (
		<div className="">
			<h1>Vehicles</h1>
			<TopButtons type="vehicles" />
			<VehicleList vehicles={vehicles} handleDelete={handleDelete} />
			<ErrorAlert error={vehiclesError} />
		</div>
	);
}

export default Vehicles;
