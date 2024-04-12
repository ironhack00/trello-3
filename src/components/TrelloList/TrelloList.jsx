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
  return (
    <Draggable draggableId={list.id} index={index}>
      {
        (provided) => (
            <div 
            {...provided.draggableProps}
            ref={provided.innerRef}
            >
              <Paper sx={paperStyles} {...provided.dragHandleProps}>
                <ListTitle title={list.title} listId={list.id}/>
                <Droppable droppableId={list.id}>
                  {
                    (provided) =>(
                      <div 
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      >
                        {list.cards && list.cards.map((card, index) => (
                          <TrelloCard card={card} key={card.id} index={index}/> 
                         ))}
                         {provided.placeholder}
                      </div> 
                    )
                  }

                </Droppable>
                <AddCardList type='card' listId={list.id}/>
              </Paper>
            </div>  
        )
      }
      
    </Draggable>
  );
}


export default TrelloList;
