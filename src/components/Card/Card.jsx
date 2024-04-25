import React from 'react';
import styles from './Card.module.css'; // Estilos CSS Modules para el componente

const Card = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <h3>{title}</h3>
        </div>
        <div className={styles.back}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
