
import * as React from "react";
import { motion, useInView } from "framer-motion";

export function TypingEffect({ text = "" }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className="text-gray-800 text-base whitespace-pre-line leading-relaxed"
      style={{ wordBreak: "break-word" }}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.15, delay: index * 0.015 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

function Response({ text, loading }) {
  return (
    <div className="min-h-[48px] px-4 py-2">
      {loading ? (
        <span className="text-violet-600 text-base animate-pulse">Reply...</span>
      ) : text ? (
        <TypingEffect text={text} />
      ) : null}
    </div>
  );
}

export default Response;