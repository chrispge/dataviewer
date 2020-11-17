import { createMuiTheme } from "@material-ui/core/styles";

export default function getTheme() {
  return createMuiTheme({
    palette: {
      type: "dark",
      background: {
        paper: "#333333",
        default: "#212121",
        level2: "#525252",
      },
    },
  });
}
