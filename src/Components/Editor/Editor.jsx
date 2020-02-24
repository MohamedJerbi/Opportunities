import React from "react";
import ShowList from "../Selectors/ShowList";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  backgrounds,
  nationalities,
  skills,
  languages,
  measure_of_impacts
} from "../Selectors/items";
import "./Editor.css";
export default function Editor({ updateData, data, handleClose }) {
  const [title, setTitle] = React.useState(data.title ? data.title : "");
  const [description, setDescription] = React.useState(
    data.description ? data.description : ""
  );
  const [duration, setDuration] = React.useState(
    data.duration ? data.duration : ""
  );
  const [xlocations, setLocation] = React.useState(data.nationalities);
  const [xbackgrounds, setBackgrounds] = React.useState(data.backgrounds);
  const [xskills, setSkills] = React.useState(data.skills);
  const [xlanguages, setLanguages] = React.useState(data.languages);
  const [xmeasure_of_impacts, setMeasurOfImpacts] = React.useState(
    data.measure_of_impacts
  );

  const updateLocation = value => {
    const v = [];
    value.map(p => {
      p.option = "preferred";
      p.level = 0;
      v.push(p);
    });
    setLocation(v);
  };
  const updateBackground = value => {
    const v = [];
    value.map(p => {
      p.option = "preferred";
      p.level = 0;
      v.push(p);
    });

    setBackgrounds(v);
  };
  const updateSkill = value => {
    const v = [];
    value.map(p => {
      p.option = "preferred";
      p.level = 0;
      v.push(p);
    });
    setSkills(v);
  };
  const updateLanguage = value => {
    const v = [];
    value.map(p => {
      p.option = "preferred";
      p.level = 0;
      v.push(p);
    });
    setLanguages(v);
  };
  const updateImpact = value => {
    const v = [];
    value.map(p => {
      p.option = "preferred";
      p.level = 0;
      v.push(p);
    });
    setMeasurOfImpacts(v);
  };

  return (
    <div className="div">
      <h2 style={{ padding: 0, fontFamily: "Lato" }}>Opportunities Updater</h2>
      <h4 style={{ fontFamily: "Lato", color: "#52565e" }}>
        Opportunity ID: {data.id}
      </h4>
      <TextField
        value={title}
        onChange={e => setTitle(e.target.value)}
        label="Title"
        size="large"
      />
      <TextField
        value={description}
        onChange={e => setDescription(e.target.value)}
        label="Description"
      />
      <TextField
        value={duration}
        onChange={e => setDuration(e.target.value)}
        label="Duration"
      />

      <ShowList
        title="Nationalities"
        updateData={updateLocation}
        data={nationalities}
      />

      <ShowList
        title="Backgrounds"
        updateData={updateBackground}
        data={backgrounds}
      />

      <ShowList title="Skills" updateData={updateSkill} data={skills} />

      <ShowList
        title="Languages"
        updateData={updateLanguage}
        data={languages}
      />
      <ShowList
        title="Measure of impacts"
        updateData={updateImpact}
        data={measure_of_impacts}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 20
        }}
      >
        <Button
          onClick={() =>
            title &&
            description &&
            duration &&
            xbackgrounds.length &&
            xlanguages.length &&
            xlocations.length &&
            xmeasure_of_impacts.length &&
            xskills.length
              ? updateData(
                  data.id,
                  title,
                  description,
                  duration,
                  xlocations,
                  xskills,
                  xbackgrounds,
                  xlanguages,
                  xmeasure_of_impacts
                )
              : alert("All Fields Are Required")
          }
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => {
            setTitle(data.title ? data.title : "");
            setDescription(data.description ? data.description : "");
            setDuration(data.duration ? data.duration : "");
            setLanguages(data.languages);
            setBackgrounds(data.backgrounds);
            setLocation(data.nationalities);
            setMeasurOfImpacts(data.measure_of_impacts);
            setSkills(data.skills);
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
