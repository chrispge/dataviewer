// https://material-ui.com/components/lists/
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import {
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Routes from "./routes";
import ListItemLink from "./list-item-link";
import useStyles from "./use-styles";


// from https://material-ui.com/components/drawers/#drawer

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
          <ListItemLink to="/rte-gen-by-unit/" primary="RTE Gen By Unit" />
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
