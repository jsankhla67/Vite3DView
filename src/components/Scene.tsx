import { Html, OrthographicCamera } from "@react-three/drei";
import Cube from "./Cube";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const Scene = () => {
  const { size: viewport } = useThree();
  // Device Size Multiplier
  const [multiplier, setMultiplier] = useState<number | null>(null);
  const top = viewport.height / 2;
  const left = -viewport.width / 2;
  const bottom = -viewport.height / 2;
  const right = viewport.width / 2;
  useEffect(() => {
    if (viewport.width < 630) {
      setMultiplier(1);
    } else if (viewport.width < 1000) {
      setMultiplier(1.2);
    } else {
      setMultiplier(1.5);
    }
  }, [viewport.width]);

  if (!multiplier)
    return (
      <Html position={[0, 0, 0]} center>
        <Loader2 className="animate-spin" />
      </Html>
    );

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 100]}
        top={top}
        left={left}
        bottom={bottom}
        right={right}
      />

      <Cube
        screenMultiplier={multiplier}
        position={[left + 100 * multiplier, top - 100 * multiplier, -400]}
      />
      <Cube
        screenMultiplier={multiplier}
        position={[right - 100 * multiplier, top - 100 * multiplier, -400]}
      />
      {/* <Html position={[0, 0, 0]} center>
        <div className="">
          <HeroText text="This can be yours." />
        </div>
      </Html> */}
      <Cube
        screenMultiplier={multiplier}
        position={[left + 100 * multiplier, bottom + 100 * multiplier, -400]}
      />
      <Cube
        screenMultiplier={multiplier}
        position={[right - 100 * multiplier, bottom + 100 * multiplier, -400]}
      />
    </>
  );
};

export default Scene;
