import React from "react";
import Card from "../common/Card";
const CustomerList = ({ customers, handleDelete }) => {
	const mappedCustomers = customers.map((customer, index) => (
		<Card
			type={"customers"}
			obj={customer}
			handleDelete={handleDelete}
			key={index}
		/>
	));
	return (
		<div className="customers row justify-content-center">
			{mappedCustomers.length > 0 && mappedCustomers}
			{mappedCustomers.length < 0 && "No Customers"}
		</div>
		// <ul className="customers list-group">
		// 	{mappedCustomers.length > 0 && mappedCustomers}
		// 	{mappedCustomers.length < 0 && "No Customers"}
		// </ul>
	);
};

export default CustomerList;
