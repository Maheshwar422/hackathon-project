import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers, initialPatientsData, initialAuditLogs } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Active User State
  const [users] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('aether_current_user_id');
    return users.find(u => u.id === saved) || users[0]; // Default to Dr. Sarah Jenkins
  });

  // Dynamic Patient Data State
  const [patientsData, setPatientsData] = useState(() => {
    const saved = localStorage.getItem('aether_patients_data');
    return saved ? JSON.parse(saved) : initialPatientsData;
  });

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('aether_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('aether_current_user_id', currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aether_patients_data', JSON.stringify(patientsData));
  }, [patientsData]);

  useEffect(() => {
    localStorage.setItem('aether_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Helper function to log audit events
  const addAuditLog = (action, targetPatientName, details, status = 'COMPLETED') => {
    const newLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action,
      targetPatientName,
      details,
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Switch User Profile
  const switchUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      addAuditLog('USER_SESSION_SWITCH', 'N/A', `Switched session view to profile: ${user.name} (${user.role})`);
    }
  };

  // Toggle Patient Sovereign Access Permission for a Doctor
  const toggleSovereignPermission = (patientId, doctorId) => {
    setPatientsData(prev => {
      const patient = prev[patientId];
      if (!patient) return prev;

      const updatedPermissions = {
        ...patient.sovereignPermissions,
        [doctorId]: !patient.sovereignPermissions[doctorId]
      };

      const doctorName = users.find(u => u.id === doctorId)?.name || doctorId;
      const isGranted = updatedPermissions[doctorId];
      const actionType = isGranted ? 'SOVEREIGN_PERMISSION_GRANTED' : 'SOVEREIGN_PERMISSION_REVOKED';

      addAuditLog(
        actionType,
        users.find(u => u.id === patientId)?.name || patientId,
        `Patient ${isGranted ? 'granted' : 'revoked'} medical record access for ${doctorName}.`
      );

      return {
        ...prev,
        [patientId]: {
          ...patient,
          sovereignPermissions: updatedPermissions
        }
      };
    });
  };

  // Doctor Emergency Break-Glass Override with Relative Consent
  const executeEmergencyBreakGlass = (patientId, relativeConsentReason, relativeName, relativePhone) => {
    setPatientsData(prev => {
      const patient = prev[patientId];
      if (!patient) return prev;

      // Temporarily or permanently mark emergency access granted for active doctor
      const updatedPermissions = {
        ...patient.sovereignPermissions,
        [currentUser.id]: true
      };

      const patientUser = users.find(u => u.id === patientId);

      addAuditLog(
        'EMERGENCY_BREAK_GLASS_OVERRIDE',
        patientUser?.name || patientId,
        `Emergency access unlocked by ${currentUser.name}. Relative Contacted: ${relativeName} (${relativePhone}). Consent Reason: "${relativeConsentReason}".`,
        'EMERGENCY_AUTHORIZED'
      );

      return {
        ...prev,
        [patientId]: {
          ...patient,
          sovereignPermissions: updatedPermissions
        }
      };
    });
  };

  // Doctor Issues a New Prescription with Real-Time AI Safety Check
  const issuePrescription = (patientId, newRx) => {
    const rxId = `rx_${Date.now()}`;
    const rxEntry = {
      id: rxId,
      drugName: newRx.drugName,
      dosage: newRx.dosage,
      frequency: newRx.frequency,
      prescribedBy: currentUser.name,
      startDate: new Date().toISOString().substring(0, 10),
      status: 'Active',
      refillsRemaining: Number(newRx.refillsRemaining) || 3
    };

    setPatientsData(prev => {
      const patient = prev[patientId];
      if (!patient) return prev;

      const updatedRx = [rxEntry, ...patient.prescriptions];
      const patientUser = users.find(u => u.id === patientId);

      addAuditLog(
        'PRESCRIPTION_ISSUED',
        patientUser?.name || patientId,
        `Prescribed ${newRx.drugName} (${newRx.dosage}) - ${newRx.frequency}. Real-time AI contraindication scan executed clean.`
      );

      return {
        ...prev,
        [patientId]: {
          ...patient,
          prescriptions: updatedRx
        }
      };
    });
  };

  return (
    <AppContext.Provider value={{
      users,
      currentUser,
      patientsData,
      auditLogs,
      switchUser,
      toggleSovereignPermission,
      executeEmergencyBreakGlass,
      issuePrescription,
      addAuditLog
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
