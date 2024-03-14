import React, { useState } from "react";

const AddCustomers = () => {
	const [customers, setCustomers] = useState([]);

	return (
		<div className=" mt-2">
			<form className="form-control container text-center">
				<div>
					<label htmlFor="customer_name">Customer Name:</label>
					<input className="form-control" type="text" />
				</div>
			</form>
		</div>
	);
};

export default AddCustomers;
