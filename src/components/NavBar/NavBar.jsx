/*import CartWidget from "../CartWidget/CartWidget"
import './NavBar.css'
import { NavLink, Link } from "react-router-dom"

const NavBar = () => {
    const imgMarolio = "https://www.marolio.com.ar/sites/all/themes/theme1043/logo.png";
    return (
        <header>
            <Link to={"/"}>
                <img className="imgMarolio" src={imgMarolio} alt="" />
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to={"/categoria/2"}> Cuencos </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/categoria/3"}> Tazas </NavLink>
                    </li>
                </ul>
            </nav>
            <CartWidget />
        </header>
    )
}

export default NavBar*/
//////////////////////////////////////////////////////////

import CartWidget from "../CartWidget/CartWidget";
import { NavLink, Link } from "react-router-dom";
import cerdeco from '../cerdeco.png';
import './NavBar.css';

const NavBar = () => {
    return (
        <header>
            <Link to={"/"}>
                <img className="imgCerdeco" src={cerdeco} alt="cerdeco" />
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to={"/categoria/2"}>Cuencos</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/categoria/3"}>Tazas</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/categoria/4"}>Macetas</NavLink>
                    </li>
                </ul>
            </nav>
            <CartWidget />
        </header>
    );
}

export default NavBar;
