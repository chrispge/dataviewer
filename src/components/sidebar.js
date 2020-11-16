// https://material-ui.com/components/lists/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Sidebar(props) {
  const setComponent = props.setComponent;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Select a data source:
      //   </ListSubheader>
      // }
      className={classes.root}
    >
      <ListItem>
        <ListItem button onClick={setComponent("Prices")}>
          <ListItemText primary="Prices" />
        </ListItem>
      </ListItem>
      <ListItem>
        <ListItem button onClick={setComponent("Spreads")}>
          <ListItemText primary="Spreads" />
        </ListItem>
      </ListItem>
      <ListItem>
        <ListItem button onClick={setComponent("GenByFuel")}>
          <ListItemText primary="RTE Gen by Fuel" />
        </ListItem>
      </ListItem>

      <ListItem button onClick={handleClick}>
        <ListItemText primary="RTE Gen By Unit" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={setComponent("RTEGenByUnitNuclear")}
          >
            <ListItemText primary="Nuclear" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={setComponent("RTEGenByUnitGas")}
          >
            <ListItemText primary="Gas" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={setComponent("RTEGenByUnitCoal")}
          >
            <ListItemText primary="Coal" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={setComponent("RTEGenByUnitHydroRes")}
          >
            <ListItemText primary="Hydro Reservoir" />
          </ListItem>
          <ListItem
            butto
            className={classes.nested}
            n
            onClick={setComponent("RTEGenByUnitHydroROR")}
          >
            <ListItemText primary="Hydro Run-of-River" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={setComponent("RTEGenByUnitHydroPS")}
          >
            <ListItemText primary="Hydro Pumped Storage" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={setComponent("RTEGenByUnitOil")}
          >
            <ListItemText primary="Oil" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
