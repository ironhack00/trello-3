import React from 'react';
import styles from './Card.module.css'; // Estilos CSS Modules para el componente

const Card = ({ data }) => {
  /* console.log(data, ' ------><-----') */
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <h3>{data.nameboard}</h3>
        </div>
        <div className={styles.back}>
          {
            data.users && data.users.map( (elemento, index ) =>{
              /* console.log(index) */
              return(
                <>
                  {
                   index === 0 ? <p className={styles.ad}> Board creator {elemento}</p> : <p>{elemento}</p>
                  }
                 </>
              )
            } )
          }
          
        </div>
      </div>
    </div>
  );
}

export default Card;
