import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { updateUser, loadUser } from '../../actions/userActions'
import M from 'materialize-css/dist/js/materialize.min.js';


const UpdateUser = ({ current, updateUser, loadUser }) => {

    useEffect(() => {
        loadUser()
        if (current !== null) {
            setUser(current)
        }
        else {
            setUser({
                name: '',
                email: '',
                contact: '',
                address: '',
                password: ''
            })
        }
        // eslint-disable-next-line
    }, [current])

    const [user, setUser] = useState({
        name: '',
        email: '',
        contact: '',
        address: '',
        password: ''
    })

    const { _id, name, email, contact, address, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        updateUser({ _id, name, email, contact, address, password });
        M.toast({ html: 'Your information is updated successfully' })

    }


    return (
        <div className="form-container">
            <h2>
                <span className="red-text">Update Your Details</span>
            </h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input type="text" name="contact" value={contact} onChange={onChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" name="email" value={email} onChange={onChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={address} onChange={onChange}></input>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" value={password} onChange={onChange}></input>
                </div> */}
                <input type="submit" value="Update" className="btn waves-effect waves-light red btn-block" />
            </form>

        </div >
    )
}

UpdateUser.propTypes = {
    current: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    current: state.user.current
})

export default connect(mapStateToProps, { updateUser, loadUser })(UpdateUser)
