import { useNavigate } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import type { FC } from "react";

const Landing: FC = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate("/role-select");
  const handleTradingPlatform = () => navigate("/trading-platform");
  return <LandingPage onGetStarted={handleGetStarted} onTradingPlatform={handleTradingPlatform} />;
};

export default Landing;
