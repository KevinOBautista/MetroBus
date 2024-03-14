import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Customers from "./components/customers/Customers";
import AddCustomer from "./components/customers/AddCustomer";
import EditCustomer from "./components/customers/EditCustomer";
import Vehicles from "./components/vehicles/Vehicles";
import Paths from "./components/paths/Paths";
import Drivers from "./components/drivers/Drivers";
import Apoyos from "./components/apoyos/Apoyos";
import AddVehicle from "./components/vehicles/AddVehicle";
import EditVehicle from "./components/vehicles/EditVehicle";
import AddApoyo from "./components/apoyos/AddApoyo";
import EditApoyo from "./components/apoyos/EditApoyo";
import AddDriver from "./components/drivers/AddDriver";
import EditDriver from "./components/drivers/EditDriver";
import Dispatchers from "./components/dispatchers/Dispatchers";
import EditDispatcher from "./components/dispatchers/EditDispatcher";
import AddDispatcher from "./components/dispatchers/AddDispatcher";
import AddPaths from "./components/paths/AddPaths";
import EditPaths from "./components/paths/EditPaths";
import PathHistory from "./components/paths/PathHistory";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="/apoyos/:apoyo_id/edit" element={<EditApoyo />} />
					<Route path="/apoyos/new" element={<AddApoyo />} />
					<Route path="/apoyos" element={<Apoyos />} />
					<Route path="/drivers/:driver_id/edit" element={<EditDriver />} />
					<Route path="/drivers/new" element={<AddDriver />} />
					<Route path="/drivers" element={<Drivers />} />
					<Route path="/routes/new" element={<AddPaths />} />
					<Route path="/routes/:route_id/edit" element={<EditPaths />} />
					<Route path="/routes/history" element={<PathHistory />} />
					<Route path="/routes" element={<Paths />} />
					<Route path="/vehicles/:vehicle_id/edit" element={<EditVehicle />} />
					<Route path="/vehicles/new" element={<AddVehicle />} />
					<Route path="/vehicles" element={<Vehicles />} />
					<Route path="/customers" element={<Customers />} />
					<Route path="/customers/new" element={<AddCustomer />} />
					<Route
						path="/customers/:customer_id/edit"
						element={<EditCustomer />}
					/>
					<Route path="/dispatchers/new" element={<AddDispatcher />} />
					<Route
						path="/dispatchers/:dispatcher_id/edit"
						element={<EditDispatcher />}
					/>
					<Route path="/dispatchers" element={<Dispatchers />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
