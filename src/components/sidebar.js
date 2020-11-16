// https://material-ui.com/components/lists/
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import {
  Route,
  Link,
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";

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

// from https://material-ui.com/guides/composition/#routing-libraries

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Route>
        {({ location }) => (
          <Typography gutterBottom>
            Current route: {location.pathname}
          </Typography>
        )}
      </Route>

      <Paper eleveation={0}>
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
          <ListItemLink to="/prices/" primary="Prices" />
          <ListItemLink to="/spreads/" primary="Spreads" />
          <ListItemLink to="/rte-gen-by-fuel/" primary="RTE Gen By Fuel" />

          {/* <ListItem button>
        <ListItemText primary="RTE Gen By Unit" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Nuclear" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Gas" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Coal" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Hydro Reservoir" />
          </ListItem>
          <ListItem butto className={classes.nested} n>
            <ListItemText primary="Hydro Run-of-River" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Hydro Pumped Storage" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Oil" />
          </ListItem>
        </List>
      </Collapse> */}
        </List>
      </Paper>
    </div>
  );
}
