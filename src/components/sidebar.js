// https://material-ui.com/components/lists/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import SidebarButton from "./sidebar-button";

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
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Select a data source:
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem>
        <SidebarButton
          title="Prices"
          cptSetter={() => setComponent("Prices")}
        />
      </ListItem>
      <ListItem>
        <SidebarButton
          title="Spreads"
          cptSetter={() => setComponent("Spreads")}
        />
      </ListItem>
      <ListItem>
        <SidebarButton
          title="RTE Generation by Fuel"
          cptSetter={() => setComponent("RTEGenByFuel")}
        />
      </ListItem>

      <ListItem button onClick={handleClick}>
        <ListItemText primary="RTE Gen By Unit" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <SidebarButton
              title="Nuclear"
              cptSetter={() => setComponent("RTEGenByUnitNuclear")}
            />
          </ListItem>

          <ListItem button className={classes.nested}>
            <SidebarButton
              title="Gas"
              cptSetter={() => setComponent("RTEGenByUnitGas")}
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <SidebarButton
              title="Coal"
              cptSetter={() => setComponent("RTEGenByUnitCoal")}
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <SidebarButton
              title="Hydro Reservoir"
              cptSetter={() => setComponent("RTEGenByUnitHydroRes")}
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <SidebarButton
              title="Hydro Run-of-River"
              cptSetter={() => setComponent("RTEGenByUnitHydroROR")}
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <SidebarButton
              title="Hydro Pumped Storage"
              cptSetter={() => setComponent("RTEGenByUnitHydroPS")}
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <SidebarButton
              title="Oil"
              cptSetter={() => setComponent("RTEGenByUnitOil")}
            />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
