'use client'

import * as React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuItem {
  id: string
  title: string
  children?: MenuItem[]
}

const doctorProgram: MenuItem[] = [
  {
    id: 'chapter1',
    title: 'Chapter 1: Clinical Evaluation and Diagnosis',
    children: [
      {
        id: 'female-infertility',
        title: '1. Female Infertility Assessment',
        children: [
          { id: 'history-taking', title: 'Detailed history-taking (menstrual, obstetric, and sexual history)' },
          { id: 'physical-exam', title: 'Physical examination (pelvic exam, BMI, signs of PCOS, endometriosis)' },
          { id: 'diagnostic-tests', title: 'Diagnostic tests (AMH, AFC, tubal patency tests - HSG, SIS)' },
          { id: 'hormonal-assays', title: 'Interpreting hormonal assays (FSH, LH, estradiol, progesterone)' }
        ]
      },
      {
        id: 'male-infertility',
        title: '2. Male Infertility Assessment',
        children: [
          { id: 'male-history', title: 'Comprehensive history-taking (sexual history, previous infections, surgeries)' },
          { id: 'male-exam', title: 'Physical examination (testicular size, varicocele detection)' },
          { id: 'semen-analysis', title: 'Semen analysis (parameters, WHO guidelines, interpretation)' },
          { id: 'advanced-tests', title: 'Advanced tests (DNA fragmentation, ROS, genetic karyotyping)' }
        ]
      },
      {
        id: 'genetic-screening',
        title: '3. Genetic and Infectious Screening',
        children: [
          { id: 'preconception', title: 'Preconception genetic screening (karyotyping, CFTR, thalassemia)' },
          { id: 'viral-screening', title: 'Screening for viral infections (HBV, HCV, HIV)' },
          { id: 'positive-cases', title: 'Workflow for managing positive cases' }
        ]
      }
    ]
  },
  {
    id: 'chapter2',
    title: 'Chapter 2: Ovarian Stimulation Protocols',
    children: [
      {
        id: 'stimulation-types',
        title: '1. Types of Stimulation Protocols',
        children: [
          { id: 'gnrh-agonist', title: 'GnRH agonist protocol (long, short)' },
          { id: 'gnrh-antagonist', title: 'GnRH antagonist protocol (fixed, flexible start)' },
          { id: 'poor-responders', title: 'Protocol for poor responders (duo stimulation, mild stimulation)' }
        ]
      },
      {
        id: 'personalization',
        title: '2. Personalizing Stimulation',
        children: [
          { id: 'protocol-selection', title: 'Protocol selection based on parameters (age, AMH, AFC)' },
          { id: 'dosage-adjustments', title: 'Dosage adjustments and step-up protocols' },
          { id: 'monitoring', title: 'Monitoring ovarian response (ultrasound and E2 levels)' }
        ]
      },
      {
        id: 'complications',
        title: '3. Managing Complications',
        children: [
          { id: 'ohss', title: 'Early detection and management of OHSS' },
          { id: 'high-risk', title: 'Adjusting protocols for high-risk patients (PCOS, endometriosis)' }
        ]
      }
    ]
  },
  {
    id: 'chapter3',
    title: 'Chapter 3: Ultrasound and Imaging Techniques',
    children: [
      {
        id: 'follicular-monitoring',
        title: '1. Follicular Monitoring',
        children: [
          { id: 'growth-patterns', title: 'Identifying follicular growth patterns' },
          { id: 'response-signs', title: 'Recognizing signs of over-response or inadequate response' }
        ]
      },
      {
        id: 'endometrial',
        title: '2. Endometrial Assessment',
        children: [
          { id: 'thickness', title: 'Measuring endometrial thickness' },
          { id: 'pattern', title: 'Identifying trilaminar pattern and abnormal findings' }
        ]
      },
      {
        id: 'uterine-abnormalities',
        title: '3. Identifying Uterine Abnormalities',
        children: [
          { id: 'diagnosis', title: 'Diagnosing abnormalities (polyps, fibroids, and adhesions)' },
          { id: 'confirmation', title: 'Training on SIS and hysteroscopy for confirmation' }
        ]
      }
    ]
  },
  {
    id: 'chapter4',
    title: 'Chapter 4: Procedure-Specific Training',
    children: [
      {
        id: 'oocyte-retrieval',
        title: '1. Oocyte Retrieval',
        children: [
          { id: 'pre-retrieval', title: 'Pre-retrieval preparation (patient counselling, surgical setup)' },
          { id: 'surgical-technique', title: 'Step-by-step surgical technique (ultrasound-guided aspiration)' },
          { id: 'complications', title: 'Preventing complications (bleeding, infection management)' }
        ]
      },
      {
        id: 'embryo-transfer',
        title: '2. Embryo Transfer',
        children: [
          { id: 'pre-transfer', title: 'Pre-transfer preparation (uterine cavity assessment)' },
          { id: 'catheter-selection', title: 'Selection of catheters and ultrasound guidance' },
          { id: 'implantation', title: 'Strategies to improve implantation (endometrial priming, ERA)' }
        ]
      },
      {
        id: 'sperm-retrieval',
        title: '3. Surgical Sperm Retrieval',
        children: [
          { id: 'indications', title: 'Indications for procedures (TESA, PESA, micro-TESE)' },
          { id: 'techniques', title: 'Techniques and equipment handling (surgical approaches)' }
        ]
      }
    ]
  },
  {
    id: 'chapter5',
    title: 'Chapter 5: Patient Management',
    children: [
      {
        id: 'pre-ivf',
        title: '1. Pre-IVF Workup',
        children: [
          { id: 'investigations', title: 'Standardizing pre-cycle investigations (baseline tests, screening)' },
          { id: 'counselling', title: 'Counselling patients (timelines, expectations, success rates)' }
        ]
      },
      {
        id: 'special-scenarios',
        title: '2. Specialized Patient Scenarios',
        children: [
          { id: 'poor-responders', title: 'Protocols for poor responders (advanced age strategies)' },
          { id: 'implantation-failure', title: 'Handling recurrent implantation failure (investigation and management)' }
        ]
      },
      {
        id: 'post-cycle',
        title: '3. Post-Cycle Monitoring',
        children: [
          { id: 'luteal-support', title: 'Luteal phase support strategies (progesterone supplementation)' },
          { id: 'complications', title: 'Monitoring early pregnancy complications (biochemical monitoring)' }
        ]
      }
    ]
  },
  {
    id: 'chapter6',
    title: 'Chapter 6: Complications Management',
    children: [
      {
        id: 'ohss-management',
        title: '1. OHSS',
        children: [
          { id: 'grading', title: 'Grading OHSS severity (mild, moderate, severe classification)' },
          { id: 'treatment', title: 'Stepwise treatment (IV fluids, albumin, anticoagulants)' }
        ]
      },
      {
        id: 'early-complications',
        title: '2. Early Pregnancy Complications',
        children: [
          { id: 'ectopic', title: 'Managing ectopic pregnancy (early detection and intervention)' },
          { id: 'miscarriage', title: 'Post-miscarriage counselling (emotional support, future planning)' }
        ]
      }
    ]
  },
  {
    id: 'chapter7',
    title: 'Chapter 7: Ethics and Legal Aspects',
    children: [
      {
        id: 'consent',
        title: '1. Consent Documentation',
        children: [
          { id: 'forms', title: 'Standardized forms (IVF, ICSI, egg donation, surrogacy documentation)' },
          { id: 'queries', title: 'Addressing patient queries (legal implications, rights)' }
        ]
      },
      {
        id: 'legal',
        title: '2. Legal Aspects',
        children: [
          { id: 'guidelines', title: 'Third-party reproduction guidelines (donor selection, legal framework)' },
          { id: 'confidentiality', title: 'Patient confidentiality (data protection, information sharing)' }
        ]
      }
    ]
  }
]

const embryologistProgram: MenuItem[] = [
  {
    id: 'lab-setup',
    title: 'Chapter 1: Lab Setup and Equipment Management',
    children: [
      {
        id: 'setup',
        title: '1. Laboratory Setup',
        children: [
          { id: 'sterile-env', title: 'Creating sterile environment (air quality, workflow optimization)' },
          { id: 'equipment-layout', title: 'Equipment layout and workflows (optimal performance setup)' }
        ]
      },
      {
        id: 'calibration',
        title: '2. Equipment Calibration',
        children: [
          { id: 'schedules', title: 'Routine calibration schedules (maintenance protocols)' },
          { id: 'quality-checks', title: 'Quality checks (incubators, ICSI microscopes, cryopreservation tanks)' }
        ]
      }
    ]
  },
  {
    id: 'gamete-handling',
    title: 'Chapter 2: Gamete Handling',
    children: [
      {
        id: 'sperm-prep',
        title: '1. Sperm Preparation',
        children: [
          { id: 'techniques', title: 'Preparation techniques (density gradient centrifugation vs. swim-up)' },
          { id: 'poor-samples', title: 'Processing poor-quality samples (optimization methods)' }
        ]
      },
      {
        id: 'oocyte-handling',
        title: '2. Oocyte Handling',
        children: [
          { id: 'maturity', title: 'Identifying mature oocytes (morphological assessment)' },
          { id: 'grading', title: 'Grading oocytes (quality and viability markers)' }
        ]
      }
    ]
  },
  {
    id: 'fertilization',
    title: 'Chapter 3: Fertilization Techniques',
    children: [
      {
        id: 'ivf-tech',
        title: '1. IVF',
        children: [
          { id: 'preparation', title: 'Preparing for insemination (gamete co-incubation protocols)' },
          { id: 'identification', title: 'Identifying fertilization (pronuclear assessment)' }
        ]
      },
      {
        id: 'icsi',
        title: '2. ICSI',
        children: [
          { id: 'microscope', title: 'Microscope calibration (equipment setup, maintenance)' },
          { id: 'injection', title: 'Sperm injection techniques (proper angle, minimal damage)' }
        ]
      }
    ]
  },
  {
    id: 'embryo-culture',
    title: 'Chapter 4: Embryo Culture',
    children: [
      {
        id: 'grading',
        title: '1. Embryo Grading',
        children: [
          { id: 'day3', title: 'Day 3 assessment (cell count, fragmentation analysis)' },
          { id: 'day5', title: 'Day 5 assessment (ICM, trophectoderm evaluation)' }
        ]
      },
      {
        id: 'blastocyst',
        title: '2. Blastocyst Formation',
        children: [
          { id: 'culture', title: 'Extended culture techniques (sequential media protocols)' },
          { id: 'viability', title: 'Assessing viability (morphological markers)' }
        ]
      }
    ]
  },
  {
    id: 'cryopreservation',
    title: 'Chapter 5: Cryopreservation',
    children: [
      {
        id: 'vitrification',
        title: '1. Vitrification Techniques',
        children: [
          { id: 'rapid-freezing', title: 'Rapid freezing protocols (oocytes and embryos)' },
          { id: 'damage-prevention', title: 'Preventing cryo-damage (optimal cooling rates)' }
        ]
      },
      {
        id: 'thawing',
        title: '2. Thawing Protocols',
        children: [
          { id: 'survival', title: 'Post-thaw survival assessment (viability checks)' },
          { id: 'reculture', title: 'Re-culture protocols (recovery monitoring)' }
        ]
      }
    ]
  },
  {
    id: 'advanced-tech',
    title: 'Chapter 6: Advanced Technologies',
    children: [
      {
        id: 'pgt',
        title: '1. PGT Workflow',
        children: [
          { id: 'biopsy', title: 'Embryo biopsy (technique optimization, cell number)' },
          { id: 'handling', title: 'Sample handling (fixation, transportation)' }
        ]
      },
      {
        id: 'ai-tools',
        title: '2. AI in Embryology',
        children: [
          { id: 'scoring', title: 'AI embryo scoring (morphological assessment tools)' },
          { id: 'selection', title: 'Selection tools (time-lapse analysis)' }
        ]
      }
    ]
  },
  {
    id: 'quality',
    title: 'Chapter 7: Quality Monitoring and Safety',
    children: [
      {
        id: 'metrics',
        title: '1. KPI Metrics',
        children: [
          { id: 'rates', title: 'Monitoring success rates (fertilization, cleavage, blastocyst)' },
          { id: 'documentation', title: 'Lab documentation (audit preparation, reporting)' }
        ]
      },
      {
        id: 'emergency',
        title: '2. Emergency Protocols',
        children: [
          { id: 'failures', title: 'Equipment failures (backup systems, contingency plans)' },
          { id: 'safety', title: 'Safety drills (emergency procedures, staff training)' }
        ]
      }
    ]
  }
]

const counsellorProgram: MenuItem[] = [
  {
    id: 'communication',
    title: 'Chapter 1: Patient Communication Skills',
    children: [
      {
        id: 'foundation',
        title: '1. Foundational Communication Techniques',
        children: [
          { id: 'active-listening', title: 'Active listening and rapport building (verbal and non-verbal cues)' },
          { id: 'empathy', title: 'Empathy-driven communication (emotional intelligence in practice)' },
          { id: 'complex-info', title: 'Delivering complex information (medical terms in simple language)' }
        ]
      },
      {
        id: 'bad-news',
        title: '2. Breaking Bad News',
        children: [
          { id: 'preparation', title: 'Preparing patients (failed cycles, poor prognosis discussions)' },
          { id: 'emotional-reactions', title: 'Managing reactions (anger, denial, grief responses)' },
          { id: 'role-play', title: 'Role-play exercises (scenario-based training)' }
        ]
      },
      {
        id: 'trust',
        title: '3. Enhancing Patient Trust',
        children: [
          { id: 'transparency', title: 'Maintaining transparency' },
          { id: 'expectations', title: 'Managing expectations' },
          { id: 'feedback', title: 'Continuous feedback collection' }
        ]
      }
    ]
  },
  {
    id: 'psychological',
    title: 'Chapter 2: Psychological Counselling',
    children: [
      {
        id: 'emotional-impact',
        title: '1. Understanding Emotional Impact',
        children: [
          { id: 'distress-signs', title: 'Identifying emotional distress' },
          { id: 'relationship-impact', title: 'Impact on relationships' }
        ]
      },
      {
        id: 'support-strategies',
        title: '2. Strategies for Emotional Support',
        children: [
          { id: 'cbt', title: 'CBT basics for stress management' },
          { id: 'mindfulness', title: 'Mindfulness techniques' },
          { id: 'referrals', title: 'Psychiatric support referrals' }
        ]
      }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Chapter 3: Lifestyle and Behavioral Counselling',
    children: [
      {
        id: 'factors',
        title: '1. Lifestyle Factors',
        children: [
          { id: 'habits', title: 'Impact of habits (smoking, alcohol, substance use)' },
          { id: 'weight', title: 'Weight management (obesity and underweight effects)' },
          { id: 'activity', title: 'Physical activity (stress reduction techniques)' }
        ]
      },
      {
        id: 'modification',
        title: '2. Lifestyle Modification',
        children: [
          { id: 'plans', title: 'Personalized plans (diet, exercise, stress management)' },
          { id: 'collaboration', title: 'Healthcare collaboration (nutritionists, physiotherapists)' }
        ]
      },
      {
        id: 'monitoring',
        title: '3. Monitoring and Follow-Up',
        children: [
          { id: 'adherence', title: 'Checking adherence (lifestyle changes tracking)' },
          { id: 'motivation', title: 'Motivational techniques (behavior modification strategies)' }
        ]
      }
    ]
  },
  {
    id: 'ethics',
    title: 'Chapter 4: Ethics and Legal Counselling',
    children: [
      {
        id: 'informed-consent',
        title: '1. Informed Consent',
        children: [
          { id: 'procedures', title: 'Treatment procedures (risks, outcomes, alternatives)' },
          { id: 'third-party', title: 'Third-party options (donor gametes, surrogacy)' },
          { id: 'documentation', title: 'Legal documentation (consent forms, agreements)' }
        ]
      },
      {
        id: 'third-party-counsel',
        title: '2. Third-Party Reproduction',
        children: [
          { id: 'donor-support', title: 'Donor gamete support (psychological implications)' },
          { id: 'surrogacy', title: 'Surrogacy ethics (legal and emotional aspects)' }
        ]
      },
      {
        id: 'legal-aspects',
        title: '3. Legal Aspects',
        children: [
          { id: 'laws', title: 'Local laws and guidelines' },
          { id: 'confidentiality', title: 'Patient confidentiality' }
        ]
      }
    ]
  },
  {
    id: 'cultural',
    title: 'Chapter 5: Cultural and Religious Sensitivity',
    children: [
      {
        id: 'diversity',
        title: '1. Cultural Diversity',
        children: [
          { id: 'backgrounds', title: 'Cultural backgrounds (infertility perceptions)' },
          { id: 'adaptation', title: 'Adapting approaches (cultural norms, beliefs)' }
        ]
      },
      {
        id: 'religion',
        title: '2. Religious Sensitivities',
        children: [
          { id: 'constraints', title: 'Religious constraints (treatment limitations)' },
          { id: 'collaboration', title: 'Spiritual advisor collaboration (guidance, support)' }
        ]
      }
    ]
  },
  {
    id: 'coordination',
    title: 'Chapter 6: Team Coordination',
    children: [
      {
        id: 'care-models',
        title: '1. Collaborative Care',
        children: [
          { id: 'communication', title: 'Team communication (information alignment)' },
          { id: 'scheduling', title: 'Patient scheduling (procedure coordination)' }
        ]
      },
      {
        id: 'training',
        title: '2. Team Training',
        children: [
          { id: 'updates', title: 'Protocol updates (latest procedures, guidelines)' },
          { id: 'consistency', title: 'Information consistency (unified messaging)' }
        ]
      }
    ]
  },
  {
    id: 'post-treatment',
    title: 'Chapter 7: Post-Treatment Counselling',
    children: [
      {
        id: 'success',
        title: '1. Successful Outcomes',
        children: [
          { id: 'early-pregnancy', title: 'Early pregnancy support (anxiety management)' },
          { id: 'challenges', title: 'Managing challenges (multiple pregnancies, risks)' }
        ]
      },
      {
        id: 'unsuccessful',
        title: '2. Unsuccessful Outcomes',
        children: [
          { id: 'coping', title: 'Coping strategies (emotional recovery)' },
          { id: 'alternatives', title: 'Alternative options (adoption, treatment breaks)' }
        ]
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Chapter 8: Advanced Counselling',
    children: [
      {
        id: 'unique',
        title: '1. Unique Scenarios',
        children: [
          { id: 'terminal', title: 'Terminal diagnoses (fertility preservation options)' },
          { id: 'preservation', title: 'Fertility preservation (oncology cases, elective)' }
        ]
      },
      {
        id: 'group',
        title: '2. Group Counselling',
        children: [
          { id: 'facilitation', title: 'Group facilitation (shared experiences)' },
          { id: 'peer-support', title: 'Peer support models (community building)' }
        ]
      },
      {
        id: 'technology',
        title: '3. Technology in Counselling',
        children: [
          { id: 'telemedicine', title: 'Telemedicine platforms (virtual support)' },
          { id: 'digital-tools', title: 'Digital education tools (apps, resources)' }
        ]
      }
    ]
  }
]

interface MenuItemProps {
  item: MenuItem;
  level?: number;
  onClick?: (item: MenuItem) => void;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item, level = 0, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = `${level * 20}px`;

  const handleClick = async () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    if (onClick && !hasChildren) {
      onClick(item);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer text-sm`}
        style={{ paddingLeft }}
        onClick={handleClick}
        title={item.title}
      >
        {hasChildren && (
          <ChevronRight
            className={`w-4 h-4 mr-2 transition-transform ${
              isOpen ? "transform rotate-90" : ""
            }`}
          />
        )}
        <span className="truncate" title={item.title}>{item.title}</span>
      </div>
      {isOpen && hasChildren && (
        <div>
          {item.children?.map((child, index) => (
            <MenuItemComponent
              key={child.id || index}
              item={child}
              level={level + 1}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarMenuProps {
  role: string;
  onItemSelect?: (item: MenuItem) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ role, onItemSelect }) => {
  const getMenuItems = () => {
    switch (role.toLowerCase()) {
      case 'doctor':
        return doctorProgram;
      case 'embryologist':
        return embryologistProgram;
      case 'counsellor':
        return counsellorProgram;
      default:
        return [];
    }
  };

  return (
    <div className="w-full">
      {getMenuItems().map((item) => (
        <MenuItemComponent
          key={item.id}
          item={item}
          onClick={onItemSelect}
        />
      ))}
    </div>
  );
};

export default SidebarMenu;
