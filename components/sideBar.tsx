import React, { useEffect, useState } from "react";
import PageStyles from "../styles/components/Sidebar.module.scss";

const SideBar = (props: any) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    let userPrefBool = localStorage.getItem("active") === "true";
    setActive(userPrefBool);
  }, []);

  const toggleSideBar = () => {
    setActive(!active);
    let nextState = !active;
    localStorage.setItem("active", nextState.toString());
  };
  return (
    <div
      className={
        active
          ? PageStyles.container + " " + PageStyles.active
          : PageStyles.container + " " + PageStyles.inactive
      }
    >
      <button
        className={
          active
            ? PageStyles.SidebarButton
            : PageStyles.SidebarButton + " " + PageStyles.buttonInactive
        }
        onClick={() => toggleSideBar()}
      >
        {active ? "close" : "open"}
      </button>
      <div className={PageStyles.SidebarContent}>
        {active ? `this is the sidebar for route: ${props.route}` : ""}
      </div>
    </div>
  );
};

export default React.memo(SideBar);
