import React from "react";
const _ = require("lodash");

const CardBody = ({ name, value, type }) => {
	const typeSliced = type.slice(0, -1);
	if (name.includes(typeSliced)) {
		name = name.replace(typeSliced, "");
	}
	return (
		<div className="card-body">
			<h6 className="card-text">
				{_.startCase(name)}: {value}
			</h6>
		</div>
	);
};

export default CardBody;
