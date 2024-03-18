import React, { useEffect, useState } from "react";
import TopButtons from "../common/TopButtons";
import { listObj, deleteObj } from "../../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DispatcherList from "./DispatcherList";

function Dispatchers() {
	const [dispatchers, setDispatchers] = useState([]);
	const [pageError, setPageError] = useState(null);

	useEffect(loadPage, []);

	function loadPage() {
		const abortController = new AbortController();
		setPageError(null);
		listObj("dispatchers", abortController.signal)
			.then(setDispatchers)
			.catch(setPageError);
		return () => abortController.abort();
	}

	async function handleDelete(id) {
		try {
			await deleteObj("dispatchers", id);
			loadPage();
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="dispatchers-view">
			<h1>Dispatchers</h1>
			<TopButtons type={"dispatchers"} />
			<DispatcherList dispatchers={dispatchers} handleDelete={handleDelete} />
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default Dispatchers;
