import { Button, Paper, InputBase } from '@mui/material';
import { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { MoreHoriz } from '@mui/icons-material';
import ContextAPI from '../../ContextAPI';





const BottonAddCardList = ({ type, setOpen, listId }) => {
  const [title, setTitle] = useState('');
  const classes = useStyles();
  const { addCard, addList } = useContext(ContextAPI);

  const handleAdd = () => {
    /* console.log(listId, title) */
    if(title !== ''){
      if (type === 'card') {
        /* const listIDCapitalized =
          listId.slice(0, 2) + listId.charAt(2).toUpperCase() + listId.slice(3); */
        addCard(listId, title);
      } else {
        addList(title);
      }
    }  
      setTitle('');
      setOpen(false);
  };

  const handleCancel = () => {
    setTitle('');
    setOpen(false);
  };

  return (
    <>
      <Paper className={classes.card}>
        <InputBase
          multiline
          className={classes.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            type === 'card'
              ? 'Enter a text for this card...'
              : 'Enter list title '
          }
        />
      </Paper>
      <div className={classes.confirm}>
        <div className={classes.options}>
          {type === 'card' ? (
            <Button sx={btnconfirm} onClick={handleAdd}>
              Add Card
            </Button>
          ) : (
            <Button onClick={handleAdd} sx={btnconfirm}>
              Add List
            </Button>
          )}

          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </div>
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </div>
    </>
  );
};

export default BottonAddCardList;

const useStyles = makeStyles(() => ({
  input: {
    margin: '8px',
    boxSizing: 'border-box',
    width: '300px'
},
  card:{
    /* marginRight: '8px', */
    paddingBottom: '32px',
    maxWidth: '100%'
  },
  confirm:{
    marginTop: '8px',
    display: 'flex',
  },
  options:{
    flexGrow: '1'
  }
}));

const btnconfirm = {
  background: '#5aac44',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(90, 172, 68, 0.7)'
  }
};