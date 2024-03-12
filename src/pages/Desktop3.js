import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Desktop3.module.css";

const Desktop3 = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(""); // Novo estado para armazenar o valor do input

  const onRectangleButtonClick = useCallback(() => {
    navigate("/Desktop-4", { state: { inputValue } }); // Passa o valor do input para a próxima página
  }, [navigate, inputValue]);
  
  const [backgroundImage, setBackgroundImage] = useState('');
  const [currentHour, setCurrentHour] = useState('');


  useEffect(() => {
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

    };
    
    const intervalId = setInterval(getCurrentTime, 10000); // Chama getCurrentTime a cada 10 segundos

    getCurrentTime(); // Chama a função imediatamente para definir o fundo inicial

     // Limpa o intervalo quando o componente é desmontado para evitar vazamentos de memória
    return () => clearInterval(intervalId);

  }, []);


  return (
    <div className={styles.desktop3}>
      

      <div className={styles.background}>
        <img className={styles.imageIcon} alt="" src={backgroundImage} />
      </div>

      <label className={styles.bemVindoLabel}>
        Bem-Vindo!
   
      </label>

      <img
        className={styles.weatherCloudNightWindBreezIcon}
        alt=""
        src="/7795633-weather-cloud-night-wind-breeze-icon-1@2x.png"
      />
      <div className={styles.climacontrol}>ClimaControl</div>
      <input
        className={styles.desktop3Child}
        placeholder=" Informe a cidade..."
        type="text"
        value= {inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Atualiza o estado com o valor do input
      />
      <button
        className={styles.desktop3Item}
        onClick={onRectangleButtonClick}
      >
        Buscar
      </button>

      
    </div>
  );
};

export default Desktop3;
