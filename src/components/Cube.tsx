import { useGSAP } from "@gsap/react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useLoading } from "../LoadingContextProvider";

const Cube = ({
  position,
  screenMultiplier,
}: {
  position: [number, number, number];
  screenMultiplier: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [animationIsActive, setanimationIsActive] = useState(true);
  // A dummy object so that I can point light in the right direction
  const [o] = useState(() => new THREE.Object3D());
  const { isLoading, setIsLoading } = useLoading();

  useGSAP(() => {
    if (!ref.current || !groupRef.current) return;

    //Animation to move the cube
    gsap.from(groupRef.current.position, {
      x: 0,
      y: 0,
      z: -100,
      duration: 5,
      delay: 2,
      ease: "power2.out",
      onComplete: () => {
        setanimationIsActive(false);
      },
      onStart: () => {
        setTimeout(() => {
          if (isLoading) setIsLoading(false);
        }, 2000);
      },
    });

    //Animation to rotate the cube
    gsap.from(ref.current.rotation, {
      x: Math.PI * (position[0] / Math.abs(position[0])),
      y: Math.PI * -(position[1] / Math.abs(position[1])),
      z: 0,
      duration: 5,
      ease: "power2.out",
    });
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    if (animationIsActive) return;
    ref.current.rotation.y += 0.005 * (position[0] / Math.abs(position[0]));
    ref.current.rotation.x += 0.005 * (position[1] / Math.abs(position[1]));
  });

  // useGSAP(() => {
  //   if (!ref.current) return;
  //   if (hover && !animationIsActive) {
  //     gsap
  //       .timeline({
  //         onStart: () => setanimationIsActive(true),
  //         onComplete: () => setanimationIsActive(false),
  //       })
  //       .to(ref.current.rotation, {
  //         duration: 2,
  //         y: Math.PI * 2,
  //         ease: "back.in(4)",
  //         yoyo: true,
  //       })
  //       .to(ref.current.rotation, {
  //         duration: 1.5,
  //         y: Math.PI / 4,
  //         delay: 0.1,
  //         ease: "back.out(4)",
  //       });
  //     gsap
  //       .timeline()
  //       .to(ref.current.position, {
  //         y: 150,
  //         ease: "back.in(4)",
  //         duration: 2,
  //       })
  //       .to(ref.current.position, {
  //         y: 0,
  //         duration: 1,
  //         delay: 0.5,
  //         ease: "sine.out",
  //         // delay: 1,
  //       });
  //   }
  // }, [hover]);

  return (
    <>
      <group position={position} ref={groupRef}>
        <directionalLight
          intensity={20}
          position={[0, 0, position[2] + 20]}
          color="#ff00ff"
          castShadow
          target={o}
        />
        <directionalLight
          intensity={20}
          position={[position[0] + 40, 0, position[2] + 20]}
          color="#ff00ff"
          castShadow
          target={o}
        />
        <directionalLight
          intensity={10}
          position={[position[0] - 40, 0, position[2] + 20]}
          color="#ffffff"
          castShadow
          target={o}
        />
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} ref={ref}>
          <primitive object={o} position={position} />
          <RoundedBox
            args={[
              100 * screenMultiplier,
              100 * screenMultiplier,
              100 * screenMultiplier,
            ]}
            radius={15}
            smoothness={0.1}
          >
            <meshStandardMaterial
              color={0x010101}
              metalness={2}
              roughness={0.1}
              emissive={0x010101}
              emissiveIntensity={0.9}
            />
          </RoundedBox>
        </mesh>
        {/* <OrbitControls /> */}
      </group>
    </>
  );
};

export default Cube;
