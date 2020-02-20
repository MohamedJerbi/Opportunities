import React, { useState } from "react";
import "./styles.css";
function Skills() {
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
      Skills
    </button>
  );
}

export default Skills;
