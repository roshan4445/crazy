import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ComplaintPage } from '@/pages/ComplaintPage';
import { SchemesPage } from '@/pages/SchemesPage';
import { TrafficPage } from '@/pages/TrafficPage';
import { ElderlyProgramPage } from '@/pages/ElderlyProgramPage';
import { FloatingVoiceAssistant } from '@/components/voice/FloatingVoiceAssistant';


import ProtectedRoute from "./components/Protected_route"
import LoginPage from '@/pages/LoginPage';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/complaints" element={
            <ProtectedRoute>
              <ComplaintPage />
            </ProtectedRoute>
          } />
          <Route path="/schemes" element={
            <ProtectedRoute>
              <SchemesPage />
            </ProtectedRoute>
          } />
          <Route path="/traffic" element={
            <ProtectedRoute>
              <TrafficPage />
            </ProtectedRoute>
          } />
          <Route path="/elderly-program" element={
            <ProtectedRoute>
              <ElderlyProgramPage />
            </ProtectedRoute>
          } />
        </Routes>
        <FloatingVoiceAssistant />
        <Toaster />
      </Layout>
    </Router>
  );
}

export default App;