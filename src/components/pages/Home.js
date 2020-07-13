import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getRestaurants } from '../../actions/restaurantActions'
import RestaurantItem from './restaurantItems'
import Preloader from '../layout/Preloader'
import { loadUser } from '../../actions/userActions'

const Home = ({ restaurants, getRestaurants, loadUser }) => {
    useEffect(() => {
        getRestaurants()
        loadUser()
        // eslint-disable-next-line
    }, [getRestaurants])
    return (
        <div>
            {!restaurants ? (<Preloader />) : (restaurants.map(restaurant => <RestaurantItem restaurant={restaurant} key={restaurant._id} />))}
        </div>
    )
}

Home.propTypes = {
    restaurants: PropTypes.array.isRequired,
    getRestaurants: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    restaurants: state.restaurant.restaurants
})

export default connect(mapStateToProps, { getRestaurants, loadUser })(Home)
