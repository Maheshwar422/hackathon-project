import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Stethoscope, User, Lock, Activity } from 'lucide-react';

export const Navbar = () => {
  const { users, currentUser, switchUser } = useApp();

  const getRoleIcon = (role) => {
    switch (role) {
      case 'DOCTOR':
        return <Stethoscope size={14} />;
      case 'PATIENT':
        return <User size={14} />;
      case 'ADMIN':
        return <ShieldCheck size={14} />;
      default:
        return <Activity size={14} />;
    }
  };

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Activity size={22} />
        </div>
        <div>
          <span>Aether Health</span>
          <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--primary-cyan)', fontWeight: 600, letterSpacing: '0.1em' }}>
            PATIENT SOVEREIGNTY NETWORK
          </span>
        </div>
      </div>

      <div className="user-switcher-container">
        <div className={`role-badge ${currentUser.role.toLowerCase()}`}>
          {getRoleIcon(currentUser.role)}
          {currentUser.role} POV
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Switch Persona (Demo)
          </span>
          <select
            className="profile-select"
            value={currentUser.id}
            onChange={(e) => switchUser(e.target.value)}
          >
            <optgroup label="Doctors (Clinical POV)">
              {users.filter(u => u.role === 'DOCTOR').map(u => (
                <option key={u.id} value={u.id}>
                  🩺 {u.name} ({u.specialty.split('&')[0]})
                </option>
              ))}
            </optgroup>
            <optgroup label="Patients (Sovereignty POV)">
              {users.filter(u => u.role === 'PATIENT').map(u => (
                <option key={u.id} value={u.id}>
                  👤 {u.name} ({u.age} y/o)
                </option>
              ))}
            </optgroup>
            <optgroup label="Admin (Audit POV)">
              {users.filter(u => u.role === 'ADMIN').map(u => (
                <option key={u.id} value={u.id}>
                  🛡️ {u.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
    </header>
  );
};
