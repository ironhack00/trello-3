import { Box, Typography, InputBase } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from "react";
import { width } from "@mui/system";

const title = {
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

const ListTitle = ({title, listId}) => {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(true);
  const [newTitle, setNewTitle] = useState(title);

  const handleInputClick = () => {
    setClicked(true); // Se establece en true cuando se hace clic en el input
  };

  const handleInputBlur = () => {
    setClicked(false); // Se establece en false cuando el input pierde el foco
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
          ...(clicked && { // Si se hizo clic, agregamos los estilos adicionales
            backgroundColor: '#ddd',
            borderRadius: '4px',
            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
            width: '95%'
          })
        }}
        onClick={handleInputClick} // Maneja el clic en el input
        onBlur={handleInputBlur} // Maneja el evento onBlur para restablecer el estado
      />
      :
      <Box sx={title}>
      <Typography  sx={titleText}>
        let's start the list of components
      </Typography>
      <MoreHorizIcon sx={titl}/>
    </Box>
    }
    </>
  );
}

export default ListTitle;
