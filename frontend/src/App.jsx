import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import SinginPage from './pages/SigninPage';
import SingupPage from './pages/SignupPage';
import Error404Page from './pages/Error404Page';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<TasksPage />} />
          <Route path='/signin' element={<SinginPage />} />
          <Route path='/signup' element={<SingupPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='*' element={<Error404Page />} />
        </Routes>
    </Router>
  );
}

export default App;