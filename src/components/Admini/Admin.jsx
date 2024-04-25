import React, { useState } from 'react';
import styles from './Admin.module.css'; // Importa los estilos CSS Modules
import Card from '../Card/Card'; // Importa el componente Card
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminComponent = () => {

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [invitees, setInvitees] = useState(['']);

  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleInviteeChange = (index, event) => {
    const newInvitees = [...invitees];
    newInvitees[index] = event.target.value;
    setInvitees(newInvitees);
  };

  const handleAddInvitee = () => {
    setInvitees([...invitees, '']);
  };

  const handleRemoveInvitee = (index) => {
    const newInvitees = [...invitees];
    newInvitees.splice(index, 1);
    setInvitees(newInvitees);
  };

  const handleCreateBoard = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setBoardName('');
    setInvitees(['']);
  };

  const handleAcceptBoard = async () => {
    // Aquí puedes agregar la lógica para aceptar la creación del board
    // Por ejemplo, enviar los datos al servidor
    alert('Board creado con éxito');
    const newObjet = {
      boardName,
      invitees
    }
    console.log( newObjet)
    try {
      const response = await axios.post('http://localhost:3000/board', newObjet);
/*       setData(response.data); */
      navigate('/app');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Mostrar mensaje de error al usuario
      } else {
        console.error('Error fetching data:', error);
      }
    }
   
    setShowForm(false);
    setBoardName('');
    setInvitees(['']);
  };

  const responseMessage = async (responseData) => {
};


  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <button className={styles.createBoardBtn} onClick={handleCreateBoard}>
          Create Board
        </button>
      </div>
      {showForm && (
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <button className={styles.closeFormBtn} onClick={handleCloseForm}>
              X
            </button>
            <label htmlFor="boardName">Board Name:</label>
            <input
              type="text"
              id="boardName"
              className={styles.inputField2}
              value={boardName}
              onChange={handleBoardNameChange}
            />
            <label>Invite People:</label>
            {invitees.map((invitee, index) => (
              <div key={index} className={styles.inputGroup}>
                <input
                  type="text"
                  className={styles.inputField}
                  value={invitee}
                  onChange={(event) => handleInviteeChange(index, event)}
                />
                <button
                  type="button"
                  className={styles.removeInviteeBtn}
                  onClick={() => handleRemoveInvitee(index)}
                >
                  X
                </button>
              </div>
            ))}
            <div className={styles.addButton2}>
              <button type="button" className={styles.addButton} onClick={handleAddInvitee}>
                + Add More People
              </button>
            </div>
            <div className={styles.addButton2}>
              <button type="button" className={styles.acceptButton} onClick={handleAcceptBoard}>
                Accept Board
              </button>
            </div>
          </form>
        </div>
      )}
      <div className={styles.cardGrid}>
        
        
        {/* Puedes agregar más instancias del componente Card según sea necesario */}
      </div>
    </div>
  );
}

export default AdminComponent;
