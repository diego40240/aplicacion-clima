import { useState } from "react";

export default function WheatherApp() {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "2abcf7fb677f294385fe9fdb122e2347";
  const difKelvin = 273.15;
  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  function handleCambioCiudad(e) {
    setCiudad(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    //Condicional "if" ternario
    ciudad.length > 0 && fetchClima();
  }

  async function fetchClima() {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&APPID=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.log("Ocurrio el siguiente problema: " + error);
    }
  }

  return (
    <div className="container">
      <h1>Aplicación del clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>
            Temperatura: {parseInt(dataClima?.main?.temp - difKelvin) + "ºC"}
          </p>
          <p>Condición meteorológica: {dataClima.weather[0].description}</p>
          <img
            alt={dataClima.weather[0].description}
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
}
