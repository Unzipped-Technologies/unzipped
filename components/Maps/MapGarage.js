import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Keys from '../../config/keys';


const MyMap = ({ locations, selecteds }) => {
    const [ selected, setSelected ] = useState({});
  
    const onSelect = item => {
      setSelected(item);
    }

    const mapStyles = {        
        height: "86.2vh",
        width: "100%", 
        overflow: 'hidden',};
      
      const defaultCenter = {
        lat: 39.956300, lng: -82.995680,
      }

    useEffect(() => {
        onSelect(selecteds)
    }, [])


    return (
        <React.Fragment>
            <LoadScript
                googleMapsApiKey={Keys.googleMapsId}>
                    <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={14}
                    center={defaultCenter}
                    >
                        {
                            locations.map(item => {
                            return (
                            <Marker key={item.name} position={item.location} onClick={() => onSelect(item)}/>
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
                            >
                            <>
                            <p>{selected.name}</p>
                            <p>{selected.address}</p>
                            </>
                            </InfoWindow>
                            )
                        }
                    </GoogleMap>
            </LoadScript>
        </React.Fragment>
    )
}

export default MyMap;