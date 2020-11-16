import React from "react";
import Button from "@material-ui/core/Button";

function SidebarButton(props) {
  const { title, cptSetter } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      className="sidebar-btn"
      onClick={() => cptSetter()}
    >
      {title}
    </Button>
  );
}

export default SidebarButton;
