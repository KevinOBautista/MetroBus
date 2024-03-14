import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const _ = require("lodash");

const mapTitles = (obj) => {
	let map = [<th scope="col">Select</th>];
	for (const key in obj) {
		if (!key.includes("created_at") || !key.includes("updated_at")) {
			map.push(<th scope="col">{_.startCase(key)}</th>);
		}
	}

	map.push(
		<th scope="col">Edit</th>
		//  <th scope="col">Delete</th>
	);

	return map;
};

const DataGrid = ({ objects, handleDelete, type }) => {
	const titles = mapTitles(objects[0]);
	const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

	const handleCheckboxChange = (customerId) => {
		const updatedSelectedIds = selectedCustomerIds.includes(customerId)
			? selectedCustomerIds.filter((id) => id !== customerId)
			: [...selectedCustomerIds, customerId];

		setSelectedCustomerIds(updatedSelectedIds);
		console.log(updatedSelectedIds);
	};

	/**
	 * turns object into table rows
	 * @params rows
	 * object to be turned into table rows
	 * @returns {Array}
	 * of mapped <tr></tr> able to insert into DOM
	 */
	const mapTableRows = (rows) => {
		const obj_id = rows[`${type}_id`];
		const mappedRows = [
			<td>
				<input
					type="checkbox"
					className="form-check-input"
					checked={selectedCustomerIds.includes(obj_id)}
					onChange={() => handleCheckboxChange(obj_id)}
				></input>
			</td>,
		];

		for (const [key, value] of Object.entries(rows)) {
			mappedRows.push(<td>{value}</td>);
		}

		mappedRows.push(
			<td>
				{
					<Link
						className="btn btn-warning shadow "
						to={`/${type}s/${obj_id}/edit`}
					>
						<FontAwesomeIcon icon={faPencil} />
					</Link>
				}
			</td>
		);

		return mappedRows;
	};

	const objectsMapped = objects.map((obj, index) => (
		<tr key={obj[`${type}_id`]}>{mapTableRows(obj)}</tr>
	));

	function onDelete(obj_id) {
		const result = window.confirm(
			`Delete this ${type.slice(0, -1)}? \n You will not be able to recover it!`
		);
		if (result) {
			handleDelete(obj_id);
		}
	}

	return (
		<div className="container">
			<table className="table table-striped">
				<thead>
					<tr>{titles}</tr>
				</thead>
				<tbody className="table-group-divider">{objectsMapped}</tbody>
			</table>
		</div>
	);
};

export default DataGrid;
