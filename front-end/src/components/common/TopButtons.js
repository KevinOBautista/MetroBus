import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
function TopButtons({ type }) {
	return (
		<div className="row nav-pills d-flex text-decocation-none my-2 shadow-lg">
			<NavLink
				end
				to={`/${type}`}
				className="nav-link text-light py-3 px-5 col text-center"
			>
				<FontAwesomeIcon icon={faEye} />
			</NavLink>
			<NavLink
				end
				to={`/${type}/new`}
				className="nav-link text-light py-3 px-5 col text-center"
			>
				<FontAwesomeIcon icon={faSquarePlus} />
			</NavLink>
		</div>
	);
}

export default TopButtons;
