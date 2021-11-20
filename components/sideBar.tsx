import React from "react";
import PageStyles from "../styles/components/Sidebar.module.scss";

const SideBar = (props: any) => {
  return (
    <div className={PageStyles.container}>
      this is the sidebar for route: {props.route}
    </div>
  );
};

export default React.memo(SideBar);
