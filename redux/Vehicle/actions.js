import {
    VEHICLE_MAKE,
    VEHICLE_MODEL,
    MODEL_LOADING,
    MAKE_LOADING,
    VEHICLE_ERROR,
    VEHICLE_SPACE,
    CLEAR_VEHICLE
} from './constants';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';
import keys from '../../config/keys';

export const loadMake = (data) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: MAKE_LOADING})

    await axios
        .post(`/api/vehicle/getMake`, data)
        .then(res => dispatch({
            type: VEHICLE_MAKE,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: VEHICLE_ERROR,
                payload: err.response
            })
        })
}

export const vehicleSpace = () => (dispatch) => {
    dispatch({type: VEHICLE_SPACE})
}

export const loadModel = (data) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: MODEL_LOADING})

    await axios
        .post(`/api/vehicle/getModel`, data)
        .then(res => dispatch({
            type: VEHICLE_MODEL,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: VEHICLE_ERROR,
                payload: err.response
            })
        })
        .then(console.log(getState().Vehicle))
}

export const clearVehicle = () => (dispatch) => {
    dispatch({
        type: CLEAR_VEHICLE
    })
}