// https://material-ui.com/components/lists/
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Routes from "./routes";
import ListItemLink from "./list-item-link";

// from https://material-ui.com/components/drawers/#drawer

const drawerWidth = 240;
const breakpoint = "sm";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up(breakpoint)]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up(breakpoint)]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(breakpoint)]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawer_: theme.mixins.drawer,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up(breakpoint)]: {
      marginLeft: drawerWidth,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbarstyle: {
    background: "#676767",
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [listOpen, setListOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListClick = () => {
    setListOpen(!listOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItemLink to="/prices/" primary="Prices" />
        <ListItemLink to="/spreads/" primary="Spreads" />
        <List />
        <Divider />
        <List>
          <ListItemLink to="/rte-gen-by-fuel/" primary="RTE Gen By Fuel" />
          <ListItem button onClick={handleListClick}>
            <ListItemText primary="RTE Gen By Unit" />
            {listOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={listOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink
                className={classes.nested}
                to="/rte-gen-by-unit/nuclear"
                primary="Nuclear"
              />
              <ListItemLink
                className={classes.nested}
                to="/rte-gen-by-unit/fossil-gas"
                primary="Gas"
              />
              <ListItemLink
                className={classes.nested}
                to="/rte-gen-by-unit/fossil-hard-coal"
                primary="Coal"
              />
              <ListItemLink
                to="/rte-gen-by-unit/hydro-water-reservoir"
                primary="Hydro Reservoir"
              />
              <ListItemLink
                className={classes.nested}
                to="/rte-gen-by-unit/hydro-run-of-river-and-poundage"
                primary="Hydro Run-of-River"
              />
              <ListItemLink
                className={classes.nested}
                to="/rte-gen-by-unit/hydro-pumped-storage"
                primary="Hydro Pumped Storage"
              />
              <ListItemLink
                className={classes.nested}
                to="/rte-gen-by-unit/fossil-oil"
                primary="Oil"
              />
            </List>
          </Collapse>
          <ListItemLink
            to="/entsoe-gen-by-fuel/"
            primary="Entsoe Gen By Fuel"
          />
        </List>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarstyle}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Data Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawwer} aria-label="data sources">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better performance on mobile
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* necessary for content to be below app bar */}
        <div className={classes.toolbar} />
        <Routes />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
