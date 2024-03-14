import React, { useEffect, useState } from "react";
import TopButtons from "../common/TopButtons";
import { listObj, deleteObj } from "../../utils/api";
import ErrorAlert from "../Layout/ErrorAlert";
import CustomerList from "./CustomerList";
import DataGrid from "../common/DataGrid";

function Customers() {
	const [customers, setCustomers] = useState([]);
	const [pageError, setPageError] = useState(null);

	useEffect(loadPage, []);

	function loadPage() {
		const abortController = new AbortController();
		setPageError(null);
		listObj("customers", abortController.signal)
			.then(setCustomers)
			.catch(setPageError);
		return () => abortController.abort();
	}

	async function handleDelete(id) {
		try {
			await deleteObj("customers", id);
			loadPage();
		} catch (error) {
			setPageError(error);
		}
	}

	return (
		<div className="customer-view">
			<h1>Customers</h1>
			<TopButtons type={"customers"} />
			{/* <CustomerList customers={customers} handleDelete={handleDelete} /> */}
			<DataGrid
				objects={customers}
				handleDelete={handleDelete}
				type={"customer"}
			/>
			<ErrorAlert error={pageError} />
		</div>
	);
}

export default Customers;
