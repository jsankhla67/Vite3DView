import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroText = ({ text }: { text: string }) => {
  const splitTextInHalf = (text: string): [string, string] => {
    const words = text.trim().split(/\s+/);
    const halfLength = Math.ceil(words.length / 2);

    const firstHalf = words.slice(0, halfLength).join(" ");
    const secondHalf = words.slice(halfLength).join(" ");

    return [firstHalf, secondHalf];
  };
  const [firstHalf, secondHalf] = splitTextInHalf(text);
  const firstRef = useRef<null | HTMLParagraphElement>(null);
  const secondRef = useRef<null | HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!firstRef.current || !secondRef.current) return;
    // gsap.set(firstRef.)
    gsap
      .timeline({ delay: 3.5 })
      .from(
        firstRef.current,
        {
          y: "100%",
          x: "5%",
          ease: "power4.inOut",
          duration: 1.5,
        },
        0
      )
      .from(
        secondRef.current,
        {
          y: "-100%",
          x: "-5%",
          ease: "power4.inOut",
          duration: 1.5,
        },
        0
      );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="whitespace-nowrap font-bold text-9xl max-lg:text-8xl max-md:text-6xl max-sm:text-4xl anton-regular -translate-x-1/2  overflow-hidden">
        <p ref={firstRef}>{firstHalf.toUpperCase()}</p>
      </div>

      <div className="whitespace-nowrap font-bold text-9xl max-lg:text-8xl max-md:text-6xl max-sm:text-4xl anton-regular translate-x-1/2  overflow-hidden">
        <p ref={secondRef}>{secondHalf.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default HeroText;
