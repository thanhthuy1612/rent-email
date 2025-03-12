import React from "react";
import LoadingScreen from "@/components/loading/LoadingScreen";

// ----------------------------------------------------------------------

const Loading: React.FC = () => {
  return (
    <div className="h-screen flex items-center">
      <LoadingScreen />
    </div>
  );
};
export default Loading;
