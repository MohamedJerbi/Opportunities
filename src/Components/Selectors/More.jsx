import React, { useState } from "react";
import "./styles.css";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
function More() {
  const [selected, setSelected] = useState({
    color: "#caccd1",
    bcolor: "#fff"
  });
    const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
  <>
    <button
      className="selector"
      style={{
        color: selected.color,
        backgroundColor: selected.bcolor,
        textDecoration: "none"
      }}
      href="#"
      onClick={(event) => {
	  setAnchorEl(event.currentTarget);
        setSelected({ color: "#fff", bcolor: selected.bcolor });
        setSelected({ bcolor: "#52565e", color: selected.color });
      }}
    >
      More Filters
    </button>
	 <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={()=>setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography >The content of the Popover.</Typography>
      </Popover>
	  </>
  );
}

export default More;
