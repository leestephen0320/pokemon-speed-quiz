import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Quiz from './pages/Quiz';
import SlowTierQuiz from './pages/SlowTierQuiz';
import MidTierQuiz from './pages/MidTierQuiz';
import FastTierQuiz from './pages/FastTierQuiz';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/slow-tier" element={<SlowTierQuiz />} />
          <Route path="/mid-tier" element={<MidTierQuiz />} />
          <Route path="/fast-tier" element={<FastTierQuiz />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
