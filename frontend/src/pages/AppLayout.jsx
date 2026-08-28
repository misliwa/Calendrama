import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import '../css/AppLayout.css'
import {useState} from "react";

function AppLayout(){
    const [collapsed, setCollapsed] = useState(false);

    return(
        <div
            className={`layout ${collapsed ? "sidebar-collapsed" : ""}`}
        >
            <aside className="sidebar position-fixed vh-100">
                <NavBar
                    collapsed={collapsed}
                    onToggle={() => setCollapsed(!collapsed)}
                />
            </aside>

            <main className="content p-3">
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;