import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Moment from "react-moment";

import Toptab from "./component/Toptab";
import Trucks from "./component/Trucks";

let tdata
export default function App() {

  const [trucks, settrucks] = useState()
  const [Userdata, setUserData] = useState()
  const [maptruck, setmaptruck] = useState()
  const gitHubUrl = 'https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint'

  useEffect(() => {
    getGitHubUserWithFetch()

    window.truckinfo = {
      running: [],
      stopped: [],
      idle: [],
      error: []


    };

  }, [])

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();


    jsonData.data.forEach(element => {
      console.log(element)
    });





    settrucks(jsonData.data);
    setmaptruck(jsonData.data)
    console.log(jsonData)
    setUserData(jsonData.data);

    tdata = jsonData.data
  };

  useEffect(() => {
    setmaptruck(Userdata)
  
  }, [Userdata]
  )

  function Map() {
    const [selectedPark, setSelectedPark] = useState(null);

    console.log(tdata)
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedPark(null);
        }
      };
      window.addEventListener("keydown", listener);

      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);




    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 30.844801, lng: 75.975800 }}
    
      >
        {maptruck.map(item => (
          <Marker
            key={item.id}
            position={{
              lat: item.lastWaypoint.lat,
              lng: item.lastWaypoint.lng
            }}
            onClick={() => {
              setSelectedPark(item);
            }}
            icon={{

              url: item.lastRunningState.truckRunningState == 1 ?
                `/green.png` :
                item.lastWaypoint.ignitionOn == false && item.lastRunningState.truckRunningState == 0 ?
                  `/red.png` :
                  item.lastWaypoint.ignitionOn == true && item.lastRunningState.truckRunningState == 0 ?
                    `/yellow.svg` :
                    null,

              scaledSize: new window.google.maps.Size(27, 27)
            }}
          />
        ))}

        {selectedPark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPark(null);
            }}
            position={{
              lat: selectedPark.lastWaypoint.lat,
              lng: selectedPark.lastWaypoint.lng
            }}
          >
            <div>
              <h2>{selectedPark.truckNumber}</h2>
              <p><Moment locale="de" fromNow >{selectedPark.lastWaypoint.updateTime}</Moment></p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));









  return (
    <div style={{ width: '100%', height: "100%", overflow: 'hidden' }}>
      {Userdata ?
        <> <div style={{ width: '100%', height: '77px', position: 'absolute', top: 0, background: '#ccc' }}  >
          <Toptab Userdata={Userdata} setUserData={setUserData} setmaptruck={setmaptruck} trucks={trucks} />

        </div>
          <div style={{ width: '20vw', height: '78vh', position: 'absolute', top: 80, left: 0, background: '#ccc' }}>

            <Trucks maptruck={maptruck} setUserData={setUserData} setmaptruck={setmaptruck} />
          </div>
          <div style={{ position: 'absolute', right: 0, top: '80px', width: "80vw", height: "90vh" }}>
            <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA5xhyeDRvDdD-r9gqdMiMOtcO8zaX_nPA`}
              loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
              containerElement={<div style={{ height: `100%`, width: '100%' }} />}
              mapElement={<div style={{ height: `100%`, width: '100%' }} />}
            />
          </div>
        </>
        : null
      }
    </div>
  );
}
