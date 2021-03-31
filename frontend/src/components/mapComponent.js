import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript} from '@react-google-maps/api'
import MarkerInfo from "./markerInfo.js"
import NewEvent from "./newEvent.js"
import React from 'react'
const containerStyle = {
  width: '500px',
  height: '500px'
};

const MapComponent = ({apiKey}) => {
  const [center, setCenter] = useState(
    {
      lat: 0,
      lng: 0
    }
  )
  const [items, setItems] = useState([])
  const [eventQueried, setEventQueried] = useState(false)
  const [map, setMap] = useState(null)

  const onLoad = React.useCallback(function callback(map) {
    //const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
    console.log(map.getCenter())
  }, [])

  const testing = () => {
    let bounds = map.getBounds()
    console.log("center",map.getCenter())
    console.log("bounds", bounds)
    console.log(items)
  }
  useEffect ( () => {
    navigator.geolocation.getCurrentPosition(function(position) {
    const tempCenter = {
      lat:position.coords.latitude,
      lng:position.coords.longitude
    }
    setCenter(tempCenter)
  });

  }, [])


  //need to change so it queries surrounding area
  const eventQuery = async () => {
    //events/findNearby/:latitude/:longitude/:distance
    let bounds = map.getBounds()
    let lat_lower_bound = bounds.Ra.g
    // events/findNearby/:latitude_lower/:latitude_upper/:longitude_lower/:longitude_upper
    const res = await fetch("http://localhost:3001/events/findNearby/"
    + bounds.Ra.g + "/" + bounds.Ra.i + "/" + bounds.La.g + "/" + bounds.La.i
  )
    const data = await res.json()
    setItems(data)
    setEventQueried(true)
  }

  return (
    <LoadScript
      googleMapsApiKey= {apiKey}
    >
      <button onClick = {testing}>
        Test Button
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad = {onLoad}
      >
      { eventQueried ? (items.map((item) => {
        return <MarkerInfo key = {item["id"]} marker = {item}/>
      })) : (<></>)
      }
 // ADD stuff here
      </GoogleMap>

      <button onClick = {eventQuery}>
        Search nearby events
      </button>
      <NewEvent center = {center}/>
    </LoadScript>
  )
}
export default MapComponent
