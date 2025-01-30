import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TasksPage from './pages/TasksPage';
import SinginPage from './pages/SigninPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<TasksPage />} />
          <Route path='/signin' element={<SinginPage />} />
        </Routes>
    </Router>
  );
}

export default App;