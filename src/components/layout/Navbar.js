import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/userActions'
import M from 'materialize-css/dist/js/materialize.min.js';

const Navbar = ({ user: { user, isAuthenticated }, logout, icon, title }) => {


    const onLogout = () => {
        logout()
        M.toast({ html: 'Successfully logged out' })
    }
    const authLinks = (
        <Fragment>

            {user && user.roles[0] !== 'admin' ? (<h1></h1>) : (
                <li>
                    <Link to="/addRestaurant"><i className="material-icons">add</i></Link>
                </li>)}

            <li>
                <Link to="/">Home</Link>
            </li>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
            <li>
                <Link to="/updateUser"><i className="material-icons">account_circle</i></Link>
            </li>


        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <h5><Link to="/">Home</Link></h5>
            </li>
            <li>
                <h5><Link to="/register">Register</Link></h5>
            </li>
            <li>
                <h5> <Link to="/login">Login</Link></h5>
            </li>
        </Fragment>
    )


    return (
        <div className="navbar bg-danger" >
            <h4>
                <i className={icon}></i> {title}
            </h4>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

Navbar.defaultProps = {
    title: 'Galatz',
    icon: 'fas fa-pizza-slice'
}


const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { logout })(Navbar)
