import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AISummaryCard } from './AISummaryCard';
import { EmergencyModal } from './EmergencyModal';
import {
  Stethoscope,
  Search,
  Lock,
  Unlock,
  PlusCircle,
  Clock,
  Pill,
  UserCheck,
  ShieldAlert,
  PhoneCall,
  Fingerprint,
  BadgeCheck
} from 'lucide-react';

export const DoctorView = () => {
  const { users, currentUser, patientsData, issuePrescription } = useApp();

  const patients = users.filter(u => u.role === 'PATIENT');
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'pat_1');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showNewRxForm, setShowNewRxForm] = useState(false);
  const [aadhaarSearch, setAadhaarSearch] = useState('');

  // New Prescription Form State
  const [newRx, setNewRx] = useState({
    drugName: '',
    dosage: '',
    frequency: 'Once Daily',
    refillsRemaining: 3
  });

  const selectedPatientUser = patients.find(p => p.id === selectedPatientId);
  const selectedPatientData = patientsData[selectedPatientId];

  // Check if current doctor has access
  const hasAccess = selectedPatientData?.sovereignPermissions?.[currentUser.id] || false;

  const handleCreateRx = (e) => {
    e.preventDefault();
    if (!newRx.drugName || !newRx.dosage) return;

    issuePrescription(selectedPatientId, newRx);
    setNewRx({ drugName: '', dosage: '', frequency: 'Once Daily', refillsRemaining: 3 });
    setShowNewRxForm(false);
  };

  // Filter patients by Aadhaar search if entered
  const displayedPatients = patients.filter(p => {
    if (!aadhaarSearch) return true;
    return (
      p.name.toLowerCase().includes(aadhaarSearch.toLowerCase()) ||
      p.aadhaarNumber?.includes(aadhaarSearch) ||
      p.abhaNumber?.includes(aadhaarSearch)
    );
  });

  return (
    <div>
      {/* Doctor Header Banner */}
      <div className="glass-panel card-padding" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800 }}>
              <Stethoscope size={28} />
            </div>
            <div>
              <h2>{currentUser.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {currentUser.specialty} | {currentUser.hospital} (License: {currentUser.license})
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Doctor Console
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Connected to Sovereign Health Mesh
            </p>
          </div>
        </div>
      </div>

      {/* Patient Directory & Aadhaar Search Row */}
      <div className="section-header" style={{ gap: '1rem', flexWrap: 'wrap' }}>
        <h3 className="section-title">
          <Search size={20} color="var(--primary-cyan)" /> Patient Directory & Aadhaar Lookup
        </h3>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Fingerprint size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-violet)' }} />
            <input
              className="input-field"
              placeholder="Search Name or Aadhaar / ABHA ID..."
              value={aadhaarSearch}
              onChange={(e) => setAadhaarSearch(e.target.value)}
              style={{ paddingLeft: '2rem', fontSize: '0.8rem', width: '250px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {displayedPatients.map(p => {
              const isAccessible = patientsData[p.id]?.sovereignPermissions?.[currentUser.id];
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`btn ${selectedPatientId === p.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.85rem' }}
                >
                  {isAccessible ? <Unlock size={14} color="var(--emerald-success)" /> : <Lock size={14} color="var(--danger-crimson)" />}
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Patient Content Area */}
      {selectedPatientUser && selectedPatientData && (
        <div className="dashboard-grid">
          {/* Patient Overview Card with Aadhaar Space */}
          <div className="col-12 glass-panel card-padding">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="role-badge patient">PATIENT PROFILE</span>
                  <span className="role-badge admin" style={{ fontSize: '0.65rem' }}>
                    <BadgeCheck size={12} /> AADHAAR VERIFIED
                  </span>
                </div>
                <h2 style={{ fontSize: '1.6rem', marginTop: '0.3rem' }}>{selectedPatientUser.name}</h2>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                  <span>Age: <strong>{selectedPatientUser.age} y/o</strong></span>
                  <span>Gender: <strong>{selectedPatientUser.gender}</strong></span>
                  <span>Blood Type: <strong style={{ color: 'var(--danger-crimson)' }}>{selectedPatientUser.bloodType}</strong></span>
                  <span>Allergies: <strong>{selectedPatientUser.allergies.join(', ') || 'None'}</strong></span>
                </div>
              </div>

              {/* Aadhaar & ABHA Badge Box */}
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-violet)', fontWeight: 700, marginBottom: '0.2rem' }}>
                  <Fingerprint size={16} /> Aadhaar & ABHA Health Vault
                </div>
                <div>Aadhaar: <strong style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{selectedPatientUser.aadhaarNumber}</strong></div>
                <div>ABHA ID: <strong style={{ color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)' }}>{selectedPatientUser.abhaNumber}</strong></div>
              </div>

              {hasAccess ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-success)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <UserCheck size={18} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                    SOVEREIGN ACCESS GRANTED
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--danger-crimson)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lock size={18} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      RECORD LOCKED
                    </span>
                  </div>
                  <button
                    onClick={() => setShowEmergencyModal(true)}
                    className="btn btn-danger"
                  >
                    <ShieldAlert size={16} /> Emergency Break-Glass & Relative Contact
                  </button>
                </div>
              )}
            </div>

            {/* Emergency Contact Summary Banner */}
            <div style={{ marginTop: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <PhoneCall size={18} color="var(--primary-cyan)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Registered Emergency Contact Relative: <strong>{selectedPatientUser.emergencyContact?.name}</strong> ({selectedPatientUser.emergencyContact?.relationship}) — <strong>{selectedPatientUser.emergencyContact?.phone}</strong>
                </span>
              </div>
              {!hasAccess && (
                <button
                  onClick={() => setShowEmergencyModal(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger-crimson)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Contact Relative for Consent →
                </button>
              )}
            </div>
          </div>

          {/* Access Locked Banner if no permission */}
          {!hasAccess ? (
            <div className="col-12 glass-panel card-padding text-center" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px dashed var(--danger-crimson)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Lock size={48} color="var(--danger-crimson)" />
              <h3 style={{ fontSize: '1.4rem' }}>Patient Record Restricted</h3>
              <p style={{ maxWidth: '600px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {selectedPatientUser.name} has not granted active viewing permissions to <strong>{currentUser.name}</strong>. Under sovereign data governance rules, non-authorized doctors cannot inspect past medical histories or issue non-emergency prescriptions.
              </p>
              <button
                onClick={() => setShowEmergencyModal(true)}
                className="btn btn-danger"
                style={{ fontSize: '1rem', padding: '0.85rem 1.5rem' }}
              >
                <ShieldAlert size={18} /> Initiate Emergency Relative Contact & Override
              </button>
            </div>
          ) : (
            <>
              {/* Left Column: AI Clinical Summary & Prescriptions */}
              <div className="col-7" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* AI Summary (Restricted Doctor View) */}
                <AISummaryCard patientData={selectedPatientData} patientUser={selectedPatientUser} />

                {/* Prescriptions Section */}
                <div className="glass-panel card-padding">
                  <div className="card-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Pill color="var(--emerald-success)" size={20} />
                      <span>Active Prescriptions Roster</span>
                    </div>
                    <button
                      onClick={() => setShowNewRxForm(!showNewRxForm)}
                      className="btn btn-primary"
                      style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                    >
                      <PlusCircle size={14} /> Issue New Prescription
                    </button>
                  </div>

                  {/* New Prescription Form Drawer */}
                  {showNewRxForm && (
                    <form onSubmit={handleCreateRx} style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-cyan)', marginBottom: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-cyan)', marginBottom: '0.8rem' }}>
                        Issue Sovereign Prescription (With Real-Time Safety Verification)
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div className="input-group">
                          <label className="input-label">Medication Name</label>
                          <input
                            className="input-field"
                            placeholder="e.g. Atorvastatin"
                            value={newRx.drugName}
                            onChange={(e) => setNewRx({ ...newRx, drugName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="input-group">
                          <label className="input-label">Dosage</label>
                          <input
                            className="input-field"
                            placeholder="e.g. 20 mg"
                            value={newRx.dosage}
                            onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
                            required
                          />
                        </div>
                        <div className="input-group">
                          <label className="input-label">Frequency</label>
                          <input
                            className="input-field"
                            placeholder="e.g. Once Daily in Morning"
                            value={newRx.frequency}
                            onChange={(e) => setNewRx({ ...newRx, frequency: e.target.value })}
                            required
                          />
                        </div>
                        <div className="input-group">
                          <label className="input-label">Refills Authorized</label>
                          <input
                            type="number"
                            className="input-field"
                            value={newRx.refillsRemaining}
                            onChange={(e) => setNewRx({ ...newRx, refillsRemaining: e.target.value })}
                            min="0"
                            max="12"
                          />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowNewRxForm(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-success">
                          Verify & Sign Prescription
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Prescriptions List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedPatientData.prescriptions.map(rx => (
                      <div key={rx.id} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{rx.drugName}</strong>
                            <span style={{ fontSize: '0.8rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--primary-cyan)', padding: '0.1rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                              {rx.dosage}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>
                            {rx.frequency} | Prescribed by <strong>{rx.prescribedBy}</strong> on {rx.startDate}
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
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.25rem' }}>
                            Refills Left: {rx.refillsRemaining}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Full Medical History Timeline */}
              <div className="col-5">
                <div className="glass-panel card-padding" style={{ height: '100%' }}>
                  <div className="card-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Clock color="var(--primary-cyan)" size={20} />
                      <span>Complete Medical History Timeline</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      {selectedPatientData.medicalHistory.length} Records Logged
                    </span>
                  </div>

                  <div className="timeline" style={{ marginTop: '1.25rem' }}>
                    {selectedPatientData.medicalHistory.map(hist => (
                      <div key={hist.id} className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-date">{hist.date} • {hist.facility}</div>
                        <div className="timeline-title">{hist.title}</div>
                        <div className="timeline-desc">{hist.description}</div>
                        <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--primary-violet)', background: 'rgba(139, 92, 246, 0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                            ICD: {hist.icdCode}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                            Attending: {hist.doctor}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Emergency Relative Modal */}
      {showEmergencyModal && selectedPatientUser && (
        <EmergencyModal
          patientUser={selectedPatientUser}
          patientData={selectedPatientData}
          onClose={() => setShowEmergencyModal(false)}
        />
      )}
    </div>
  );
};
