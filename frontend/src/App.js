import './App.css';
import TimeInfo from './components/TimeInfo';
import Metrics from './components/Metrics';

function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }} className="App">
      <TimeInfo/>
      <Metrics/>
    </div>
  );
}

export default App;
