import { Box, Typography, InputBase, IconButton, Tooltip, Alert, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import ContextAPI from "../../ContextAPI";

const tit = {
  display: "flex",
  alignItems: "center",
  margin: "8px",
};

const titleText = {
  fontSize: "1.2rem",
  flexGrow: 1,
  fontWeight: "bold",
};

const titl = {
  margin: "0 0 0 20px",
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
  const [open, setOpen] = useState(!title);
  const [newTitle, setNewTitle] = useState(title);
  const { upDateListTitle, Delete } = useContext(ContextAPI);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputClick = () => {
    setClicked(true);
    setOpen(true);
  };

  const handleInputBlur = () => {
    setClicked(false);
    setOpen(false);
    upDateListTitle(newTitle, listId);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleDeleteConfirmed = () => {
    setShowConfirmation(false);
    Delete(listId);
  };

  const handleDeleteCancelled = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {open === true ? (
        <InputBase
          value={newTitle}
          multiline
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus={!title}
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
          <Tooltip title="Delete List" arrow>
            <IconButton sx={titl} onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {showConfirmation && (
        <Alert severity="warning" sx={{ marginTop: "8px" }}>
          <Typography variant="body1">Are you sure you want to delete this list?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
            <Button onClick={handleDeleteCancelled} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirmed} variant="contained" color="error" sx={{ marginLeft: "8px" }}>
              Delete
            </Button>
          </Box>
        </Alert>
      )}
    </>
  );
};

export default ListTitle;
