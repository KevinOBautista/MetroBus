import React, { useState } from "react";

const AddCustomers = () => {
	const [customers, setCustomers] = useState([]);

	return (
		<div className=" mt-2">
			<form className="form-control container text-center">
				<div className="row">
					<div className="col-2">
						<label htmlFor="customer_name">Customer Name:</label>
						<input className="form-control" type="text" />
					</div>
					<div className="col">
						<label htmlFor="ny_address">NY Address:</label>
						<input className="form-control" type="text" />
					</div>
					<div className="col-1">
						<label htmlFor="rescue">Rescue:</label>
						<input className="form-control" type="text" />
					</div>
					<div className="col">
						<label htmlFor="bos_address">BOS Address:</label>
						<input className="form-control" type="text" />
					</div>
					<div className="col-1">
						<label htmlFor="rescue">Rescue:</label>
						<input className="form-control" type="text" />
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddCustomers;
