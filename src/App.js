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

const API_BASE_URL = "http://localhost:3000";

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

    if (type === 'list') {
      const newListIds = Array.from(data.listIds);
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      try {
        await axios.put(`${API_BASE_URL}/board/${boardId}/reorder-lists`, { newListIds });
        setData({ ...data, listIds: newListIds });
      } catch (error) {
        console.error("Error reordering lists:", error);
      }
      return;
    }

    const sourceList = data.lists.find(list => list._id === source.droppableId);
    const destinationList = data.lists.find(list => list._id === destination.droppableId);
    const draggedCard = sourceList.cards.find(card => card.id === draggableId);

    if (source.droppableId === destination.droppableId) {
      const newCards = Array.from(sourceList.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, draggedCard);
      try {
        await axios.put(`${API_BASE_URL}/board/${boardId}/list/${sourceList._id}/reorder-cards`, { cards: newCards });
        setData({
          ...data,
          lists: data.lists.map(list => list._id === sourceList._id ? { ...list, cards: newCards } : list)
        });
      } catch (error) {
        console.error("Error reordering cards within the same list:", error);
      }
    } else {
      const sourceCards = Array.from(sourceList.cards);
      sourceCards.splice(source.index, 1);
      const destinationCards = Array.from(destinationList.cards);
      destinationCards.splice(destination.index, 0, draggedCard);
      try {
        await axios.put(`${API_BASE_URL}/board/${boardId}/move-card`, {
          sourceListId: sourceList._id,
          destinationListId: destinationList._id,
          cards: { sourceCards, destinationCards }
        });
        setData({
          ...data,
          lists: data.lists.map(list =>
            list._id === sourceList._id
              ? { ...list, cards: sourceCards }
              : list._id === destinationList._id
                ? { ...list, cards: destinationCards }
                : list
          )
        });
      } catch (error) {
        console.error("Error moving card from one list to another:", error);
      }
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
