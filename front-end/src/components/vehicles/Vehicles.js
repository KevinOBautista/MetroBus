import React, { useEffect, useState } from "react";

import VehicleList from "./VehicleList";
import { listVehicles } from "../../utils/api";
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

	return (
		<div className="">
			<h1>Vehicles</h1>
			<TopButtons type="vehicles" />
			<VehicleList vehicles={vehicles} />
			<ErrorAlert error={vehiclesError} />
		</div>
	);
}

export default Vehicles;
