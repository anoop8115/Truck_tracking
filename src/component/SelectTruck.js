

import React from 'react';
import Select from 'react-select';
function SelectTruck(props) {


  let trucks = {
    info: []
  };

  props.Userdata.map(function (item) {
    trucks.info.push({
      "value": item.truckNumber,
      "label": item.truckNumber,
      "truckNumber": item.truckNumber,
      "lastRunningState": item.lastRunningState,
      "lastWaypoint": item.lastWaypoint,

    });
  })


  console.log(trucks)


  const handlechange = (event) => {
    console.log(event)
    props.setUserData(event)
  }

  return (
    <div>
      {trucks.info != [] ?
        <Select

          isMulti
          name="colors"
          onChange={handlechange}
          options={trucks.info}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        : null
      }
    </div>
  );
}

export default SelectTruck;