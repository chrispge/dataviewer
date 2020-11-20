import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default function Content(props) {
  const { title, form, display } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">{title}</Typography>
        {form}
        <Divider></Divider>
      </Grid>
      {display}
    </Grid>
  );
}
