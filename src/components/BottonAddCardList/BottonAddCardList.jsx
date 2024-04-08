import { Collapse, Paper, InputBase } from '@mui/material';
import { useState } from 'react';


const BottonAddCardList = () => {

    const [title, setTitle]  = useState('')

  return (
    <Paper>
      <InputBase 
      value={title}
      onChange={ e => setTitle(e.target.value) }
      />
    </Paper>
  )
}

export default BottonAddCardList
