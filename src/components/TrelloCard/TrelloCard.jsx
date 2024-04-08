import { Paper } from '@mui/material';
import { margin, padding } from '@mui/system';

const trelloCard ={
  padding: '8px 8px 8px 16px',
  margin: '8px 8px 8px 8px'
}

const TrelloCard = () => {
  return (
    <Paper sx={trelloCard}>
      Card
    </Paper>
  )
}

export default TrelloCard
