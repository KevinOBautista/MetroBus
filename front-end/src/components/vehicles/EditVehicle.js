import React, { useEffect, useState } from "react";
import VehicleForm from "./VehicleForm";
import { useParams } from "react-router-dom";
import { editObj, readObj } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Layout/ErrorAlert";

function EditVehicle() {
	const initialvehicle = {
		vehicle_plate: "",
		vehicle_capacity: "",
	};

	const [vehicle, setVehicle] = useState({ ...initialvehicle });
	const [vehiclesError, setVehiclesError] = useState(null);
	const { vehicle_id } = useParams();
	const navigate = useNavigate();

	useEffect(loadVehicle, [vehicle_id]);

	function loadVehicle() {
		const abortController = new AbortController();
		setVehiclesError(null);
		readObj("vehicles", vehicle_id).then(setVehicle).catch(setVehiclesError);
		return () => abortController.abort();
	}

	function handleChange({ target }) {
		setVehicle({
			...vehicle,
			[target.name]: target.value,
		});
	}

	function cancelHandler() {
		navigate("/vehicles");
	}

	async function submitHandler(event) {
		event.preventDefault();
		setVehiclesError(null);
		try {
			vehicle.vehicle_capacity = Number(vehicle.vehicle_capacity);
			await editObj("vehicles", vehicle);
			setVehicle({ ...initialvehicle });
			navigate("/vehicles");
		} catch (error) {
			setVehiclesError(error);
		}
	}

	return (
		<div className="edit-vehicle">
			<VehicleForm
				formData={vehicle}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
				handleChange={handleChange}
			/>
			<ErrorAlert error={vehiclesError} />
		</div>
	);
}

export default EditVehicle;
