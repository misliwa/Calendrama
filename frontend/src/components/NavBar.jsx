import {NavLink} from "react-router-dom";
import '../css/NavBar.css'

function NavBar({ collapsed, onToggle }){

    const menuItems = [
        { path: "/", label: "Kalendarz", icon: "📅"},
        { path: "/plays", label: "Spektakle", icon: "🎭"},
        { path: "/employees", label: "Pracownicy", icon: "👤" },
        { path: "/stages", label: "Sceny", icon: "🎪" },
        { path: "/settings", label: "Ustawienia", icon: "⚙️" }
    ];

    return(
            <nav className="bg-primary-subtle h-100 shadow-sm">
                <ul className="nav flex-column gap-2">
                    <li className="nav-item mb-4 user-select-none">
                       <a onClick={onToggle} className="nav-link d-flex text-black rounded ">☰</a>
                    </li>

                    {menuItems.map((menuItem) => (
                        <li key={menuItem.path} className="nav-item user-select-none">
                            <NavLink className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-2 text-black rounded ${
                                    isActive ? "bg-white" : ""
                                }`
                            }
                                     to={menuItem.path}>
                                <span>{menuItem.icon}</span>
                                <span className={`label ${collapsed ? "collapsed" : ""}`}>
                                    {menuItem.label}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>


    );
}

export default NavBar;