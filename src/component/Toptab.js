import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import SelectTruck from './SelectTruck';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 81,
    width: 220,
    textAlign: 'center',
    fontWeight: 700,
  },
  selectT: {
    height: 81,
    width: 430,
    textAlign: 'center',
    fontWeight: 700,
  },
  control: {
    padding: theme.spacing(0),
  },
}));



export default function SpacingGrid(props) {
  const { Userdata } = props

  const classes = useStyles();
  const [running, setrunning] = React.useState(0);
  const [idle, setidle] = useState(0)
  const [stopped, setstopped] = useState(0)



  useEffect(() => {
    window.truckinfo = {
      running: [],
      stopped: [],
      idle: [],
      error: []


    };
    let Running = 0
    let stoppe = 0
    let idale = 0

    setrunning(0)
    setstopped(0)
    setidle(0)

    Userdata.map((item) => {
      if (item.lastRunningState.truckRunningState == 1) {
        console.log(item)
        window.truckinfo.running.push(item);
        setrunning(++Running)
      }
      else if (item.lastWaypoint.ignitionOn == true && item.lastRunningState.truckRunningState == 0) {
        window.truckinfo.idle.push(item);
        setidle(++idale)
      }
      else if (item.lastWaypoint.ignitionOn == false && item.lastRunningState.truckRunningState == 0)
        window.truckinfo.stopped.push(item);
      setstopped(++stoppe)
    })
    console.log(window.truckinfo)

  }, [Userdata])


  const handleclick = (e) => {
    props.setmaptruck(e)
  }



  return (
    <Grid container className={classes.root} spacing={2}>
      {Userdata ?
        <Grid item xs={12}>
          <Grid container justify="left" >
            {/* {[0, 1, 2,3,4,5,6].map((item,index) => ( */}
            <Grid item onClick={() => handleclick(Userdata)}>
              <Paper className={classes.paper} ><br /><span>Total Trucks</span>
                <br />
                <span>{Userdata.length}</span>
              </Paper>
            </Grid>
            <Grid item onClick={() => handleclick(window.truckinfo.running)}>
              <Paper className={classes.paper} ><br /><span>Running Trucks</span>
                <br />
                <span>
                  {window.truckinfo.running.length}
                </span>
              </Paper>
            </Grid>
            <Grid item onClick={() => handleclick(window.truckinfo.stopped)}>
              <Paper className={classes.paper} ><br /><span>Stopped Trucks</span>
                <br />
                <span> {window.truckinfo.stopped.length}</span>
              </Paper>
            </Grid>
            <Grid item onClick={() => handleclick(window.truckinfo.idle)}>
              <Paper className={classes.paper} ><br /><span>Idle Trucks</span>
                <br />
                <span>{window.truckinfo.idle.length}</span>
              </Paper>
            </Grid>
            <Grid item onClick={() => handleclick(window.truckinfo.error)}>
              <Paper className={classes.paper} ><br /><span>Error Trucks</span>
                <br />
                <span>0</span>
              </Paper>
            </Grid>

            {/* <Grid item >
              <Paper className={classes.selectT} ><br />
             
              </Paper>
            </Grid> */}
            <div style={{ position: 'absolute', width: '18vw', zIndex: '99', right: 5, top: 5 }}>
              <SelectTruck Userdata={props.trucks} setUserData={props.setUserData} />
            </div>
            {/* ))} */}
          </Grid>
        </Grid>
        : null
      }
    </Grid>
  );
}
