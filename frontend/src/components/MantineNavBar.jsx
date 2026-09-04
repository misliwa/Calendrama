import classes from '../css/NavbarSimple.module.css';
import {
    IconBriefcase2,
    IconBuildingStadium,
    IconCalendarEvent,
    IconMasksTheater,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react";
import {NavLink, useLocation} from "react-router-dom";

function MantineNavBar() {

    const location = useLocation();

    const data = [
        {link: "/", label: "Kalendarz", icon: IconCalendarEvent},
        {link: "/plays", label: "Spektakle", icon: IconMasksTheater},
        {link: "/employees", label: "Pracownicy", icon: IconUsers},
        {link: "/professions", label: "Zawody", icon: IconBriefcase2},
        {link: "/stages", label: "Sceny", icon: IconBuildingStadium},
        {link: "/settings", label: "Ustawienia", icon: IconSettings}
    ];

    const links = data.map((item) => {
        const isActive = location.pathname === item.link;
        return (
            <NavLink
                className={classes.link}
                data-active={isActive ? true : undefined}
                to={item.link}
                key={item.label}
            >
                <item.icon className={classes.linkIcon} stroke={1.5}/>
                <span>{item.label}</span>
            </NavLink>
        );
    });

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                {links}
            </div>
        </nav>
    );
}

export default MantineNavBar;