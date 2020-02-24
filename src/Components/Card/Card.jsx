import React from "react";
import "./card.css";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Editor from "../Editor/Editor";
const useStyles = makeStyles({
  root: {
    minWidth: "75vw",
    borderRadius: 0,
    minHeight: 159,
    whiteSpace: "nowrap"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 28,
    fontFamily: "Lato"
  }
});

const MyCard = ({
  idd,
  title,
  description,
  applicants_count,
  location,
  date,
  company,
  duration,
  product,
  letter,
  oppUrl,
  updateData,
  fetchOpp,
  data
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false);
  let image_url;
  if (product === "GT")
    image_url = "https://cdn-expa.aiesec.org/gis-img/gt_default.png";
  else if (product === "GE")
    image_url = "https://cdn-expa.aiesec.org/gis-img/ge_default.png";
  else image_url = "https://cdn-expa.aiesec.org/gis-img/gv_default.png";

  function handleClose() {
    setAnchorEl(false);
  }
  console.log(data);
  return (
    <div style={{ position: "relative" }}>
      {anchorEl ? (
        <div className="popup">
          <div className="popcontent">
            <Editor
              handleClose={handleClose}
              data={data}
              updateData={updateData}
            />
          </div>
        </div>
      ) : null}
      <div
        className="card"
        onClick={async event => {
          await fetchOpp(idd);
          setAnchorEl(!anchorEl);
        }}
      >
        <img
          width="auto"
          style={{ height: "20vh", minHeight: 159, whiteSpace: "nowrap" }}
          src={image_url}
          alt="cover"
        />
        <Card className={classes.root} style={{ height: "19vh" }}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ color: "#454f48", fontFamily: "Lato" }}
              >
                <img
                  className="img"
                  width="30px"
                  style={{ height: "30px", whiteSpace: "nowrap" }}
                  src={letter}
                  alt="letter"
                />{" "}
                {title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {location ? `${location} * ` : null} {date.substring(0, 10)} *{" "}
                {duration % 7} Weeks
              </Typography>
              {!company ? <br></br> : null}
              <Typography className="text" variant="body2" component="p">
                {company}
              </Typography>
              <Typography
                className="text"
                variant="body2"
                component="p"
                style={{ textAlign: "right", color: "#52565e" }}
              >
                Applicants {applicants_count}{" "}
                {applicants_count === 0 ? (
                  <span
                    style={{ color: "#26b56d", textDecoration: "underline" }}
                  >
                    Be the First to Apply!
                  </span>
                ) : null}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};
export default MyCard;
