// https://material-ui.com/components/lists/
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

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
    <List component="nav" className={classes.root}>
      <ListItemLink to="/prices/" primary="Prices" />
      <ListItemLink to="/spreads/" primary="Spreads" />
      <ListItemLink to="/rte-gen-by-fuel/" primary="RTE Gen By Fuel" />

      {/* collpsable list
          https://material-ui.com/components/lists/#lists
          */}
      <ListItem button onClick={handleClick}>
        <ListItemText primary="RTE Gen By Unit" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/rte-gen-by-fuel/nuclear"
            primary="Nuclear"
          />
          <ListItemLink
            classNmae={classes.nested}
            to="/rte-gen-by-fuel/gas"
            primary="Gas"
          />
          <ListItemLink
            classNmae={classes.nested}
            to="/rte-gen-by-fuel/coal"
            primary="Coal"
          />
          <ListItemLink
            to="/rte-gen-by-fuel/hydro-res"
            primary="Hydro Reservoir"
          />
          <ListItemLink
            classNmae={classes.nested}
            to="/rte-gen-by-fuel/hydro-ror"
            primary="Hydro Run-of-River"
          />
          <ListItemLink
            classNmae={classes.nested}
            to="/rte-gen-by-fuel/hydro-ps"
            primary="Hydro Pumped-Storage"
          />
          <ListItemLink
            classNmae={classes.nested}
            to="/rte-gen-by-fuel/oil"
            primary="Oil"
          />
        </List>
      </Collapse>
    </List>
  );
}
