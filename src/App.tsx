import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import { Suspense, useEffect } from "react";
import { Effect } from "./utils/ParticleText";
import Loader from "./components/Loader";
import { useLoading } from "./LoadingContextProvider";
import Socials from "./components/Socials";

function App() {
  const { isLoading } = useLoading();
  useEffect(() => {
    if (isLoading) return;
    const mainSection = document.getElementById("main");
    const canvas = document.createElement("canvas");
    (async () => {
      canvas.id = "HeroTextCanvas";
      if (!mainSection) throw new Error("Main section not found");
      const ctx = canvas.getContext("2d");
      if (!mainSection) throw new Error("Main section not found");
      mainSection?.appendChild(canvas);
      canvas.width = document.documentElement.clientWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = "absolute";
      canvas.style.zIndex = "1";
      canvas.style.top = "50%";
      canvas.style.left = "50%";
      canvas.style.transform = "translate(-50%, -50%)";
      if (!ctx) throw new Error("Canvas context not found");
      const fontSize =
        window.innerWidth > 1000 ? 100 : window.innerWidth > 630 ? 80 : 40;
      const effect = new Effect(ctx, canvas.width, canvas.height, fontSize);

      await effect.wrapText("JATIN SANKHLA");
      function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.render();
        requestAnimationFrame(animate);
      }
      animate();
    })();

    // Cleanup function to remove the canvas when component unmounts
    return () => {
      mainSection?.removeChild(canvas);
    };
  }, [isLoading]);

  return (
    <div
      id="main"
      className="flex flex-col w-full relative items-center justify-center"
    >
   <section className="bg-gradient-to-br from-[#A2CFFE] via-[#A2CFFE] to-[#A2CFFE] h-screen w-full">


        <Canvas>
          <Suspense fallback={<Loader />}>
            <Scene />
          </Suspense>
        </Canvas>
      </section>
      <Socials />
    </div>
  );
}

export default App;
