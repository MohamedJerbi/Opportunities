import React, { useState } from "react";
import "./styles.css";
function Languages() {
  const [selected, setSelected] = useState({
    color: "#caccd1",
    bcolor: "#fff"
  });
  return (
    <button
      className="selector"
      style={{
        color: selected.color,
        backgroundColor: selected.bcolor,
        textDecoration: "none"
      }}
      href="#"
      onClick={() => {
        setSelected({ color: "#fff", bcolor: selected.bcolor });
        setSelected({ bcolor: "#52565e", color: selected.color });
      }}
    >
      Languages
    </button>
  );
}

export default Languages;
