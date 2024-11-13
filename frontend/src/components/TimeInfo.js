import { useState } from "react";
import { useInterval } from "./PollEndpoint";
import Loader from "./Loader";

function TimeInfo() {
    const [time, setTime] = useState(0);
    const [serverTime, setServerTime] = useState(0);
    const [isDataLoading, setIsDataLoading] = useState(false);

    useInterval(() => {
      setTime(calculateStopwatchTime(Date.now() - serverTime));
    }, 1000 * 1)

    useInterval(async () => {
      setIsDataLoading(true);
      try {
        const result = await fetch(`http://127.0.0.1:5001/time`, {
          method: 'GET',
          headers: {
            "Authorization": "mysecrettoken",
          }
        });

        const response = await result.json();
        const serverEpoch = response.epoch;
        setServerTime(serverEpoch);

        setTime(calculateStopwatchTime(Date.now() - serverTime));
        setIsDataLoading(false);
      } catch (error) {
        console.error(error);
      }
    }, 1000 * 30);

    return (
        <div className="timeColumn">
          <body>
            <h1>Time</h1>
            <p> {isDataLoading ? <Loader /> : time} </p>
          </body>
        </div>
    );
}

function calculateStopwatchTime(difference){
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
}

export default TimeInfo;
