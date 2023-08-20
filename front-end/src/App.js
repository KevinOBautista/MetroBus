import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Customers from "./components/customers/Customers";
import Vehicles from "./components/vehicles/Vehicles";
import Paths from "./components/paths/Paths";
import Drivers from "./components/drivers/Drivers";
import Apoyos from "./components/apoyos/Apoyos";
import AddVehicle from "./components/vehicles/AddVehicle";
import EditVehicle from "./components/vehicles/EditVehicle";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="/apoyos" element={<Apoyos />} />
					<Route path="/drivers" element={<Drivers />} />
					<Route path="/routes" element={<Paths />} />
					<Route path="/vehicles/:vehicle_id/edit" element={<EditVehicle />} />
					<Route path="/vehicles/new" element={<AddVehicle />} />
					<Route path="/vehicles" element={<Vehicles />} />
					<Route path="/customers" element={<Customers />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
