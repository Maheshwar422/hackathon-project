export const initialUsers = [
  // Doctors
  {
    id: 'doc_1',
    name: 'Dr. Sarah Jenkins',
    role: 'DOCTOR',
    email: 'dr.jenkins@healthnet.org',
    specialty: 'Cardiology & Vascular Medicine',
    hospital: 'St. Jude General Hospital',
    license: 'MD-849201-CA'
  },
  {
    id: 'doc_2',
    name: 'Dr. Rajesh Kumar',
    role: 'DOCTOR',
    email: 'dr.kumar@healthnet.org',
    specialty: 'Neurology & Internal Medicine',
    hospital: 'Metropolitan Medical Center',
    license: 'MD-920412-NY'
  },
  {
    id: 'doc_3',
    name: 'Dr. Elena Rostova',
    role: 'DOCTOR',
    email: 'dr.rostova@healthnet.org',
    specialty: 'Emergency & Trauma Care',
    hospital: 'Apex Trauma Unit',
    license: 'MD-718234-TX'
  },

  // Patients with Aadhaar & ABHA Integration
  {
    id: 'pat_1',
    name: 'Marcus Vance',
    role: 'PATIENT',
    email: 'marcus.vance@patient.io',
    age: 34,
    gender: 'Male',
    bloodType: 'A+',
    aadhaarNumber: '9842-1049-5820',
    abhaNumber: '14-9283-4019-2041',
    abhaAddress: 'marcus.vance@abha',
    aadhaarStatus: 'VERIFIED_UIDAI',
    allergies: ['Penicillin', 'Sulfa Drugs'],
    emergencyContact: {
      name: 'Sarah Vance',
      relationship: 'Wife',
      phone: '+1 (555) 019-2834',
      alternatePhone: '+1 (555) 019-2835',
      address: '742 Evergreen Terrace, Sector 4'
    }
  },
  {
    id: 'pat_2',
    name: 'Aisha Patel',
    role: 'PATIENT',
    email: 'aisha.patel@patient.io',
    age: 28,
    gender: 'Female',
    bloodType: 'O-',
    aadhaarNumber: '4920-8173-9014',
    abhaNumber: '91-4820-1940-8271',
    abhaAddress: 'aisha.patel@abha',
    aadhaarStatus: 'VERIFIED_UIDAI',
    allergies: ['Peanuts', 'NSAIDs', 'Lactulose'],
    emergencyContact: {
      name: 'Ramesh Patel',
      relationship: 'Father',
      phone: '+1 (555) 014-4910',
      alternatePhone: '+1 (555) 014-4911',
      address: '108 West End Ave, Suite 3B'
    }
  },
  {
    id: 'pat_3',
    name: 'David Chen',
    role: 'PATIENT',
    email: 'david.chen@patient.io',
    age: 45,
    gender: 'Male',
    bloodType: 'B+',
    aadhaarNumber: '7104-9283-4109',
    abhaNumber: '62-8104-9204-7182',
    abhaAddress: 'david.chen@abha',
    aadhaarStatus: 'VERIFIED_UIDAI',
    allergies: ['Iodine Contrast Media'],
    emergencyContact: {
      name: 'Mei Chen',
      relationship: 'Sister',
      phone: '+1 (555) 018-8231',
      alternatePhone: '+1 (555) 018-8232',
      address: '52 Bay State Rd, Apt 14'
    }
  },

  // Admin
  {
    id: 'admin_1',
    name: 'Governance Admin (System Security)',
    role: 'ADMIN',
    email: 'admin@healthnet.org',
    department: 'Health Data Sovereignty & Audit Compliance'
  }
];

export const initialPatientsData = {
  pat_1: {
    patientId: 'pat_1',
    sovereignPermissions: {
      doc_1: true,  // Dr. Sarah Jenkins (Cardiologist) has permission
      doc_2: false, // Dr. Rajesh Kumar access revoked by patient
      doc_3: false  // Dr. Elena Rostova (Emergency - relies on Emergency Break-Glass)
    },
    medicalHistory: [
      {
        id: 'hist_101',
        date: '2025-11-14',
        type: 'Hospitalization',
        title: 'Acute Hypertensive Crisis',
        doctor: 'Dr. Sarah Jenkins',
        facility: 'St. Jude General Hospital',
        description: 'Admitted with BP 185/115 mmHg. Administered IV Labetalol. Stable after 48 hrs telemetry observation.',
        icdCode: 'I10'
      },
      {
        id: 'hist_102',
        date: '2024-06-20',
        type: 'Diagnostic Scan',
        title: 'Echocardiogram - Left Ventricular Hypertrophy',
        doctor: 'Dr. Sarah Jenkins',
        facility: 'Cardiology Imaging Suite',
        description: 'Ejection fraction 62%. Asymmetric septal thickness noted (14mm). Mild mitral regurgitation.',
        icdCode: 'I42.1'
      },
      {
        id: 'hist_103',
        date: '2023-02-10',
        type: 'Surgical History',
        title: 'Arthroscopic Knee Repair',
        doctor: 'Dr. Alan Vance',
        facility: 'OrthoSurge Center',
        description: 'Unremarkable left knee ACL reconstruction.',
        icdCode: 'S83.5'
      }
    ],
    prescriptions: [
      {
        id: 'rx_101',
        drugName: 'Lisinopril',
        dosage: '20 mg',
        frequency: 'Once Daily (Morning)',
        prescribedBy: 'Dr. Sarah Jenkins',
        startDate: '2025-11-16',
        status: 'Active',
        refillsRemaining: 3
      },
      {
        id: 'rx_102',
        drugName: 'Metoprolol Succinate',
        dosage: '50 mg',
        frequency: 'Once Daily (Evening)',
        prescribedBy: 'Dr. Sarah Jenkins',
        startDate: '2025-11-16',
        status: 'Active',
        refillsRemaining: 2
      },
      {
        id: 'rx_103',
        drugName: 'Amoxicillin',
        dosage: '500 mg',
        frequency: 'Discontinued',
        prescribedBy: 'Dr. Rajesh Kumar',
        startDate: '2023-01-05',
        status: 'Discontinued (Allergy Warning)',
        refillsRemaining: 0
      }
    ],
    aiClinicalSummary: {
      riskScore: 'MODERATE-HIGH',
      summary: 'Patient presents elevated cardiovascular risk profile secondary to asymmetric septal hypertrophy and episodic severe hypertension. Real-time pharmacological audit indicates strict avoidance of Beta-blocker abrupt discontinuation.',
      drugInteractions: [
        { severity: 'MEDIUM', detail: 'Combining Lisinopril with NSAIDs may reduce antihypertensive efficacy and impair renal hemodynamics.' },
        { severity: 'HIGH', detail: 'Allergy alert logged: Patient allergic to Penicillin class; cross-reactivity with cephalosporins requires cautious evaluation.' }
      ],
      recommendedNextSteps: 'Order 24-hr Holter monitor and follow up serum potassium levels in 4 weeks.',
      lastUpdated: '2026-07-28'
    }
  },

  pat_2: {
    patientId: 'pat_2',
    sovereignPermissions: {
      doc_1: false,
      doc_2: true,  // Dr. Rajesh Kumar has permission
      doc_3: false
    },
    medicalHistory: [
      {
        id: 'hist_201',
        date: '2026-03-10',
        type: 'Emergency Visit',
        title: 'Acute Asthma Exacerbation & Bronchospasm',
        doctor: 'Dr. Elena Rostova',
        facility: 'Apex Trauma Unit',
        description: 'Treated with nebulized Albuterol/Ipratropium and IV Methylprednisolone. Peak expiratory flow improved from 180 to 410 L/min.',
        icdCode: 'J45.901'
      },
      {
        id: 'hist_202',
        date: '2025-08-15',
        type: 'Endocrinology Audit',
        title: 'Type 1 Diabetes Management & HbA1c Evaluation',
        doctor: 'Dr. Rajesh Kumar',
        facility: 'Metropolitan Medical Center',
        description: 'HbA1c levels evaluated at 7.4%. Basal insulin dose adjusted to 18 units Degludec.',
        icdCode: 'E10.9'
      }
    ],
    prescriptions: [
      {
        id: 'rx_201',
        drugName: 'Insulin Degludec (Tresiba)',
        dosage: '18 Units',
        frequency: 'Subcutaneous Once Daily at Bedtime',
        prescribedBy: 'Dr. Rajesh Kumar',
        startDate: '2025-08-15',
        status: 'Active',
        refillsRemaining: 5
      },
      {
        id: 'rx_202',
        drugName: 'Albuterol Inhaler (Ventolin HFA)',
        dosage: '90 mcg/actuation',
        frequency: '2 Puffs Every 4 Hours PRN for Dyspnea',
        prescribedBy: 'Dr. Elena Rostova',
        startDate: '2026-03-10',
        status: 'Active',
        refillsRemaining: 4
      },
      {
        id: 'rx_203',
        drugName: 'EpiPen 0.3mg Auto-Injector',
        dosage: '0.3 mg',
        frequency: 'Use Immediately for Severe Anaphylaxis',
        prescribedBy: 'Dr. Rajesh Kumar',
        startDate: '2024-01-10',
        status: 'Active',
        refillsRemaining: 1
      }
    ],
    aiClinicalSummary: {
      riskScore: 'HIGH (BRONCHIAL & METABOLIC)',
      summary: 'Patient exhibits dual vulnerability: brittle Type 1 Diabetes and hyper-reactive airway disease. High allergy risk to NSAIDs requires immediate alternative pain management protocols.',
      drugInteractions: [
        { severity: 'CRITICAL', detail: 'Non-selective Beta-blockers strictly CONTRAINDICATED due to high risk of refractory bronchospasm.' },
        { severity: 'MEDIUM', detail: 'Systemic corticosteroids may induce transient hyperglycemia requiring tight glycemic monitoring.' }
      ],
      recommendedNextSteps: 'Review CGM sensor telemetry logs and update Anaphylaxis Action Plan with family.',
      lastUpdated: '2026-07-29'
    }
  },

  pat_3: {
    patientId: 'pat_3',
    sovereignPermissions: {
      doc_1: true,
      doc_2: true,
      doc_3: false
    },
    medicalHistory: [
      {
        id: 'hist_301',
        date: '2024-09-02',
        type: 'Interventional Procedure',
        title: 'Percutaneous Coronary Intervention (Drug-Eluting Stent)',
        doctor: 'Dr. Sarah Jenkins',
        facility: 'St. Jude Cardiac Cath Lab',
        description: '90% stenosis in mid-LAD successfully dilated and stented with 3.5 x 18mm XIENCE stent. TIMI 3 flow restored.',
        icdCode: 'I25.10'
      },
      {
        id: 'hist_302',
        date: '2025-05-18',
        type: 'Outpatient Followup',
        title: 'Post-PCI Lipid & Dual Antiplatelet Audit',
        doctor: 'Dr. Sarah Jenkins',
        facility: 'St. Jude General Hospital',
        description: 'LDL-C reduced to 54 mg/dL on Rosuvastatin 40mg. Dual antiplatelet therapy well tolerated.',
        icdCode: 'Z95.5'
      }
    ],
    prescriptions: [
      {
        id: 'rx_301',
        drugName: 'Ticagrelor (Brilinta)',
        dosage: '90 mg',
        frequency: 'Twice Daily',
        prescribedBy: 'Dr. Sarah Jenkins',
        startDate: '2024-09-02',
        status: 'Active',
        refillsRemaining: 2
      },
      {
        id: 'rx_302',
        drugName: 'Aspirin',
        dosage: '81 mg',
        frequency: 'Once Daily',
        prescribedBy: 'Dr. Sarah Jenkins',
        startDate: '2024-09-02',
        status: 'Active',
        refillsRemaining: 6
      },
      {
        id: 'rx_303',
        drugName: 'Rosuvastatin',
        dosage: '40 mg',
        frequency: 'Once Daily at Bedtime',
        prescribedBy: 'Dr. Sarah Jenkins',
        startDate: '2024-09-02',
        status: 'Active',
        refillsRemaining: 4
      }
    ],
    aiClinicalSummary: {
      riskScore: 'STABLE POST-PCI',
      summary: 'Patient displays high adherence to dual antiplatelet regimen post LAD stent deployment. Low bleeding score, excellent lipid control achieved.',
      drugInteractions: [
        { severity: 'HIGH', detail: 'Iodine contrast allergy logged: Future cardiac imaging requires pre-procedure steroid hydration protocol.' },
        { severity: 'MEDIUM', detail: 'Monitor for dyspnea symptoms associated with Ticagrelor initiation.' }
      ],
      recommendedNextSteps: 'Annual cardiac stress test and complete metabolic panel in September 2026.',
      lastUpdated: '2026-07-25'
    }
  }
};

export const initialAuditLogs = [
  {
    id: 'log_001',
    timestamp: '2026-07-30 09:15:22',
    actorName: 'Dr. Sarah Jenkins',
    actorRole: 'DOCTOR',
    action: 'VIEWED_MEDICAL_HISTORY',
    targetPatientName: 'Marcus Vance',
    details: 'Viewed full medical timeline and active prescription roster. Verified Aadhaar UIDAI: 9842-1049-5820.',
    status: 'AUTHORIZED'
  },
  {
    id: 'log_002',
    timestamp: '2026-07-30 10:04:11',
    actorName: 'Marcus Vance',
    actorRole: 'PATIENT',
    action: 'SOVEREIGN_PERMISSION_REVOKED',
    targetPatientName: 'Marcus Vance',
    details: 'Patient revoked access permissions for Dr. Rajesh Kumar.',
    status: 'COMPLETED'
  },
  {
    id: 'log_003',
    timestamp: '2026-07-30 11:45:00',
    actorName: 'Dr. Elena Rostova',
    actorRole: 'DOCTOR',
    action: 'EMERGENCY_OVERRIDE_INITIATED',
    targetPatientName: 'Aisha Patel',
    details: 'Emergency break-glass requested. Relative Contact: Ramesh Patel (+1-555-014-4910). Verbal consent logged for acute asthma care.',
    status: 'EMERGENCY_GRANTED'
  },
  {
    id: 'log_004',
    timestamp: '2026-07-30 12:30:18',
    actorName: 'Governance Admin (System Security)',
    actorRole: 'ADMIN',
    action: 'SYSTEM_AUDIT_INSPECTION',
    targetPatientName: 'ALL_PATIENTS',
    details: 'Performed quarterly compliance check on sovereign consent policies & Aadhaar Vault bindings.',
    status: 'COMPLETED'
  }
];
