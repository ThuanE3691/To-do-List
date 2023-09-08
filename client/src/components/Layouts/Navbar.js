import "../../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="nav">
			<div className="nav-left">
				<Link to="/Dashboard" className="nav-item">
					<i className="nav-icon bx bxs-dashboard bx-sm"></i>
					<p>Dashboard</p>
				</Link>
				<Link to="/collections" className="nav-item nav-active">
					<i className="nav-icon bx bx-spreadsheet bx-sm"></i>
					<p>Collections</p>
				</Link>
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
