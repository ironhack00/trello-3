import TrelloList from "./components/TrelloList/TrelloList"
import { CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import img from './img/clement-proust-m3StSUrsi3I-unsplash.jpg'
import AddCardList from "./components/AddCardList/AddCardList";
import mockData from './mockData.js';
import { useState } from "react";
import ContextAPI from './ContextAPI.js';
import shortid from 'shortid';

const App = () => {

  const classes = useStyles();
  const [ data, setData ] = useState(mockData)
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
    console.log(lis.cards, ' no pasa nada')
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
    console.log(newList)
    setData({
      ...data,
      lists:{
        ...data.lists,
        [idGenerate]: newList
      },
      listIds: [ ...data.listIds, idGenerate ]
    })
  };

  return (
    <ContextAPI.Provider value={{upDateListTitle, addCard, addList}}>
    <div className={classes.root}>
      <div className={classes.root2}></div>
      <div className={classes.container}>
        <CssBaseline />
        { 
          data.listIds.map( listID =>{
            const lista = data.lists[listID]
           /*  console.log(lista) */
            return(
              <TrelloList list={lista} key={listID}/>
            )
          } )
        }
        <div>
        <AddCardList type='list'/>
        </div>
      </div>
      
    </div>
    </ContextAPI.Provider>
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