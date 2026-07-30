import React from 'react';
import { useApp } from '../context/AppContext';
import { Bot, AlertTriangle, CheckCircle2, Lock, ShieldAlert, Sparkles } from 'lucide-react';

export const AISummaryCard = ({ patientData, patientUser }) => {
  const { currentUser } = useApp();

  const isAuthorized = currentUser.role === 'DOCTOR' || currentUser.role === 'ADMIN';
  const aiSummary = patientData?.aiClinicalSummary;

  if (!aiSummary) return null;

  return (
    <div className="glass-panel card-padding" style={{ border: '1px solid rgba(6, 182, 212, 0.3)' }}>
      <div className="card-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles className="pulse" color="var(--primary-cyan)" size={20} />
          <span style={{ fontSize: '1.15rem' }}>AI Prescription & Clinical Intelligence</span>
        </div>
        {isAuthorized ? (
          <span className="role-badge doctor">
            <Lock size={12} /> RESTRICTED DOCTOR/ADMIN ACCESS
          </span>
        ) : (
          <span className="role-badge patient">
            <Lock size={12} /> PATIENT VIEW GATED
          </span>
        )}
      </div>

      {isAuthorized ? (
        <div className="ai-summary-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <div className="ai-badge">
              <Bot size={14} /> Clinical Neural Engine v3.8
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '12px',
              backgroundColor: aiSummary.riskScore.includes('HIGH') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              color: aiSummary.riskScore.includes('HIGH') ? 'var(--danger-crimson)' : 'var(--emerald-success)',
              border: aiSummary.riskScore.includes('HIGH') ? '1px solid var(--danger-crimson)' : '1px solid var(--emerald-success)'
            }}>
              RISK: {aiSummary.riskScore}
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.6' }}>
            <strong>Diagnostic Synthesis:</strong> {aiSummary.summary}
          </p>

          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Pharmacological & Contraindication Alerts
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {aiSummary.drugInteractions.map((alert, index) => (
              <div
                key={index}
                style={{
                  background: alert.severity === 'CRITICAL' || alert.severity === 'HIGH' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  borderLeft: alert.severity === 'CRITICAL' || alert.severity === 'HIGH' ? '3px solid var(--danger-crimson)' : '3px solid var(--warning-amber)',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}
              >
                <AlertTriangle size={16} style={{ color: alert.severity === 'CRITICAL' || alert.severity === 'HIGH' ? 'var(--danger-crimson)' : 'var(--warning-amber)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: alert.severity === 'CRITICAL' || alert.severity === 'HIGH' ? 'var(--danger-crimson)' : 'var(--warning-amber)' }}>
                    [{alert.severity} SEVERITY]:
                  </strong>{' '}
                  <span style={{ color: 'var(--text-main)' }}>{alert.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
              Recommended Clinical Protocol:
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {aiSummary.recommendedNextSteps}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="restricted-banner" style={{ marginBottom: '1.25rem' }}>
            <ShieldAlert size={28} color="var(--warning-amber)" />
            <div>
              <strong>Hierarchical Protection Active</strong>
              <p style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '0.25rem' }}>
                Detailed AI diagnostic interactions & clinical risk scores are reserved for licensed physicians and admins to avoid patient misinterpretation and misuse.
              </p>
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--emerald-success)' }}>
              <CheckCircle2 size={18} />
              <strong style={{ fontSize: '0.9rem' }}>Patient Friendly Overview</strong>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
              Your records show <strong>{patientData.prescriptions.filter(p => p.status === 'Active').length} active prescriptions</strong> managed by your care team. Ensure you take your medication according to your schedule and contact your doctor if you experience side effects.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
