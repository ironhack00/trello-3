import { Paper } from '@mui/material';
import ListTitle from '../ListTitle/ListTitle';
import TrelloCard from '../TrelloCard/TrelloCard';
import AddCardList from '../AddCardList/AddCardList';
import { Draggable, Droppable } from 'react-beautiful-dnd';

// Define los estilos por separado
const paperStyles = {
  minWidth: '300px',
  maxWidth: '300px',
  backgroundColor: '#ebecf0',
  margin: '0 8px 0 0', // Utilizamos theme.spacing(1) = 8px
};

const TrelloList = ({ list, index }) => {
  /* console.log(list._id, '*********'); */
  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided) => (
        <div 
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Paper sx={paperStyles} {...provided.dragHandleProps}>
            <ListTitle title={list.title} listId={list._id} />
            <Droppable droppableId={list._id}>
              {(provided) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {list.cards && list.cards.map((card, index) => (
                    <TrelloCard card={card} key={card._id} index={index} list={list}/> 
                  ))}
                  {provided.placeholder}
                </div> 
              )}
            </Droppable>
            <AddCardList type='card' listId={list._id} />
          </Paper>
        </div>  
      )}
    </Draggable>
  );
}

export default TrelloList;
