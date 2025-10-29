import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./pages/App";
import RoleSelectPage from "./pages/RoleSelect";
import DomesticPage from "./pages/Domestic";
import IndustryPage from "./pages/Industry";
import AdministratorPage from "./pages/Administrator";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/role-select" element={<RoleSelectPage />} />
			<Route path="/role/domestic" element={<DomesticPage />} />
			<Route path="/role/industry" element={<IndustryPage />} />
			<Route path="/role/admin" element={<AdministratorPage />} />
		</Routes>
	</BrowserRouter>
);
