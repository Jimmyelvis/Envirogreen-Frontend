import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function FadeIn({
  children,          // The content to be animated
  delay = 0,         // Delay before the animation starts (default: 0 seconds)
  duration = 0.5,    // Duration of the animation (default: 0.5 seconds)
  classNames = "",   // Additional CSS classes to apply
}) {
  // Reference to the DOM element
  const ref = useRef(null);

  // Check if the element is in the viewport
  const isInView = useInView(ref);

  // State to track if the animation should trigger
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the animation when the element comes into view
  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  return (
    <motion.div
      ref={ref} // Attach the ref to the motion.div
      variants={{
        hidden: {
          opacity: 0, // Start fully transparent
        },
        visible: {
          opacity: 1, // Fade to fully opaque
        },
      }}
      initial="hidden" // Initial animation state
      animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
      transition={{
        delay,    // Delay before the animation starts
        duration, // Duration of the animation
        ease: "easeInOut", // Easing function
      }}
      className={classNames} // Apply additional CSS classes if any
    >
      {children}
    </motion.div>
  );
}
