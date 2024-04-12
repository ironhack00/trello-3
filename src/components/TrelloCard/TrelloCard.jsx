import { Paper } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';


const trelloCard ={
  padding: '8px 8px 8px 16px',
  margin: '8px 8px 8px 8px'
}

const TrelloCard = ({ card, index }) => {
  /* console.log(card, 'trello card'); */

  return (
    <Draggable draggableId={card.id} index={index}>
      {
        (provided) => (
          <div 
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          >
            <Paper sx={trelloCard}>
              {card.title} {/* Mostrar el título de la tarjeta */}
            </Paper>
          </div>
        )
      }
    </Draggable>
  );
}

export default TrelloCard
