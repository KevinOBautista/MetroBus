import React from "react";
import Card from "../common/Card";

function DispatcherList({ dispatchers, handleDelete }) {
	const mappedDispatchers = dispatchers.map((dispatcher, index) => (
		<Card
			type={"dispatchers"}
			obj={dispatcher}
			handleDelete={handleDelete}
			key={index}
		/>
	));

	return (
		<div className="dispatchers row justify-content-center">
			{mappedDispatchers.length > 0 && mappedDispatchers}
			{mappedDispatchers.length < 0 && "No Dispatchers"}
		</div>
	);
}

export default DispatcherList;
