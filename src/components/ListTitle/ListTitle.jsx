import { Box, Typography, InputBase } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useContext, useState } from "react";
import ContextAPI from "../../ContextAPI";

const tit = {
  display: 'flex',
  margin: '8px',
};

const titleText = {
  fontSize: '1.2rem',
  flexGrow: 1,
  fontWeight: 'bold'
};

const titl = {
  margin: '0px 0 0 20px',
};

const input = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  margin: '8px',
  '&:focus': {
    backgroundColor: '#ddd',
    borderRadius: '4px',
    boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
    width: '95%'
  }
};

const ListTitle = ({ title, listId }) => {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(true);
  const [newTitle, setNewTitle] = useState(title);
  const {upDateListTitle} = useContext(ContextAPI)

  const handleInputClick = () => {
    setClicked(true);
    setOpen(true);
  };

  const handleInputBlur = () => {
    setClicked(false);
    setOpen(false);
    const listIDCapitalized = listId.slice(0, 2) + listId.charAt(2).toUpperCase() + listId.slice(3);
    upDateListTitle(newTitle, listIDCapitalized)
    /* console.log(listId) */
  };

  return (
    <>
    {
      open === true ? 
      <InputBase
        value={newTitle}
        multiline
        onChange={ e => setNewTitle(e.target.value) }
        autoFocus
        fullWidth
        sx={{
          ...input,
          ...(clicked && {
            backgroundColor: '#ddd',
            borderRadius: '4px',
            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
            width: '95%'
          })
        }}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
      />
      :
      <Box sx={tit}>
          <Typography onClick={handleInputClick} sx={titleText}>
            {title}
          </Typography>
          <MoreHorizIcon sx={titl}/>
      </Box>
    }
    </>
  );
}

export default ListTitle;
