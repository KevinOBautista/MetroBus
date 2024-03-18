import React, { useEffect, useState } from "react";
import TopButtons from "../common/TopButtons";
import { listObj, deleteObj } from "../../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DriverList from "./DriverList";

function Drivers() {
	const [drivers, setDrivers] = useState([]);
	const [pageError, setPageError] = useState(null);

	useEffect(loadPage, []);

	function loadPage() {
		const abortController = new AbortController();
		setPageError(null);
		listObj("drivers", abortController.signal)
			.then(setDrivers)
			.catch(setPageError);
		return () => abortController.abort();
	}

	async function handleDelete(id) {
		try {
			await deleteObj("drivers", id);
			loadPage();
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="drivers-view">
			<h1>Drivers</h1>
			<TopButtons type={"drivers"} />
			<DriverList drivers={drivers} handleDelete={handleDelete} />
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default Drivers;
