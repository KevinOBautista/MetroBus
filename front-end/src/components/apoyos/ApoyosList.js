import React from "react";
import Apoyo from "./Apoyo";

function ApoyosList({ apoyos, handleDelete }) {
	const mappedApoyos = apoyos.map((apoyo, index) => (
		<Apoyo apoyo={apoyo} key={index} handleDelete={handleDelete} />
	));

	return (
		<div className="apoyos row justify-content-center">
			{mappedApoyos.length > 0 && mappedApoyos}
			{mappedApoyos.length < 0 && "No Apoyos"}
		</div>
	);
}

export default ApoyosList;
