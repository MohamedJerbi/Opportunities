import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

function Lister({ data, updateData, checkedd, updateChecked }) {
  const [checked, setChecked] = React.useState(checkedd);
  const [search, updateSearch] = React.useState(data);
  const [searchText, updateSearchText] = React.useState("");
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    updateChecked(newChecked);
    updateData(newChecked);
  };

  function chunkArray(myArray, chunk_size) {
    var results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }

    return results;
  }
  var b = [];
  search.map(p => b.push(p));
  var chunk = chunkArray(b, 10);
  return (
    <>
      <div style={{ paddingLeft: 30 }}>
        <TextField
          value={searchText}
          onChange={e => {
            const searchData = [];
            data.map(p =>
              p.name.toLowerCase().includes(e.target.value.toLowerCase())
                ? searchData.push(p)
                : null
            );
            updateSearch(searchData);
            updateSearchText(e.target.value);
          }}
          id="standard-basic"
          label="Search"
        />
      </div>
      <div style={{ display: "flex", overflowX: "scroll" }}>
        {chunk.map((prop, k) => (
          <List key={k} dense component="div" role="list">
            {prop.map((value, key) => {
              const labelId = `list-item-${value.id}-label`;

              return (
                <ListItem
                  key={key}
                  role="listitem"
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      color="primary"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    style={{ display: "inline-block", whiteSpace: "nowrap" }}
                    id={labelId}
                    primary={value.name}
                  />
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        ))}
      </div>
    </>
  );
}

export default Lister;
