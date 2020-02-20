import React from "react";
//@materialui imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//components
import Location from "../Selectors/Location";
import Programs from "../Selectors/Programs";
import Date from "../Selectors/Date";
import Backgrounds from "../Selectors/Backgrounds";
import Skills from "../Selectors/Skills";
import Languages from "../Selectors/Languages";
import More from "../Selectors/More";

function Navigation({ scroll }) {
  return (
    <React.Fragment>
      <AppBar style={{ backgroundColor: "white" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white"
          }}
        >
          <Programs />
          <Location />
          <Date />
          <Backgrounds />
          <Skills />
          <Languages />
          <More />
		  {/*making sure the the filters list is in aligned on the left using a p element wth paddingleft trick*/}
          <p style={{ paddingLeft: "40%" }} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Navigation;
