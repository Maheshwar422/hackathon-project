import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Activity, Users, Lock, FileSpreadsheet, Eye, Terminal, Search, Filter } from 'lucide-react';

export const AdminView = () => {
  const { users, currentUser, patientsData, auditLogs } = useApp();

  const [filterRole, setFilterRole] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('LOGS'); // LOGS, DATABASE, METRICS

  const doctors = users.filter(u => u.role === 'DOCTOR');
  const patients = users.filter(u => u.role === 'PATIENT');

  // Filter logs based on search and role filter
  const filteredLogs = auditLogs.filter(log => {
    const matchesRole = filterRole === 'ALL' || log.actorRole === filterRole;
    const matchesSearch =
      log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetPatientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div>
      {/* Admin Header Banner */}
      <div className="glass-panel card-padding" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(15, 23, 42, 0.85) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'var(--primary-violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2>{currentUser.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {currentUser.department} (Global Data Sovereign Audit & Access Control)
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-violet)', fontWeight: 700, textTransform: 'uppercase' }}>
              Governance Protocol v4.2
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Real-time DB Ledger Monitor Active
            </p>
          </div>
        </div>
      </div>

      {/* System Stats Overview */}
      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper stat-icon-cyan">
            <Users size={22} />
          </div>
          <div>
            <div className="stat-val">{users.length}</div>
            <div className="stat-lbl">Registered Mesh Users</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper stat-icon-emerald">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="stat-val">{doctors.length} Doctors / {patients.length} Patients</div>
            <div className="stat-lbl">System Account Roster</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper stat-icon-violet">
            <Activity size={22} />
          </div>
          <div>
            <div className="stat-val">{auditLogs.length}</div>
            <div className="stat-lbl">Immutable Audit Log Events</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper stat-icon-crimson">
            <Lock size={22} />
          </div>
          <div>
            <div className="stat-val">
              {auditLogs.filter(l => l.action.includes('EMERGENCY')).length}
            </div>
            <div className="stat-lbl">Emergency Break-Glass Overrides</div>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('LOGS')}
          className={`btn ${activeTab === 'LOGS' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <FileSpreadsheet size={16} /> Audit Trail Log Monitor
        </button>
        <button
          onClick={() => setActiveTab('DATABASE')}
          className={`btn ${activeTab === 'DATABASE' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Terminal size={16} /> Live Database & AI Inspector
        </button>
      </div>

      {/* Tab 1: Audit Log Monitor */}
      {activeTab === 'LOGS' && (
        <div className="glass-panel card-padding">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Activity color="var(--primary-cyan)" size={22} />
              <span>Doctor & Patient System Audit Ledger</span>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  className="input-field"
                  placeholder="Search logs by user, patient, or action..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2rem', fontSize: '0.8rem', width: '260px' }}
                />
              </div>

              <select
                className="profile-select"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
              >
                <option value="ALL">All Roles</option>
                <option value="DOCTOR">Doctors Only</option>
                <option value="PATIENT">Patients Only</option>
                <option value="ADMIN">Admins Only</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Log ID & Timestamp</th>
                  <th>Actor</th>
                  <th>Role</th>
                  <th>Action Executed</th>
                  <th>Target Patient</th>
                  <th>Details & Security Context</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary-cyan)', display: 'block' }}>
                        {log.id}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {log.timestamp}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{log.actorName}</td>
                    <td>
                      <span className={`role-badge ${log.actorRole.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
                        {log.actorRole}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {log.action}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--primary-indigo)', fontWeight: 600 }}>
                      {log.targetPatientName}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '380px' }}>
                      {log.details}
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: log.status.includes('EMERGENCY') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                        color: log.status.includes('EMERGENCY') ? 'var(--danger-crimson)' : 'var(--emerald-success)',
                        border: log.status.includes('EMERGENCY') ? '1px solid var(--danger-crimson)' : '1px solid var(--emerald-success)'
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
      )}

      {/* Tab 2: Live Database & AI Inspector */}
      {activeTab === 'DATABASE' && (
        <div className="glass-panel card-padding">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Terminal color="var(--primary-cyan)" size={22} />
              <span>Live Patient Database & AI State Inspector</span>
            </div>
            <span className="role-badge admin">FULL ADMIN READ ACCESS</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Inspect raw JSON patient objects, sovereign permission matrices, prescription records, and AI diagnostic risk summaries.
          </p>

          <pre style={{
            background: '#04070d',
            color: '#38bdf8',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            overflowX: 'auto',
            maxHeight: '600px',
            border: '1px solid var(--border-color)'
          }}>
            {JSON.stringify(patientsData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
