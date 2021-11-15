import '../styles/globals.scss'
import "../styles/vendors/_cssReset.scss";
import "../styles/vendors/_normalize.scss";
import { motion, AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Navbar, {
  DropdownItem,
  DropdownMenu,
  NavItems,
} from "../components/navBar";
import React from "react";

function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Navbar>
        <NavItems icon="🤣" />
        <NavItems icon="🤣" />
        <NavItems icon="🐤" />
        <NavItems icon="🤣" />

        <NavItems icon="😃">
          <DropdownMenu>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Profile</DropdownItem>
          </DropdownMenu>
        </NavItems>
      </Navbar>

      <AnimatePresence>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: { opacity: 0 },
            pageAnimate: { opacity: 1 },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
