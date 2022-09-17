import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./components/Layout/Index";
import DeliveriesPage from "./pages/Deliveries/DeliveriesPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";

export function App() {
	return (
		<HashRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<RegistrationPage />}></Route>
					<Route path="/entregas" element={<DeliveriesPage />}></Route>
				</Route>
			</Routes>
		</HashRouter>
	);
}
