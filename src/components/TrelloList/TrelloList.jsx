import { Paper } from '@mui/material';
import ListTitle from '../ListTitle/ListTitle';
import TrelloCard from '../TrelloCard/TrelloCard';


const TrelloList = () => {
  return (
    <Paper square={false}>
        <ListTitle/>
        <TrelloCard/> 
    </Paper>
  )
}

export default TrelloList
