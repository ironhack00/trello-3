import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css'; // Importa los estilos CSS Modules
import Card from '../Card/Card'; // Importa el componente Card
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminComponent = () => {

  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nameboard, setBoardName] = useState('');
  const [invitees, setInvitees] = useState([]);
  const [localStorageData, setLocalStorageData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setLocalStorageData(JSON.parse(storedData));
      
      const fetchBoards = async () => {
        try {
          // Realizar la solicitud GET a la ruta /boards
          const response = await axios.get(`http://localhost:3000/board?userEmail=${JSON.parse(storedData).email}`);
          console.log('holis ',response.data)
          // Actualizar el estado con las tablas (boards) recibidas del backend
          setBoards(response.data.boards);
          /* console.log(response.data.boards); */
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      };
  
      // Llamar a fetchBoards para que se ejecute al cargar el componente
      fetchBoards();
    }
  }, []);
  

  // UseEffect para actualizar la lista de tableros cuando se modifique `boards`
  useEffect(() => {
    // Aquí puedes realizar cualquier acción que necesites al cambiar `boards`
    /* console.log('Boards actualizados:', boards); */
  }, [boards]);

  /* console.log(localStorageData) */

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
      nameboard,
      invitees
    }

    newObjet.userEmail = localStorageData.email;
    console.log(invitees);
    try {
      const response = await axios.post('https://trello-back-c18a.onrender.com/board', newObjet);
      console.log(response.data, ' acaaaaaa')
      /* setData(response.data); */
      // Actualizar la lista de tableros después de crear uno nuevo
      setBoards(prevBoards => [...prevBoards, response.data.board]);
      const response2 = await axios.get(`https://trello-back-c18a.onrender.com/board?userEmail=${localStorageData.email}`);
        console.log(response2.data)
        // Actualizar el estado con las tablas (boards) recibidas del backend
        setBoards(response2.data.boards);
      /* navigate('/app'); */
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

  return (
    <div className={styles.adminContainer2}>
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
              value={nameboard}
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
        {boards.length > 0 && boards.map((board, i) => (
        <Link key={board._id} to={`/board/${board._id}`} className={styles.cardLink}>
          <Card data={board} userEmail={localStorageData.email} />
        </Link>
      ))}
    </div>
    </div>
    </div>
  );
}

export default AdminComponent;
