import React, { useState, useMemo } from "react";
import styles from "../styles/components/Navbar.module.scss";

const NavBar = React.memo((props) => {
  const [count, useCount] = useState(0);

  return (
    <nav key={count} className={styles.nav}>
      <ul className={styles.navUl}>{props.children}</ul>
    </nav>
  );
});

export const NavItems = React.memo((props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.navItem}>
      <a href="#" className={styles.iconButton} onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
});

export const DropdownMenu = React.memo((props) => {
  const [activeMenu, setActiveMenu] = useState("main");

  return <div className={styles.dropdownMenu}></div>;
});

export const DropdownItem = React.memo((props) => {
  return (
    <a href="#" className={styles.menuItem}>
      <span className={styles.iconLeft}>{props.leftIcon}</span>
      {props.children}
    </a>
  );
});

export default NavBar;
