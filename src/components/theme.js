import { createMuiTheme } from "@material-ui/core/styles";

export default function getTheme() {
  return createMuiTheme({
    palette: {
      type: "dark",
    },
  });
}
