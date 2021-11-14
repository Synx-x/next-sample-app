import '../styles/globals.scss'
import "../styles/vendors/_cssReset.scss";
import "../styles/vendors/_normalize.scss";
import { motion, AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

function App({ Component, pageProps, router }: AppProps) {
  // const variants = {
  //   hidden: { opacity: 0, x: -200, y: 0 },
  //   enter: { opacity: 1, x: 0, y: 0 },
  //   exit: { opacity: 0, x: 0, y: -100 },
  // };
  // variants={variants} // Pass the variant object into Framer Motion
  // initial="hidden" // Set the initial state to variants.hidden
  // animate="enter" // Animated state to variants.enter
  // exit="exit" // Exit state (used later) to variants.exit
  // transition={{ type: 'linear' }} // Set the transition to linear

  return (
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
  );
}

export default App;
