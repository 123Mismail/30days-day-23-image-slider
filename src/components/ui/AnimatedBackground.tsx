
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
      variants={variants}
      initial="initial"
      animate="animate"
    />
  );
};
 export default  AnimatedBackground