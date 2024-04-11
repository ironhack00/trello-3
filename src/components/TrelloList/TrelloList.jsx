import { Paper } from '@mui/material';
import ListTitle from '../ListTitle/ListTitle';
import TrelloCard from '../TrelloCard/TrelloCard';
import AddCardList from '../AddCardList/AddCardList';


// Define los estilos por separado

const paperStyles = {
  minWidth: '300px',
  maxWidth: '300px',
  backgroundColor: '#ebecf0',
  margin: '0 8px 0 0', // Utilizamos theme.spacing(1) = 8px
};

const TrelloList = ({ list }) => {
  return (
    <Paper sx={paperStyles}>
      <ListTitle title={list.title} listId={list.id}/>
      {list.cards && list.cards.map(card => (
        <TrelloCard card={card} key={card.id} /> 
      ))}
      <AddCardList type='card' listId={list.id}/>
    </Paper>
  );
}


export default TrelloList;
