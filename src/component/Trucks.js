import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import FontAwesome from 'react-fontawesome'
import Moment from 'react-moment';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '20vw',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    height: '88vh',
  },
  inline: {
    display: 'inline',
  },
}));

export default function Trucks(props) {
  const classes = useStyles();

  const handletrucks = (e) => {
    let a = [e]
    console.log(a)

    props.setmaptruck(a)
  }
  let d


  return (
    <List className={classes.root}>
      <Divider component="li" />
      {
        props.maptruck.map((item, index) =>
          <>
            <ListItem alignItems="flex-start" onClick={() => handletrucks(item)} 
            // style={item.lastWaypoint.ignitionOn == false && item.lastRunningState.truckRunningState == 0 ? { backgroundColor: '#db3c07', color: 'white' } : null}  
            >

              <ListItemText
                primary={<b>{item.truckNumber}</b>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {
                        item.lastRunningState.truckRunningState == 1 ?
                          <>  Running since last  <Moment locale="de" fromNow ago>{item.lastRunningState.stopStartTime}</Moment>

                            <span style={{ fontSize: 'small', marginLeft: '4vw' }}>
                              {Math.round(item.lastWaypoint.speed * 10) / 10} km/h
                            </span>
                          </>
                          :
                          <span> Stopped since last <Moment locale="de" fromNow ago>{item.lastRunningState.stopStartTime}</Moment>
                          
                          </span>
                      }


                    </Typography>

                  </React.Fragment>
                }
              />
              <span style={{ position: 'absolute', right: 80, top: 16, fontSize: 'small' }}> <FontAwesome
                className="super-crazy-colors"
                name="fa-truck"

                size="2x"

              /></span>
              <span style={{ position: 'absolute', right: 14, top: 13, fontSize: 'small' }}>
                <Moment locale="de" fromNow ago>{item.lastWaypoint.updateTime}</Moment>

              </span>
            </ListItem>
            <Divider component="li" />

          </>
        )
      }



    </List>
  );
}
