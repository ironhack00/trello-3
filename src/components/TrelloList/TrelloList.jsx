import { Paper } from '@mui/material';
import ListTitle from '../ListTitle/ListTitle';
import TrelloCard from '../TrelloCard/TrelloCard';
import AddCardList from '../AddCardList/AddCardList';
import { maxHeight, maxWidth, minWidth } from '@mui/system';

// Define los estilos por separado

const paperStyles = {
  minWidth: '300px',
  maxWidth: '300px',
  backgroundColor: '#ebecf0',
  margin: '0 8px 0 0', // Utilizamos theme.spacing(1) = 8px
};

const TrelloList = () => {
  return (
    // Aplica los estilos utilizando el componente Box
      <Paper sx={paperStyles}>
        <ListTitle />
        <TrelloCard />
        <TrelloCard /> 
        <AddCardList />
      </Paper>
  );
}

export default TrelloList;
