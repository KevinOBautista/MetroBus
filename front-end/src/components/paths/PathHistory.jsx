import React, { useEffect, useState } from "react";
import TopButtons from "../common/TopButtons";
import ErrorAlert from "../Layout/ErrorAlert";
import { deleteObj, listObj } from "../../utils/api";
import PathsList from "./PathsList";

const PathHistory = () => {
	const [routes, setRoutes] = useState([]);
	const [pageError, setPageError] = useState(null);

	useEffect(loadPage, []);

	function loadPage() {
		const abortController = new AbortController();
		setPageError(null);
		listObj(`routes`, abortController.signal)
			.then(setRoutes)
			.catch(setPageError);
		return () => abortController.abort();
	}

	async function handleDelete(id) {
		try {
			await deleteObj("routes", id);
			loadPage();
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<>
			<h1>Route History</h1>
			<TopButtons type={"routes"} />
			<PathsList routes={routes} handleDelete={handleDelete} />
			<ErrorAlert error={pageError} />
		</>
	);
};

export default PathHistory;
