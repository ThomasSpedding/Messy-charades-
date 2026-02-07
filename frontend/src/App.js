import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Categories from "./pages/Categories";
import Ready from "./pages/Ready";
import Game from "./pages/Game";
import ChooseFate from "./pages/ChooseFate";
import FateResult from "./pages/FateResult";
import TurnEnd from "./pages/TurnEnd";
import RoundEnd from "./pages/RoundEnd";
import FinalScores from "./pages/FinalScores";
import Info from "./pages/Info";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/ready" element={<Ready />} />
          <Route path="/game" element={<Game />} />
          <Route path="/choose-fate" element={<ChooseFate />} />
          <Route path="/fate-result" element={<FateResult />} />
          <Route path="/turn-end" element={<TurnEnd />} />
          <Route path="/round-end" element={<RoundEnd />} />
          <Route path="/final-scores" element={<FinalScores />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
