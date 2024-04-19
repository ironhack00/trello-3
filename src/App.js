import TrelloList from "./components/TrelloList/TrelloList"
import { CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import img from './img/clement-proust-m3StSUrsi3I-unsplash.jpg'
import AddCardList from "./components/AddCardList/AddCardList";
import mockData from './mockData.js';
import { useState } from "react";
import ContextAPI from './ContextAPI.js';
import shortid from 'shortid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const App = () => {

  const classes = useStyles();
  const [ data, setData ] = useState(mockData);
  const [ aprob, setAprob ] = useState(true);
  /* console.log(data,' data') */

  const upDateListTitle = (newTitle, listId)=>{
    const lis = data.lists[listId];
    lis.title = newTitle;
    setData({
      ...data,
      lists:{
        ...data.lists,
        [listId] : lis
      }
    })
    /* console.log(lis) */
  }

  const addCard = (idList, title) =>{
    const lis = data.lists[idList];
    /* console.log(title) */
    
    const newCard = {};
    newCard.id = shortid.generate();
    newCard.title = title;
    lis.cards.push(newCard)
    /* console.log(lis.cards, ' no pasa nada') */
    setData({
      ...data,
      lists:{
        ...data.lists,
        [idList] : lis
      }
    })
  };

  const addList = (title) =>{
    const idGenerate = shortid.generate();
    const newList = {
      id: idGenerate,
      title,
      cards: []
    };
    /* console.log(newList) */
    setData({
      ...data,
      lists:{
        ...data.lists,
        [idGenerate]: newList
      },
      listIds: [ ...data.listIds, idGenerate ]
    })
  };

  const onDragEnd = (result) => {
    const { destination, destination: {droppableId: destdroppableId, index: destIndex}, source, source:{ droppableId: sourcedroppableId, index: sourceIndex } , draggableId, type } = result;
    /* console.table([
      {
        destdroppableId,
        sourcedroppableId,
        draggableId
      },
      {
        type,
        sourceIndex,
        destIndex,
      }
    ]) */
  
    if( !destination ) return
    
    if( type === 'list' ){
      const newListIds = data.listIds
      newListIds.splice(sourceIndex, 1)
      newListIds.splice(destIndex, 0, draggableId)
      return
    } 
  
    const sourceList = data.lists[sourcedroppableId]
    const destinationList = data.lists[destdroppableId]
    const dragginCard = sourceList.cards.filter( card => card.id === draggableId)[0]
  
    if(sourcedroppableId === destdroppableId){
      sourceList.cards.splice(sourceIndex, 1); // Corregir aquí
      destinationList.cards.splice(destIndex, 0, dragginCard); // Corregir aquí
      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id] : destinationList
        }
      })
    }else{
      sourceList.cards.splice(sourceIndex, 1);
      destinationList.cards.splice(destIndex, 0, dragginCard);
      setData({
        ...data,
        [sourceList.id]: sourceList,
        [destinationList.id]: destinationList
      })
    }
  }

  const Delete = (idList) => {
    const filteredLists = Object.fromEntries(
      Object.entries(data.lists).filter(([listId, _]) => listId !== idList)
    );
    const filteredListIds = data.listIds.filter((listId) => listId !== idList);
    setData({
      ...data,
      lists: filteredLists,
      listIds: filteredListIds,
    });
  }

  const handleChangeTitle = (newTitle, cardId) => {
    const updatedData = {
      ...data,
      lists: {
        ...data.lists
      }
    };

    // Buscar la tarjeta con el ID dado y actualizar su título
    for (const listId in updatedData.lists) {
      const list = updatedData.lists[listId];
      const cardToUpdate = list.cards.find(card => card.id === cardId);
      if (cardToUpdate) {
        cardToUpdate.title = newTitle;
        break;
      }
    }

    setData(updatedData);
  };

  const deleteCard = (cardId) => {
    const updatedData = { ...data };
    Object.keys(updatedData.lists).forEach((listId) => {
      updatedData.lists[listId].cards = updatedData.lists[listId].cards.filter(
        (card) => card.id !== cardId
      );
    });
    setData(updatedData);
  };

  return (
    <>
    {
      aprob === true ? <ContextAPI.Provider value={{upDateListTitle, addCard, addList, Delete, handleChangeTitle, deleteCard}}>
      <div className={classes.root}>
        <div className={classes.root2}></div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="12345" type="list" direction="horizontal">
            {
              (provided) =>(
                <div className={classes.container}
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                  <CssBaseline />
                { 
                 data.listIds.map( (listID, index) =>{
                const lista = data.lists[listID]
                return(
                  <TrelloList list={lista} key={listID} index={index}/>
                )
              } )
            }
            <div>
            <AddCardList type='list'/>
            {provided.placeholder}
            </div>
          </div>
              )
            }
          
          </Droppable>
        </DragDropContext>  
      </div>
      </ContextAPI.Provider> : null
    }
    </>
  )
}

export default App

const useStyles = makeStyles(() => ({
root:{
  /* backgroundImage: `url(${img})`,
  backgroundSize: 'cover', */
  /* height: '100vh', */
  /* backgroundPosition: 'center', */
  /* position: 'fixed', */
  /* width: '100vw', */
  /* zIndex: '-2', */
  padding:'8px'
},
root2:{
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
container:{
  display: 'flex',
}
}));