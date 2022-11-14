import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { loadMake, loadModel, vehicleSpace } from '../../../redux/actions';
import Checkbox from '@material-ui/core/Checkbox';

const VehicleForm = ({focus, setFocus, changeFocus, setTransmission, setStateAbv, stateAbv, loading, vin, defaultVehicle, year, setYear, license, color, setColor, error, changeVin, changeLicense, handleVinFocus, handleLicenseFocus, setSelMake, selModel, setSelModel}) => {
    const [err, setErr] = useState(false);
    const [manual, setManual] = useState(false);
    const colors = ["white", "black", "gray", "silver", "red", "blue", "brown", "green", "beige", "orange", "gold", "yellow", "purple"]

    const stateAbbreviations = [
        'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
        'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
        'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
        'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
        'VT','VI','VA','WA','WV','WI','WY'
       ];


    const changeColor = (e) => {
        setColor(e.target.value);
    }

    const changeState = (e) => {
        setStateAbv(e.target.value);
    }
    
    const getCarData = (e) => {
        changeFocus();
    }

    
    const scrollView = (id) => {
        document.getElementById(id).scrollIntoView();
    }

    useEffect(() => {
        if (defaultVehicle) {
            setFocus('verified');
        }
    }, [])

    useEffect(() => {
        if (manual) {
            setTransmission("Manual")
        } else { setTransmission("Automatic") }
    }, [manual])

    useEffect(() => {
        if (loading) {
            setFocus('loading')
        } else {
            if (defaultVehicle) {
                setFocus('vehicle')
            } else {
                setFocus('vehicle')
            }
        }
    }, [loading])

    useEffect(() => {
        if (error.data === "Enter Valid License plate") {
            setFocus('vehicle')
            setErr(true);
        } else {
            setErr(false)
            setFocus('verified')
        }
    }, [error])
    
    return (
        <React.Fragment>
            <div className={focus === 'vehicle' ? "payment-info-1" : "payment-info"}>
                <div className="payment-title-container">
                <p className="credit-title" id="lp">VEHICLE OPTIONS</p>
                </div>
                {!focus &&
                    <p style={{float: 'left', width: '100%', paddingLeft: '10px', color: 'red'}}>Select a vehicle...</p>
                }
                {focus !== 'vehicle' &&
                <div className={focus === 'vehicle' ? "vehicle-box-1" : "vehicle-box"} onClick={() => setFocus('vehicle')}>
                    <p className="credit-desc">Make/ Model</p>
                    {defaultVehicle &&
                    <>
                    <div className="vehicle-details">
                    <div className="grid-vehicle">
                    <div className="title-container-v">
                    <p className="vehicle-text" id="car-title">{defaultVehicle.model ? `${defaultVehicle.year} ${defaultVehicle.make} ${defaultVehicle.model}`.substring(0,19) : ''}</p>
                    <p className="vehicle-text" id="car-title-mobile">{defaultVehicle.model ? `${defaultVehicle.year} ${defaultVehicle.make} ${defaultVehicle.model}`.substring(0,17) : ''}</p>
                    </div>
                    <span id="last-move"><span className="color-title" id="color-title">Color: </span><span className="color-text">{defaultVehicle.color}<i className="fa fa-square" style={{backgroundColor: defaultVehicle.color, fontStyle: 'normal', marginLeft:'10px', backgroundColor: 'transparent'}} /></span></span>
                    </div>
                    <div className="grid-vehicle">
                    <p className="vehicle-text"><span className="color-title">Vin:</span> {`${defaultVehicle.vin ? defaultVehicle.vin.substring(0,16) : 'Select Vehicle'}...`}</p>
                    <p className="vehicle-text" id="licence-plate"><span className="color-title">Licence Plate: </span>{defaultVehicle.license}</p>
                    {/* <div id="color-block-1" > */}
                    {/* </div> */}
                    </div>
                    </div>
                    </>
                    }
                    {!defaultVehicle &&
                    <>
                        <p id="select-vehicle">Click to select a vehicle...</p>
                    </>
                    }
                    {focus === 'verified' &&
                        <img src={"/img/verifiedCheck.png"} alt='' className="img-check-cart"/>
                    }
                    {focus === 'loading' &&
                        <CircularProgress className="load-check-cart"/>
                    }
                </div>
                }
                {focus === 'vehicle' &&
                <div className="padding-bottom payment-form">
                    <label style={{color: '#222', paddingLeft: '5px'}}>License Plate #</label>
                    {error.data && <p style={{color: 'red', margin:'0px', padding: '0px', paddingLeft: '5px'}}>{error.data }</p>}
                    <div className="licence-input">
                    <input className="form-elim" value={license} onClick={() => scrollView('lp')} required onChange={(e) => changeLicense(e)} onFocus={(e) => handleLicenseFocus(e)} style={{marginLeft: '10px', paddingLeft: '5px', borderBottom: 'none !important'}}/>
                    </div>
                    <div className="form-row-2">
                    <div className="color-form" style={{marginRight: '1%'}}>
                    <FormControl className="form-elim" required style={{height: '110%', width: '95%', marginTop: '7px', marginLeft: '10px', borderBottom: 'none !important'}}>
                        <Select value={stateAbv} onChange={changeState}>
                            <MenuItem value={stateAbv}>{stateAbv}</MenuItem>
                            {stateAbbreviations.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </div>
                    <div className="color-form" style={{marginLeft: '1%'}}>
                    <FormControl className="form-elim" style={{height: '110%', width: '95%', marginTop: '7px', marginLeft: '10px', borderBottom: 'none !important'}} required>
                        <Select className="form-elim" value={color} onChange={changeColor}>
                            <MenuItem className="form-elim" value={color}>{color}</MenuItem>
                            {colors.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </div>
                    </div>
                    
                    <div className="vehicle-btn-container">
                        <span>
                        <Checkbox
                            color="primary"
                            checked={manual}
                            onClick={(e) => setManual(!manual)}
                            
                        />
                        <span style={{position: 'relative', top: '2px', left: '-3px'}}>Manual Transmission?</span>
                        </span>
                        <button className="vehicle-form-button" onClick={(e) => getCarData(e)} >Save</button>
                    </div>
                </div>
                }
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.Auth.loading
    }
}

export default connect(mapStateToProps, {loadMake, loadModel, vehicleSpace})(VehicleForm);