import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    Logo
                </Link>
                <div className="navlinks-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation;