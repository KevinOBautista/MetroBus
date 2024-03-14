import React, { useEffect, useState } from "react";
import { today } from "../../utils/date-time";
import { listObj, deleteObj } from "../../utils/api";
import ErrorAlert from "../Layout/ErrorAlert";
import PathsList from "./PathsList";
import TopButtons from "../common/TopButtons";
import { Link } from "react-router-dom";

function Paths() {
	const [routes, setRoutes] = useState([]);
	const [pageError, setPageError] = useState(null);

	useEffect(loadPage, []);

	function loadPage() {
		const abortController = new AbortController();
		setPageError(null);
		listObj(`routes?date=${today()}`, abortController.signal)
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
			<div className="view-history d-flex justify-content-center position-absolute">
				<div className="button position-absolute top-50 start-50 translate-middle z-3">
					<Link className="btn btn-warning " to={"/routes/history"}>
						View History
					</Link>
				</div>
				<div className="imageContainer position-relative">
					<img src="./history-view.png" alt="history-view" />
				</div>
			</div>
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default Paths;
