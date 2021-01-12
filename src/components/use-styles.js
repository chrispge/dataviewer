import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const breakpoint = "sm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  refreshButton: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
