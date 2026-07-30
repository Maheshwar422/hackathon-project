import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, AlertOctagon, ShieldAlert, Phone, UserCheck, X, Fingerprint, BadgeCheck, Zap } from 'lucide-react';

export const EmergencyModal = ({ patientUser, patientData, onClose }) => {
  const { currentUser, executeEmergencyBreakGlass } = useApp();

  const [reason, setReason] = useState('Acute Trauma Admission - Patient Unconscious / Emergency Verbal Relative Authorization');
  const [callStatus, setCallStatus] = useState('IDLE'); // IDLE, CALLING, CONNECTED, DISCONNECTED
  const [consentGiven, setConsentGiven] = useState(true);
  const [aadhaarVerified, setAadhaarVerified] = useState(true);

  const relative = patientUser?.emergencyContact || {
    name: 'Sarah Vance',
    relationship: 'Wife',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace'
  };

  const presetReasons = [
    'Acute Trauma Admission - Unconscious Patient',
    'Severe Allergic Anaphylaxis / Airway Compromise',
    'Acute Cardiac Event / Telemetry Emergency'
  ];

  const handleSimulateCall = () => {
    setCallStatus('CALLING');
    setTimeout(() => {
      setCallStatus('CONNECTED');
    }, 1500);
  };

  const handleSubmitOverride = (e) => {
    e.preventDefault();
    if (!reason || !consentGiven) return;

    executeEmergencyBreakGlass(
      patientUser.id,
      reason,
      relative.name,
      relative.phone
    );

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertOctagon size={26} color="var(--danger-crimson)" className="pulse" />
            <div>
              <h3 style={{ color: 'var(--danger-crimson)', fontSize: '1.15rem' }}>
                Emergency Break-Glass & Relative Consent
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Protocol for <strong>{patientUser?.name}</strong> ({patientUser?.age} y/o {patientUser?.gender})
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmitOverride}>
          <div className="modal-body">
            {/* Aadhaar & ABHA Health ID Verification Space */}
            <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(6, 182, 212, 0.12))', border: '1px solid var(--primary-violet)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Fingerprint size={20} color="var(--primary-violet)" />
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Aadhaar & ABHA National Health ID Integration</strong>
                </div>
                <span className="role-badge admin" style={{ fontSize: '0.65rem' }}>
                  <BadgeCheck size={12} /> UIDAI VERIFIED
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <div>
                  <span>Aadhaar Card No:</span>{' '}
                  <strong style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                    {patientUser?.aadhaarNumber || '9842-1049-5820'}
                  </strong>
                </div>
                <div>
                  <span>ABHA Number:</span>{' '}
                  <strong style={{ color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)' }}>
                    {patientUser?.abhaNumber || '14-9283-4019-2041'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Patient Quick Medical Summary */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Blood Group</span>
                <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--danger-crimson)' }}>{patientUser?.bloodType}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Severe Allergies</span>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{patientUser?.allergies?.join(', ') || 'None'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Emergency Access</span>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--warning-amber)' }}>Break-Glass Required</p>
              </div>
            </div>

            {/* Relative Contact Card */}
            <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(99, 102, 241, 0.1))', border: '1px solid var(--primary-cyan)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                    DESIGNATED EMERGENCY RELATIVE CONTACT
                  </span>
                  <h4 style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>{relative.name}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Relationship: <strong>{relative.relationship}</strong>
                  </span>
                </div>

                {callStatus === 'IDLE' && (
                  <button
                    type="button"
                    onClick={handleSimulateCall}
                    className="btn btn-primary"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}
                  >
                    <PhoneCall size={14} /> Call Relative
                  </button>
                )}

                {callStatus === 'CALLING' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning-amber)', fontSize: '0.85rem', fontWeight: 700 }} className="pulse">
                    <Phone size={16} /> Dialing {relative.phone}...
                  </div>
                )}

                {callStatus === 'CONNECTED' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald-success)', fontSize: '0.85rem', fontWeight: 700 }}>
                    <UserCheck size={16} /> Connected & Consent Granted
                  </div>
                )}
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.25)', padding: '0.6rem 0.8rem', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}>
                📞 Phone: <strong>{relative.phone}</strong> | Alt: {relative.alternatePhone || 'N/A'}
              </div>
            </div>

            {/* Emergency Justification Form with Quick Preset Auto-fill */}
            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <label className="input-label">Emergency Override Reason *</label>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary-cyan)', fontWeight: 600 }}>Quick Presets:</span>
              </div>

              {/* Preset Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                {presetReasons.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReason(preset)}
                    style={{
                      fontSize: '0.725rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ⚡ {preset.split('-')[0]}
                  </button>
                ))}
              </div>

              <textarea
                className="input-field"
                rows="2"
                placeholder="Type emergency reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div style={{ margin: '0.85rem 0' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  style={{ marginTop: '3px', accentColor: 'var(--danger-crimson)' }}
                  required
                />
                <span>
                  I, <strong>{currentUser.name}</strong>, certify under penalty of medical audit that I have attempted contact with emergency relative <strong>{relative.name}</strong> and obtained emergency verbal authorization to override patient data locks for critical care.
                </span>
              </label>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px dashed var(--danger-crimson)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ⚠️ <strong>Audit Warning:</strong> This emergency action will generate an immutable entry in the Admin Governance Audit Log.
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              disabled={!reason || !consentGiven}
              style={{
                opacity: (!reason || !consentGiven) ? 0.5 : 1,
                cursor: (!reason || !consentGiven) ? 'not-allowed' : 'pointer',
                boxShadow: '0 0 15px var(--danger-glow)'
              }}
            >
              <ShieldAlert size={16} /> Confirm Emergency Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
