import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default forwardRef((props, ref) => {
  const [beginningTime] = React.useState(new Date());
  const [timeDiff, setTimeDiff] = React.useState("");

  useEffect(() => {
    const interval = setInterval(() => setTime(), 500);
    return () => clearInterval(interval);
  }, [])

  useImperativeHandle(ref, () => ({
    getTime() {
      const currentTime = new Date();
      //@ts-ignore
      return (currentTime - beginningTime) / 1000;
    }
  }));

  return (
    <Text>{timeDiff}</Text>
  )

  function setTime() {
    const currentTime = new Date();
    //@ts-ignore
    let msec = currentTime - beginningTime;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;

    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    let time = ss.toString();
    if (time.length === 1) time = "0" + time;
    if (mm) time = mm + ":" + time;
    else time = "00:" + time;
    if (hh) time = hh + ":" + time;
    setTimeDiff(time);
  }
})