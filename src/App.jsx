import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DoctorView } from './components/DoctorView';
import { PatientView } from './components/PatientView';
import { AdminView } from './components/AdminView';
import { ShieldCheck, Sparkles, HeartPulse } from 'lucide-react';

const MainContent = () => {
  const { currentUser } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="container" style={{ flex: 1 }}>
        {currentUser.role === 'DOCTOR' && <DoctorView />}
        {currentUser.role === 'PATIENT' && <PatientView />}
        {currentUser.role === 'ADMIN' && <AdminView />}
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(9, 13, 22, 0.9)', padding: '1.25rem 2rem', marginTop: '3rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '0.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-cyan)', fontWeight: 600 }}>
            <HeartPulse size={16} /> Patient-Sovereign Mesh
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--emerald-success)', fontWeight: 600 }}>
            <ShieldCheck size={16} /> Hierarchical Health AI Gating
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-violet)', fontWeight: 600 }}>
            <Sparkles size={16} /> Emergency Relative Consent Protocol
          </span>
        </div>
        <p>Built for Hackathon Demo • Autonomous Sovereign Identity & Health Data Ledger</p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
