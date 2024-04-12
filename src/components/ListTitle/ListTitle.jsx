import { Box, Typography, InputBase } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import ContextAPI from "../../ContextAPI";

const tit = {
  display: "flex",
  margin: "8px",
};

const titleText = {
  fontSize: "1.2rem",
  flexGrow: 1,
  fontWeight: "bold",
};

const titl = {
  margin: "2px 0 0 20px",
};

const input = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  margin: "8px",
  "&:focus": {
    backgroundColor: "#ddd",
    borderRadius: "4px",
    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)",
    width: "95%",
  },
};

const ListTitle = ({ title, listId }) => {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(!title); // Cambiado para desactivar el foco si el título está vacío
  const [newTitle, setNewTitle] = useState(title);
  const { upDateListTitle, Delete } = useContext(ContextAPI);

  const handleInputClick = () => {
    setClicked(true);
    setOpen(true);
  };

  const handleInputBlur = () => {
    setClicked(false);
    setOpen(false);
    upDateListTitle(newTitle, listId);
  };

  return (
    <>
      {open === true ? (
        <InputBase
          value={newTitle}
          multiline
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus={!title} // Cambiado para enfocar solo si el título está vacío
          fullWidth
          sx={{
            ...input,
            ...(clicked && {
              backgroundColor: "#ddd",
              borderRadius: "4px",
              boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)",
              width: "95%",
            }),
          }}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
        />
      ) : (
        <Box sx={tit}>
          <Typography onClick={handleInputClick} sx={titleText}>
            {title}
          </Typography>
          <DeleteIcon sx={titl} onClick={() => Delete(listId)} />
        </Box>
      )}
    </>
  );
};

export default ListTitle;
