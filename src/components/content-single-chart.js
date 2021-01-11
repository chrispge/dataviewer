import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default function Content(props) {
  const { title, form, display } = props;
  return (
    <Grid container>
      <Grid item xs={12} className="title-grid">
        <Typography variant="h6">{title}</Typography>
        {form ? form : null}
        <Divider />
      </Grid>
    <Grid item xs={10} className="content-grid" justify="center" >
      {display}
    </Grid>
    </Grid>
  );
}
