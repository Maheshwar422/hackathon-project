import React from 'react';
import { useApp } from '../context/AppContext';
import { AISummaryCard } from './AISummaryCard';
import { ShieldCheck, Lock, Unlock, PhoneCall, Pill, Eye, User, Fingerprint, BadgeCheck } from 'lucide-react';

export const PatientView = () => {
  const { users, currentUser, patientsData, toggleSovereignPermission, auditLogs } = useApp();

  const doctors = users.filter(u => u.role === 'DOCTOR');
  const patientData = patientsData[currentUser.id] || {
    sovereignPermissions: {},
    medicalHistory: [],
    prescriptions: [],
    aiClinicalSummary: null
  };

  // Filter audit logs pertaining to current patient
  const patientAuditLogs = auditLogs.filter(
    log => log.targetPatientName === currentUser.name || log.actorName === currentUser.name
  );

  return (
    <div>
      {/* Patient Header Banner with Aadhaar Integration */}
      <div className="glass-panel card-padding" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'var(--emerald-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800 }}>
              <User size={28} />
            </div>
            <div>
              <h2>{currentUser.name} <span style={{ fontSize: '0.9rem', color: 'var(--emerald-success)', fontWeight: 600 }}>(Sovereign Record Owner)</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Age: {currentUser.age} y/o | Gender: {currentUser.gender} | Blood Type: <strong style={{ color: 'var(--danger-crimson)' }}>{currentUser.bloodType}</strong>
              </p>
            </div>
          </div>

          {/* Aadhaar / ABHA Card Badge */}
          <div style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Fingerprint size={28} color="var(--primary-violet)" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-violet)', fontWeight: 700, fontSize: '0.8rem' }}>
                <BadgeCheck size={14} /> Aadhaar & ABHA Health Vault
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                Aadhaar: <strong>{currentUser.aadhaarNumber || '9842-1049-5820'}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)' }}>
                ABHA ID: {currentUser.abhaNumber || '14-9283-4019-2041'}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--emerald-success)', fontWeight: 700, textTransform: 'uppercase' }}>
              Data Sovereignty Enforced
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Self-Sovereign Identity Mesh Active
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Sovereignty Matrix & Emergency Relatives */}
        <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Sovereign Permission Control Center */}
          <div className="glass-panel card-padding">
            <div className="card-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck color="var(--emerald-success)" size={22} />
                <span>Doctor Record Access Controls</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              You retain 100% sovereignty over your medical data bound to your Aadhaar ID. Toggle access below to grant or revoke real-time history access for each physician.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {doctors.map(doc => {
                const isGranted = patientData.sovereignPermissions[doc.id] || false;
                return (
                  <div
                    key={doc.id}
                    style={{
                      background: isGranted ? 'rgba(16, 185, 129, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                      border: isGranted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong style={{ fontSize: '0.95rem' }}>{doc.name}</strong>
                        {isGranted ? (
                          <span style={{ fontSize: '0.7rem', color: 'var(--emerald-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Unlock size={10} /> ACCESS GRANTED
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Lock size={10} /> REVOKED
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>
                        {doc.specialty} ({doc.hospital})
                      </span>
                    </div>

                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={isGranted}
                        onChange={() => toggleSovereignPermission(currentUser.id, doc.id)}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registered Emergency Relative Contact Card */}
          <div className="glass-panel card-padding">
            <div className="card-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <PhoneCall color="var(--primary-cyan)" size={20} />
                <span>Emergency Relative Contact</span>
              </div>
              <span className="role-badge doctor" style={{ fontSize: '0.65rem' }}>
                BREAK-GLASS VERIFIED
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              If you are incapacitated, authorized trauma physicians will reach this designated relative for verbal break-glass consent.
            </p>

            {currentUser.emergencyContact && (
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{currentUser.emergencyContact.name}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span>Relationship: <strong>{currentUser.emergencyContact.relationship}</strong></span>
                  <span>Primary Phone: <strong style={{ color: 'var(--primary-cyan)' }}>{currentUser.emergencyContact.phone}</strong></span>
                  <span>Alternate: {currentUser.emergencyContact.alternatePhone || 'N/A'}</span>
                  <span>Address: {currentUser.emergencyContact.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Overview, Prescriptions, Medical Records, & Access Logs */}
        <div className="col-7" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* AI Overview (Patient View - Hierarchical Protected) */}
          <AISummaryCard patientData={patientData} patientUser={currentUser} />

          {/* Active Prescriptions Schedule */}
          <div className="glass-panel card-padding">
            <div className="card-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Pill color="var(--emerald-success)" size={20} />
                <span>My Active Prescriptions</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--emerald-success)', fontWeight: 700 }}>
                {patientData.prescriptions.filter(p => p.status === 'Active').length} Active
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {patientData.prescriptions.map(rx => (
                <div key={rx.id} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '1rem' }}>{rx.drugName}</strong>
                      <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-success)', padding: '0.1rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                        {rx.dosage}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                      Schedule: <strong>{rx.frequency}</strong> • Prescribed by {rx.prescribedBy}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: rx.status.includes('Active') ? 'var(--emerald-success)' : 'var(--danger-crimson)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: rx.status.includes('Active') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                    }}>
                      {rx.status}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.2rem' }}>
                      {rx.refillsRemaining} Refills Available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparent Access Audit Trail */}
          <div className="glass-panel card-padding">
            <div className="card-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Eye color="var(--primary-violet)" size={20} />
                <span>My Record Audit Trail (Sovereignty Transparency)</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Every time a physician or admin views your history or triggers emergency consent, it is logged immutably.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Actor</th>
                    <th>Role</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patientAuditLogs.map(log => (
                    <tr key={log.id}>
                      <td style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{log.timestamp}</td>
                      <td style={{ fontWeight: 600 }}>{log.actorName}</td>
                      <td>
                        <span className={`role-badge ${log.actorRole.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
                          {log.actorRole}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>{log.action}</td>
                      <td>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: log.status.includes('EMERGENCY') ? 'var(--warning-amber)' : 'var(--emerald-success)'
                        }}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
