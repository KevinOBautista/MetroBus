import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/metrobuslogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGauge,
	faRoute,
	faUsers,
	faUser,
	faVanShuttle,
	faCar,
} from "@fortawesome/free-solid-svg-icons";
import "./Layout.scss";

function Menu2() {
	return (
		<div className="d-flex flex-column flex-shrink-0 p-3 sidebar">
			<Link className="d-flex justify-content-center" to="/">
				<img className="pe-none" src={Logo} alt="metrobuslogo" width={100} />
			</Link>
			<hr className="sidebar-divider" />
			<ul className="nav navbar-nav nav-pills text-light flex-column mb-auto">
				<li className="nav-item ">
					<NavLink className="nav-link px-2" to="/">
						<FontAwesomeIcon icon={faGauge} />
						&nbsp;Dashboard
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link px-2" to="/routes">
						<FontAwesomeIcon icon={faRoute} />
						&nbsp;Routes
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link px-2" to="/customers">
						<FontAwesomeIcon icon={faUsers} />
						&nbsp;Customers
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link px-2" to="/drivers">
						<FontAwesomeIcon icon={faUser} />
						&nbsp;Drivers
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link px-2" to="/apoyos">
						<FontAwesomeIcon icon={faCar} />
						&nbsp;Apoyos
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link px-2" to="/vehicles">
						<FontAwesomeIcon icon={faVanShuttle} />
						&nbsp;Vehicles
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default Menu2;
