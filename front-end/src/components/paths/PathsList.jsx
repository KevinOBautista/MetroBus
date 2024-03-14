import React from "react";
import Card from "../common/Card";
const PathsList = ({ routes, handleDelete }) => {
	const mappedRoutes = routes.map((route, index) => (
		<Card type={"routes"} obj={route} handleDelete={handleDelete} key={index} />
	));

	return (
		<div className="routes row justify-content-center">
			{mappedRoutes.length > 0 && mappedRoutes}
			{mappedRoutes.length <= 0 && "No routes"}
		</div>
	);
};

export default PathsList;
