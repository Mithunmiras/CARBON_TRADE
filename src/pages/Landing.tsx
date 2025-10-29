import { useNavigate } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import type { FC } from "react";

const Landing: FC = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate("/role-select");
  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Landing;
