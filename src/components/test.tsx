import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Cube = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Create a gradient material that shifts between green and black
  const gradientMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x00ff00,
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 1.0,
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshPhysicalMaterial
        color="green"
        metalness={0.9}
        roughness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        reflectivity={1.0}
      />
    </mesh>
  );
};

const FourCubesScene = () => {
  // Calculate positions for the four corners, slightly tilted toward center
  const positions = [
    [-4, 2, -4], // top-left
    [4, 2, -4], // top-right
    [-4, -2, -4], // bottom-left
    [4, -2, -4], // bottom-right
  ];

  // Rotation angles to tilt toward center
  const rotations = [
    [0.3, -0.3, 0.2], // top-left
    [0.3, 0.3, -0.2], // top-right
    [-0.3, -0.3, -0.2], // bottom-left
    [-0.3, 0.3, 0.2], // bottom-right
  ];

  return (
    <div className="w-full h-screen bg-green-500">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: false, antialias: true }}
      >
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="green" />

        {positions.map((position, index) => (
          <Cube
            key={index}
            position={position}
            rotation={rotations[index].map((r) => r * Math.PI)}
          />
        ))}

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default FourCubesScene;
