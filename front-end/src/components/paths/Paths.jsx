import React, { useEffect, useState } from "react";
import { today } from "../../utils/date-time";
import { listObj, deleteObj } from "../../utils/api";
import ErrorAlert from "../Layout/ErrorAlert";
import PathsList from "./PathsList";
import TopButtons from "../common/TopButtons";

function Paths() {
	const [routes, setRoutes] = useState([]);
	const [pageError, setPageError] = useState(null);

	useEffect(loadPage, []);

	function loadPage() {
		const abortController = new AbortController();
		setPageError(null);
		listObj(`routes?date=${today()}`, abortController.signal)
			.then(setRoutes)
			.then(console.log(routes))
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
		<div className="paths">
			<h1>Routes</h1>
			<TopButtons type={"routes"} />
			{/* <div className="container">
				<h2>Current Routes</h2>
				<div className="row">
					<div className="col"></div>
				</div>
			</div> */}
			<h2 className="text-center">Today's Routes</h2>
			<PathsList routes={routes} handleDelete={handleDelete} />
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default Paths;
