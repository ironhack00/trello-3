import { Collapse, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import ButtonAddCardList from '../BottonAddCardList/BottonAddCardList';
import { makeStyles } from '@mui/styles';
import { fontWeight, width } from '@mui/system';
import { Padding } from '@mui/icons-material';


const useStyles = makeStyles(() => ({
  root: {
    /* padding: '8px 0px 0px 8px', */
    margin: '8px',
  },
  addCardListTextStyle: {
    padding: '8px',
    margin: '0 3px 8px 0',
    background: '#ebecf0',
    transition: 'background 0.3s', // Agregamos una transición suave
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)' // Cambiamos el color de fondo al hacer hover
    }
  },
}));

const btn = {
  fontWeight : '550',
}

const AddCardList = ({type, listId}) => {
  const [isAddCardListOpen, setIsAddCardListOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={isAddCardListOpen}>
        <ButtonAddCardList type={type} listId={listId} setOpen={ setIsAddCardListOpen } />
      </Collapse>
      <Collapse in={!isAddCardListOpen}>
        <Paper onClick={ ()=> setIsAddCardListOpen(true) } className={classes.addCardListTextStyle}>
          <Typography sx={btn} variant="body1">
            {
              type === 'card' ? '+ Add another card...' : '+ Add another List...'
            }
            
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
};

export default AddCardList;
