import React from "react";
//@material ui imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//components
import Programs from "../Selectors/Programs";
import ShowList from "../Selectors/ShowList";
import {
  backgrounds,
  nationalities,
  skills,
  languages
} from "../Selectors/items";
import TextField from "@material-ui/core/TextField";
function Navigation({ updateBackgrounds, updateSearch, data }) {
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
          <p />
          <Programs />
          <ShowList
            title="Locations"
            updateData={updateBackgrounds}
            data={nationalities}
          />
          <ShowList
            title="Backgrounds"
            updateData={updateBackgrounds}
            data={backgrounds}
          />
          <ShowList
            title="Skills"
            updateData={updateBackgrounds}
            data={skills}
          />
          <ShowList
            title="Languages"
            updateData={updateBackgrounds}
            data={languages}
          />
          {/*making sure the the filters list is in aligned on the left using a p element wth paddingleft trick*/}
          <p style={{ paddingLeft: "40%" }} />
          <TextField
            value={data}
            onChange={e => updateSearch(e.target.value)}
            id="standard-basic"
            label="Search"
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Navigation;
