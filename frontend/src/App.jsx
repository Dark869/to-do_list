import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TasksPage from "./pages/TasksPage";
import SettingsPage from "./pages/SettingsPage";
import SinginPage from "./pages/SigninPage";
import SingupPage from "./pages/SignupPage";
import Error404Page from "./pages/Error404Page";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectUsersAuthenticated";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<RedirectIfAuthenticated><SinginPage /></RedirectIfAuthenticated>} />
          <Route path="/signup" element={<RedirectIfAuthenticated><SingupPage /></RedirectIfAuthenticated>} />
          <Route path="*" element={<Error404Page />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TasksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
