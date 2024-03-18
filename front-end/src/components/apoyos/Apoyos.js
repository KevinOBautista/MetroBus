import React, { useEffect, useState } from "react";
import TopButtons from "../common/TopButtons";
import ApoyosList from "./ApoyosList";
import { listObj, deleteObj } from "../../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
function Apoyos() {
	const [apoyos, setApoyos] = useState([]);
	const [apoyosError, setApoyosError] = useState(null);
	useEffect(loadApoyos, []);
	function loadApoyos() {
		const abortController = new AbortController();
		setApoyosError(null);
		listObj("apoyos", abortController.signal)
			.then(setApoyos)
			.catch(setApoyosError);
		return () => abortController.abort();
	}
	async function handleDelete(id) {
		try {
			await deleteObj("apoyos", id);
			loadApoyos();
		} catch (error) {
			setApoyosError(error);
		}
	}
	return (
		<div className="view">
			<h1>Apoyos</h1>
			<TopButtons type={"apoyos"} />
			<ApoyosList apoyos={apoyos} handleDelete={handleDelete} />
			<ErrorAlert error={apoyosError} />
		</div>
	);
}

export default Apoyos;
