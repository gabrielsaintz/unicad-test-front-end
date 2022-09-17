import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./components/Layout/Index";
import DeliveriesPage from "./pages/Deliveries/DeliveriesPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";

// const Layout = lazy(() => import("./components/Layout/Index"));
// const Registration = lazy(() => import("./pages/Registration/Index"));
// const Deliveries = lazy(() => import("./pages/Deliveries/Index"));

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
