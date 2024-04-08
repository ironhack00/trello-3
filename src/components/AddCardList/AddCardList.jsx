import { Collapse, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import ButtonAddCardList from '../BottonAddCardList/BottonAddCardList';
import { makeStyles } from '@mui/styles';
import { fade } from '@mui/material'

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px 8px 8px 16px',
    margin: '8px',
  },
  addCardListTextStyle: {
    padding: '8px',
    margin: '8px',
    background: '#ebecf0',
    transition: 'background 0.3s', // Agregamos una transición suave
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)' // Cambiamos el color de fondo al hacer hover
    }
  },
}));

const AddCardList = () => {
  const [isAddCardListOpen, setIsAddCardListOpen] = useState(true);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={isAddCardListOpen}>
        <ButtonAddCardList />
      </Collapse>
      <Collapse in={!isAddCardListOpen}>
        <Paper className={classes.addCardListTextStyle}>
          <Typography variant="body1">
            + Add another card...
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
};

export default AddCardList;
