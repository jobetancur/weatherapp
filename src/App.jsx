import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Weather from './components/Weather'


function App() {  

  return (
    <div className="principaldiv">
      <h2>Weather App</h2>
      <div className="App">
        <Weather />
      </div>
    </div>
  );
}

export default App
