import TrelloList from "./components/TrelloList/TrelloList"
import { CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import img from './img/clement-proust-m3StSUrsi3I-unsplash.jpg'
import BottonAddCardList from "./components/BottonAddCardList/BottonAddCardList";

const App = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.root2}></div>
      <div className={classes.container}>
        <CssBaseline />
        <TrelloList/>
        <TrelloList/>
        <TrelloList/>
        <TrelloList/>
        <TrelloList/>
        <div>
        <BottonAddCardList/>
        </div>
      </div>
      
    </div>
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