import { Paper } from '@mui/material';
import ListTitle from '../ListTitle/ListTitle';
import TrelloCard from '../TrelloCard/TrelloCard';
import AddCardList from '../AddCardList/AddCardList';

// Define los estilos por separado

const paperStyles = {
  width: '300px',
  backgroundColor: '#ebecf0',
  margin: '8px', // Utilizamos theme.spacing(1) = 8px
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
