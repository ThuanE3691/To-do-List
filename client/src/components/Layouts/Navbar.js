import "../../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
	return (
		<nav className="nav">
			<div className="nav-left">
				<div className="nav-item">
					<i className="nav-icon bx bxs-dashboard bx-sm"></i>
					<span>Dashboard</span>
				</div>
				<div className="nav-item nav-active">
					<i className="nav-icon bx bx-spreadsheet bx-sm"></i>
					<span>Collections</span>
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
