import { Paper } from '@mui/material';


const trelloCard ={
  padding: '8px 8px 8px 16px',
  margin: '8px 8px 8px 8px'
}

const TrelloCard = ({ card }) => {
  /* console.log(card, 'trello card'); */

  return (
    <Paper sx={trelloCard}>
      {card.title} {/* Mostrar el título de la tarjeta */}
    </Paper>
  );
}

export default TrelloCard
