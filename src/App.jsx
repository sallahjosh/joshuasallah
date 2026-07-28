import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';

import Home from './pages/Home';
import AboutPage from './pages/About';
import SkillsPage from './pages/Skills';
import ExperiencePage from './pages/Experience';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      {/* Fixed background glow orbs */}
      <div className="fixed w-[600px] h-[600px] rounded-full bg-[#7c3aed] top-[-200px] left-[-200px] opacity-[0.15] blur-[100px] pointer-events-none z-0" />
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[#06b6d4] bottom-[5%] right-[-150px] opacity-[0.12] blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<AboutPage />} />
            <Route path="/skills"     element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects"   element={<ProjectsPage />} />
            <Route path="/contact"    element={<ContactPage />} />
            <Route path="*"           element={<Home />} />
          </Routes>
        </main>
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}
