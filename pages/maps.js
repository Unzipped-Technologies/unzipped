import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import SelectNav from '../components/Navbar/ScheduleNav';
import MapGarage from '../components/Maps/MapGarage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from "@material-ui/core/Icon";
import CustomLocation from "../components/modals/CustomLocation";
import MapTooFar from "../components/modals/mapTooFar";
import 'simplebar/dist/simplebar.min.css';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { connect, useDispatch } from 'react-redux';
import { selectLocation, getMapGarages, getMoreGarages } from '../redux/actions';

const Maps = ({location, date, count, isAuthenticated, moreGarages, selLocation, loading, locations}) => {
    const [coordinates, setCoordinates] = useState({lat: 39.956300, lng: -82.995680});
    const [link, setLink] = useState('/services');
    const [ selected, setSelected ] = useState({});
    const [customMarkers, setCustomMarkers] = useState(false);
    const [isMarkerShown, setIsMarkerShown] = useState(false);
    const [pickupAddress, setPickupAddress] = useState('');
    const [dropoffAddress, setDropoffAddress] = useState('');
    const [overlay, setOverlay] = useState(false);
    const [markerPosition, setMarkerPosition] = useState('');
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [pages, setPages] = useState(0);
    const [customAddress, setCustomAddress] = useState(false);
    const [coords, setCoords] = useState(null);
    const router = useRouter();
    const [sideBar, setSideBar] = useState(true);
    const dispatch = useDispatch();
    const observer = useRef(null);
    const lastOrderRef = useCallback(node => {
        if (moreGarages) {
            if (loading) return;
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                  getMoreGarages()
                }
            })
            if (node) observer.current.observe(node)
            console.log('print More')
        } else {return;}
    }, [loading])


    const mapStyles = {        
      height: "86.2vh",
      width: "100%", 
      overflow: 'hidden',};
    
    const defaultCenter = {
      // lat: coordinates.lat, lng: coordinates.lng,
      //vohnt headquarters
      // lat: 39.956300, lng: -82.995680,
      //centered point
      lat: 39.9624184, lng: -82.9966745,
    }

    const granviewHeightsCoords = {
      lat: 39.978249, lng: -83.038063
    }

    const VohntHQ = {
      lat: 39.956300, lng: -82.995680
    }

    const selectNGo = (payload) => {
      dispatch(selectLocation({...payload, dropoffAddress: ''}));
      router.push(link)
    }

    const loadMoreOrders = () => {
      let number = pages + 1;
      setPages(number)
      dispatch(getMoreGarages(number))
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * 0.621371; // Distance in miles
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

      
    const onSelect = (item) => {
      dispatch(selectLocation({...item, dropoffAddress: ''}));
      setSelected(item);
    }

    const setNAdd = (payload) => {
      dispatch(selectLocation({...payload, dropoffAddress: ''}));
      setSelected(payload);
    }

    const openInput = () => {
      setCustomAddress(!customAddress)
    }

    const selectApin = () => {
      setCustomMarkers(customMarkers ? false : true)
      setOverlay(overlay ? false : true)
    }

    const sendCustomAddress = (e) => {
      e.preventDefault()
      dispatch(selectLocation({
        name: pickupAddress,
        address: pickupAddress,
        location: {
          lat: 0,
          lng: 0
        },
        dropoff: dropoffAddress
      }))
      router.push(link)
    }

    const onMapClick = (e) => {
      if (overlay) {
        setMarkerPosition(e.latLng);
        setCoords({lat: e.latLng.lat(), lng: e.latLng.lng()})
        console.log({lat: e.latLng.lat(), lng: e.latLng.lng()})
        setIsMarkerShown(true);
        setOverlay(false);
        return;
      }
      if (isMarkerShown) {
        setMarkerPosition(e.latLng);
        setCoords({lat: e.latLng.lat(), lng: e.latLng.lng()})
        console.log({lat: e.latLng.lat(), lng: e.latLng.lng()})
      }
    }

    // useEffect(() => {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             setCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude})
    //           });
    //       } 
    // },[])

    useEffect(() => {
      console.log(coords)
    }, [coords])

    useEffect(() => {
      dispatch(getMapGarages(0))
    },[])

    useEffect(() => {
      if (coords) {
        let HQ = getDistanceFromLatLonInKm(VohntHQ.lat, VohntHQ.lng, coords.lat, coords.lng);
        let GH = getDistanceFromLatLonInKm(granviewHeightsCoords.lat, granviewHeightsCoords.lng, coords.lat, coords.lng);
        if (Math.abs(HQ) > 4) {
          if (Math.abs(GH) > 4) {
            setAlertOpen(true);
          } else {
            setOpen(true);
          }
        } else if (Math.abs(GH) > 4) {
          if (Math.abs(HQ) > 4) {
            setAlertOpen(true);
          } else {
            setOpen(true);
          }
        } else {
          setOpen(true);
        }
    }
    }, [coords]);

    useEffect(() => {
      if (count === 0) {
          setLink('/services');
      } else if (date === 'Select a Date') {
          setLink('/schedule');
      } else if (location.name === 'Select map area') {
          setLink('/maps');
      } else if (isAuthenticated !== true) {
          setLink('/login');
      } else {
          setLink('/cart');
      }
      }, [count, location, date, isAuthenticated])

    //// use Distance Matrix API
    // const CalcDistance = (coords1, coords2) => {
    //  return miles
    // }

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Maps | Unzipped</title>
            <meta name="Maps | Unzipped" content="Select a location..."/>
            </Head>
            <div className="maps-page">
            <SelectNav link={link}/>
            <div className={customMarkers ? "mobile-map" : 'hide-mobile-map'}>
                <div className= {sideBar === true ? customMarkers ? "map-container-2" : "map-container" : "map-container-fullscreen"}>
                  <LoadScript
                      googleMapsApiKey='AIzaSyDcE5jKlJtBQHo1lhqYUEaQ227UuoCvC4s'>
                          <GoogleMap
                          mapContainerStyle={mapStyles}
                          zoom={customMarkers ? 12 : 15}
                          center={defaultCenter}
                          onClick={(e) => onMapClick(e)}
                          
                          >
                          
                          {customMarkers &&
                            <>
                            {/* <Circle 
                              onClick={(event) => {
                              onMapClick(event);
                              }}
                              style={{outline: 'none', border: 'none', strokeColor: 'transparent'}}
                              center={{ lat: 39.978249, lng: -83.038063 }}
                              radius={6438.36}
                            />
                            <Circle 
                              onClick={(event) => {
                              onMapClick(event);
                              }}
                              style={{outline: 'none', border: 'none', strokeColor: 'transparent'}}
                              center={{ lat: 39.956300, lng: -82.995680 }}
                              radius={6438.36}
                            /> */}
                            {overlay &&
                            <>
                            <div id="overlay">Click map to place pin...</div>
                          </>
                            }
                            <>
                            {isMarkerShown &&
                              <>
                              <Marker 
                                icon={'/img/purple-dot.png'}
                                position={markerPosition} 
                                // onClick={() => onSelect(item)}
                              />
                            <Circle 
                              onClick={(event) => {
                              onMapClick(event);
                              }}
                              style={{outline: 'none', border: 'none', strokeColor: 'transparent', pointerEvent: 'none'}}
                              center={{ lat: 39.978249, lng: -83.038063 }}
                              radius={6438.36}
                            />
                            <Circle 
                              onClick={(event) => {
                              onMapClick(event);
                              }}
                              style={{outline: 'none', border: 'none', strokeColor: 'transparent', pointerEvent: 'none'}}
                              center={{ lat: 39.956300, lng: -82.995680 }}
                              radius={6438.36}
                            />
                            </>
                              }
                            </>
                            </>
                          }
                          
                          {!customMarkers &&
                            <>
                              {
                                  locations.map((item, index) => {
                                  return (
                                  <div key={index} >
                                  {!isMarkerShown &&
                                  <Marker 
                                    key={index} 
                                    icon={'/img/purple-dot.png'}
                                    position={item.location} 
                                    onClick={() => onSelect(item)}
                                  />
                                  }
                                  </div>
                                  )
                                  })
                              }
                              {
                                  selected.location && 
                                  (
                                  <InfoWindow
                                  position={selected.location}
                                  clickable={true}
                                  onCloseClick={() => setSelected({})}
                                  className="info-window-s"
                                  >
                                  <div className="info-maps">
                                    <div>
                                      <p className="title-info-w">{selected.name}</p>
                                      <p className="address-info-w">{selected.address}</p>
                                    </div>
                                    
                                    <div id="icon-send-info" onClick={() => selectNGo(selected)}>
                                      <Link href={link}>
                                      <Icon className="material-icon-send"  >send</Icon>
                                      </Link>
                                      <p className="text-button-info"><span className="nxt-mp">Next</span><span className="cnt-mp">Continue</span></p>
                                    </div>

                                  </div>
                                  </InfoWindow>
                                  )
                              }
                              </>
                              }
                          </GoogleMap>
                  </LoadScript>
                    <div className={sideBar === true ? "close-button" : "open-button"}>
                      <CustomLocation open={open} setOpen={setOpen} markerPosition={markerPosition} link={link}/>
                      <MapTooFar open={alertOpen} setOpen={setAlertOpen} />
                      <button className="arrow-btn" onClick={() => setSideBar(!sideBar)}>
                        <Icon className="lr-arrow">{sideBar === true ? 'chevron_left' : 'chevron_right'}</Icon>
                      </button>
                    </div>
                </div>
                <div className={sideBar === true ? "description-display" : "description-display-close"}>
                    <div className="maps-desc-header">
                        <h4  className="header-maps-title">Select a <span className="pickup-m">pickup </span>location:</h4>
                        <p className="mobile-location">{selLocation ? selLocation : ''}</p>
                    </div>
                    <div className="maps-list-container">
                        <SimpleBar className="simple-Bar">
                        <div className="garage-item-1">
                          <button className="select-custom-location" onClick={() => openInput()}>
                          Select a custom location?
                          </button> 
                          <button className="select-custom-location-mobile" onClick={() => openInput()}>Select a custom location?</button>
                        </div>
                        {customAddress &&
                            <div style={{width: '90%', marginLeft: '5%', marginTop: '20px', marginBottom: '60px'}}>
                            <form onSubmit={(e) => sendCustomAddress(e)}>
                            <label style={{color: '#222'}}>Pickup Address:</label>
                            <input 
                              required 
                              type="text"
                              value={pickupAddress}
                              onChange={(e) => setPickupAddress(e.target.value)}
                              style={{border: '1px solid #999', paddingLeft: '5px'}}
                              />
                            <label style={{color: '#222'}}>Dropoff Address:</label>
                            <input 
                              required 
                              value={dropoffAddress}
                              type="text"
                              onChange={(e) => setDropoffAddress(e.target.value)}
                              style={{border: '1px solid #999', paddingLeft: '5px'}}
                              />
                              <button type="submit" className="btn" style={{float: 'right'}} id="button-map">Continue</button>
                            </form>
                            </div>
                          }

                        {locations.map((item, index) => {
                            return (
                                <div key={index} className="garage-item" onClick={() => onSelect(item)}>
                                <div>
                                <p className="garage-title">{item.name}</p>
                                <p className="garage-type">Parking Garage</p>
                                <p className="garage-address">{item.address}</p>
                                </div>
                                {/* <p>distance: {CalcDistance(coordinates, item.location)}</p> */}
                                <div className="garage-buttons">
                                  <div id="icon-add" onClick={() => setNAdd(item)}>
                                    <Icon className="material-icons" >add</Icon>
                                    <p className="text-button">Add</p>
                                  </div>
                                  <div id="icon-send">
                                    <Link href={link}>
                                    <Icon className="material-icons" onClick={() => selectNGo(item)}>send</Icon>
                                    </Link>
                                    <p className="text-button">Continue</p>
                                  </div>
                                </div>
                                </div>
                            )
                        })}
                        <div className="user-rows" id="see-more-1">
                          <div className="first-row" id="see-more">
                          {moreGarages &&
                          <>
                          {locations.length > 0 &&
                              <button className="see-more-customer" ref={lastOrderRef} onClick={() => loadMoreOrders()}>{loading ? <CircularProgress size={18}/> : 'See More...'}</button>
                          }
                          </>
                          }
                          </div>
                      </div>
                        </SimpleBar>
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
  return {
      location: state.Booking.location,
      date: state.Booking.date,
      cart: state.Booking.cart,
      count: state.Booking.count,
      access: state.Auth.token,
      selLocation: state.Booking.location.name,
      isAuthenticated: state.Auth.isAuthenticated,
      locations: state.Booking.locations,
      loading: state.Booking.loading,
      moreGarages: state.Booking.moreGarages,
  }
}

export default connect(mapStateToProps, {selectLocation, getMoreGarages, getMapGarages})(Maps);