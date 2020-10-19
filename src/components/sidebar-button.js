import React from "react";

function SidebarButton(props) {
  const { title, cptSetter } = props;
  return (
    <button className="sidebar-btn" onClick={() => cptSetter()}>
      {title}
    </button>
  );
}

export default SidebarButton;
