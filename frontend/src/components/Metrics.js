import { useState } from "react";
import { useInterval } from "./PollEndpoint";
import Loader from "./Loader";

function Metrics() {
    const [metrics, setMetrics] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(false);

    useInterval(async () => {
      setIsDataLoading(true);
      try {
        const result = await fetch(`http://127.0.0.1:5001/metrics`, {
          method: 'GET',
          headers: {
            "Authorization": "mysecrettoken",
          }
        });

        const response = await result.text();

        setMetrics(response);
        setIsDataLoading(false);
      } catch (error) {
        console.error(error);
      }
    }, 1000 * 30);

    return (
        <div className="timeColumn">
          <body>
            <h1>Metrics</h1>
            <p> {isDataLoading ? <Loader /> : metrics} </p>
          </body>
        </div>
    );
}

export default Metrics;
