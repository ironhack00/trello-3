import { Paper, IconButton, Tooltip, Button } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useState,useContext } from "react";
import EditIcon from '@mui/icons-material/Edit';
import InputBase from '@mui/material/InputBase';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import ContextAPI from "../../ContextAPI";


const trelloCard ={
  padding: '8px 8px 8px 16px',
  margin: '8px 8px 8px 8px'
}

const TrelloCard = ({ card, index }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { deleteCard, handleChangeTitle } = useContext(ContextAPI);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleEditConfirm = () => {
    setIsEditing(false);
    handleChangeTitle(newTitle, card.id);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setNewTitle(card.title);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleDeleteConfirmed = () => {
    deleteCard(card.id);
    setShowConfirmation(false);
  };

  const handleDeleteCancelled = () => {
    setShowConfirmation(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.editable-area')) {
      setIsEditing(false);
      setNewTitle(card.title);
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div 
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper sx={trelloCard}>
            {isEditing ? (
              <div className="editable-area">
                <InputBase
                  fullWidth
                  multiline
                  value={newTitle}
                  onChange={handleChange}
                  autoFocus
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <IconButton
                    aria-label="confirm"
                    onClick={handleEditConfirm}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <Tooltip title="Delete card" arrow>
                    <IconButton
                      aria-label="delete"
                      onClick={handleDelete}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
                {showConfirmation && (
                  <Alert severity="warning" onClose={handleDeleteCancelled}>
                    <AlertTitle>Confirm Deletion</AlertTitle>
                    Are you sure you want to delete this card?
                    <br />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleDeleteCancelled} variant="outlined" color="primary">
              Cancel
            </Button>
                      <Button onClick={handleDeleteConfirmed} variant="contained" color="error" sx={{ marginLeft: "8px" }}>
              Delete
            </Button>
                    </div>
                  </Alert>
                )}
              </div>
            ) : (
              <div onDoubleClick={handleDoubleClick}>
                {card.title}
              </div>
            )}
          </Paper>
          <div onClick={handleOutsideClick} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: -1 }} />
        </div>
      )}
    </Draggable>
  );
}

export default TrelloCard;
