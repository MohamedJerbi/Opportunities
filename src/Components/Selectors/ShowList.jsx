import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Lister from "./Lister";
import "./styles.css";

function ShowList({ updateData, data, title }) {
  const [checked, setChecked] = useState([]);
  function updateChecked(value) {
    if (value.length > 0) {
      setSelected({ color: "#fff", bcolor: selected.bcolor });
      setSelected({ bcolor: "#52565e", color: selected.color });
    } else {
      setSelected({ color: "#caccd1", bcolor: selected.bcolor });
      setSelected({ bcolor: "#fff", color: selected.color });
    }
    setChecked(value);
  }

  const [selected, setSelected] = useState({
    color: "#caccd1",
    bcolor: "#fff"
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        {title}
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
        <Lister
          checkedd={checked}
          updateChecked={updateChecked}
          updateData={updateData}
          data={data}
        />
      </Popover>
    </>
  );
}

export default ShowList;
