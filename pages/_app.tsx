import '../styles/globals.scss'
import "../styles/vendors/_cssReset.scss";
import "../styles/vendors/_normalize.scss";
import motion from "framer-motion";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <motion.div
      key={router.route}
      initial={"pageInitial"}
      animate={"pageAnimate"}
      variants={{
        pageInitial: { opacity: 0 },
        pageAnimate: { opacity: 1 },
      }}
    >
      <Component {...pageProps} />
    </motion.div>
  );
}

export default MyApp
