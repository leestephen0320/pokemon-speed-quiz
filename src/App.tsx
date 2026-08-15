import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Quiz from './pages/Quiz';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
