import "../../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="nav">
			<div className="nav-left">
				<div className="nav-item">
					<i className="nav-icon bx bxs-dashboard bx-sm"></i>
					<Link to="/Dashboard">Dashboard</Link>
				</div>
				<div className="nav-item nav-active">
					<i className="nav-icon bx bx-spreadsheet bx-sm"></i>
					<Link to="/collections">Collections</Link>
				</div>
			</div>
			<div className="nav-right">
				<FontAwesomeIcon icon={faPlus} className="nav-icon nav-add" size="sm" />
				<i className="nav-icon nav-search bx bx-search bx-sm"></i>
				<i className="nav-icon nav-bell bx bx-bell bx-sm"></i>
				<i className="nav-icon nav-user bx bx-user-circle bx-sm"></i>
			</div>
		</nav>
	);
};

export default Navbar;
