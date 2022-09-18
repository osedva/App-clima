import { FormEvent, useEffect, useState } from "react";
import { getWaetherByCoords, getWaetherBySearch } from "./api/fetchWether";
import { SearchBox } from "./components/SearchBox";
import { WeatherContainer } from "./components/WeatherContainer";

const App = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState("");

  //conexion al API datos
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const LAT = position.coords.latitude;
      const LON = position.coords.longitude;

      try {
        const data = await getWaetherByCoords(LAT, LON);
        setFetchedData(data);
        
      } catch (err) {
        setError("Por favor revisa su conexion a internet ");
      }
    });
  }, []);

  //Buscador
  const handleSearch = async (e: FormEvent<HTMLFormElement>, CITY: string) => {
    e.preventDefault();
    setError("");

    try {
      const data = await getWaetherBySearch(CITY);
      if (data.cod === "404") {
        setError("Ciudad No encontrada");
      } else if (data.cod === "400") {
        setError("Debe ingresar nombre de una ciudad");
      } else {
        setFetchedData(data);
        
      }
    } catch (err) {
      setError("Por favor revisa su conexion a internet ");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <SearchBox handleSearch={handleSearch} />
      <WeatherContainer fetchedData={fetchedData} error={error} />
    </div>
  );
};

export default App;
