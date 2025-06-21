import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ComplaintPage } from '@/pages/ComplaintPage';
import { SchemesPage } from '@/pages/SchemesPage';
import { TrafficPage } from '@/pages/TrafficPage';
import { ElderlyProgramPage } from '@/pages/ElderlyProgramPage';
import { FloatingVoiceAssistant } from '@/components/voice/FloatingVoiceAssistant';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/complaints" element={<ComplaintPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/elderly-program" element={<ElderlyProgramPage />} />
        </Routes>
        <FloatingVoiceAssistant />
        <Toaster />
      </Layout>
    </Router>
  );
}

export default App;