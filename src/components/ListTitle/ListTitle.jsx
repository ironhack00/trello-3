import { Box, Typography } from "@mui/material";
import { display, fontSize, fontWeight, margin, typography } from "@mui/system";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Bolt } from "@mui/icons-material";

const title = {
  display: 'flex',
  margin: '8px',
 
};

const titleText ={
  fontSize: '1.2rem',
  flexGrow: 1,
  fontWeight: 'bold'
}

const ListTitle = () => {
  return (
    <Box sx={title}>
      <Typography  sx={titleText}>
        let's start the list of components
      </Typography>
      <MoreHorizIcon/>
    </Box>
  );
}

export default ListTitle;
