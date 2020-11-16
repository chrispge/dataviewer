import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SidebarButton(props) {
  const classes = useStyles();
  const { title, cptSetter } = props;
  return (
    <Button button variant="contained" onClick={() => cptSetter()}>
      {title}
    </Button>
  );
}

export default SidebarButton;
