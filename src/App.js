import TrelloList from "./components/TrelloList/TrelloList";
import { CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import img from './img/clement-proust-m3StSUrsi3I-unsplash.jpg';
import AddCardList from "./components/AddCardList/AddCardList";
import { useState, useEffect } from "react";
import ContextAPI from './ContextAPI.js';
import shortid from 'shortid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = "https://trello-back-c18a.onrender.com";

const App = () => {
  const { boardId } = useParams();

  const classes = useStyles();
  const [data, setData] = useState({ lists: [], listIds: [] });
  const [aprob, setAprob] = useState(true);

  useEffect(() => {
    fetchData(boardId);
  }, [boardId, data]);

  const fetchData = async (boardId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/board/${boardId}`);
      const responseData = response.data;
      setData({
        lists: responseData.board.lists || [],
        listIds: responseData.board.listIds || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const upDateListTitle = async (newTitle, listId) => {
    /* console.log(newTitle, listId, ' <--------') */
    try {
      // Realiza una solicitud PUT al servidor para actualizar el título de la lista
      await axios.put(`${API_BASE_URL}/board/${boardId}/list/${listId}`, { title: newTitle });
      // Actualiza el estado local con el nuevo título
      const updatedLists = data.lists.map((list) =>
        list._id === listId ? { ...list, title: newTitle } : list
      );
      setData({ ...data, lists: updatedLists });
    } catch (error) {
      console.error("Error updating list title:", error);
    }
  };

  const addCard = async (listId, title) => {
    
    try {
      const response = await axios.post(`${API_BASE_URL}/board/${boardId}/list/${listId}/card`, { title });
      const newCard = response.data;
      console.log(data.lists)
      const updatedLists = data.lists.cards[0].map((list) =>
        list._id === listId ? { ...list, cards: [...list.cards, newCard] } : list
      );
  
      setData({ ...data, lists: updatedLists });
      console.log(data.lists)
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };
  

  const addList = async (title) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/board/${boardId}/list`, { title });
      const newList = response.data.list;
      setData({ ...data, lists: [...data.lists, newList], listIds: [...data.listIds, newList._id] });
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;
  
    if (!destination) return;
  
    try {
      if (type === 'list') {
        // Reordenar las listas
        const newListOrder = Array.from(data.lists);
        const movedList = newListOrder.splice(source.index, 1)[0];
        newListOrder.splice(destination.index, 0, movedList);
  
        await axios.put(`${API_BASE_URL}/board/${boardId}/reorder-lists`, { newListOrder });
        setData({ ...data, lists: newListOrder });
      } else {
        const sourceListIndex = data.lists.findIndex(list => list._id === source.droppableId);
        const destinationListIndex = data.lists.findIndex(list => list._id === destination.droppableId);
  
        const sourceList = data.lists[sourceListIndex];
        const destinationList = data.lists[destinationListIndex];
  
        const sourceCards = Array.from(sourceList.cards);
        const destinationCards = Array.from(destinationList.cards);
  
        const movedCardIndex = sourceCards.findIndex(card => card.id === draggableId);
        const movedCard = sourceCards.splice(movedCardIndex, 1)[0];
  
        destinationCards.splice(destination.index, 0, movedCard);
        // Actualizar las listas solo si la tarjeta se mueve a una lista diferente
        if (sourceList._id !== destinationList._id) {
         console.log(sourceList._id,
          destinationList._id,
          draggableId,
          destination.index)
          await axios.put(`${API_BASE_URL}/board/${boardId}/move-card`, {
            sourceListId: sourceList._id,
            destinationListId: destinationList._id,
            draggableId,
            destinationIndex: destination.index
          });
          setData({
            ...data,
            lists: data.lists.map((list, index) =>
              index === sourceListIndex ? { ...list, cards: sourceCards } :
              index === destinationListIndex ? { ...list, cards: destinationCards } :
              list
            )
          });
        } else {
          // Si la tarjeta se mueve dentro de la misma lista, solo actualiza el orden de las tarjetas
          await axios.put(`${API_BASE_URL}/board/${boardId}/move-card`, {
            sourceListId: sourceList._id,
            destinationListId: destinationList._id,
            draggableId,
            destinationIndex: destination.index
          });
          setData({
            ...data,
            lists: data.lists.map((list, index) =>
              index === sourceListIndex ? { ...list, cards: sourceCards } :
              index === destinationListIndex ? { ...list, cards: destinationCards } :
              list
            )
          });
        }
      }
    } catch (error) {
      console.error("Error moving or reordering cards:", error);
    }
  };
  
  

  
  const Delete = async (listId) => {
    try {
      // Realiza una solicitud DELETE al servidor para eliminar la lista
      await axios.delete(`${API_BASE_URL}/board/${boardId}/list/${listId}`);
      
      // Actualiza el estado local filtrando la lista eliminada
      const updatedLists = data.lists.filter(list => list._id !== listId);
      const updatedListIds = data.listIds.filter(id => id !== listId);
      setData({ ...data, lists: updatedLists, listIds: updatedListIds });
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const handleChangeTitle = async (newTitle, cardId, listId) => {
    console.log('--------, ', newTitle, cardId, listId)
    try {
      const response = await axios.put(`${API_BASE_URL}/board/${boardId}/list/${listId}/card/${cardId}`, { title: newTitle });
      const updatedLists = data.lists.map(list => ({
        ...list,
        cards: list.cards.map(card => (card.id === cardId ? { ...card, title: newTitle } : card))
      }));
      setData({ ...data, lists: updatedLists });
    } catch (error) {
      console.error("Error updating card title:", error);
    }
  };
  
  const deleteCard = async (cardId, listId) => {
    console.log(cardId, ' esto es card ID')
    const updatedLists = data.lists.map(list => ({
      ...list,
      cards: list.cards.filter(card => card.id !== cardId)
    }));
    setData({ ...data, lists: updatedLists });
    try {
      await axios.delete(`${API_BASE_URL}/board/${boardId}/list/${listId}/card/${cardId}`);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <>
      {aprob && (
        <ContextAPI.Provider value={{ upDateListTitle, addCard, addList, Delete, handleChangeTitle, deleteCard }}>
          <div className={classes.root}>
            <div className={classes.root2}></div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="12345" type="list" direction="horizontal">
                {(provided) => (
                  <div className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
                    <CssBaseline />
                    {data.lists.map((list, index) => (
                      <TrelloList list={list} key={list._id} index={index} />
                    ))}
                    <div>
                      <AddCardList type="list" />
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </ContextAPI.Provider>
      )}
    </>
  );
};

export default App;

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px'
  },
  root2: {
    backgroundImage: `url(${img})`,
    width: '100vw',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed',
    zIndex: '-2',
    height: '100vh',
    left: '0',
    top: '0'
  },
  container: {
    display: 'flex',
  }
}));
