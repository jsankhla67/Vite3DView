import { useProgress } from "@react-three/drei";
import { Loader2 } from "lucide-react";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div>
        <Loader2 className="animate-spin" />
        <p>{progress.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Loader;
