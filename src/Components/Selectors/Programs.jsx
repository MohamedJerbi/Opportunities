import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import "./styles.css";
import MenuItem from "@material-ui/core/MenuItem";
function Programs({ updateData }) {
  const [product, setProduct] = React.useState("");

  const [selected, setSelected] = useState({
    color: "#caccd1",
    bcolor: "#fff"
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleChange = event => {
    setProduct(event.target.value);
  };
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
        onClick={event => {
          setAnchorEl(event.currentTarget);
        }}
      >
        Programs
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <MenuItem value={1}>Global Volunteer</MenuItem>
        <MenuItem value={2}> Global Entrepeneur</MenuItem>
        <MenuItem value={3}>Global Talent</MenuItem>
      </Popover>
    </>
  );
}

export default Programs;
