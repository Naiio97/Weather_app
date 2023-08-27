import { useEffect } from "react";

import "../src/styles/App.scss";
import WeatherContainer from "./components/WeatherContainer";

function App() {

  useEffect(() => {
    document.title = 'Weather app';
  }, []);


  return (
    <div className="app">
      <WeatherContainer />
    </div>
  );
}

export default App;
