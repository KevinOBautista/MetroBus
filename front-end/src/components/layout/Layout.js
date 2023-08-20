import React from "react";
import "./Layout.scss";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2 side-bar p-0">
					<Menu />
				</div>
				<div className="col">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Layout;
