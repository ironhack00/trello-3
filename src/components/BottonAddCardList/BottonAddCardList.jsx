import { Button, Paper, InputBase } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { MoreHoriz } from '@mui/icons-material';





const BottonAddCardList = () => {

    const [title, setTitle]  = useState('')
    const classes = useStyles();

  return (
    <>
      <Paper className={classes.card} >
        <InputBase 
         multiline
        className={classes.input}
        value={title}
        onChange={ e => setTitle(e.target.value) }
        placeholder='Enter a title for this card...'
        /* inputProps={{className: classes.input}} */
        />
      </Paper>
      <div className={classes.confirm}>
        <div className={classes.options}>
          <Button sx={btnconfirm}> Add Card </Button>
          <IconButton>
            <CloseIcon/>
          </IconButton>
        </div>
        <IconButton>
          <MoreHoriz/>
        </IconButton>
      </div>
    </>
  )
}

export default BottonAddCardList

const useStyles = makeStyles(() => ({
  input: {
    margin: '8px',
    boxSizing: 'border-box',
    width: '300px'
},
  card:{
    marginRight: '8px',
    paddingBottom: '32px',
    maxWidth: '280px'
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