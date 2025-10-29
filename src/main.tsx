import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import RolePage from "./pages/Role";
import NotFound from "./pages/NotFound";

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/role-select" element={<RoleSelect />} />
				<Route path="/role/:role" element={<RolePage />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
