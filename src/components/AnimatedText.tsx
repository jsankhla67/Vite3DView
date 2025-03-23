import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AnimatedText = ({ text }: { text: string }) => {
  const containerRef = useRef<null | HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const spans = containerRef.current.children;
    const tl = gsap.timeline({ defaults: { duration: 1 }, delay: 3 });

    // Create array of elements and shuffle it
    const elements = Array.from(spans).sort(() => Math.random() - 0.5);

    // Initial state for all elements
    gsap.set(elements, {
      y: 100,
      opacity: 0,
    });

    // Animate in random order
    elements.forEach((el, index) => {
      tl.to(
        el,
        {
          y: 0,
          opacity: 1,
          ease: "back.out(1.7)",
        },
        index > 0 ? "-=0.5" : 0
      );
    });
  }, [text]); // Re-run when text changes

  return (
    <h1
      ref={containerRef}
      className="anton-regular whitespace-nowrap"
      style={{ fontSize: 100 }}
    >
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          style={{ display: "inline-block", marginInline: "0.5rem" }}
        >
          {word}{" "}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedText;
