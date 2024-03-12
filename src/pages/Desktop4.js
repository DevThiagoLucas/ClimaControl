import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Desktop4.module.css";

const Desktop4 = () => {
  const location = useLocation();
  const inputValue = location.state?.inputValue || "";
  const API_KEY = 'a9460d8288e37e7e5ae6ee63f8b366b6';
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData2, setWeatherData2] = useState(null);


  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1;
  const dia = dataAtual.getDate() + 1;
  const dia2 = dataAtual.getDate() + 1;
  const dia3 = dataAtual.getDate() + 2;
  const dia4 = dataAtual.getDate() + 3;
  const dia5 = dataAtual.getDate() + 4;

  const DataFormatadaHora = `${ano}-${mes}-${dia}`+' 18:00:00';
  const day2 = `${dia2}/${mes}/${ano}`
  const day3 = `${dia3}/${mes}/${ano}`
  const day4 = `${dia4}/${mes}/${ano}`
  const day5 = `${dia5}/${mes}/${ano}`
  
  const [backgroundImage, setBackgroundImage] = useState('');
  const [currentHour, setCurrentHour] = useState('');


  const diaDaSemana = dataAtual.getDay();
  const diasOffset = 7;
  const diaDaSemana2 = (diaDaSemana + 1) % 7;
  const diaDaSemana3 = (diaDaSemana + 2) % 7;
  const diaDaSemana4 = (diaDaSemana + 3) % 7;
  const diaDaSemana5 = (diaDaSemana + 4) % 7;

  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  const nomeDiaDaSemana = diasDaSemana[diaDaSemana];
  const nomeDiaDaSemana2 = diasDaSemana[diaDaSemana2];
  const nomeDiaDaSemana3 = diasDaSemana[diaDaSemana3];
  const nomeDiaDaSemana4 = diasDaSemana[diaDaSemana4];
  const nomeDiaDaSemana5 = diasDaSemana[diaDaSemana5];

  const navigate = useNavigate();

  const voltarParaTelaInicial = useCallback(() => {
    setWeatherData(null);
    setWeatherData2(null);
    navigate("/");
  }, [navigate]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&lang=pt_br&units=metric`);
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }

  };
    

    const fetchData2 = async () => {
      try {
        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${API_KEY}&lang=pt_br&units=metric`);
        if (!response2.ok) {
          throw new Error(`Erro na solicitação: ${response2.status}`);
        }
        const data2 = await response2.json();
        
        // Filtrar os dados para obter a temperatura para o dia 2023-11-19
        const desiredDate = DataFormatadaHora;
        const temperatureForDesiredDate = data2.list.find(entry => entry.dt_txt.includes(desiredDate));

        // Verificar se encontrou a temperatura para o dia desejado
        if (temperatureForDesiredDate) {
          // A temperatura estará disponível em temperatureForDesiredDate.main.temp
          console.log(`Temperatura para ${desiredDate}: ${temperatureForDesiredDate.main.temp}°C`);
        } else {
          console.log(`Não foi possível encontrar a temperatura para ${desiredDate}`);
        }
    
        setWeatherData2(data2);
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }

  };
    
      

      const getCurrentTime = () => {
        
        const now = new Date();
        const hours = now.getHours();
        setCurrentHour(hours);
  
        if (hours >= 6 && hours < 12) {
          setBackgroundImage('/manha.png');
        } else if (hours >= 12 && hours < 18) {
          setBackgroundImage('/tarde.png');
        } else {
          setBackgroundImage('/noite.png');
        }
  
        const intervalId = setInterval(getCurrentTime, 10000);

        return () => clearInterval(intervalId);
  };
    
    fetchData();
    fetchData2();
    getCurrentTime(); 
   
  }, [inputValue, API_KEY]);

  const getWeatherIcon = () => {
    const weatherMain = weatherData?.weather[0]?.main;
    const getCurrentTime = () => {
      const now = new Date();
      return now.getHours();
    };
    const currentTime = getCurrentTime();
    
    if (weatherMain === "Clouds") {
      return "/nublado.svg";
    } else if (weatherMain === "Rain") {
      return "/chuvoso.svg";
    } else if (weatherMain === "Clear" && currentTime < 18) {
      return "/sol2.svg";
    } else if (weatherMain === "Clear" && currentTime >= 18) {
      return "/lua.svg";
    } else if (weatherMain === "Haze") {
      return "/nublado.svg";
    } else if (weatherMain === "Mist") {
      return "/nublado.svg";
    } 
    else {
      // Retorne um ícone padrão ou lide com outros casos conforme necessário
      return "/outro-icone-padrao.svg";
    }
    
  };


  return (

    <div className={styles.desktop4}>

      <button
        className={styles.botaoVoltar}
        onClick={voltarParaTelaInicial}
      >
        Nova Consulta
      </button>
      
      <label className={styles.retangulo1Label}>

      </label>

      <label className={styles.retangulo2Label}>
        
      </label>

      <label className={styles.retangulo3Label}>
      
      </label>

      <label className={styles.retangulo4Label}>
      
      </label>

      <label className={styles.retangulo5Label}>
      
      </label>

      <label className={styles.retangulo6Label}>
      
      </label>

      <label className={styles.retangulo7Label}>
      
      </label>

      <label className={styles.retangulo8Label}>
      
      </label>

      <label className={styles.retangulo9Label}>
      
      </label>

    
      <div className={styles.background}>
        <img className={styles.imageIcon} alt="" src={backgroundImage} />
      </div>


       <img
        className={styles.weatherCloudNightWindBreezIcon}
        alt=""
        src="/7795633-weather-cloud-night-wind-breeze-icon-1@2x.png"
      />

  
      <img className={styles.iconesClima} alt="" src={getWeatherIcon()} 
      />
   

      <label className={styles.aquiVaiAparecer}>
        {inputValue.toUpperCase()}
      </label>

      {weatherData2 && weatherData2.list && (
      <>

        {/*DIA 2*/}
        <label className={styles.dia2Label}>
          {nomeDiaDaSemana2}
          <br />
          Temperatura: {weatherData2.list[8].main.temp}°C
          <br />  
          Clima: {weatherData2.list[8].weather[0].description.toUpperCase()}
        </label>

        {/*DIA 3*/}
        <label className={styles.dia3Label}>
          {nomeDiaDaSemana3}
          <br />
          Temperatura: {weatherData2.list[16].main.temp}°C
          <br />  
          Clima: {weatherData2.list[16].weather[0].description.toUpperCase()}
        </label>

        {/*DIA 4*/}
        <label className={styles.dia4Label}>
          {nomeDiaDaSemana4}
          <br />
          Temperatura: {weatherData2.list[24].main.temp}°C
          <br />  
          Clima: {weatherData2.list[24].weather[0].description.toUpperCase()}
        </label>
        
        {/*DIA 5*/}
        <label className={styles.dia5Label}>
          {nomeDiaDaSemana5}
          <br />
          Temperatura: {weatherData2.list[32].main.temp}°C
          <br />  
          Clima: {weatherData2.list[32].weather[0].description.toUpperCase()}
        </label>
      </>
    )}
      

      {weatherData && (
        <div>
          <label className={styles.temperaturaLabel}>
            {weatherData.main.temp}°C
          </label>

          <label className={styles.descricaoLabel}>
            {weatherData.weather[0].description.toUpperCase()}
          </label>

          <label className={styles.temperaturaMinimaLabel}>
          Temperatura Mínima:
            <br />
            {weatherData.main.temp_min}°C
          </label>

          <label className={styles.temperaturaMaximaLabel}>
            Temperatura Máxima:
            <br />
            {weatherData.main.temp_max}°C
          </label>

          <label className={styles.umidadeLabel}>
            Umidade:
            <br />
            {weatherData.main.humidity}g/m³
          </label>

          <label className={styles.pressaoLabel}>
            Pressão:
            <br />
            {weatherData.main.pressure} Pa
          </label>

          <label className={styles.sensacaoLabel}>
            Sensação:
            <br />
            {weatherData.main.feels_like}°C
          </label>

        </div>
      )}
    </div>



  );
};

export default Desktop4;


