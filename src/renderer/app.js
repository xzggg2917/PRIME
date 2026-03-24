const PRINCIPLES = [
  { id: 'p1', short: 'P1', title: 'Prevention' },
  { id: 'p2', short: 'P2', title: 'Atom Economy' },
  { id: 'p3', short: 'P3', title: 'Less Hazardous Synthesis' },
  { id: 'p4', short: 'P4', title: 'Designing Safer Chemicals' },
  { id: 'p5', short: 'P5', title: 'Safer Solvents and Auxiliaries' },
  { id: 'p6', short: 'P6', title: 'Design for Energy Efficiency' },
  { id: 'p7', short: 'P7', title: 'Use of Renewable Feedstocks' },
  { id: 'p8', short: 'P8', title: 'Reduce Derivatives' },
  { id: 'p9', short: 'P9', title: 'Catalysis' },
  { id: 'p10', short: 'P10', title: 'Design for Degradation' },
  { id: 'p11', short: 'P11', title: 'Real-time Analysis for Pollution Prevention' },
  { id: 'p12', short: 'P12', title: 'Inherently Safer Chemistry for Accident Prevention' }
];

const P4_OPTIONS = [
  {
    key: 'A',
    label: 'A. Minimal Hazard / Proactive Detox Design (1.0)',
    score: 1.0,
    statement: 'The product is known to be non-hazardous/minimally hazardous, or a new molecule was explicitly designed to remove toxicity-alert motifs (toxicophores) using SAR/property prediction.',
    description: 'Use this when molecular-level hazard reduction was intentionally built into design, not accidental.'
  },
  {
    key: 'B',
    label: 'B. Moderate Hazard / Function-Required Conventional Molecule (0.6)',
    score: 0.6,
    statement: 'The product has moderate/common hazard, or it is a function-critical molecule (for example API/high-activity intermediate/agrochemical) where safer substitutes are not practical under equivalent performance.',
    description: 'Use this when hazard exists but is typical/managed and tightly tied to required function.'
  },
  {
    key: 'C',
    label: 'C. High Hazard / Insufficient Toxicity-Avoidance Consideration (0.3)',
    score: 0.3,
    statement: 'The product is known to be highly hazardous while safer substitutes are available but not adopted, or for a new molecule no meaningful toxicity prediction/safety evaluation was performed before synthesis.',
    description: 'Use this when hazard control exists mainly at process level, but molecular safety-by-design is weak.'
  },
  {
    key: 'D',
    label: 'D. Very High Hazard / Red-Line Molecule (0.0)',
    score: 0.0,
    statement: 'The product falls into extreme-hazard classes (for example strong carcinogenicity/mutagenicity/reproductive toxicity or highly persistent bioaccumulative toxicity), and this synthesis is not aimed at removing that hazard.',
    description: 'Use this for clear red-line hazard profiles with no molecular detox strategy.'
  }
];

const P3_OPTIONS = [
  {
    key: 'A',
    label: 'A. Minimal / No Hazard (1.0)',
    score: 1.0,
    statement: 'Across the full route, materials and by-products show no GHS health/environmental hazard labels, or only very mild irritation.',
    description: 'Example: the route uses mostly water/simple organic solvents for workup without high-hazard labels.'
  },
  {
    key: 'B',
    label: 'B. Moderate / Common Level (0.6)',
    score: 0.6,
    statement: 'The highest hazard level observed is limited to Warning-level substances (for example exclamation-mark class hazards).',
    description: 'Example: routine solvents with manageable health/environmental warnings under standard protection.'
  },
  {
    key: 'C',
    label: 'C. High Hazard (0.3)',
    score: 0.3,
    statement: 'The route includes at least one Danger-level substance with relatively high acute or chronic toxicity concerns.',
    description: 'Example: tetrahydrofuran-like higher-risk reagents/solvents or hazardous by-products generated during operations.'
  },
  {
    key: 'D',
    label: 'D. Very High / Red-Line Hazard (0.0)',
    score: 0.0,
    statement: 'The route includes extreme-hazard substances such as skull-and-crossbones acute-toxicity classes or serious long-term health hazard classes.',
    description: 'Example: strongly toxic or CMR-like high-risk substances used/generated in reaction and post-treatment stages.'
  }
];

const P5_OPTIONS = [
  {
    key: 'A',
    label: 'A. Excellent / Zero Auxiliary Substances (1.0)',
    score: 1.0,
    statement: 'No auxiliary substances are used across the full route.',
    description: 'Example: solvent-free or bulk-process operation where product proceeds without solvent-based quench/extraction/washing.'
  },
  {
    key: 'B',
    label: 'B. Excellent / Green Benign Auxiliaries (0.8)',
    score: 0.8,
    statement: 'Auxiliaries are required, but all used substances are widely recognized as green, low-toxicity, and environmentally compatible.',
    description: 'Example: water, supercritical CO2, low-carbon alcohols (ethanol/isopropanol), or safe inorganic salts as drying agents.'
  },
  {
    key: 'C',
    label: 'C. Good / Conventional Industrial Auxiliaries (0.6)',
    score: 0.6,
    statement: 'Conventional auxiliaries are used with manageable risk under standard industrial controls.',
    description: 'Example: ethyl acetate, hexane, acetone, methanol as solvent/extraction/elution media with routine drying and controls.'
  },
  {
    key: 'D',
    label: 'D. Poor / Strong Dependence on High-Hazard Auxiliaries (0.1)',
    score: 0.1,
    statement: 'The process heavily relies on auxiliaries with significant health, environmental, or safety hazards.',
    description: 'Example: large-scale use of DCM/chloroform as extractant/eluent, unstable peroxide-forming ethers, or highly toxic polar aprotic solvents.'
  },
  {
    key: 'E',
    label: 'E. Very Poor / Ozone-Depleting Red-Line Substances (0.0)',
    score: 0.0,
    statement: 'The process uses internationally restricted ozone-depleting or extreme red-line auxiliary substances.',
    description: 'Example: carbon tetrachloride or banned CFC-type auxiliaries under treaty restrictions.'
  }
];

const P6_OPTIONS = [
  {
    key: 'A',
    label: 'A. Excellent / Near-Ambient Reaction and Low-Energy Separation (1.0)',
    score: 1.0,
    statement: 'The full process runs mostly at near-ambient temperature (about 15-30 C) and pressure, with simple physical separation that avoids energy-intensive solvent evaporation or deep-vacuum operations.',
    description: 'Example: no extra heating/deep cooling in reaction and product isolation mainly by filtration, phase split, or natural settling.'
  },
  {
    key: 'B',
    label: 'B. Good / Mild Thermal Input with Conventional Separation (0.6)',
    score: 0.6,
    statement: 'The route includes moderate and controllable energy input, such as mild heating/cooling, plus standard separation operations.',
    description: 'Example: reaction with moderate heating (for example below 100 C) or light cooling (such as 0 C bath) and routine distillation/compression for low-boiling solvent removal.'
  },
  {
    key: 'C',
    label: 'C. Poor / High-Energy Reaction or High-Energy Separation (0.3)',
    score: 0.3,
    statement: 'The process includes clearly energy-intensive steps, either from harsh reaction conditions or demanding downstream separation.',
    description: 'Example: high-temperature reaction above 100 C, deep-cooling operation (such as -78 C), pressurized reaction, or repeated evaporation of water/high-boiling solvents.'
  },
  {
    key: 'D',
    label: 'D. Very Poor / Extreme-Energy Combination (0.0)',
    score: 0.0,
    statement: 'The route strongly depends on sustained extreme energy input with no clear energy-saving process design.',
    description: 'Example: long-duration very high-temperature operation (for example above 200 C), persistent liquid-nitrogen-level cooling, and repeated high-boiling-solvent reflux plus deep-vacuum distillation.'
  }
];

const P7_OPTIONS = [
  {
    key: 'A',
    label: 'A. Excellent / Net-Carbon-Benefit Renewable Route (1.0)',
    score: 1.0,
    statement: 'Core feedstocks come from renewable natural resources or directly captured CO2, and conversion is low-energy and low-toxicity with clear positive carbon benefit (C_in >> C_out).',
    description: 'Example: biomass-derived or algae-derived feedstocks converted under mild conditions with strong net-carbon advantage.'
  },
  {
    key: 'B',
    label: 'B. Good / Renewable or Waste-Upcycling Route with Partial Carbon Offset (0.6)',
    score: 0.6,
    statement: 'Feedstocks are renewable or waste-derived, but conversion depends on noticeable energy/auxiliary input that partly offsets carbon benefits (C_in approximately C_out).',
    description: 'Use this when renewable sourcing exists but process burden weakens the net carbon gain.'
  },
  {
    key: 'C',
    label: 'C. Poor / Conventional Fossil-Based Route without Carbon Benefit (0.3)',
    score: 0.3,
    statement: 'Core feedstocks are predominantly non-renewable fossil derivatives with no meaningful carbon-footprint improvement strategy.',
    description: 'Typical of mainstream petrochemical-derived molecular synthesis where low-carbon substitutes are not adopted.'
  },
  {
    key: 'D',
    label: 'D. Very Poor / High-Carbon Fossil or Scarce-Resource Route (0.0)',
    score: 0.0,
    statement: 'The route relies on fossil/scarce resources and exhibits very high process carbon burden from low conversion efficiency and high energy demand (high C_out).',
    description: 'Use this for clearly carbon-intensive routes with no practical low-carbon design intent.'
  }
];

const P8_OPTIONS = [
  {
    key: 'A',
    label: 'A. Excellent / Zero Derivatization (1.0)',
    score: 1.0,
    statement: 'No temporary protection/deprotection or temporary modification is used throughout the route.',
    description: 'Example: highly selective transformations proceed directly without blocking groups or temporary edits.'
  },
  {
    key: 'B',
    label: 'B. Good / Minimal Necessary Derivatization (0.6)',
    score: 0.6,
    statement: 'Only a very small number of unavoidable protection/deprotection steps are used (typically one cycle), with temporary modifications minimized.',
    description: 'Use this when derivatization is necessary under current technical constraints but is tightly controlled.'
  },
  {
    key: 'C',
    label: 'C. Poor / Frequent Derivatization with High Dependence (0.3)',
    score: 0.3,
    statement: 'The route contains repeated protection/deprotection cycles (typically two or more), causing longer synthesis and noticeable reagent/solvent burden.',
    description: 'Use this when derivatization strategy substantially expands process steps and material usage.'
  },
  {
    key: 'D',
    label: 'D. Very Poor / Redundant and Inefficient Derivatization (0.0)',
    score: 0.0,
    statement: 'Multiple protection/deprotection operations are used with atom-economy-poor protecting agents, or temporary modifications exist that could be avoided by route optimization.',
    description: 'Use this for clearly redundant derivatization with strong efficiency penalties.'
  }
];

const P9_OPTIONS = [
  {
    key: 'A',
    label: 'A. Excellent / Recoverable Catalytic System or No Reagent Needed (1.0)',
    score: 1.0,
    statement: 'A non-homogeneous or easily recoverable catalytic system is used (or no reagent/catalyst is needed), enabling straightforward post-process separation and reuse.',
    description: 'Example: solid catalyst, supported metal catalyst, or biphasic catalytic system recovered by simple filtration/phase split.'
  },
  {
    key: 'B',
    label: 'B. Good / Conventional Homogeneous or Biocatalytic Route (0.6)',
    score: 0.6,
    statement: 'A homogeneous catalyst or enzyme is used with good catalytic efficiency, but post-treatment separation/recovery is difficult or catalyst deactivates after one cycle.',
    description: 'Use this when catalysis is present but practical recyclability is limited.'
  },
  {
    key: 'C',
    label: 'C. Poor / Standard Stoichiometric Reagent Route (0.3)',
    score: 0.3,
    statement: 'No catalysis is used; the core transformation depends on standard stoichiometric reagents (about 1 equivalent or higher), generating substantial reagent-derived by-products/waste.',
    description: 'Example: common stoichiometric oxidation/reduction/coupling reagents consumed in near-equimolar quantities.'
  },
  {
    key: 'D',
    label: 'D. Very Poor / Excessive or High-Hazard Stoichiometric Reagents (0.0)',
    score: 0.0,
    statement: 'No catalysis is used and the route heavily relies on excessive or high-toxicity/metal-containing stoichiometric reagents, causing large volumes of difficult hazardous waste.',
    description: 'Example: multiple-equivalent heavy-metal oxidants/reagents with strong toxicity and high disposal burden.'
  }
];

const P10_OPTIONS = [
  {
    key: 'A',
    label: 'A. Excellent / Readily Degradable Green Structure (1.0)',
    score: 1.0,
    statement: 'The target molecule is intentionally designed (or naturally behaves) as readily degradable by biodegradation, hydrolysis, or photolysis, and avoids highly persistent structural motifs.',
    description: 'Example: molecules with environmentally cleavable weak bonds and without strongly persistent electron-withdrawing/perfluorinated frameworks.'
  },
  {
    key: 'B',
    label: 'B. Good / Function-Required Conventional Stability (0.6)',
    score: 0.6,
    statement: 'The molecule shows moderate environmental stability required by core function but is not recognized as persistent/bioaccumulative high-risk chemistry.',
    description: 'Use this for products that need practical storage/use stability while not exhibiting obvious long-term persistence hazards.'
  },
  {
    key: 'C',
    label: 'C. Poor / Contains Nonessential Persistence Features (0.3)',
    score: 0.3,
    statement: 'The molecule contains clearly persistence-promoting structural features that are not strictly required, and greener alternatives could be feasible but are not adopted.',
    description: 'Example: heavily halogenated or highly aromatic stable scaffolds with reduced environmental breakdown potential.'
  },
  {
    key: 'D',
    label: 'D. Very Poor / "Forever Chemical" or PBT-Like Profile (0.0)',
    score: 0.0,
    statement: 'The molecule belongs to (or strongly resembles) persistent-bioaccumulative-toxic behavior with very slow environmental degradation and long-term ecological risk.',
    description: 'Example: PFAS-like persistent fluorinated chemistry, PCB-like persistent pollutants, or similarly hard-to-degrade high-persistence structures.'
  }
];

const P11_OPTIONS = [
  {
    key: 'A',
    label: 'A. Excellent / Real-Time In-line Monitoring with Automated Feedback (1.0)',
    score: 1.0,
    statement: 'In-line/on-line analytical monitoring is used with continuous feedback, enabling precise endpoint control and proactive prevention of overreaction and by-product accumulation.',
    description: 'Example: ReactIR, on-line spectroscopy, continuous pH/temperature/flow sensing, and linked control actions on feed/heating.'
  },
  {
    key: 'B',
    label: 'B. Good / Frequent At-line or Off-line Sampling with Active Supervision (0.6)',
    score: 0.6,
    statement: 'At-line/off-line analysis is performed frequently during reaction progress, providing practical real-time decision support for endpoint judgment.',
    description: 'Example: planned TLC checks, periodic LC-MS/GC sampling, or manual pH tracking to avoid uncontrolled extension.'
  },
  {
    key: 'C',
    label: 'C. Poor / Fixed-Time Blind Operation (0.3)',
    score: 0.3,
    statement: 'Process monitoring is largely absent; operation follows preset reaction time without intermediate analysis, with endpoint checked only after completion.',
    description: 'Example: run for a fixed number of hours based on experience/literature without in-process sampling.'
  },
  {
    key: 'D',
    label: 'D. Very Poor / Unmonitored High-Risk Control Blind Zone (0.0)',
    score: 0.0,
    statement: 'No meaningful monitoring is used in a reaction with notable runaway/pollution risk, and no critical alarm-control safeguards are in place.',
    description: 'Example: high-risk exothermic or hazardous-gas-generating reaction operated without process surveillance or limit alarms.'
  }
];

const P12_OPTIONS = [
  {
    key: 'A',
    label: 'A. Excellent / Inherent Safety by Elimination or Substitution (1.0)',
    score: 1.0,
    statement: 'Risks are eliminated or substituted at source. Process materials and conditions are intrinsically low-risk, with very low likelihood of fire, explosion, or severe toxic release even under upset scenarios.',
    description: 'Example: ambient operation in water or low-hazard media without highly flammable/reactive/toxic inventory.'
  },
  {
    key: 'B',
    label: 'B. Good / Moderate Risk Managed by Engineering Controls (0.6)',
    score: 0.6,
    statement: 'Process involves manageable hazards controlled mainly by standard engineering protections, maintaining acceptable risk under normal operation and standard barriers.',
    description: 'Example: conventional flammable/corrosive systems operated with standard ventilation, containment, and isolation controls.'
  },
  {
    key: 'C',
    label: 'C. Poor / High-Risk Operation Dependent on Special Equipment and Strict SOP (0.3)',
    score: 0.3,
    statement: 'High-risk materials or conditions are present and safety relies heavily on specialized equipment and strict administrative procedures; failure can trigger severe accidents.',
    description: 'Example: pyrophoric/toxic-gas/high-pressure operations requiring glovebox, blast shielding, or dedicated high-pressure systems.'
  },
  {
    key: 'D',
    label: 'D. Very Poor / PPE-Dependent or Uncontrolled Critical-Risk Zone (0.0)',
    score: 0.0,
    statement: 'Safety depends primarily on PPE or includes severe uncontrolled risk scenarios without reliable engineering barriers, representing unacceptable inherent-safety design.',
    description: 'Example: extremely hazardous reaction conditions with weak containment and reliance on personal protection as last-line defense.'
  }
];

function getDefaultFlowerWeights() {
  // Balanced default weights (near-equal) that sum exactly to 100.
  return [
    8.34, // P1
    8.34, // P2
    8.34, // P3
    8.34, // P4
    8.33, // P5
    8.33, // P6
    8.33, // P7
    8.33, // P8
    8.33, // P9
    8.33, // P10
    8.33, // P11
    8.33  // P12
  ];
}

const WEIGHT_TARGET_TOTAL = 100;
const WEIGHT_TOLERANCE = 0.01;
const WEIGHT_MIN_STRICT = 5;

function getP1DefaultDetails() {
  return {
    totalInputMass: '',
    targetProductMass: '',
    pmi: null,
    score: 0,
    validationMessage: ''
  };
}

function getP2DefaultDetails() {
  return {
    mwProduct: '',
    sumMwReactants: '',
    score: 0,
    validationMessage: ''
  };
}

function getP3DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getP5DefaultDetails() {
  return {
    selectedOption: 'C',
    score: 0.6
  };
}

function getP4DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getP6DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getP7DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getP8DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getP9DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getP10DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getP11DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getP12DefaultDetails() {
  return {
    selectedOption: 'B',
    score: 0.6
  };
}

function getDefaultSafetyScreening() {
  return {
    reactantRows: [
      { id: `row-${Date.now()}`, query: '', eq: '1.00', amountG: '' }
    ],
    routeEvidence: [],
    scaleLevel: 'lab',
    dangerCount: '',
    warningCount: '',
    hasCmr: false,
    hasFlammable: false,
    runawayRisk: 'medium',
    maxTempC: '',
    maxPressureBar: '',
    controlLevel: 'standard',
    monitoringLevel: 'batch',
    ppeDependence: 'medium',
    exothermLevel: 'medium',
    gasReleaseLevel: 'medium',
    stageRisks: {
      charge: 'medium',
      reaction: 'medium',
      quench: 'medium',
      isolation: 'medium'
    },
    notes: ''
  };
}

function toPositiveNumber(value) {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function calculateP1Scores(details) {
  const totalInputMass = toPositiveNumber(details.totalInputMass);
  const targetProductRaw = details.targetProductMass ?? details.actualProductMass;
  const targetProductMass = toPositiveNumber(targetProductRaw);

  if (!totalInputMass || !targetProductMass) {
    return {
      pmi: null,
      total: 0,
      validationMessage: 'Please enter both total material input and target product mass before calculation.'
    };
  }

  const pmi = totalInputMass / targetProductMass;
  const rawScore = 1 - (Math.log10(pmi) / 3);
  const total = Math.max(0, Math.min(1, rawScore));
  const validationMessage = pmi > 1000
    ? 'PMI exceeds 1000. Score is capped at 0 by the model.'
    : '';

  return {
    pmi,
    total,
    validationMessage
  };
}

function calculateP2Scores(details) {
  const mwProductRaw = details.mwProduct ?? details.actualProductMass;
  const sumMwReactantsRaw = details.sumMwReactants ?? details.totalInputMass;
  const mwProduct = toPositiveNumber(mwProductRaw);
  const sumMwReactants = toPositiveNumber(sumMwReactantsRaw);

  if (!mwProduct || !sumMwReactants) {
    return {
      score: 0,
      total: 0,
      validationMessage: 'Please enter both MW_product and ΣMW_reactants before calculation.'
    };
  }

  if (sumMwReactants < mwProduct) {
    return {
      score: 0,
      total: 0,
      validationMessage: 'Invalid input: ΣMW_reactants must be greater than or equal to MW_product.'
    };
  }

  const score = mwProduct / sumMwReactants;
  const total = Math.max(0, Math.min(1, score));

  return {
    score: total,
    total,
    validationMessage: ''
  };
}

function calculateP4Score(details) {
  const selected = P4_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP3Score(details) {
  const selected = P3_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP5Score(details) {
  const selected = P5_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP6Score(details) {
  const selected = P6_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP7Score(details) {
  const selected = P7_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP8Score(details) {
  const selected = P8_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP9Score(details) {
  const selected = P9_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP10Score(details) {
  const selected = P10_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP11Score(details) {
  const selected = P11_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

function calculateP12Score(details) {
  const selected = P12_OPTIONS.find((option) => option.key === details.selectedOption);
  return selected ? selected.score : 0;
}

const state = {
  items: PRINCIPLES.map((principle) => ({
    ...principle,
    score: 0,
    note: '',
    details: principle.id === 'p1'
      ? getP1DefaultDetails()
      : principle.id === 'p2'
        ? getP2DefaultDetails()
        : principle.id === 'p3'
          ? getP3DefaultDetails()
        : principle.id === 'p5'
          ? getP5DefaultDetails()
        : principle.id === 'p4'
          ? getP4DefaultDetails()
          : principle.id === 'p6'
            ? getP6DefaultDetails()
            : principle.id === 'p7'
              ? getP7DefaultDetails()
              : principle.id === 'p8'
                ? getP8DefaultDetails()
                : principle.id === 'p9'
                  ? getP9DefaultDetails()
                  : principle.id === 'p10'
                    ? getP10DefaultDetails()
                    : principle.id === 'p11'
                      ? getP11DefaultDetails()
                      : principle.id === 'p12'
                        ? getP12DefaultDetails()
        : null
  })),
  activePrincipleId: PRINCIPLES[0].id,
  principleWeights: getDefaultFlowerWeights(),
  comparisonSnapshots: [],
  rejectedComparisonEntries: [],
  safetyScreening: getDefaultSafetyScreening(),
  currentFilePath: null,
  autoSaveEnabled: true
};

const formEl = document.getElementById('assessmentForm');
const totalScoreEl = document.getElementById('totalScore');
const newFileBtnEl = document.getElementById('newFileBtn');
const saveBtnEl = document.getElementById('saveBtn');
const openBtnEl = document.getElementById('openBtn');
const exportBtnEl = document.getElementById('exportBtn');
const resetBtnEl = document.getElementById('resetBtn');
const statusBarEl = document.getElementById('statusBar');
const lastSavedEl = document.getElementById('lastSaved');
const currentFileEl = document.getElementById('currentFile');
const radarCanvas = document.getElementById('radarCanvas');
const gaugeCanvas = document.getElementById('gaugeCanvas');
const flowerCanvas = document.getElementById('flowerCanvas');
const radarPaneEl = document.getElementById('radarPane');
const gaugePaneEl = document.getElementById('gaugePane');
const flowerPaneEl = document.getElementById('flowerPane');
const viewRadarBtnEl = document.getElementById('viewRadarBtn');
const viewGaugeBtnEl = document.getElementById('viewGaugeBtn');
const viewFlowerBtnEl = document.getElementById('viewFlowerBtn');
const vizLockOverlayEl = document.getElementById('vizLockOverlay');
const visualCardEl = document.getElementById('visualCard');
const chartSectionTitleEl = document.getElementById('chartSectionTitle');
const chartSectionSubtitleEl = document.getElementById('chartSectionSubtitle');
const textVizBottomListEl = document.getElementById('textVizBottomList');
const textVizBottomTotalEl = document.getElementById('textVizBottomTotal');
const compareOpenBtnEl = document.getElementById('compareOpenBtn');
const compareClearBtnEl = document.getElementById('compareClearBtn');
const compareRadarCanvasEl = document.getElementById('compareRadarCanvas');
const compareLegendEl = document.getElementById('compareLegend');
const comparePolicyStateEl = document.getElementById('comparePolicyState');
const compareRejectedPanelEl = document.getElementById('compareRejectedPanel');
const compareRejectedListEl = document.getElementById('compareRejectedList');
const modelGradeEl = document.getElementById('modelGrade');
const modelConfidenceEl = document.getElementById('modelConfidence');
const modelSummaryEl = document.getElementById('modelSummary');
const modelPriorityListEl = document.getElementById('modelPriorityList');
const modelStrengthListEl = document.getElementById('modelStrengthList');
const modelGradeHelpHostEl = document.getElementById('modelGradeHelpHost');
const modelSafetyHelpHostEl = document.getElementById('modelSafetyHelpHost');
const openRouteSafetyBtnEl = document.getElementById('openRouteSafetyBtn');
const closeRouteSafetyBtnEl = document.getElementById('closeRouteSafetyBtn');
const routeSafetyPageEl = document.getElementById('routeSafetyPage');
const safetyDangerCountEl = document.getElementById('safetyDangerCount');
const safetyWarningCountEl = document.getElementById('safetyWarningCount');
const safetyHasCmrEl = document.getElementById('safetyHasCmr');
const safetyHasFlammableEl = document.getElementById('safetyHasFlammable');
const safetyRunawayRiskEl = document.getElementById('safetyRunawayRisk');
const safetyMaxTempEl = document.getElementById('safetyMaxTemp');
const safetyMaxPressureEl = document.getElementById('safetyMaxPressure');
const safetyControlLevelEl = document.getElementById('safetyControlLevel');
const safetyMonitoringLevelEl = document.getElementById('safetyMonitoringLevel');
const safetyPpeDependenceEl = document.getElementById('safetyPpeDependence');
const safetyNotesEl = document.getElementById('safetyNotes');
const safetyRiskGradeEl = document.getElementById('safetyRiskGrade');
const safetyRiskScoreEl = document.getElementById('safetyRiskScore');
const safetyConfidenceEl = document.getElementById('safetyConfidence');
const safetyActionsEl = document.getElementById('safetyActions');
const safetyReactantTableBodyEl = document.getElementById('safetyReactantTableBody');
const safetyAddReactantRowBtnEl = document.getElementById('safetyAddReactantRowBtn');
const safetyRouteAnalyzeBtnEl = document.getElementById('safetyRouteAnalyzeBtn');
const safetyScaleLevelEl = document.getElementById('safetyScaleLevel');
const safetyLookupStatusEl = document.getElementById('safetyLookupStatus');
const safetyExothermLevelEl = document.getElementById('safetyExothermLevel');
const safetyGasReleaseLevelEl = document.getElementById('safetyGasReleaseLevel');
const safetyEvidenceListEl = document.getElementById('safetyEvidenceList');
const safetyStageChargeEl = document.getElementById('safetyStageCharge');
const safetyStageReactionEl = document.getElementById('safetyStageReaction');
const safetyStageQuenchEl = document.getElementById('safetyStageQuench');
const safetyStageIsolationEl = document.getElementById('safetyStageIsolation');
const safetyStageHeatmapEl = document.getElementById('safetyStageHeatmap');
const safetyDriverChartEl = document.getElementById('safetyDriverChart');
const safetyStageRadarEl = document.getElementById('safetyStageRadar');

let activeView = 'radar';
let autoSaveTimer = null;
let autoSaveInFlight = false;
let safetyDriverChartRegions = [];
let safetyDriverChartRows = [];
let safetyDriverChartActiveLabel = '';

function getDefaultDetailsById(id) {
  if (id === 'p1') {
    return getP1DefaultDetails();
  }
  if (id === 'p2') {
    return getP2DefaultDetails();
  }
  if (id === 'p3') {
    return getP3DefaultDetails();
  }
  if (id === 'p4') {
    return getP4DefaultDetails();
  }
  if (id === 'p5') {
    return getP5DefaultDetails();
  }
  if (id === 'p6') {
    return getP6DefaultDetails();
  }
  if (id === 'p7') {
    return getP7DefaultDetails();
  }
  if (id === 'p8') {
    return getP8DefaultDetails();
  }
  if (id === 'p9') {
    return getP9DefaultDetails();
  }
  if (id === 'p10') {
    return getP10DefaultDetails();
  }
  if (id === 'p11') {
    return getP11DefaultDetails();
  }
  if (id === 'p12') {
    return getP12DefaultDetails();
  }
  return null;
}

function buildAssessmentPayload() {
  return {
    principles: state.items,
    total: getWeightedTotalScore(),
    principleWeights: state.principleWeights,
    safetyScreening: state.safetyScreening
  };
}

function buildEmptyAssessmentPayload() {
  return {
    principles: PRINCIPLES.map((principle) => ({
      ...principle,
      score: 0,
      note: '',
      details: getDefaultDetailsById(principle.id)
    })),
    total: 0,
    principleWeights: getDefaultFlowerWeights(),
    safetyScreening: getDefaultSafetyScreening()
  };
}

function setCurrentFilePath(filePath) {
  state.currentFilePath = typeof filePath === 'string' && filePath.trim() ? filePath : null;
  if (!state.currentFilePath && autoSaveTimer) {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = null;
  }
  updateCurrentFileLabel(state.currentFilePath);
}

function setLastSavedLabel(updatedAt, isAutoSave = false) {
  const savedTime = updatedAt ? new Date(updatedAt).toLocaleString() : 'Unknown time';
  lastSavedEl.textContent = isAutoSave ? `Last auto-saved: ${savedTime}` : `Last saved: ${savedTime}`;
}

const VIEW_META = {
  radar: {
    title: 'Radar Profile',
    subtitle: 'Visual comparison of all 12 principles across the radar axes.'
  },
  gauge: {
    title: 'Flower Profile',
    subtitle: 'Blossom-style overview of principle-level performance and weighted contribution.'
  },
  flower: {
    title: 'Weighted Ring Profile',
    subtitle: 'Ring-based composition view of weighted principle scores and overall result.'
  }
};

const COMPARISON_COLORS = ['#0e7c86', '#df5d3f', '#2563eb', '#7c3aed', '#059669', '#dc2626', '#9333ea', '#b45309'];

function getComparisonSeriesColor(index) {
  if (index < COMPARISON_COLORS.length) {
    return COMPARISON_COLORS[index];
  }
  // Golden-angle hue stepping gives distinct colors when comparing many files.
  const hue = (index * 137.508) % 360;
  return `hsl(${hue.toFixed(1)}, 68%, 42%)`;
}

const PRINCIPLE_RECOMMENDATION_LIBRARY = {
  p1: 'Optimize stoichiometry and isolate yield-critical losses to reduce PMI and raise prevention score.',
  p2: 'Improve atom economy by redesigning disconnections that reduce leaving-group and sacrificial-fragment load.',
  p3: 'Substitute high-hazard reagents/solvents with lower-hazard alternatives and remove danger-class operations.',
  p4: 'Integrate molecular safety-by-design screening early to avoid toxicophore-rich candidate structures.',
  p5: 'Replace high-risk auxiliaries with greener media and reduce downstream solvent demand through process intensification.',
  p6: 'Lower thermal and separation energy load with milder conditions, heat integration, and fewer evaporation cycles.',
  p7: 'Shift core carbon input toward renewable or waste-derived feedstocks with measurable net-carbon benefit.',
  p8: 'Cut protecting-group cycles by selecting chemoselective transformations and route-shortening steps.',
  p9: 'Prioritize catalytic systems with robust recovery/reuse over stoichiometric reagent consumption.',
  p10: 'Prefer target structures with predictable environmental degradability and reduced persistence risk.',
  p11: 'Increase in-process monitoring density to detect deviation early and prevent off-spec by-product growth.',
  p12: 'Move risk controls upstream toward elimination/substitution and reduce dependence on administrative/PPE-only barriers.'
};

function getWeightTotal() {
  return state.principleWeights.reduce((sum, weight) => sum + Number(weight || 0), 0);
}

function getBaseName(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    return null;
  }
  const normalized = filePath.replace(/\\/g, '/');
  const parts = normalized.split('/');
  return parts[parts.length - 1] || null;
}

function updateCurrentFileLabel(filePath) {
  if (!currentFileEl) {
    return;
  }
  const name = getBaseName(filePath);
  if (name) {
    currentFileEl.textContent = `Current file: ${name}`;
    currentFileEl.title = filePath;
  } else {
    currentFileEl.textContent = 'Current file: None';
    currentFileEl.title = '';
  }
}

function toRgba(hex, alpha) {
  if (typeof hex !== 'string' || !hex.startsWith('#') || (hex.length !== 7 && hex.length !== 4)) {
    return `rgba(14, 124, 134, ${alpha})`;
  }

  const normalized = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;
  const value = normalized.slice(1);
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function polarPoint(cx, cy, radius, angle) {
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius
  };
}

function normalizeWeightVector(weights) {
  if (!Array.isArray(weights)) {
    return [];
  }
  return weights.map((weight) => {
    const parsed = Number(weight);
    if (!Number.isFinite(parsed)) {
      return 0;
    }
    return Math.max(0, parsed);
  });
}

function hasSameWeightProfile(baseWeights, candidateWeights) {
  const base = normalizeWeightVector(baseWeights);
  const candidate = normalizeWeightVector(candidateWeights);
  if (base.length !== candidate.length || base.length !== PRINCIPLES.length) {
    return false;
  }
  return base.every((weight, index) => Math.abs(weight - candidate[index]) <= WEIGHT_TOLERANCE);
}

function getWeightMismatchDetails(baseWeights, candidateWeights) {
  const base = normalizeWeightVector(baseWeights);
  const candidate = normalizeWeightVector(candidateWeights);
  if (base.length !== candidate.length || base.length !== PRINCIPLES.length) {
    return [
      {
        short: 'ALL',
        base: NaN,
        candidate: NaN
      }
    ];
  }

  const mismatches = [];
  for (let index = 0; index < base.length; index += 1) {
    if (Math.abs(base[index] - candidate[index]) > WEIGHT_TOLERANCE) {
      mismatches.push({
        short: PRINCIPLES[index].short,
        base: base[index],
        candidate: candidate[index]
      });
    }
  }

  return mismatches;
}

function isWeightTotalValid(total) {
  return Math.abs(total - WEIGHT_TARGET_TOTAL) <= WEIGHT_TOLERANCE;
}

function getInvalidWeightShortLabels() {
  return state.principleWeights
    .map((weight, index) => ({ weight: Number(weight), short: state.items[index]?.short || `P${index + 1}` }))
    .filter((entry) => Number.isNaN(entry.weight) || entry.weight < WEIGHT_MIN_STRICT)
    .map((entry) => entry.short);
}

function getWeightValidationSummary() {
  const totalWeight = getWeightTotal();
  const invalidItems = getInvalidWeightShortLabels();
  return {
    totalWeight,
    totalValid: isWeightTotalValid(totalWeight),
    minValid: invalidItems.length === 0,
    invalidItems
  };
}

function getWeightedTotalScore() {
  const weighted = state.items.reduce((sum, item, index) => {
    const score = clampScore(item.score);
    const weight = Number(state.principleWeights[index] || 0);
    const safeWeight = Number.isFinite(weight) ? weight : 0;
    return sum + score * (safeWeight / 100);
  }, 0);

  if (weighted < 0) {
    return 0;
  }
  if (weighted > 1) {
    return 1;
  }
  return weighted;
}

function isLegacyPristineMinWeightTemplate(savedPrinciples, loadedWeights) {
  if (!Array.isArray(savedPrinciples) || !Array.isArray(loadedWeights)) {
    return false;
  }
  if (loadedWeights.length !== PRINCIPLES.length) {
    return false;
  }

  const allAtMin = loadedWeights.every((weight) => {
    const parsed = Number(weight);
    return Number.isFinite(parsed) && Math.abs(parsed - WEIGHT_MIN_STRICT) <= WEIGHT_TOLERANCE;
  });

  if (!allAtMin) {
    return false;
  }

  // Treat as old untouched template only when assessment content is effectively empty.
  const hasMeaningfulInput = savedPrinciples.some((p) => {
    const score = Number(p?.score || 0);
    const note = typeof p?.note === 'string' ? p.note.trim() : '';
    return score > 0 || note.length > 0;
  });

  return !hasMeaningfulInput;
}

function clearVisualizationCanvases() {
  [radarCanvas, gaugeCanvas, flowerCanvas].forEach((canvas) => {
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
}

function renderBottomTextVisualization(total) {
  if (!textVizBottomListEl || !textVizBottomTotalEl) {
    return;
  }

  textVizBottomTotalEl.textContent = `Total ${total.toFixed(2)} / 1.00`;
  textVizBottomListEl.innerHTML = '';

  state.items.forEach((item) => {
    const score = clampScore(item.score);
    const visual = getScaleVisual(score);
    const card = document.createElement('article');
    card.className = 'text-viz-bottom-item';
    card.style.borderColor = visual.border;
    card.style.background = visual.soft;

    const row = document.createElement('div');
    row.className = 'text-viz-bottom-row';

    const key = document.createElement('span');
    key.className = 'text-viz-bottom-key';
    key.textContent = `${item.short} ${item.title}`;

    const value = document.createElement('span');
    value.className = 'text-viz-bottom-score';
    value.textContent = `${score.toFixed(2)} / 1.00`;

    row.appendChild(key);
    row.appendChild(value);

    const bar = document.createElement('div');
    bar.className = 'text-viz-bottom-bar';

    const fill = document.createElement('div');
    fill.className = 'text-viz-bottom-fill';
    fill.style.width = `${(score * 100).toFixed(1)}%`;
    fill.style.background = visual.solid;

    bar.appendChild(fill);
    card.appendChild(row);
    card.appendChild(bar);
    textVizBottomListEl.appendChild(card);
  });
}

function buildCurrentSnapshot() {
  const activeName = getBaseName(state.currentFilePath) || 'Current Route';
  return {
    filePath: null,
    name: activeName,
    values: state.items.map((item) => clampScore(item.score)),
    weights: state.principleWeights.map((weight) => {
      const parsed = Number(weight);
      return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
    }),
    total: getWeightedTotalScore()
  };
}

function normalizeComparisonEntry(entry) {
  const payload = entry && entry.data;
  if (!payload || !Array.isArray(payload.principles)) {
    return null;
  }

  const byId = new Map(payload.principles.map((item) => [item.id, item]));
  const values = PRINCIPLES.map((principle) => clampScore(byId.get(principle.id)?.score));
  const rawWeights = Array.isArray(payload.principleWeights) && payload.principleWeights.length === PRINCIPLES.length
    ? payload.principleWeights
    : getDefaultFlowerWeights();

  const weights = rawWeights.map((weight) => {
    const parsed = Number(weight);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  });

  let total = Number(payload.total);
  if (!Number.isFinite(total)) {
    total = values.reduce((sum, score, index) => sum + score * (weights[index] / 100), 0);
  }
  total = Math.max(0, Math.min(1, total));

  return {
    filePath: entry.filePath || '',
    name: getBaseName(entry.filePath) || 'Unknown file',
    values,
    weights,
    total
  };
}

function drawComparisonRadar() {
  if (!compareRadarCanvasEl || !compareLegendEl) {
    return {
      compatibleCount: 0,
      incompatibleCount: 0,
      compatibleSnapshots: [],
      incompatibleSnapshots: [],
      currentSnapshot: buildCurrentSnapshot()
    };
  }

  const ctx = compareRadarCanvasEl.getContext('2d');
  if (!ctx) {
    return {
      compatibleCount: 0,
      incompatibleCount: 0,
      compatibleSnapshots: [],
      incompatibleSnapshots: [],
      currentSnapshot: buildCurrentSnapshot()
    };
  }

  const current = buildCurrentSnapshot();
  const compatible = [];
  const incompatible = [];
  state.comparisonSnapshots.forEach((snapshot) => {
    if (hasSameWeightProfile(current.weights, snapshot.weights)) {
      compatible.push(snapshot);
      return;
    }
    incompatible.push(snapshot);
  });

  const datasets = [current, ...compatible];
  const width = compareRadarCanvasEl.width;
  const height = compareRadarCanvasEl.height;
  const cx = width / 2;
  const cy = height / 2 + 8;
  const radius = Math.min(width, height) * 0.34;
  const angleStep = (Math.PI * 2) / PRINCIPLES.length;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(74, 96, 125, 0.14)';
  ctx.lineWidth = 1;
  for (let level = 1; level <= 5; level += 1) {
    const r = radius * (level / 5);
    ctx.beginPath();
    for (let i = 0; i < PRINCIPLES.length; i += 1) {
      const angle = -Math.PI / 2 + i * angleStep;
      const point = polarPoint(cx, cy, r, angle);
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }

  for (let i = 0; i < PRINCIPLES.length; i += 1) {
    const angle = -Math.PI / 2 + i * angleStep;
    const edge = polarPoint(cx, cy, radius, angle);
    const label = polarPoint(cx, cy, radius + 22, angle);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(edge.x, edge.y);
    ctx.strokeStyle = 'rgba(74, 96, 125, 0.2)';
    ctx.stroke();

    ctx.font = '12px Segoe UI';
    ctx.fillStyle = '#34495e';
    ctx.textAlign = label.x >= cx ? 'left' : 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(PRINCIPLES[i].short, label.x, label.y);
  }

  datasets.forEach((dataset, index) => {
    const lineColor = getComparisonSeriesColor(index);
    const scoreVisual = getScaleVisual(dataset.total);
    ctx.beginPath();
    for (let i = 0; i < PRINCIPLES.length; i += 1) {
      const value = clampScore(dataset.values[i]);
      const angle = -Math.PI / 2 + i * angleStep;
      const point = polarPoint(cx, cy, radius * value, angle);
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = toRgba(scoreVisual.solid, index === 0 ? 0.28 : 0.18);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = index === 0 ? 2.6 : 2;
    ctx.fill();
    ctx.stroke();
  });

  compareLegendEl.innerHTML = '';
  datasets.forEach((dataset, index) => {
    const lineColor = getComparisonSeriesColor(index);
    const item = document.createElement('div');
    item.className = 'compare-legend-item';
    item.title = dataset.filePath || dataset.name;

    const dot = document.createElement('span');
    dot.className = 'compare-legend-color';
    dot.style.background = lineColor;
    dot.style.width = '16px';
    dot.style.height = '4px';
    dot.style.borderRadius = '2px';
    dot.style.border = '1px solid rgba(0, 0, 0, 0.22)';

    const text = document.createElement('span');
    text.textContent = `${dataset.name} | total ${dataset.total.toFixed(2)} / 1.00`;

    item.appendChild(dot);
    item.appendChild(text);
    compareLegendEl.appendChild(item);
  });

  if (comparePolicyStateEl) {
    if (state.comparisonSnapshots.length === 0) {
      comparePolicyStateEl.textContent = 'No comparison file loaded.';
    } else if (incompatible.length === 0) {
      comparePolicyStateEl.textContent = `Weight profile matched. ${compatible.length} file(s) are being compared under the same rule.`;
    } else {
      comparePolicyStateEl.textContent = `Weight mismatch detected. ${incompatible.length} file(s) excluded to prevent pseudo-green comparison. Keep identical weights for fair evaluation.`;
    }
  }

  return {
    compatibleCount: compatible.length,
    incompatibleCount: incompatible.length,
    compatibleSnapshots: compatible,
    incompatibleSnapshots: incompatible,
    currentSnapshot: current
  };
}

function getModelGrade(total) {
  const v = clampScore(total);
  if (v > 0.8) {
    return 'Excellent';
  }
  if (v > 0.6) {
    return 'Great';
  }
  if (v > 0.3) {
    return 'Good';
  }
  if (v > 0.1) {
    return 'Poor';
  }
  return 'Bad';
}

function createModelCard(title, body) {
  const card = document.createElement('article');
  card.className = 'model-item';

  const heading = document.createElement('p');
  heading.className = 'model-item-title';
  heading.textContent = title;

  const content = document.createElement('p');
  content.className = 'model-item-body';
  content.textContent = body;

  card.appendChild(heading);
  card.appendChild(content);
  return card;
}

function toSafeNonNegativeNumber(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

function clampUnit(value) {
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

function evaluateSafetyScreening(input) {
  const draft = input || getDefaultSafetyScreening();
  const stageRisks = draft && draft.stageRisks && typeof draft.stageRisks === 'object'
    ? draft.stageRisks
    : { charge: 'medium', reaction: 'medium', quench: 'medium', isolation: 'medium' };
  const evidenceList = Array.isArray(draft.routeEvidence) ? draft.routeEvidence : [];
  const evidenceDangerCount = evidenceList.reduce((sum, item) => sum + toSafeNonNegativeNumber(item && item.dangerCount), 0);
  const evidenceWarningCount = evidenceList.reduce((sum, item) => sum + toSafeNonNegativeNumber(item && item.warningCount), 0);
  const evidenceHasCmr = evidenceList.some((item) => Boolean(item && item.hasCmr));
  const evidenceHasFlammable = evidenceList.some((item) => Boolean(item && item.hasFlammable));

  const dangerCount = Math.max(toSafeNonNegativeNumber(draft.dangerCount), evidenceDangerCount);
  const warningCount = Math.max(toSafeNonNegativeNumber(draft.warningCount), evidenceWarningCount);
  const maxTempC = toSafeNonNegativeNumber(draft.maxTempC);
  const maxPressureBar = toSafeNonNegativeNumber(draft.maxPressureBar);

  const deductions = [];
  const addDeduction = (label, points) => {
    const safe = Math.max(0, Number(points) || 0);
    if (safe > 0) {
      deductions.push({ label, points: safe });
    }
  };

  addDeduction('Danger-class substances', Math.min(40, dangerCount * 8));
  addDeduction('Warning-class substances', Math.min(20, warningCount * 2));

  if (draft.hasCmr || evidenceHasCmr) {
    addDeduction('CMR hazard presence', 22);
  }
  if (draft.hasFlammable || evidenceHasFlammable) {
    addDeduction('High flammability inventory', 8);
  }

  if (draft.runawayRisk === 'high') {
    addDeduction('Runaway potential', 20);
  } else if (draft.runawayRisk === 'medium') {
    addDeduction('Runaway potential', 10);
  }

  if (maxTempC >= 180) {
    addDeduction('Severe thermal stress', 20);
  } else if (maxTempC >= 120) {
    addDeduction('High thermal stress', 14);
  } else if (maxTempC >= 80) {
    addDeduction('Moderate thermal stress', 8);
  }

  if (maxPressureBar >= 15) {
    addDeduction('High-pressure operation', 18);
  } else if (maxPressureBar >= 5) {
    addDeduction('Pressurized operation', 10);
  }

  if (draft.controlLevel === 'basic') {
    addDeduction('Engineering controls below standard', 12);
  } else if (draft.controlLevel === 'standard') {
    addDeduction('Standard control envelope', 6);
  }

  if (draft.monitoringLevel === 'none') {
    addDeduction('Monitoring blind operation', 12);
  } else if (draft.monitoringLevel === 'batch') {
    addDeduction('Intermittent monitoring', 5);
  }

  if (draft.ppeDependence === 'high') {
    addDeduction('PPE-dominant risk control', 10);
  } else if (draft.ppeDependence === 'medium') {
    addDeduction('Partial PPE dependence', 5);
  }

  if (draft.exothermLevel === 'high') {
    addDeduction('High exotherm intensity', 14);
  } else if (draft.exothermLevel === 'medium') {
    addDeduction('Moderate exotherm intensity', 7);
  }

  if (draft.gasReleaseLevel === 'high') {
    addDeduction('High hazardous-gas release potential', 14);
  } else if (draft.gasReleaseLevel === 'medium') {
    addDeduction('Moderate hazardous-gas release potential', 7);
  }

  const stagePenalty = {
    low: 2,
    medium: 6,
    high: 12
  };
  ['charge', 'reaction', 'quench', 'isolation'].forEach((stage) => {
    const level = stageRisks[stage] || 'medium';
    addDeduction(`Stage risk: ${stage}`, stagePenalty[level] || 6);
  });

  if (draft.scaleLevel === 'plant') {
    addDeduction('Plant-scale consequence amplification', 15);
  } else if (draft.scaleLevel === 'pilot') {
    addDeduction('Pilot-scale consequence amplification', 8);
  }

  const totalDeduction = deductions.reduce((sum, item) => sum + item.points, 0);
  const score100 = Math.max(0, Math.min(100, 100 - totalDeduction));

  let level = 'Critical';
  if (score100 >= 80) {
    level = 'Low';
  } else if (score100 >= 60) {
    level = 'Moderate';
  } else if (score100 >= 35) {
    level = 'High';
  }

  const completenessFlags = [
    draft.dangerCount !== '' || evidenceList.length > 0,
    draft.warningCount !== '' || evidenceList.length > 0,
    draft.maxTempC !== '',
    draft.maxPressureBar !== '',
    Boolean(draft.runawayRisk),
    Boolean(draft.controlLevel),
    Boolean(draft.monitoringLevel),
    Boolean(draft.ppeDependence),
    Boolean(draft.exothermLevel),
    Boolean(draft.gasReleaseLevel),
    Boolean(draft.scaleLevel)
  ];
  const filledCount = completenessFlags.filter(Boolean).length;
  const confidence = clampUnit(0.55 + 0.45 * (filledCount / completenessFlags.length));

  const driverContributions = [...deductions]
    .sort((a, b) => b.points - a.points)
    .slice(0, 6)
    .map((item) => ({
      label: item.label,
      points: Number(item.points || 0)
    }));

  const stageRank = { low: 1, medium: 2, high: 3 };
  const stageAlias = {
    charge: 'charging stage',
    reaction: 'reaction stage',
    quench: 'quench stage',
    isolation: 'isolation stage'
  };
  const dominantStageKey = Object.keys(stageAlias)
    .sort((a, b) => (stageRank[stageRisks[b] || 'medium'] || 2) - (stageRank[stageRisks[a] || 'medium'] || 2))[0] || 'reaction';
  const hotspotStage = stageAlias[dominantStageKey] || 'reaction stage';
  const scaleContext = draft.scaleLevel === 'plant'
    ? 'at full plant scale'
    : draft.scaleLevel === 'pilot'
      ? 'during pilot transfer'
      : 'under current lab-scale conditions';

  const currentTemp = Number.isFinite(maxTempC) ? maxTempC : 0;
  const currentPressure = Number.isFinite(maxPressureBar) ? maxPressureBar : 0;
  const targetTemp = currentTemp >= 180 ? 140 : currentTemp >= 120 ? 100 : currentTemp >= 80 ? 70 : Math.max(45, Math.round(currentTemp * 0.9));
  const targetPressure = currentPressure >= 15 ? 10 : currentPressure >= 5 ? 4 : Math.max(2, Math.round(Math.max(currentPressure, 2) * 0.9));

  const timelineByPoints = (points) => {
    if (points >= 18) {
      return 'within 7 days';
    }
    if (points >= 10) {
      return 'within 14 days';
    }
    return 'within 30 days';
  };

  const buildDynamicAction = (item) => {
    const due = timelineByPoints(item.points);
    const defaultVerify = 'Re-run route screening and confirm this driver contribution decreases by at least 20%.';
    let action = '';
    let target = '';
    let verify = defaultVerify;

    switch (item.label) {
      case 'Danger-class substances':
        action = `Substitute or downsize the top danger-class reagents and split charging in the ${hotspotStage}.`;
        target = `Cut dose-weighted danger total by at least 25% ${scaleContext}.`;
        verify = 'Confirm reduced danger total in next analysis and document updated reagent list/SDS set.';
        break;
      case 'Warning-class substances':
        action = 'Replace recurrent warning-class solvents/auxiliaries with lower-hazard alternatives and remove non-critical additives.';
        target = 'Reduce warning-class count or weighted warning burden by at least 20%.';
        verify = 'Update BOM and re-run screening to confirm lower warning contribution.';
        break;
      case 'CMR hazard presence':
        action = 'Implement closed transfer, dedicated enclosure, and restricted-access handling for CMR-related steps.';
        target = 'Zero open handling tasks for CMR materials in routine operation.';
        verify = 'Complete CMR task audit checklist and exposure-monitoring record before next campaign.';
        break;
      case 'High flammability inventory':
        action = `Strengthen inerting, grounding, and ignition-source control around the ${hotspotStage}.`;
        target = 'Keep oxygen/vapor conditions within documented safe operating envelope for all flammable steps.';
        verify = 'Run pre-startup checklist with gas monitoring and leak test records.';
        break;
      case 'Runaway potential':
        action = 'Complete calorimetry-based runaway review and define explicit trip/interlock and emergency quench criteria.';
        target = 'Have numeric trip limits approved in SOP before next batch release.';
        verify = 'Conduct one controlled simulation/drill and sign off escalation response sheet.';
        break;
      case 'Severe thermal stress':
      case 'High thermal stress':
      case 'Moderate thermal stress':
        action = 'Tighten temperature ramp profile and increase heat-removal margin for peak-load periods.';
        target = `Reduce maximum reaction temperature from ${currentTemp.toFixed(1)} C to <= ${targetTemp.toFixed(1)} C where feasible.`;
        verify = 'Trend batch temperature profile for three runs and confirm reduced overshoot frequency.';
        break;
      case 'High-pressure operation':
      case 'Pressurized operation':
        action = 'Revalidate relief path and add independent high-pressure alarm with tested depressurization procedure.';
        target = `Keep operating pressure below ${targetPressure.toFixed(1)} bar or justify exceedance with approved safeguard package.`;
        verify = 'Perform pressure alarm trip test and log response time in commissioning record.';
        break;
      case 'Engineering controls below standard':
      case 'Standard control envelope':
        action = `Upgrade one additional independent engineering protection layer in the ${hotspotStage}.`;
        target = 'Close at least one high-risk gap currently covered only by administrative controls.';
        verify = 'Update P&ID/control narrative and complete management-of-change approval.';
        break;
      case 'Monitoring blind operation':
      case 'Intermittent monitoring':
        action = `Increase monitoring frequency and add at least one real-time critical parameter in the ${hotspotStage}.`;
        target = 'Ensure no kinetic-sensitive window is operated without active trend visibility.';
        verify = 'Provide historian/sampling evidence showing upgraded monitoring coverage across one full batch.';
        break;
      case 'PPE-dominant risk control':
      case 'Partial PPE dependence':
        action = 'Redesign at least one manual high-exposure task into enclosed or engineered handling mode.';
        target = 'Use PPE as residual protection, not primary barrier, for key hazardous operations.';
        verify = 'Compare task risk matrix before/after and confirm reduced PPE dependency score.';
        break;
      case 'High exotherm intensity':
      case 'Moderate exotherm intensity':
        action = 'Use staged feed plus cooldown interlock during exothermic windows.';
        target = 'Define and enforce feed-stop criteria tied to temperature-rise trend, not only absolute temperature.';
        verify = 'Review control log to confirm interlock readiness and staged-feed execution in trial run.';
        break;
      case 'High hazardous-gas release potential':
      case 'Moderate hazardous-gas release potential':
        action = 'Upgrade gas capture/scrubbing and define stage-specific isolation response for release scenarios.';
        target = 'Demonstrate adequate ventilation/scrubbing margin for worst credible gas release case.';
        verify = 'Complete gas response drill and instrument response check with recorded acceptance results.';
        break;
      case 'Plant-scale consequence amplification':
      case 'Pilot-scale consequence amplification':
        action = 'Run formal scale-gate review before throughput increase and enforce hold points between scale steps.';
        target = 'No scale transition without signed safeguard readiness checklist.';
        verify = `Complete HAZOP/LOPA delta review ${scaleContext} and archive the approval package.`;
        break;
      default: {
        if (item.label.startsWith('Stage risk:')) {
          const stageKey = String(item.label.split(':')[1] || '').trim();
          const stageName = stageAlias[stageKey] || `${stageKey} stage`;
          action = `Define a stage-specific control package for the ${stageName} (entry check, stop criteria, contingency path).`;
          target = `Reduce incidents/deviations attributable to the ${stageName} in next operating cycle.`;
          verify = `Use batch review checklist to confirm all ${stageName} safeguards were executed.`;
        } else {
          action = `Create one targeted corrective action for this risk node focused on the ${hotspotStage}.`;
          target = 'Show measurable reduction of this driver in the next risk evaluation cycle.';
          verify = defaultVerify;
        }
      }
    }

    return `Action (${due}): ${action} Target: ${target} Verify: ${verify}`.replace(/\s+/g, ' ').trim();
  };

  const linkedActions = driverContributions
    .slice(0, 4)
    .map((item) => ({
      label: item.label,
      points: item.points,
      action: buildDynamicAction(item)
    }));

  const topDrivers = linkedActions
    .map((item) => `${item.label} (-${item.points.toFixed(0)})`);

  const actions = linkedActions.length > 0
    ? linkedActions.map((item) => item.action)
    : ['No dominant hazard driver detected. Keep periodic revalidation and management of change checks.'];

  return {
    score100,
    score01: score100 / 100,
    level,
    confidence,
    topDrivers,
    driverContributions,
    linkedActions,
    actions,
    evidenceCount: evidenceList.length,
    stageBreakdown: [
      { stage: 'Charging', level: stageRisks.charge || 'medium' },
      { stage: 'Reaction', level: stageRisks.reaction || 'medium' },
      { stage: 'Quench', level: stageRisks.quench || 'medium' },
      { stage: 'Isolation', level: stageRisks.isolation || 'medium' }
    ]
  };
}

function safetyLevelToValue(level) {
  if (level === 'low') {
    return 0.3;
  }
  if (level === 'high') {
    return 0.95;
  }
  return 0.65;
}

function shortenLabel(text, maxLen) {
  const raw = String(text || '');
  if (raw.length <= maxLen) {
    return raw;
  }
  return `${raw.slice(0, Math.max(0, maxLen - 1))}...`;
}

function ensureSafetyDriverTooltip() {
  let tooltip = document.getElementById('safetyDriverTooltip');
  if (tooltip) {
    return tooltip;
  }

  tooltip = document.createElement('div');
  tooltip.id = 'safetyDriverTooltip';
  tooltip.className = 'safety-driver-tooltip';
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);
  return tooltip;
}

function hideSafetyDriverTooltip() {
  const tooltip = ensureSafetyDriverTooltip();
  tooltip.style.display = 'none';
}

function resolveSafetyDriverRegion(event) {
  if (!safetyDriverChartEl || safetyDriverChartRegions.length === 0) {
    return null;
  }

  const rect = safetyDriverChartEl.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return null;
  }

  const sx = safetyDriverChartEl.width / rect.width;
  const sy = safetyDriverChartEl.height / rect.height;
  const x = (event.clientX - rect.left) * sx;
  const y = (event.clientY - rect.top) * sy;

  return safetyDriverChartRegions.find((region) => (
    x >= region.x
    && x <= region.x + region.width
    && y >= region.y
    && y <= region.y + region.height
  )) || null;
}

function focusSafetyActionByDriver(label) {
  if (!safetyActionsEl || !label) {
    return;
  }

  const cards = Array.from(safetyActionsEl.querySelectorAll('.model-item[data-driver-label]'));
  const matched = cards.find((card) => card.dataset.driverLabel === label);
  if (!matched) {
    setStatus('This driver has no mapped mitigation card in the top recommendations.');
    return;
  }

  cards.forEach((card) => {
    card.classList.remove('driver-linked-focus');
  });

  matched.classList.add('driver-linked-focus');
  matched.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => {
    matched.classList.remove('driver-linked-focus');
  }, 1800);
}

function bindSafetyDriverChartInteractions() {
  if (!safetyDriverChartEl || safetyDriverChartEl.dataset.boundInteractions === '1') {
    return;
  }

  safetyDriverChartEl.dataset.boundInteractions = '1';
  ensureSafetyDriverTooltip();

  safetyDriverChartEl.addEventListener('mousemove', (event) => {
    const hit = resolveSafetyDriverRegion(event);
    const tooltip = ensureSafetyDriverTooltip();
    if (!hit) {
      safetyDriverChartEl.style.cursor = 'default';
      tooltip.style.display = 'none';
      return;
    }

    safetyDriverChartEl.style.cursor = 'pointer';
    tooltip.textContent = `${hit.label}: -${Number(hit.points || 0).toFixed(1)} points | Click to highlight mitigation`;
    tooltip.style.display = 'block';

    const margin = 12;
    const offset = 12;
    const tipRect = tooltip.getBoundingClientRect();
    let left = event.clientX + offset;
    let top = event.clientY + offset;

    if (left + tipRect.width + margin > window.innerWidth) {
      left = event.clientX - tipRect.width - offset;
    }
    if (left < margin) {
      left = margin;
    }
    if (top + tipRect.height + margin > window.innerHeight) {
      top = event.clientY - tipRect.height - offset;
    }
    if (top < margin) {
      top = margin;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  });

  safetyDriverChartEl.addEventListener('mouseleave', () => {
    safetyDriverChartEl.style.cursor = 'default';
    hideSafetyDriverTooltip();
  });

  safetyDriverChartEl.addEventListener('click', (event) => {
    const hit = resolveSafetyDriverRegion(event);
    if (!hit) {
      return;
    }

    safetyDriverChartActiveLabel = hit.label;
    drawSafetyDriverChart(safetyDriverChartEl, safetyDriverChartRows, safetyDriverChartActiveLabel);
    focusSafetyActionByDriver(hit.label);
  });
}

function drawSafetyDriverChart(canvas, contributions, activeLabel = '') {
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const width = canvas.width;
  const height = canvas.height;
  const rows = Array.isArray(contributions) && contributions.length > 0
    ? contributions.slice(0, 6)
    : [{ label: 'No dominant drivers yet', points: 0 }];
  safetyDriverChartRows = rows;

  ctx.clearRect(0, 0, width, height);

  const left = 215;
  const right = 76;
  const top = 22;
  const bottom = 24;
  const rowHeight = (height - top - bottom) / rows.length;
  const maxValue = Math.max(1, ...rows.map((item) => Number(item.points || 0)));

  ctx.strokeStyle = 'rgba(48, 86, 79, 0.22)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, top - 6);
  ctx.lineTo(left, height - bottom + 4);
  ctx.stroke();

  rows.forEach((item, index) => {
    const points = Number(item.points || 0);
    const centerY = top + rowHeight * index + rowHeight / 2;
    const barHeight = Math.max(12, rowHeight * 0.54);
    const barX = left + 8;
    const barY = centerY - barHeight / 2;
    const maxBarWidth = width - barX - right;
    const barWidth = Math.max(0, (points / maxValue) * maxBarWidth);

    ctx.fillStyle = '#224944';
    ctx.font = '700 12px "Segoe UI", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(shortenLabel(item.label, 30), left - 10, centerY);

    ctx.fillStyle = 'rgba(77, 123, 112, 0.16)';
    ctx.fillRect(barX, barY, maxBarWidth, barHeight);

    const ratio = points / maxValue;
    const barColor = getScaleVisual(1 - ratio).solid;
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, barWidth, barHeight);

    if (activeLabel && item.label === activeLabel) {
      ctx.strokeStyle = 'rgba(24, 57, 52, 0.88)';
      ctx.lineWidth = 2;
      ctx.strokeRect(barX - 1, barY - 1, barWidth + 2, barHeight + 2);
    }

    ctx.fillStyle = '#2a4d48';
    ctx.font = '700 12px "Segoe UI", sans-serif';
    ctx.textAlign = 'right';
    const valueX = Math.min(width - 8, barX + barWidth + 44);
    ctx.fillText(`-${points.toFixed(1)}`, valueX, centerY);
  });

  safetyDriverChartRegions = rows.map((item, index) => {
    const points = Number(item.points || 0);
    const centerY = top + rowHeight * index + rowHeight / 2;
    const barHeight = Math.max(12, rowHeight * 0.54);
    const barX = left + 8;
    const barY = centerY - barHeight / 2;
    const maxBarWidth = width - barX - right;
    const barWidth = Math.max(0, (points / maxValue) * maxBarWidth);
    const hitWidth = Math.max(56, barWidth + 18);
    return {
      x: barX,
      y: barY,
      width: hitWidth,
      height: barHeight,
      label: item.label,
      points
    };
  });
}

function drawSafetyStageRadar(canvas, stageBreakdown) {
  if (!canvas) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const nextWidth = Math.max(320, Math.floor(rect.width || canvas.width || 760));
  const nextHeight = Math.max(260, Math.floor(rect.height || canvas.height || 300));
  if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
    canvas.width = nextWidth;
    canvas.height = nextHeight;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const stages = Array.isArray(stageBreakdown) && stageBreakdown.length > 0
    ? stageBreakdown
    : [
        { stage: 'Charging', level: 'medium' },
        { stage: 'Reaction', level: 'medium' },
        { stage: 'Quench', level: 'medium' },
        { stage: 'Isolation', level: 'medium' }
      ];

  const width = canvas.width;
  const height = canvas.height;
  const outerPadding = 12;
  const labelGap = 14;
  const labelFont = '800 13px "Segoe UI", sans-serif';

  ctx.font = labelFont;
  const stageLabels = stages.map((item) => String(item.stage || ''));
  const leftLabelWidth = stageLabels.length >= 4 ? ctx.measureText(stageLabels[3]).width : 56;
  const rightLabelWidth = stageLabels.length >= 2 ? ctx.measureText(stageLabels[1]).width : 56;
  const topLabelHeight = 16;
  const bottomLabelHeight = 16;

  const safeBounds = {
    left: outerPadding + leftLabelWidth + labelGap,
    right: width - outerPadding - rightLabelWidth - labelGap,
    top: outerPadding + topLabelHeight + labelGap,
    bottom: height - outerPadding - bottomLabelHeight - labelGap
  };

  const availableWidth = Math.max(120, safeBounds.right - safeBounds.left);
  const availableHeight = Math.max(120, safeBounds.bottom - safeBounds.top);
  const stretchX = 1.4;
  const stretchY = 1.0;
  const chartScale = 0.95;
  const maxRadius = Math.max(
    36,
    Math.min(
      availableWidth / (2 * stretchX),
      availableHeight / (2 * stretchY)
    ) * chartScale
  );
  const centerX = safeBounds.left + availableWidth / 2;
  const centerY = safeBounds.top + availableHeight / 2;
  const angleOffset = -Math.PI / 2;

  ctx.clearRect(0, 0, width, height);

  for (let level = 1; level <= 4; level += 1) {
    const radius = (maxRadius * level) / 4;
    ctx.beginPath();
    stages.forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / stages.length + angleOffset;
      const x = centerX + radius * stretchX * Math.cos(angle);
      const y = centerY + radius * stretchY * Math.sin(angle);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(48, 86, 79, 0.22)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  stages.forEach((item, index) => {
    const angle = (Math.PI * 2 * index) / stages.length + angleOffset;
    const axisX = centerX + maxRadius * stretchX * Math.cos(angle);
    const axisY = centerY + maxRadius * stretchY * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(axisX, axisY);
    ctx.strokeStyle = 'rgba(48, 86, 79, 0.25)';
    ctx.stroke();

    const labelX = centerX + (maxRadius * stretchX + 12) * Math.cos(angle);
    const labelY = centerY + (maxRadius * stretchY + 12) * Math.sin(angle);
    ctx.fillStyle = '#234542';
    ctx.font = labelFont;
    const horizontal = Math.cos(angle);
    if (Math.abs(horizontal) < 0.2) {
      ctx.textAlign = 'center';
    } else {
      ctx.textAlign = labelX >= centerX ? 'left' : 'right';
    }
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(248, 253, 251, 0.9)';
    ctx.strokeText(item.stage, labelX, labelY);
    ctx.fillText(item.stage, labelX, labelY);
  });

  ctx.beginPath();
  let stageSafetyTotal = 0;
  stages.forEach((item, index) => {
    const value = safetyLevelToValue(item.level);
    const stageSafety = clampUnit(1 - value);
    stageSafetyTotal += stageSafety;
    const radius = maxRadius * value;
    const angle = (Math.PI * 2 * index) / stages.length + angleOffset;
    const x = centerX + radius * stretchX * Math.cos(angle);
    const y = centerY + radius * stretchY * Math.sin(angle);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  const avgStageSafety = stages.length > 0 ? stageSafetyTotal / stages.length : 0;
  const stageVisual = getScaleVisual(avgStageSafety);
  ctx.fillStyle = stageVisual.soft;
  ctx.strokeStyle = stageVisual.strong;
  ctx.lineWidth = 2.2;
  ctx.fill();
  ctx.stroke();
}

function renderSafetyPrecheck() {
  if (!safetyRiskGradeEl || !safetyRiskScoreEl || !safetyConfidenceEl || !safetyActionsEl) {
    return null;
  }

  const result = evaluateSafetyScreening(state.safetyScreening);
  const riskVisual = getScaleVisual(result.score01);
  safetyRiskGradeEl.textContent = result.level;
  safetyRiskGradeEl.style.color = riskVisual.strong;
  safetyRiskScoreEl.textContent = `${result.score100.toFixed(1)} / 100`;
  safetyRiskScoreEl.style.color = riskVisual.solid;
  safetyConfidenceEl.textContent = result.confidence.toFixed(2);

  safetyActionsEl.innerHTML = '';

  if (Array.isArray(result.linkedActions) && result.linkedActions.length > 0) {
    result.linkedActions.forEach((item, index) => {
      const card = createModelCard(`Action ${index + 1}`, item.action);
      card.dataset.driverLabel = item.label;
      card.title = `Linked driver: ${item.label}`;
      safetyActionsEl.appendChild(card);
    });
  } else {
    result.actions.forEach((item, index) => {
      safetyActionsEl.appendChild(createModelCard(`Action ${index + 1}`, item));
    });
  }

  if (safetyEvidenceListEl) {
    safetyEvidenceListEl.innerHTML = '';
    const evidenceList = Array.isArray(state.safetyScreening.routeEvidence) ? state.safetyScreening.routeEvidence : [];
    if (evidenceList.length === 0) {
      safetyEvidenceListEl.appendChild(createModelCard('Evidence', 'No reactant evidence analyzed yet. Use "Analyze Route Risk" after entering reactants.'));
    } else {
      evidenceList.slice(0, 12).forEach((item, index) => {
        const label = item && item.name ? item.name : `Reactant ${index + 1}`;
        const body = `Danger ${Number(item.dangerCount || 0)}, Warning ${Number(item.warningCount || 0)}, CMR ${item.hasCmr ? 'yes' : 'no'}, Flammable ${item.hasFlammable ? 'yes' : 'no'}, Eq ${Number(item.eq || 1).toFixed(2)}, Amount ${Number(item.amountG || 0).toFixed(1)} g, Weight factor ${Number(item.quantityFactor || 1).toFixed(2)}.`;
        safetyEvidenceListEl.appendChild(createModelCard(label, body));
      });
    }
  }

  if (safetyStageHeatmapEl) {
    safetyStageHeatmapEl.innerHTML = '';
    const stages = Array.isArray(result.stageBreakdown) ? result.stageBreakdown : [];
    if (stages.length === 0) {
      safetyStageHeatmapEl.appendChild(createModelCard('Stage', 'No stage risk data.'));
    } else {
      stages.forEach((item) => {
        const chip = document.createElement('article');
        chip.className = `stage-chip ${item.level || 'medium'}`;
        const title = document.createElement('p');
        title.className = 'model-item-title';
        title.textContent = item.stage;
        const body = document.createElement('p');
        body.className = 'model-item-body';
        body.textContent = `Risk level: ${(item.level || 'medium').toUpperCase()}`;
        chip.appendChild(title);
        chip.appendChild(body);
        safetyStageHeatmapEl.appendChild(chip);
      });
    }
  }

  bindSafetyDriverChartInteractions();
  if (result.driverContributions.some((item) => item.label === safetyDriverChartActiveLabel) === false) {
    safetyDriverChartActiveLabel = '';
  }
  drawSafetyDriverChart(safetyDriverChartEl, result.driverContributions, safetyDriverChartActiveLabel);
  drawSafetyStageRadar(safetyStageRadarEl, result.stageBreakdown);

  return result;
}

function hashText(value) {
  const text = String(value || '');
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

function choosePhrase(pool, seedKey) {
  if (!Array.isArray(pool) || pool.length === 0) {
    return '';
  }
  return pool[hashText(seedKey) % pool.length];
}

function buildStructuredMultiRouteAnalysis(routeSet) {
  const routes = Array.isArray(routeSet) ? routeSet : [];
  const rankings = [...routes].sort((a, b) => b.total - a.total);
  const topRoute = rankings[0] || null;
  const secondRoute = rankings[1] || null;

  const winsByRoute = new Map(routes.map((route) => [route.name, 0]));
  const principleStats = PRINCIPLES.map((principle, index) => {
    const scored = routes
      .map((route) => ({
        routeName: route.name,
        score: clampScore(route.values[index]),
        weight: Number(route.weights[index] || 0)
      }))
      .sort((a, b) => b.score - a.score);

    const maxScore = scored[0] ? scored[0].score : 0;
    scored.forEach((entry) => {
      if (Math.abs(entry.score - maxScore) <= WEIGHT_TOLERANCE) {
        winsByRoute.set(entry.routeName, (winsByRoute.get(entry.routeName) || 0) + 1);
      }
    });

    const minScore = scored[scored.length - 1] ? scored[scored.length - 1].score : 0;
    const mean = scored.length > 0
      ? scored.reduce((sum, entry) => sum + entry.score, 0) / scored.length
      : 0;
    const spread = maxScore - minScore;

    return {
      principle,
      best: scored[0] || null,
      worst: scored[scored.length - 1] || null,
      mean,
      spread,
      weight: Number(routes[0]?.weights[index] || 0),
      residualPotential: (1 - maxScore) * (Number(routes[0]?.weights[index] || 0) / 100)
    };
  });

  const discriminative = [...principleStats]
    .sort((a, b) => b.spread - a.spread)
    .slice(0, 3);
  const residualTargets = [...principleStats]
    .sort((a, b) => b.residualPotential - a.residualPotential)
    .slice(0, 4);

  const fusionSelections = PRINCIPLES.map((principle, index) => {
    const bestEntry = routes
      .map((route) => ({
        routeName: route.name,
        score: clampScore(route.values[index])
      }))
      .sort((a, b) => b.score - a.score)[0];

    return {
      principle,
      routeName: bestEntry ? bestEntry.routeName : 'N/A',
      score: bestEntry ? bestEntry.score : 0
    };
  });

  const fusionTotal = fusionSelections.reduce((sum, selection, index) => {
    const weight = Number(routes[0]?.weights[index] || 0);
    const safeWeight = Number.isFinite(weight) ? Math.max(0, weight) : 0;
    return sum + selection.score * (safeWeight / 100);
  }, 0);

  const fusionMix = fusionSelections.reduce((map, selection) => {
    map.set(selection.routeName, (map.get(selection.routeName) || 0) + 1);
    return map;
  }, new Map());

  return {
    routeCount: routes.length,
    routes,
    rankings,
    topRoute,
    secondRoute,
    winsByRoute,
    principleStats,
    discriminative,
    residualTargets,
    fusionSelections,
    fusionTotal,
    fusionMix,
    fusionGain: topRoute ? Math.max(0, fusionTotal - topRoute.total) : 0
  };
}

function formatNaturalList(items, conjunction = 'and') {
  const clean = (Array.isArray(items) ? items : []).filter(Boolean);
  if (clean.length === 0) {
    return 'none';
  }
  if (clean.length === 1) {
    return clean[0];
  }
  if (clean.length === 2) {
    return `${clean[0]} ${conjunction} ${clean[1]}`;
  }
  return `${clean.slice(0, -1).join(', ')}, ${conjunction} ${clean[clean.length - 1]}`;
}

function compactRouteRanking(rankings, limit = 5) {
  return (Array.isArray(rankings) ? rankings : [])
    .slice(0, limit)
    .map((route, index) => `${index + 1}) ${route.name} ${Number(route.total || 0).toFixed(2)}`);
}

function generateEvaluationNarrative(analysis) {
  if (!analysis || analysis.routeCount === 0) {
    return 'No route is available for analysis.';
  }

  const opener = choosePhrase([
    'Cross-route evidence converges on the following pattern:',
    'The comparative landscape reveals the following structure:',
    'Multi-route diagnostics indicate a clear but nuanced ranking:'
  ], `${analysis.routeCount}|${analysis.topRoute?.name || 'none'}|eval`);

  const rankingLine = compactRouteRanking(analysis.rankings, Math.min(analysis.routeCount, 5));
  const rankingText = formatNaturalList(rankingLine, 'and');

  if (analysis.routeCount === 1) {
    const single = analysis.routes[0];
    const focus = analysis.residualTargets.map((item) => item.principle.short);
    return `${opener} only ${single.name} is currently compatible with the active weight profile, total ${single.total.toFixed(2)} / 1.00. Highest residual leverage appears in ${formatNaturalList(focus, 'and')}, so the next iteration should focus there while preserving strong-performing principles.`;
  }

  const top = analysis.topRoute;
  const second = analysis.secondRoute;
  const topWins = top ? (analysis.winsByRoute.get(top.name) || 0) : 0;
  const secondWins = second ? (analysis.winsByRoute.get(second.name) || 0) : 0;
  const diff = top && second ? (top.total - second.total) : 0;

  const mostDiscriminative = analysis.discriminative
    .map((item) => `${item.principle.short} (spread ${item.spread.toFixed(2)})`);
  const mostStable = [...(analysis.principleStats || [])]
    .sort((a, b) => a.spread - b.spread)
    .slice(0, 2)
    .map((item) => `${item.principle.short} (spread ${item.spread.toFixed(2)})`);

  return [
    `${opener} top ranking snapshot is ${rankingText}.`,
    `${top?.name || 'N/A'} leads with ${top?.total.toFixed(2) || '0.00'} / 1.00, ahead of ${second?.name || 'N/A'} by ${diff.toFixed(2)}.`,
    `Principle-win counts are ${top?.name || 'N/A'} ${topWins} and ${second?.name || 'N/A'} ${secondWins}, which means route superiority is distributed rather than absolute.`,
    `Greatest separation comes from ${formatNaturalList(mostDiscriminative, 'and')}, while convergence is strongest on ${formatNaturalList(mostStable, 'and')}.`,
    'Decision implication: treat optimization as modular transplant across principles, not binary route replacement.'
  ].join(' ');
}

function generateRoadmapNarrative(analysis) {
  const targets = analysis && Array.isArray(analysis.residualTargets)
    ? analysis.residualTargets
    : [];
  const topTargets = targets.slice(0, 4).map((item) => `${item.principle.short} ${item.principle.title}`);
  const actionText = targets.length > 0
    ? targets
      .slice(0, 3)
      .map((item) => PRINCIPLE_RECOMMENDATION_LIBRARY[item.principle.id])
      .join(' ')
    : 'Maintain current controls and continue periodic validation refresh.';

  const framing = choosePhrase([
    'Roadmap construction should follow a layered system view.',
    'Execution roadmap should be sequenced by leverage and controllability.',
    'A robust roadmap should combine quick wins and structural redesign.'
  ], `${analysis?.routeCount || 0}|roadmap`);

  return [
    framing,
    'Layer A (material efficiency): P1, P2, P8, P9.',
    'Layer B (hazard and intrinsic safety): P3, P4, P5, P12.',
    'Layer C (energy and carbon): P6, P7.',
    'Layer D (lifecycle controllability): P10, P11.',
    `Current residual priorities are ${formatNaturalList(topTargets, 'and')}.`,
    `Immediate action package: ${actionText}`
  ].join(' ');
}

function generateFusionNarrative(analysis) {
  if (!analysis || analysis.routeCount === 0) {
    return 'Optimized Route Plan recommendation is unavailable because no route data exists.';
  }

  if (analysis.routeCount === 1) {
    return 'Optimized Route Plan generation remains locked because at least two compatible routes are required. Add more routes under the same weight profile to unlock cross-route synthesis.';
  }

  const mixText = Array.from(analysis.fusionMix.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => `${name} contributes ${count}`);

  const highGainAdoptions = analysis.fusionSelections
    .map((entry) => {
      const origin = analysis.routes.find((route) => route.name === entry.routeName);
      if (!origin) {
        return null;
      }
      return `${entry.principle.short} from ${entry.routeName}`;
    })
    .filter(Boolean)
    .slice(0, 4);

  const fusionFrame = choosePhrase([
    'Fusion simulation suggests a measurable integrative upside.',
    'Cross-route synthesis indicates a viable Optimized Route Plan uplift corridor.',
    'Optimized Route Plan assembly shows that blended principles outperform monolithic selection.'
  ], `${analysis.routeCount}|fusion|${analysis.fusionTotal.toFixed(2)}`);

  return [
    fusionFrame,
    `Optimized Route Plan projects ${analysis.fusionTotal.toFixed(2)} / 1.00, with uplift ${analysis.fusionGain.toFixed(2)} over the current best route.`,
    `Contribution mix is ${formatNaturalList(mixText, 'and')}.`,
    `Priority transplant set includes ${formatNaturalList(highGainAdoptions, 'and')}.`,
    'Implementation strategy should be phased: pilot principle-level transfers first, then consolidate after verification under unchanged weights.'
  ].join(' ');
}

function validateGeneratedNarratives(report, analysis) {
  if (!report || !analysis || !analysis.topRoute) {
    return false;
  }

  const requiredEvaluationTokens = [
    analysis.topRoute.name,
    analysis.topRoute.total.toFixed(2)
  ];
  const evaluationOk = requiredEvaluationTokens.every((token) => report.evaluation.includes(token));

  const fusionToken = analysis.fusionTotal.toFixed(2);
  const fusionOk = report.fusion.includes(fusionToken);

  return evaluationOk && fusionOk;
}

function renderModelNarrativeCards(summaryText, report) {
  modelSummaryEl.textContent = summaryText;
  modelPriorityListEl.innerHTML = '';
  modelStrengthListEl.innerHTML = '';

  const evalCard = createModelCard('Generated Evaluation Narrative', report.evaluation);
  evalCard.classList.add('compact');
  modelPriorityListEl.appendChild(evalCard);

  const roadmapCard = createModelCard('Generated 12-Principle Roadmap', report.roadmap);
  roadmapCard.classList.add('compact');
  modelPriorityListEl.appendChild(roadmapCard);

  const fusionCard = createModelCard('Generated Optimized Route Plan Narrative', report.fusion);
  fusionCard.classList.add('compact');
  modelStrengthListEl.appendChild(fusionCard);
}

function renderRejectedComparisonList() {
  if (!compareRejectedPanelEl || !compareRejectedListEl) {
    return;
  }

  const rejected = Array.isArray(state.rejectedComparisonEntries) ? state.rejectedComparisonEntries : [];
  compareRejectedListEl.innerHTML = '';

  if (rejected.length === 0) {
    compareRejectedPanelEl.style.display = 'none';
    return;
  }

  compareRejectedPanelEl.style.display = 'block';
  rejected.forEach((entry) => {
    const mismatchText = Array.isArray(entry.mismatches) && entry.mismatches.length > 0
      ? entry.mismatches.map((mismatch) => {
          if (!Number.isFinite(mismatch.base) || !Number.isFinite(mismatch.candidate)) {
            return `${mismatch.short}: invalid weight vector length`;
          }
          return `${mismatch.short} ${mismatch.base.toFixed(2)}% -> ${mismatch.candidate.toFixed(2)}%`;
        }).join('; ')
      : 'Unknown mismatch reason.';

    const card = createModelCard(entry.name || 'Unknown file', `Rejected due to weight mismatch. ${mismatchText}`);
    card.classList.add('compact');
    compareRejectedListEl.appendChild(card);
  });
}

function renderRecommendationModel(total, weightSummary, comparisonInfo = { compatibleCount: 0, incompatibleCount: 0 }, safetyResult = null) {
  if (!modelGradeEl || !modelConfidenceEl || !modelSummaryEl || !modelPriorityListEl || !modelStrengthListEl) {
    return;
  }

  const grade = getModelGrade(total);
  const gradeVisual = getScaleVisual(total);
  const confidence = weightSummary.totalValid && weightSummary.minValid ? 1 : 0.72;
  modelGradeEl.textContent = grade;
  modelGradeEl.style.color = gradeVisual.strong;
  modelGradeEl.title = `${gradeVisual.label} (${total.toFixed(2)})`;
  modelConfidenceEl.textContent = confidence.toFixed(2);

  const current = comparisonInfo.currentSnapshot || buildCurrentSnapshot();
  const compatibleSnapshots = Array.isArray(comparisonInfo.compatibleSnapshots) ? comparisonInfo.compatibleSnapshots : [];
  const analysisRoutes = [
    current,
    ...compatibleSnapshots.map((snapshot) => ({
      ...snapshot,
      name: snapshot.name || 'Compared Route'
    }))
  ];
  const structuredAnalysis = buildStructuredMultiRouteAnalysis(analysisRoutes);

  const generatedReport = {
    evaluation: generateEvaluationNarrative(structuredAnalysis),
    roadmap: generateRoadmapNarrative(structuredAnalysis),
    fusion: generateFusionNarrative(structuredAnalysis)
  };

  const generationValid = validateGeneratedNarratives(generatedReport, structuredAnalysis);
  if (!generationValid) {
    generatedReport.evaluation = `Generated narrative fallback: ${structuredAnalysis.topRoute?.name || 'N/A'} leads with ${structuredAnalysis.topRoute?.total.toFixed(2) || '0.00'} / 1.00 across ${structuredAnalysis.routeCount} route(s).`;
    generatedReport.roadmap = generateRoadmapNarrative(structuredAnalysis);
    generatedReport.fusion = `Generated fusion fallback: Optimized Route Plan estimated total ${structuredAnalysis.fusionTotal.toFixed(2)} / 1.00.`;
  }

  const mismatchNote = comparisonInfo.incompatibleCount > 0
    ? ` ${comparisonInfo.incompatibleCount} comparison file(s) were excluded due to different weights to avoid pseudo-green conclusions.`
    : '';

  const safetyNote = safetyResult
    ? ` Safety precheck: ${safetyResult.level} risk (${safetyResult.score100.toFixed(1)} / 100, confidence ${safetyResult.confidence.toFixed(2)}), analyzed reactants ${Number(safetyResult.evidenceCount || 0)}.`
    : '';
  const baseSummary = `Generation mode: local deterministic engine. Current route grade is ${grade}, current total ${total.toFixed(2)} / 1.00, and compatible route count is ${structuredAnalysis.routeCount - 1}.${mismatchNote}${safetyNote}`;
  renderModelNarrativeCards(baseSummary, generatedReport);
}

function updateVisualizationLockState(summary) {
  const unlocked = summary.totalValid && summary.minValid;
  if (!vizLockOverlayEl || !visualCardEl) {
    return unlocked;
  }

  visualCardEl.classList.toggle('locked', !unlocked);
  vizLockOverlayEl.classList.toggle('active', !unlocked);
  viewRadarBtnEl.disabled = !unlocked;
  viewGaugeBtnEl.disabled = !unlocked;
  viewFlowerBtnEl.disabled = !unlocked;

  if (!unlocked) {
    const detailLine = !summary.minValid
      ? `<p>Invalid weight (&lt; ${WEIGHT_MIN_STRICT.toFixed(0)}%) detected: <strong>${summary.invalidItems.join(', ')}</strong></p>`
      : `<p>All individual weights are valid (&gt;= ${WEIGHT_MIN_STRICT.toFixed(0)}%).</p>`;

    vizLockOverlayEl.innerHTML = [
      '<h4>Visualization Locked</h4>',
      `<p>Weight total must equal ${WEIGHT_TARGET_TOTAL.toFixed(0)}% to unlock charts.</p>`,
      `<p>Current total: <strong>${summary.totalWeight.toFixed(2)}%</strong></p>`,
      detailLine
    ].join('');
    clearVisualizationCanvases();
  }

  return unlocked;
}

function setStatus(message) {
  statusBarEl.textContent = message;
}

function openRouteSafetyPage() {
  if (!routeSafetyPageEl) {
    return;
  }
  routeSafetyPageEl.classList.remove('hidden');
  setStatus('Route safety prediction workspace opened.');
}

function closeRouteSafetyPage() {
  if (!routeSafetyPageEl) {
    return;
  }
  routeSafetyPageEl.classList.add('hidden');
  setStatus('Returned to main assessment workspace.');
}

function clampScore(rawValue) {
  const value = Number(rawValue);
  if (Number.isNaN(value)) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

function getScaleTier(score) {
  const v = clampScore(score);
  if (v > 0.8) {
    return 0;
  }
  if (v > 0.6) {
    return 1;
  }
  if (v > 0.3) {
    return 2;
  }
  if (v > 0.1) {
    return 3;
  }
  return 4;
}

function hexToRgbLocal(hex) {
  if (typeof hex !== 'string') {
    return { r: 0, g: 0, b: 0 };
  }
  const normalized = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;
  const value = normalized.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16) || 0,
    g: parseInt(value.slice(2, 4), 16) || 0,
    b: parseInt(value.slice(4, 6), 16) || 0
  };
}

function rgbToHexLocal(r, g, b) {
  const toHex = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixHexLocal(fromHex, toHex, t) {
  const p = Math.max(0, Math.min(1, Number(t) || 0));
  const a = hexToRgbLocal(fromHex);
  const b = hexToRgbLocal(toHex);
  return rgbToHexLocal(
    a.r + (b.r - a.r) * p,
    a.g + (b.g - a.g) * p,
    a.b + (b.b - a.b) * p
  );
}

function rgbaFromHexLocal(hex, alpha) {
  const c = hexToRgbLocal(hex);
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}

function getScaleTierProgress(score) {
  const v = clampScore(score);
  if (v > 0.8) {
    return (v - 0.8) / 0.2;
  }
  if (v > 0.6) {
    return (v - 0.6) / 0.2;
  }
  if (v > 0.3) {
    return (v - 0.3) / 0.3;
  }
  if (v > 0.1) {
    return (v - 0.1) / 0.2;
  }
  return v / 0.1;
}

function getScaleVisual(score) {
  const palette = [
    {
      label: 'Excellent',
      low: '#2cbf68',
      high: '#167a41'
    },
    {
      label: 'Great',
      low: '#7fc85b',
      high: '#4f9f34'
    },
    {
      label: 'Good',
      low: '#e0c25a',
      high: '#b38f2f'
    },
    {
      label: 'Poor',
      low: '#ee9648',
      high: '#c46615'
    },
    {
      label: 'Bad',
      low: '#d45145',
      high: '#99251d'
    }
  ];
  const tier = palette[getScaleTier(score)];
  const t = getScaleTierProgress(score);
  const solid = mixHexLocal(tier.low, tier.high, t);
  return {
    label: tier.label,
    solid,
    soft: rgbaFromHexLocal(solid, 0.18),
    border: rgbaFromHexLocal(solid, 0.40),
    strong: mixHexLocal(solid, '#111111', 0.2)
  };
}

function createHelpTip(text) {
  const tip = document.createElement('span');
  tip.className = 'help-tip';
  tip.textContent = '?';
  tip.setAttribute('tabindex', '0');
  tip.setAttribute('aria-label', text);

  const popup = document.createElement('span');
  popup.className = 'help-tip-popup';
  popup.textContent = text;
  tip.appendChild(popup);

  return tip;
}

function attachRecommendationHelpTips() {
  if (modelGradeHelpHostEl && modelGradeHelpHostEl.childElementCount === 0) {
    modelGradeHelpHostEl.appendChild(createHelpTip(
      'Five-band thresholds (weighted total score): (0.8,1.0] = Excellent, (0.6,0.8] = Great, (0.3,0.6] = Good, (0.1,0.3] = Poor, [0,0.1] = Bad.'
    ));
  }

  if (modelSafetyHelpHostEl && modelSafetyHelpHostEl.childElementCount === 0) {
    modelSafetyHelpHostEl.appendChild(createHelpTip(
      'Safety precheck score = clamp(100 - total deductions, 0..100). Deductions come from danger/warning counts, CMR, flammability, runaway risk, temperature, pressure, controls, monitoring, PPE dependence, exotherm/gas release, stage risks, and scale. Confidence = 0.55 + 0.45 * completeness ratio, where completeness ratio = (number of filled safety evidence fields) / (total required safety evidence fields), clamped to 0..1.'
    ));
  }
}

function renderForm() {
  formEl.innerHTML = '';

  const navWrap = document.createElement('div');
  navWrap.className = 'principle-nav';

  state.items.forEach((item, index) => {
    const navItem = document.createElement('div');
    navItem.className = 'principle-nav-item';

    if (item.id === state.activePrincipleId) {
      navItem.classList.add('active');
    }

    const navBtn = document.createElement('button');
    navBtn.type = 'button';
    navBtn.className = 'principle-nav-btn';
    navBtn.textContent = item.short;
    navBtn.setAttribute('aria-label', `Open ${item.title}`);

    navBtn.addEventListener('click', () => {
      state.activePrincipleId = item.id;
      renderForm();
      setStatus(`Editing ${item.short}: ${item.title}`);
    });

    const weightInput = document.createElement('input');
    weightInput.className = 'principle-weight-input';
    weightInput.type = 'number';
    weightInput.step = '0.01';
    weightInput.min = WEIGHT_MIN_STRICT.toFixed(2);
    weightInput.max = '100';
    weightInput.value = Number(state.principleWeights[index] ?? WEIGHT_MIN_STRICT).toFixed(2);
    weightInput.setAttribute('aria-label', `${item.short} weight`);
    weightInput.title = `Weight percentage for this principle (must be >= ${WEIGHT_MIN_STRICT.toFixed(0)} and <= 100)`;

    weightInput.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    weightInput.addEventListener('input', () => {
      const raw = Number(weightInput.value);
      if (Number.isNaN(raw)) {
        return;
      }
      const clamped = Math.max(-100, Math.min(100, raw));
      state.principleWeights[index] = clamped;
      refreshSummary();
      const summary = getWeightValidationSummary();
      if (summary.minValid && summary.totalValid) {
        setStatus(`${item.short} weight updated to ${clamped.toFixed(2)}%. Weight total is ${summary.totalWeight.toFixed(2)}%. Visualization unlocked.`);
      } else if (!summary.minValid) {
        setStatus(`${item.short} weight updated to ${clamped.toFixed(2)}%. Invalid weight detected (< ${WEIGHT_MIN_STRICT.toFixed(0)}%): ${summary.invalidItems.join(', ')}. Visualization remains locked.`);
      } else {
        setStatus(`${item.short} weight updated to ${clamped.toFixed(2)}%. Current total is ${summary.totalWeight.toFixed(2)}%. Set total to 100.00% to unlock visualization.`);
      }
    });

    weightInput.addEventListener('blur', () => {
      const raw = Number(weightInput.value);
      if (!Number.isFinite(raw) || raw < WEIGHT_MIN_STRICT) {
        state.principleWeights[index] = WEIGHT_MIN_STRICT;
        weightInput.value = WEIGHT_MIN_STRICT.toFixed(2);
        refreshSummary();

        const summary = getWeightValidationSummary();
        if (summary.totalValid && summary.minValid) {
          setStatus(`${item.short} weight was auto-corrected to ${WEIGHT_MIN_STRICT.toFixed(2)}%. Weight total is ${summary.totalWeight.toFixed(2)}%. Visualization unlocked.`);
        } else {
          setStatus(`${item.short} weight was auto-corrected to ${WEIGHT_MIN_STRICT.toFixed(2)}%. Current total is ${summary.totalWeight.toFixed(2)}%. Set total to 100.00% to unlock visualization.`);
        }
        return;
      }

      const normalized = Math.max(WEIGHT_MIN_STRICT, Math.min(100, raw));
      state.principleWeights[index] = normalized;
      weightInput.value = normalized.toFixed(2);
      refreshSummary();
    });

    navItem.appendChild(navBtn);
    navItem.appendChild(weightInput);
    navWrap.appendChild(navItem);
  });

  const activeIndex = state.items.findIndex((item) => item.id === state.activePrincipleId);
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;
  const activeItem = state.items[safeIndex];

  const wrapper = document.createElement('article');
  wrapper.className = 'principle-item principle-focus';

  const title = document.createElement('h3');
  title.className = 'principle-title';
  title.textContent = `${activeItem.short}. ${activeItem.title}`;

  const subhead = document.createElement('p');
  subhead.className = 'principle-subhead';
  subhead.textContent = 'Use this area for all questions under the selected principle.';

  const controls = document.createElement('div');
  controls.className = 'principle-controls';

  const scoreInput = document.createElement('input');
  scoreInput.className = 'score-input';
  scoreInput.type = 'number';
  scoreInput.step = '0.01';
  scoreInput.min = '0';
  scoreInput.max = '1';
  scoreInput.value = activeItem.score.toFixed(2);
  scoreInput.setAttribute('aria-label', `${activeItem.title} score`);

  const noteInput = document.createElement('input');
  noteInput.className = 'note-input';
  noteInput.type = 'text';
  noteInput.value = activeItem.note;
  noteInput.placeholder = 'Qualitative note for this principle';
  noteInput.setAttribute('aria-label', `${activeItem.title} note`);

  const hint = document.createElement('p');
  hint.className = 'input-hint';
  hint.textContent = '';

  const questionBlock = document.createElement('section');
  questionBlock.className = 'question-block';
  if (activeItem.id === 'p1') {
    const details = {
      ...getP1DefaultDetails(),
      ...(activeItem.details || {})
    };
    activeItem.details = details;
    const result = calculateP1Scores(details);
    activeItem.score = result.total;
    details.pmi = result.pmi;
    details.score = result.total;
    details.validationMessage = result.validationMessage;

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Automatically calculated from the PMI logarithmic model.';

    const p1Wrap = document.createElement('div');
    p1Wrap.className = 'p1-wrap';

    const introCard = document.createElement('article');
    introCard.className = 'p1-card';
    introCard.innerHTML = [
      '<h4>Question: Material Consumption and Prevention Assessment (PMI)</h4>',
      '<p class="p1-note">Enter mass data for this synthesis route (or specific step). The system computes PMI first, then maps it to a 0-1 score.</p>'
    ].join('');

    const quantControls = document.createElement('div');
    quantControls.className = 'p1-grid';

    const totalMassLabel = document.createElement('label');
    totalMassLabel.className = 'p1-field';
    const totalMassTitle = document.createElement('span');
    totalMassTitle.className = 'p1-field-title';
    totalMassTitle.textContent = 'Total Material Input (m_in)';
    totalMassTitle.appendChild(
      createHelpTip(
        'Include reactants, solvents, catalysts, water, quench reagents, and all auxiliary process materials.'
      )
    );
    totalMassLabel.appendChild(totalMassTitle);
    const totalMassInput = document.createElement('input');
    totalMassInput.className = 'score-input';
    totalMassInput.type = 'number';
    totalMassInput.step = '0.0001';
    totalMassInput.min = '0';
    totalMassInput.placeholder = 'e.g. 125.5';
    totalMassInput.value = details.totalInputMass;
    totalMassLabel.appendChild(totalMassInput);

    const productMassLabel = document.createElement('label');
    productMassLabel.className = 'p1-field';
    const productMassTitle = document.createElement('span');
    productMassTitle.className = 'p1-field-title';
    productMassTitle.textContent = 'Target Product Mass (m_out)';
    productMassTitle.appendChild(
      createHelpTip(
        'Use final isolated pure product mass only. Exclude crude material, theoretical yield, and by-product mass.'
      )
    );
    productMassLabel.appendChild(productMassTitle);
    const productMassInput = document.createElement('input');
    productMassInput.className = 'score-input';
    productMassInput.type = 'number';
    productMassInput.step = '0.0001';
    productMassInput.min = '0';
    productMassInput.placeholder = 'e.g. 90.0';
    productMassInput.value = details.targetProductMass || details.actualProductMass || '';
    productMassLabel.appendChild(productMassInput);

    quantControls.appendChild(totalMassLabel);
    quantControls.appendChild(productMassLabel);

    const unitNote = document.createElement('p');
    unitNote.className = 'p1-unit-note';
    unitNote.textContent = 'Unit note: use the same unit for m_in and m_out (for example both kg or both g).';

    const formulaCard = document.createElement('article');
    formulaCard.className = 'p1-card';
    formulaCard.innerHTML = [
      '<h4>Core Algorithm and Scoring Logic</h4>',
      '<p class="p1-formula">PMI = Σm_in / m_out</p>',
      '<p class="p1-formula">Score = max(0, 1 - log10(PMI) / 3)</p>',
      '<p class="p1-note">Boundary note: PMI = 1000 corresponds to the 0-score line; when PMI > 1000, score is fixed at 0.</p>'
    ].join('');

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    if (result.pmi === null) {
      totalSummary.textContent = `P1 Result: PMI = - | Score = ${activeItem.score.toFixed(3)} / 1.000`;
    } else {
      totalSummary.textContent = `P1 Result: PMI = ${result.pmi.toFixed(4)} | Score = ${activeItem.score.toFixed(3)} / 1.000`;
    }

    const validationNote = document.createElement('p');
    validationNote.className = 'p2-priority-note';
    validationNote.textContent = result.validationMessage || 'Tip: PMI and score update automatically as inputs change.';

    function updateP1AndRefresh() {
      const recalculated = calculateP1Scores(details);
      details.pmi = recalculated.pmi;
      details.score = recalculated.total;
      details.validationMessage = recalculated.validationMessage;
      activeItem.score = recalculated.total;

      scoreInput.value = activeItem.score.toFixed(2);
      if (recalculated.pmi === null) {
        totalSummary.textContent = `P1 Result: PMI = - | Score = ${activeItem.score.toFixed(3)} / 1.000`;
      } else {
        totalSummary.textContent = `P1 Result: PMI = ${recalculated.pmi.toFixed(4)} | Score = ${activeItem.score.toFixed(3)} / 1.000`;
      }
      validationNote.textContent = recalculated.validationMessage || 'Tip: PMI and score update automatically as inputs change.';
      refreshSummary();
    }

    totalMassInput.addEventListener('input', () => {
      details.totalInputMass = totalMassInput.value;
      updateP1AndRefresh();
    });

    productMassInput.addEventListener('input', () => {
      details.targetProductMass = productMassInput.value;
      updateP1AndRefresh();
    });
    introCard.appendChild(quantControls);
    introCard.appendChild(unitNote);

    p1Wrap.appendChild(introCard);
    p1Wrap.appendChild(formulaCard);
    p1Wrap.appendChild(validationNote);
    p1Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p1Wrap);
  } else if (activeItem.id === 'p2') {
    const details = {
      ...getP2DefaultDetails(),
      ...(activeItem.details || {})
    };
    activeItem.details = details;
    const result = calculateP2Scores(details);
    details.score = result.total;
    details.validationMessage = result.validationMessage;
    activeItem.score = result.total;

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Automatically calculated from the atom-economy formula.';

    const p2Wrap = document.createElement('div');
    p2Wrap.className = 'p1-wrap';

    const introCard = document.createElement('article');
    introCard.className = 'p1-card';
    introCard.innerHTML = [
      '<h4>Question: Reaction Route Design Assessment Based on Atom Economy</h4>',
      '<p class="p1-note">This item evaluates theoretical atom economy from reaction stoichiometry only. It does not include actual yield, solvents, or separations.</p>'
    ].join('');

    const inputControls = document.createElement('div');
    inputControls.className = 'p1-grid';

    const mwProductLabel = document.createElement('label');
    mwProductLabel.className = 'p1-field';
    const mwProductTitle = document.createElement('span');
    mwProductTitle.className = 'p1-field-title';
    mwProductTitle.textContent = 'Target Product Molecular Weight (MW_product)';
    mwProductTitle.appendChild(
      createHelpTip(
        'Use the molecular weight of the target product from reaction stoichiometry (g/mol).'
      )
    );
    mwProductLabel.appendChild(mwProductTitle);

    const mwProductInput = document.createElement('input');
    mwProductInput.className = 'score-input';
    mwProductInput.type = 'number';
    mwProductInput.step = '0.0001';
    mwProductInput.min = '0';
    mwProductInput.placeholder = 'e.g. 180.16';
    mwProductInput.value = details.mwProduct || details.actualProductMass || '';
    mwProductLabel.appendChild(mwProductInput);

    const sumReactantsLabel = document.createElement('label');
    sumReactantsLabel.className = 'p1-field';
    const sumReactantsTitle = document.createElement('span');
    sumReactantsTitle.className = 'p1-field-title';
    sumReactantsTitle.textContent = 'Sum of Reactant Molecular Weights (ΣMW_reactants)';
    sumReactantsTitle.appendChild(
      createHelpTip(
        'Include only reactants on the left side of the equation. Exclude solvents, catalysts, and non-participating materials.'
      )
    );
    sumReactantsLabel.appendChild(sumReactantsTitle);

    const sumReactantsInput = document.createElement('input');
    sumReactantsInput.className = 'score-input';
    sumReactantsInput.type = 'number';
    sumReactantsInput.step = '0.0001';
    sumReactantsInput.min = '0';
    sumReactantsInput.placeholder = 'e.g. 244.24';
    sumReactantsInput.value = details.sumMwReactants || details.totalInputMass || '';
    sumReactantsLabel.appendChild(sumReactantsInput);

    inputControls.appendChild(mwProductLabel);
    inputControls.appendChild(sumReactantsLabel);

    const unitNote = document.createElement('p');
    unitNote.className = 'p1-unit-note';
    unitNote.textContent = 'Unit note: molecular-weight inputs should use g/mol.';

    introCard.appendChild(inputControls);
    introCard.appendChild(unitNote);

    const formulaCard = document.createElement('article');
    formulaCard.className = 'p1-card';
    formulaCard.innerHTML = [
      '<h4>Core Algorithm</h4>',
      '<p class="p1-formula">Score = MW_product / ΣMW_reactants</p>',
      '<p class="p1-note">Input guard: ensure ΣMW_reactants is non-zero and greater than or equal to MW_product.</p>'
    ].join('');

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P2 Result: Score = ${activeItem.score.toFixed(3)} / 1.000`;

    const validationNote = document.createElement('p');
    validationNote.className = 'p2-priority-note';
    validationNote.textContent = result.validationMessage || 'Tip: score updates automatically as inputs change.';

    function updateP2AndRefresh() {
      const recalculated = calculateP2Scores(details);
      details.score = recalculated.total;
      details.validationMessage = recalculated.validationMessage;
      activeItem.score = recalculated.total;

      scoreInput.value = activeItem.score.toFixed(2);
      totalSummary.textContent = `P2 Result: Score = ${activeItem.score.toFixed(3)} / 1.000`;
      validationNote.textContent = recalculated.validationMessage || 'Tip: score updates automatically as inputs change.';
      refreshSummary();
    }

    mwProductInput.addEventListener('input', () => {
      details.mwProduct = mwProductInput.value;
      updateP2AndRefresh();
    });

    sumReactantsInput.addEventListener('input', () => {
      details.sumMwReactants = sumReactantsInput.value;
      updateP2AndRefresh();
    });

    p2Wrap.appendChild(introCard);
    p2Wrap.appendChild(formulaCard);
    p2Wrap.appendChild(validationNote);
    p2Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p2Wrap);
  } else if (activeItem.id === 'p3') {
    const details = activeItem.details || getP3DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP3Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 3 hazard-level option.';

    const p3Wrap = document.createElement('div');
    p3Wrap.className = 'p1-wrap';

    const p3Intro = document.createElement('p');
    p3Intro.className = 'p2-priority-note';
    p3Intro.textContent = 'Review SDS information and choose the highest health/environmental hazard level substance observed across the full process (reaction + all post-treatment and purification). Exclude final target-product toxicity.';

    const p3Card = document.createElement('article');
    p3Card.className = 'p1-card';
    p3Card.innerHTML = '<h4>Q1. Full-Process Hazard Level Assessment</h4>';

    const p3OptionsWrap = document.createElement('div');
    p3OptionsWrap.className = 'p1-options';

    P3_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p3Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p3OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P3 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p3OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP3Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P3 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p3Card.appendChild(p3OptionsWrap);
    p3Wrap.appendChild(p3Intro);
    p3Wrap.appendChild(p3Card);
    p3Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p3Wrap);
  } else if (activeItem.id === 'p5') {
    const details = activeItem.details || getP5DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP5Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 5 auxiliary-substance option.';

    const p5Wrap = document.createElement('div');
    p5Wrap.className = 'p1-wrap';

    const p5Intro = document.createElement('p');
    p5Intro.className = 'p2-priority-note';
    p5Intro.textContent = 'Evaluate all non-reactant auxiliary substances across the full lifecycle (from charging to final purified product). Select the highest hazard level encountered.';

    const p5Card = document.createElement('article');
    p5Card.className = 'p1-card';
    p5Card.innerHTML = '<h4>Q1. Necessity and Safety Assessment of Auxiliary Substances</h4>';

    const p5OptionsWrap = document.createElement('div');
    p5OptionsWrap.className = 'p1-options';

    P5_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p5Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p5OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P5 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p5OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP5Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P5 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    const p5Reference = document.createElement('article');
    p5Reference.className = 'p1-card reference-card';
    p5Reference.innerHTML = [
      '<h4>Reference Card: What Counts as Auxiliary Substances?</h4>',
      '<p class="p1-note">Auxiliary substances are all materials that do not become part of the target molecular skeleton, but are used throughout the process lifecycle.</p>',
      '<ul class="reference-list">',
      '<li><strong>Reaction stage:</strong> reaction solvents, catalyst-transfer solvents, and heat-transfer media.</li>',
      '<li><strong>Quench stage:</strong> quench media for terminating reactions (for example large water/ice/neutralization media).</li>',
      '<li><strong>Extraction and washing:</strong> liquid extractants and all washing liquids.</li>',
      '<li><strong>Drying and decolorization:</strong> solid drying agents, decolorizers, and auxiliary adsorbents.</li>',
      '<li><strong>Separation and purification:</strong> all chromatography stationary phases and mobile phases/elution solvents, plus recrystallization solvents.</li>',
      '</ul>',
      '<p class="p1-note"><strong>Selection rule:</strong> identify the single substance with the highest hazard level among all listed stages and use it as the final basis for this principle.</p>'
    ].join('');

    p5Card.appendChild(p5OptionsWrap);
    p5Wrap.appendChild(p5Intro);
    p5Wrap.appendChild(p5Card);
    p5Wrap.appendChild(totalSummary);
    p5Wrap.appendChild(p5Reference);
    questionBlock.appendChild(p5Wrap);
  } else if (activeItem.id === 'p4') {
    const details = activeItem.details || getP4DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP4Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 4 option.';

    const p4Wrap = document.createElement('div');
    p4Wrap.className = 'p1-wrap';

    const p4Intro = document.createElement('p');
    p4Intro.className = 'p2-priority-note';
    p4Intro.textContent = 'Assess the final target product or key intermediate molecule itself. Choose the option that best matches molecular safety-by-design evidence and known hazard class.';

    const p4Card = document.createElement('article');
    p4Card.className = 'p1-card';
    p4Card.innerHTML = '<h4>Q1. Target-Molecule Safety Design and Hazard Assessment</h4>';

    const p4OptionsWrap = document.createElement('div');
    p4OptionsWrap.className = 'p1-options';

    P4_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p4Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p4OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P4 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p4OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP4Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P4 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p4Card.appendChild(p4OptionsWrap);
    p4Wrap.appendChild(p4Intro);
    p4Wrap.appendChild(p4Card);
    p4Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p4Wrap);
  } else if (activeItem.id === 'p6') {
    const details = activeItem.details || getP6DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP6Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 6 option.';

    const p6Wrap = document.createElement('div');
    p6Wrap.className = 'p1-wrap';

    const p6Intro = document.createElement('p');
    p6Intro.className = 'p2-priority-note';
    p6Intro.textContent = 'Assess full-process energy demand across reaction and downstream separation/purification. Select the single option that best represents the overall energy-consumption profile.';

    const p6Card = document.createElement('article');
    p6Card.className = 'p1-card';
    p6Card.innerHTML = '<h4>Q1. Full-Process Energy Consumption Assessment (Reaction + Separation)</h4>';

    const p6OptionsWrap = document.createElement('div');
    p6OptionsWrap.className = 'p1-options';

    P6_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p6Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p6OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P6 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p6OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP6Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P6 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p6Card.appendChild(p6OptionsWrap);
    p6Wrap.appendChild(p6Intro);
    p6Wrap.appendChild(p6Card);
    p6Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p6Wrap);
  } else if (activeItem.id === 'p7') {
    const details = activeItem.details || getP7DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP7Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 7 renewable-feedstock option.';

    const p7Wrap = document.createElement('div');
    p7Wrap.className = 'p1-wrap';

    const p7Intro = document.createElement('p');
    p7Intro.className = 'p2-priority-note';
    p7Intro.textContent = 'Assess both feedstock origin and carbon-footprint impact along the conversion pathway. Select the option that best matches core feedstock renewability and net carbon benefit (C_in vs C_out).';

    const p7Card = document.createElement('article');
    p7Card.className = 'p1-card';
    p7Card.innerHTML = '<h4>Q1. Renewability of Core Feedstocks and Carbon-Footprint Delta Assessment</h4>';

    const p7OptionsWrap = document.createElement('div');
    p7OptionsWrap.className = 'p1-options';

    P7_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p7Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p7OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P7 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p7OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP7Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P7 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p7Card.appendChild(p7OptionsWrap);
    p7Wrap.appendChild(p7Intro);
    p7Wrap.appendChild(p7Card);
    p7Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p7Wrap);
  } else if (activeItem.id === 'p8') {
    const details = activeItem.details || getP8DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP8Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 8 derivatization option.';

    const p8Wrap = document.createElement('div');
    p8Wrap.className = 'p1-wrap';

    const p8Intro = document.createElement('p');
    p8Intro.className = 'p2-priority-note';
    p8Intro.textContent = 'Review the full route and evaluate how often temporary protection/deprotection or temporary molecular modifications are used.';

    const p8Card = document.createElement('article');
    p8Card.className = 'p1-card';
    p8Card.innerHTML = '<h4>Q1. Temporary Derivatization and Protecting-Group Usage Assessment</h4>';

    const p8OptionsWrap = document.createElement('div');
    p8OptionsWrap.className = 'p1-options';

    P8_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p8Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p8OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P8 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p8OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP8Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P8 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p8Card.appendChild(p8OptionsWrap);
    p8Wrap.appendChild(p8Intro);
    p8Wrap.appendChild(p8Card);
    p8Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p8Wrap);
  } else if (activeItem.id === 'p9') {
    const details = activeItem.details || getP9DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP9Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 9 catalysis option.';

    const p9Wrap = document.createElement('div');
    p9Wrap.className = 'p1-wrap';

    const p9Intro = document.createElement('p');
    p9Intro.className = 'p2-priority-note';
    p9Intro.textContent = 'Evaluate reagent strategy in the core transformation and catalyst recovery in post-treatment. Prefer catalytic/recoverable systems over stoichiometric reagent consumption.';

    const p9Card = document.createElement('article');
    p9Card.className = 'p1-card';
    p9Card.innerHTML = '<h4>Q1. Catalytic System and Stoichiometric-Reagent Usage Assessment</h4>';

    const p9OptionsWrap = document.createElement('div');
    p9OptionsWrap.className = 'p1-options';

    P9_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p9Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p9OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P9 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p9OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP9Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P9 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p9Card.appendChild(p9OptionsWrap);
    p9Wrap.appendChild(p9Intro);
    p9Wrap.appendChild(p9Card);
    p9Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p9Wrap);
  } else if (activeItem.id === 'p10') {
    const details = activeItem.details || getP10DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP10Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 10 degradability option.';

    const p10Wrap = document.createElement('div');
    p10Wrap.className = 'p1-wrap';

    const p10Intro = document.createElement('p');
    p10Intro.className = 'p2-priority-note';
    p10Intro.textContent = 'Evaluate the final target-molecule structure for environmental fate after use, focusing on degradability versus persistence risk.';

    const p10Card = document.createElement('article');
    p10Card.className = 'p1-card';
    p10Card.innerHTML = '<h4>Q1. Environmental Fate and Degradability Assessment of the Target Molecule</h4>';

    const p10OptionsWrap = document.createElement('div');
    p10OptionsWrap.className = 'p1-options';

    P10_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p10Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p10OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P10 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p10OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP10Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P10 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p10Card.appendChild(p10OptionsWrap);
    p10Wrap.appendChild(p10Intro);
    p10Wrap.appendChild(p10Card);
    p10Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p10Wrap);
  } else if (activeItem.id === 'p11') {
    const details = activeItem.details || getP11DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP11Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 11 monitoring strategy option.';

    const p11Wrap = document.createElement('div');
    p11Wrap.className = 'p1-wrap';

    const p11Intro = document.createElement('p');
    p11Intro.className = 'p2-priority-note';
    p11Intro.textContent = 'Assess monitoring and feedback-control strategy in the core reaction stage. Earlier and denser process visibility is preferred to prevent pollution before it forms.';

    const p11Card = document.createElement('article');
    p11Card.className = 'p1-card';
    p11Card.innerHTML = '<h4>Q1. Real-Time Monitoring and Reaction-Feedback Control Assessment</h4>';

    const p11OptionsWrap = document.createElement('div');
    p11OptionsWrap.className = 'p1-options';

    P11_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p11Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p11OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P11 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p11OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP11Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P11 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p11Card.appendChild(p11OptionsWrap);
    p11Wrap.appendChild(p11Intro);
    p11Wrap.appendChild(p11Card);
    p11Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p11Wrap);
  } else if (activeItem.id === 'p12') {
    const details = activeItem.details || getP12DefaultDetails();
    activeItem.details = details;
    activeItem.score = calculateP12Score(details);

    scoreInput.value = activeItem.score.toFixed(2);
    scoreInput.readOnly = true;
    scoreInput.title = 'Auto-set from selected Principle 12 inherent-safety option.';

    const p12Wrap = document.createElement('div');
    p12Wrap.className = 'p1-wrap';

    const p12Intro = document.createElement('p');
    p12Intro.className = 'p2-priority-note';
    p12Intro.textContent = 'Assess the highest safety-risk level across the full process (reaction + post-treatment), using the hierarchy: elimination/substitution > engineering controls > administrative controls > PPE-only fallback.';

    const p12Card = document.createElement('article');
    p12Card.className = 'p1-card';
    p12Card.innerHTML = '<h4>Q1. Inherent Safety and Accident-Prevention Assessment by Safety-Control Hierarchy</h4>';

    const p12OptionsWrap = document.createElement('div');
    p12OptionsWrap.className = 'p1-options';

    P12_OPTIONS.forEach((option) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'p1-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'p12Option';
      radio.value = option.key;
      radio.checked = details.selectedOption === option.key;

      const textWrap = document.createElement('span');
      textWrap.className = 'p4-option-wrap';

      const titleRow = document.createElement('span');
      titleRow.className = 'p4-option-title';
      const titleText = document.createElement('span');
      titleText.textContent = `${option.label}:`;
      titleRow.appendChild(titleText);
      titleRow.appendChild(createHelpTip(option.description));

      const statementRow = document.createElement('span');
      statementRow.className = 'p4-option-statement';
      statementRow.textContent = option.statement;

      textWrap.appendChild(titleRow);
      textWrap.appendChild(statementRow);

      optionLabel.appendChild(radio);
      optionLabel.appendChild(textWrap);
      p12OptionsWrap.appendChild(optionLabel);
    });

    const totalSummary = document.createElement('p');
    totalSummary.className = 'p1-total';
    totalSummary.textContent = `P12 Score = ${activeItem.score.toFixed(3)} / 1.000`;

    p12OptionsWrap.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        details.selectedOption = radio.value;
        activeItem.score = calculateP12Score(details);
        scoreInput.value = activeItem.score.toFixed(2);
        totalSummary.textContent = `P12 Score = ${activeItem.score.toFixed(3)} / 1.000`;
        refreshSummary();
      });
    });

    p12Card.appendChild(p12OptionsWrap);
    p12Wrap.appendChild(p12Intro);
    p12Wrap.appendChild(p12Card);
    p12Wrap.appendChild(totalSummary);
    questionBlock.appendChild(p12Wrap);
  } else {
    questionBlock.innerHTML = [
      '<h4>Question Set Area</h4>',
      '<p>This panel is reserved for your detailed questionnaire under the active principle.</p>',
      '<p>Add your future question groups here (single-choice, multi-choice, weighted items, etc.).</p>'
    ].join('');
    scoreInput.readOnly = false;
    scoreInput.title = '';
  }

  scoreInput.addEventListener('change', () => {
    if (activeItem.id === 'p1' || activeItem.id === 'p2' || activeItem.id === 'p3' || activeItem.id === 'p4' || activeItem.id === 'p5' || activeItem.id === 'p6' || activeItem.id === 'p7' || activeItem.id === 'p8' || activeItem.id === 'p9' || activeItem.id === 'p10' || activeItem.id === 'p11' || activeItem.id === 'p12') {
      scoreInput.value = activeItem.score.toFixed(2);
      return;
    }

    const parsed = Number(scoreInput.value);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > 1) {
      hint.textContent = 'Score must be between 0.00 and 1.00.';
    } else {
      hint.textContent = '';
    }

    state.items[safeIndex].score = clampScore(scoreInput.value);
    scoreInput.value = state.items[safeIndex].score.toFixed(2);
    refreshSummary();
  });

  if (activeItem.id !== 'p1' && activeItem.id !== 'p2' && activeItem.id !== 'p3' && activeItem.id !== 'p4' && activeItem.id !== 'p5' && activeItem.id !== 'p6' && activeItem.id !== 'p7' && activeItem.id !== 'p8' && activeItem.id !== 'p9' && activeItem.id !== 'p10' && activeItem.id !== 'p11' && activeItem.id !== 'p12') {
    noteInput.addEventListener('input', () => {
      state.items[safeIndex].note = noteInput.value;
    });

    controls.appendChild(scoreInput);
    controls.appendChild(noteInput);
  }

  wrapper.appendChild(title);
  wrapper.appendChild(subhead);
  if (activeItem.id !== 'p1' && activeItem.id !== 'p2' && activeItem.id !== 'p3' && activeItem.id !== 'p4' && activeItem.id !== 'p5' && activeItem.id !== 'p6' && activeItem.id !== 'p7' && activeItem.id !== 'p8' && activeItem.id !== 'p9' && activeItem.id !== 'p10' && activeItem.id !== 'p11' && activeItem.id !== 'p12') {
    wrapper.appendChild(controls);
    wrapper.appendChild(hint);
  }
  wrapper.appendChild(questionBlock);

  formEl.appendChild(navWrap);
  formEl.appendChild(wrapper);
}

function syncSafetyInputsFromState() {
  if (!safetyDangerCountEl) {
    return;
  }
  const model = state.safetyScreening || getDefaultSafetyScreening();
  if (!Array.isArray(model.reactantRows) || model.reactantRows.length === 0) {
    model.reactantRows = [{ id: `row-${Date.now()}`, query: '', eq: '1.00', amountG: '' }];
  }
  state.safetyScreening.reactantRows = model.reactantRows;

  if (safetyReactantTableBodyEl) {
    safetyReactantTableBodyEl.innerHTML = '';
    model.reactantRows.forEach((row, index) => {
      const tr = document.createElement('tr');

      const tdQuery = document.createElement('td');
      const queryInput = document.createElement('input');
      queryInput.className = 'reactant-table-input';
      queryInput.type = 'text';
      queryInput.placeholder = 'e.g. acetone or 67-64-1';
      queryInput.value = row.query || '';
      queryInput.addEventListener('input', () => {
        state.safetyScreening.reactantRows[index].query = queryInput.value;
      });
      tdQuery.appendChild(queryInput);

      const tdEq = document.createElement('td');
      const eqInput = document.createElement('input');
      eqInput.className = 'reactant-table-input';
      eqInput.type = 'number';
      eqInput.step = '0.01';
      eqInput.min = '0';
      eqInput.value = row.eq || '1.00';
      eqInput.addEventListener('input', () => {
        state.safetyScreening.reactantRows[index].eq = eqInput.value;
      });
      tdEq.appendChild(eqInput);

      const tdAmount = document.createElement('td');
      const amountInput = document.createElement('input');
      amountInput.className = 'reactant-table-input';
      amountInput.type = 'number';
      amountInput.step = '0.1';
      amountInput.min = '0';
      amountInput.value = row.amountG || '';
      amountInput.placeholder = 'g';
      amountInput.addEventListener('input', () => {
        state.safetyScreening.reactantRows[index].amountG = amountInput.value;
      });
      tdAmount.appendChild(amountInput);

      const tdAction = document.createElement('td');
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'reactant-row-remove';
      removeBtn.textContent = 'Remove';
      removeBtn.disabled = model.reactantRows.length <= 1;
      removeBtn.addEventListener('click', () => {
        state.safetyScreening.reactantRows.splice(index, 1);
        syncSafetyInputsFromState();
      });
      tdAction.appendChild(removeBtn);

      tr.appendChild(tdQuery);
      tr.appendChild(tdEq);
      tr.appendChild(tdAmount);
      tr.appendChild(tdAction);
      safetyReactantTableBodyEl.appendChild(tr);
    });
  }

  if (safetyScaleLevelEl) {
    safetyScaleLevelEl.value = model.scaleLevel || 'lab';
  }
  safetyDangerCountEl.value = model.dangerCount;
  safetyWarningCountEl.value = model.warningCount;
  safetyHasCmrEl.checked = Boolean(model.hasCmr);
  safetyHasFlammableEl.checked = Boolean(model.hasFlammable);
  safetyRunawayRiskEl.value = model.runawayRisk || 'medium';
  safetyMaxTempEl.value = model.maxTempC;
  safetyMaxPressureEl.value = model.maxPressureBar;
  safetyControlLevelEl.value = model.controlLevel || 'standard';
  safetyMonitoringLevelEl.value = model.monitoringLevel || 'batch';
  safetyPpeDependenceEl.value = model.ppeDependence || 'medium';
  if (safetyExothermLevelEl) {
    safetyExothermLevelEl.value = model.exothermLevel || 'medium';
  }
  if (safetyGasReleaseLevelEl) {
    safetyGasReleaseLevelEl.value = model.gasReleaseLevel || 'medium';
  }
  if (safetyStageChargeEl) {
    safetyStageChargeEl.value = (model.stageRisks && model.stageRisks.charge) || 'medium';
  }
  if (safetyStageReactionEl) {
    safetyStageReactionEl.value = (model.stageRisks && model.stageRisks.reaction) || 'medium';
  }
  if (safetyStageQuenchEl) {
    safetyStageQuenchEl.value = (model.stageRisks && model.stageRisks.quench) || 'medium';
  }
  if (safetyStageIsolationEl) {
    safetyStageIsolationEl.value = (model.stageRisks && model.stageRisks.isolation) || 'medium';
  }
  safetyNotesEl.value = model.notes || '';
}

function bindSafetyInputs() {
  if (!safetyDangerCountEl) {
    return;
  }

  const wire = (el, eventName, updater) => {
    if (!el) {
      return;
    }
    el.addEventListener(eventName, () => {
      updater(el);
      refreshSummary();
    });
  };

  wire(safetyDangerCountEl, 'input', (el) => {
    state.safetyScreening.dangerCount = el.value;
  });
  wire(safetyWarningCountEl, 'input', (el) => {
    state.safetyScreening.warningCount = el.value;
  });
  wire(safetyHasCmrEl, 'change', (el) => {
    state.safetyScreening.hasCmr = el.checked;
  });
  wire(safetyHasFlammableEl, 'change', (el) => {
    state.safetyScreening.hasFlammable = el.checked;
  });
  wire(safetyRunawayRiskEl, 'change', (el) => {
    state.safetyScreening.runawayRisk = el.value;
  });
  wire(safetyMaxTempEl, 'input', (el) => {
    state.safetyScreening.maxTempC = el.value;
  });
  wire(safetyMaxPressureEl, 'input', (el) => {
    state.safetyScreening.maxPressureBar = el.value;
  });
  wire(safetyControlLevelEl, 'change', (el) => {
    state.safetyScreening.controlLevel = el.value;
  });
  wire(safetyMonitoringLevelEl, 'change', (el) => {
    state.safetyScreening.monitoringLevel = el.value;
  });
  wire(safetyPpeDependenceEl, 'change', (el) => {
    state.safetyScreening.ppeDependence = el.value;
  });
  wire(safetyNotesEl, 'input', (el) => {
    state.safetyScreening.notes = el.value;
  });

  if (safetyAddReactantRowBtnEl) {
    safetyAddReactantRowBtnEl.addEventListener('click', () => {
      if (!Array.isArray(state.safetyScreening.reactantRows)) {
        state.safetyScreening.reactantRows = [];
      }
      state.safetyScreening.reactantRows.push({
        id: `row-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        query: '',
        eq: '1.00',
        amountG: ''
      });
      syncSafetyInputsFromState();
    });
  }

  wire(safetyScaleLevelEl, 'change', (el) => {
    state.safetyScreening.scaleLevel = el.value;
  });
  wire(safetyExothermLevelEl, 'change', (el) => {
    state.safetyScreening.exothermLevel = el.value;
  });
  wire(safetyGasReleaseLevelEl, 'change', (el) => {
    state.safetyScreening.gasReleaseLevel = el.value;
  });
  wire(safetyStageChargeEl, 'change', (el) => {
    state.safetyScreening.stageRisks = {
      ...(state.safetyScreening.stageRisks || {}),
      charge: el.value
    };
  });
  wire(safetyStageReactionEl, 'change', (el) => {
    state.safetyScreening.stageRisks = {
      ...(state.safetyScreening.stageRisks || {}),
      reaction: el.value
    };
  });
  wire(safetyStageQuenchEl, 'change', (el) => {
    state.safetyScreening.stageRisks = {
      ...(state.safetyScreening.stageRisks || {}),
      quench: el.value
    };
  });
  wire(safetyStageIsolationEl, 'change', (el) => {
    state.safetyScreening.stageRisks = {
      ...(state.safetyScreening.stageRisks || {}),
      isolation: el.value
    };
  });

  syncSafetyInputsFromState();
}

function createSafetyHelpDot(text) {
  const dot = document.createElement('span');
  dot.className = 'safety-help-dot';
  dot.textContent = '?';
  dot.title = text;
  dot.setAttribute('aria-label', text);
  return dot;
}

function attachSafetyFieldHelpTips() {
  const fieldTips = {
    safetyScaleLevel: 'Defines consequence scaling. Plant scale applies stronger penalty than pilot or lab scale.',
    safetyWarningCount: 'Auto-filled warning-level hazard count. Adjust manually if your validated inventory differs.',
    safetyMaxTemp: 'Highest expected reaction temperature under normal or upset operation.',
    safetyMaxPressure: 'Highest expected pressure during the route, including transient peaks.',
    safetyRunawayRisk: 'Expert judgment of thermal runaway tendency under process disturbances.',
    safetyMonitoringLevel: 'How continuously critical variables are monitored (inline is strongest).',
    safetyPpeDependence: 'How much risk control depends on PPE rather than intrinsic/engineering controls.',
    safetyExothermLevel: 'Relative heat-release intensity of the route.',
    safetyGasReleaseLevel: 'Potential for hazardous gas release during reaction or handling.',
    safetyStageReaction: 'Risk level during the reaction stage itself.',
    safetyStageQuench: 'Risk level during quench and neutralization operations.',
    safetyStageIsolation: 'Risk level during isolation, filtration, and separation steps.',
    safetyNotes: 'Free-text context. Useful for assumptions, unresolved hazards, and analyst remarks.'
  };

  Object.entries(fieldTips).forEach(([id, text]) => {
    const input = document.getElementById(id);
    if (!input) {
      return;
    }
    const label = input.closest('label.safety-field');
    if (!label) {
      return;
    }
    const labelSpan = label.querySelector('span');
    if (!labelSpan || labelSpan.querySelector('.safety-help-dot')) {
      return;
    }
    labelSpan.appendChild(createSafetyHelpDot(text));
  });

  const cmrLabel = safetyHasCmrEl ? safetyHasCmrEl.closest('label') : null;
  if (cmrLabel && !cmrLabel.querySelector('.safety-help-dot')) {
    cmrLabel.appendChild(createSafetyHelpDot('Marks whether any CMR-class hazard is present across route reactants or intermediates.'));
  }

  const flammableLabel = safetyHasFlammableEl ? safetyHasFlammableEl.closest('label') : null;
  if (flammableLabel && !flammableLabel.querySelector('.safety-help-dot')) {
    flammableLabel.appendChild(createSafetyHelpDot('Marks whether high flammability is present and requires ignition/inerting controls.'));
  }

  const reactantHeaders = document.querySelectorAll('.reactant-table thead th');
  if (reactantHeaders.length >= 3) {
    if (!reactantHeaders[0].title) {
      reactantHeaders[0].title = 'Use chemical name, CAS number, or InChIKey for hazard lookup.';
    }
    if (!reactantHeaders[2].title) {
      reactantHeaders[2].title = 'Mass input in grams. Used with Eq for route-level dose weighting.';
    }
  }
}

function updateSafetyLookupStatus(message) {
  if (!safetyLookupStatusEl) {
    return;
  }
  safetyLookupStatusEl.textContent = message;
}

function parseReactantRows(rows) {
  const sourceRows = Array.isArray(rows) ? rows : [];
  const normalized = sourceRows
    .map((row) => ({
      query: String(row && row.query ? row.query : '').trim(),
      eq: Number(row && row.eq ? row.eq : 1),
      amountG: Number(row && row.amountG ? row.amountG : 0)
    }))
    .filter((item) => item.query.length > 0)
    .map((item) => ({
      query: item.query,
      eq: Number.isFinite(item.eq) && item.eq > 0 ? item.eq : 1,
      amountG: Number.isFinite(item.amountG) && item.amountG > 0 ? item.amountG : 0
    }));

  const dedup = [];
  const seen = new Set();
  normalized.forEach((item) => {
    const key = item.query.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      dedup.push(item);
    }
  });

  return dedup.slice(0, 20);
}

function convertLookupToEvidence(result, fallbackName, eq = 1, amountG = 0) {
  const hazard = result && result.data && result.data.hazard ? result.data.hazard : null;
  const identity = result && result.data && result.data.identity ? result.data.identity : null;
  const normalizedEq = Number.isFinite(Number(eq)) && Number(eq) > 0 ? Number(eq) : 1;
  const normalizedAmount = Number.isFinite(Number(amountG)) && Number(amountG) > 0 ? Number(amountG) : 0;
  const quantityFactor = normalizedEq * (normalizedAmount > 0 ? Math.log10(normalizedAmount + 10) : 1);

  return {
    name: identity && identity.title ? identity.title : fallbackName,
    dangerCount: Number(hazard && hazard.dangerCount ? hazard.dangerCount : 0),
    warningCount: Number(hazard && hazard.warningCount ? hazard.warningCount : 0),
    hasCmr: Boolean(hazard && hazard.hasCmr),
    hasFlammable: Boolean(hazard && hazard.hasFlammable),
    eq: normalizedEq,
    amountG: normalizedAmount,
    quantityFactor,
    source: result && result.source ? result.source : 'unknown',
    fromCache: Boolean(result && result.fromCache)
  };
}

async function runRouteReactantRiskAnalysis() {
  if (!window.desktopAPI || typeof window.desktopAPI.lookupHazardChemical !== 'function') {
    updateSafetyLookupStatus('Route analysis API is unavailable in this build.');
    return;
  }

  const reactants = parseReactantRows(state.safetyScreening.reactantRows);
  if (reactants.length === 0) {
    updateSafetyLookupStatus('Please add at least one reactant row with a valid chemical query.');
    return;
  }

  if (safetyRouteAnalyzeBtnEl) {
    safetyRouteAnalyzeBtnEl.disabled = true;
  }
  updateSafetyLookupStatus(`Analyzing route risk for ${reactants.length} reactant(s)...`);

  const settled = await Promise.all(
    reactants.map(async (item) => {
      const lookup = await window.desktopAPI.lookupHazardChemical({ query: item.query });
      return { input: item, lookup };
    })
  );

  if (safetyRouteAnalyzeBtnEl) {
    safetyRouteAnalyzeBtnEl.disabled = false;
  }

  const success = [];
  const failed = [];
  settled.forEach((entry) => {
    if (entry.lookup && !entry.lookup.error && entry.lookup.data && entry.lookup.data.hazard) {
      success.push(convertLookupToEvidence(entry.lookup, entry.input.query, entry.input.eq, entry.input.amountG));
    } else {
      failed.push(entry.input.query);
    }
  });

  if (success.length === 0) {
    updateSafetyLookupStatus(`Route analysis failed: no reactant hazard profile could be resolved (${failed.join(', ')}).`);
    return;
  }

  const totalDanger = success.reduce((sum, item) => sum + Number(item.dangerCount || 0) * Number(item.quantityFactor || 1), 0);
  const totalWarning = success.reduce((sum, item) => sum + Number(item.warningCount || 0) * Number(item.quantityFactor || 1), 0);
  const hasAnyCmr = success.some((item) => item.hasCmr);
  const hasAnyFlammable = success.some((item) => item.hasFlammable);

  state.safetyScreening.routeEvidence = success;
  state.safetyScreening.dangerCount = String(Math.round(totalDanger));
  state.safetyScreening.warningCount = String(Math.round(totalWarning));
  state.safetyScreening.hasCmr = hasAnyCmr;
  state.safetyScreening.hasFlammable = hasAnyFlammable;

  const cacheHits = success.filter((item) => item.fromCache).length;
  const misses = failed.length;
  const noteParts = [
    `Route-level hazard aggregation from ${success.length} reactant(s)`,
    `Dose-weighted danger total ${Math.round(totalDanger)}`,
    `Dose-weighted warning total ${Math.round(totalWarning)}`,
    `CMR ${hasAnyCmr ? 'present' : 'not detected'}`,
    `Flammability ${hasAnyFlammable ? 'present' : 'not detected'}`
  ];
  if (misses > 0) {
    noteParts.push(`Unresolved reactants: ${failed.join(', ')}`);
  }
  state.safetyScreening.notes = `${noteParts.join('; ')}.`;

  syncSafetyInputsFromState();
  refreshSummary();
  updateSafetyLookupStatus(`Route analysis complete: ${success.length} resolved, ${misses} unresolved, cache hits ${cacheHits}.`);
  setStatus(`Route safety analysis completed for ${success.length} reactant(s).`);
}

function refreshSummary() {
  const total = getWeightedTotalScore();
  const totalVisual = getScaleVisual(total);
  totalScoreEl.textContent = `${total.toFixed(2)} / 1.00`;
  totalScoreEl.style.color = totalVisual.solid;
  totalScoreEl.title = totalVisual.label;
  renderBottomTextVisualization(total);
  const safetyResult = renderSafetyPrecheck();

  const summary = getWeightValidationSummary();
  const comparisonInfo = drawComparisonRadar();
  renderRecommendationModel(total, summary, comparisonInfo, safetyResult);
  renderRejectedComparisonList();
  scheduleAutoSave();
  const isUnlocked = updateVisualizationLockState(summary);
  if (!isUnlocked) {
    return;
  }

  const labels = state.items.map((item) => item.short);
  const values = state.items.map((item) => item.score);
  window.radarChart.draw(radarCanvas, labels, values, total);
  window.gaugeChart.draw(gaugeCanvas, total, total, values, state.principleWeights);
  window.flowerChart.draw(flowerCanvas, values, state.principleWeights, total, total);
}

async function persistViewPreference(viewName) {
  const result = await window.desktopAPI.saveViewPreference({ activeView: viewName });
  if (result && result.error) {
    setStatus(`View preference save failed: ${result.message}`);
  }
}

function setVisualizationView(viewName, options = {}) {
  const { persist = true } = options;

  activeView = viewName;
  const isRadar = viewName === 'radar';
  const isGauge = viewName === 'gauge';
  const isFlower = viewName === 'flower';

  radarPaneEl.classList.toggle('active', isRadar);
  gaugePaneEl.classList.toggle('active', isGauge);
  flowerPaneEl.classList.toggle('active', isFlower);

  viewRadarBtnEl.classList.toggle('active', isRadar);
  viewGaugeBtnEl.classList.toggle('active', isGauge);
  viewFlowerBtnEl.classList.toggle('active', isFlower);

  viewRadarBtnEl.setAttribute('aria-selected', String(isRadar));
  viewGaugeBtnEl.setAttribute('aria-selected', String(isGauge));
  viewFlowerBtnEl.setAttribute('aria-selected', String(isFlower));

  const meta = VIEW_META[viewName] || VIEW_META.radar;
  if (chartSectionTitleEl) {
    chartSectionTitleEl.textContent = meta.title;
  }
  if (chartSectionSubtitleEl) {
    chartSectionSubtitleEl.textContent = meta.subtitle;
  }

  if (isRadar) {
    setStatus('Radar chart view is active.');
  } else if (isGauge) {
    setStatus('Flower view is active.');
  } else {
    setStatus('Weighted ring view is active.');
  }

  refreshSummary();

  if (persist) {
    persistViewPreference(viewName);
  }
}

async function restoreViewPreference() {
  const result = await window.desktopAPI.loadViewPreference();
  if (!result || result.error) {
    return;
  }

  if (result.activeView === 'gauge' || result.activeView === 'radar' || result.activeView === 'flower') {
    activeView = result.activeView;
  }
}

function resetAll() {
  state.items = state.items.map((item) => ({
    ...item,
    score: 0,
    note: '',
    details: item.id === 'p1'
      ? getP1DefaultDetails()
      : item.id === 'p2'
        ? getP2DefaultDetails()
        : item.id === 'p5'
          ? getP5DefaultDetails()
        : item.id === 'p3'
          ? getP3DefaultDetails()
        : item.id === 'p4'
          ? getP4DefaultDetails()
          : item.id === 'p6'
            ? getP6DefaultDetails()
            : item.id === 'p7'
              ? getP7DefaultDetails()
              : item.id === 'p8'
                ? getP8DefaultDetails()
                : item.id === 'p9'
                  ? getP9DefaultDetails()
                  : item.id === 'p10'
                    ? getP10DefaultDetails()
                    : item.id === 'p11'
                      ? getP11DefaultDetails()
                      : item.id === 'p12'
                        ? getP12DefaultDetails()
        : item.details
  }));
  state.principleWeights = getDefaultFlowerWeights();
  state.safetyScreening = getDefaultSafetyScreening();
  syncSafetyInputsFromState();

  renderForm();
  refreshSummary();
  setStatus('All scores and notes have been reset.');
}

async function runAutoSave() {
  if (!state.autoSaveEnabled || !state.currentFilePath || autoSaveInFlight) {
    return;
  }
  if (!window.desktopAPI || typeof window.desktopAPI.autoSaveAssessment !== 'function') {
    return;
  }

  autoSaveInFlight = true;
  const result = await window.desktopAPI.autoSaveAssessment({
    data: buildAssessmentPayload(),
    filePath: state.currentFilePath
  });
  autoSaveInFlight = false;

  if (!result || result.error) {
    const message = result && result.message ? result.message : 'unknown error';
    setStatus(`Auto-save failed: ${message}`);
    return;
  }

  setLastSavedLabel(result.updatedAt, true);
}

function scheduleAutoSave() {
  if (!state.autoSaveEnabled || !state.currentFilePath) {
    return;
  }
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }
  autoSaveTimer = setTimeout(() => {
    autoSaveTimer = null;
    runAutoSave();
  }, 900);
}

async function saveAssessment() {
  setStatus('Saving assessment...');

  const payload = buildAssessmentPayload();

  const result = await window.desktopAPI.saveAssessment(payload);

  if (result && result.canceled) {
    setStatus('Save canceled. Current assessment remains unchanged.');
    return;
  }

  if (result && result.error) {
    setStatus(`Save failed: ${result.message}`);
    return;
  }

  setLastSavedLabel(result.updatedAt, false);
  setCurrentFilePath(result.filePath);
  setStatus('Assessment saved to selected file.');
}

function applyLoadedAssessmentResult(result) {
  const saved = result.data;
  if (!saved || !Array.isArray(saved.principles)) {
    setStatus('Saved data format is invalid.');
    return;
  }

  const loadedWeights = Array.isArray(saved.principleWeights) ? saved.principleWeights : null;
  let usedBalancedDefaults = false;
  if (loadedWeights && loadedWeights.length === PRINCIPLES.length) {
    if (isLegacyPristineMinWeightTemplate(saved.principles, loadedWeights)) {
      state.principleWeights = getDefaultFlowerWeights();
      usedBalancedDefaults = true;
    } else {
      state.principleWeights = loadedWeights.map((weight) => {
        const parsed = Number(weight);
        if (Number.isNaN(parsed)) {
          return WEIGHT_MIN_STRICT;
        }
        return Math.max(WEIGHT_MIN_STRICT, Math.min(100, parsed));
      });
    }
  } else {
    state.principleWeights = getDefaultFlowerWeights();
  }

  const byId = new Map(saved.principles.map((p) => [p.id, p]));
  state.items = state.items.map((item) => {
    const loaded = byId.get(item.id);
    if (!loaded) {
      return item;
    }
    const loadedDetails = item.id === 'p1' && loaded.details && typeof loaded.details === 'object'
      ? {
          ...getP1DefaultDetails(),
          ...loaded.details
        }
      : item.id === 'p2' && loaded.details && typeof loaded.details === 'object'
        ? {
            ...getP2DefaultDetails(),
            ...loaded.details
          }
        : item.id === 'p5' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP5DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p3' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP3DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p4' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP4DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p6' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP6DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p7' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP7DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p8' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP8DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p9' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP9DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p10' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP10DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p11' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP11DefaultDetails(),
              ...loaded.details
            }
        : item.id === 'p12' && loaded.details && typeof loaded.details === 'object'
          ? {
              ...getP12DefaultDetails(),
              ...loaded.details
            }
      : item.details;

    return {
      ...item,
      score: clampScore(loaded.score),
      note: typeof loaded.note === 'string' ? loaded.note : '',
      details: loadedDetails
    };
  });

  state.safetyScreening = saved && saved.safetyScreening && typeof saved.safetyScreening === 'object'
    ? {
        ...getDefaultSafetyScreening(),
        ...saved.safetyScreening,
        stageRisks: {
          ...getDefaultSafetyScreening().stageRisks,
          ...(saved.safetyScreening.stageRisks || {})
        }
      }
    : getDefaultSafetyScreening();

  if (!Array.isArray(state.safetyScreening.reactantRows) || state.safetyScreening.reactantRows.length === 0) {
    const legacyText = String(saved?.safetyScreening?.reactantListText || '').trim();
    if (legacyText) {
      const migratedRows = legacyText
        .split(/\r?\n/g)
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 20)
        .map((line, index) => ({
          id: `migrated-${Date.now()}-${index}`,
          query: line.split('|')[0]?.trim() || line,
          eq: '1.00',
          amountG: ''
        }));
      state.safetyScreening.reactantRows = migratedRows.length > 0
        ? migratedRows
        : getDefaultSafetyScreening().reactantRows;
    } else {
      state.safetyScreening.reactantRows = getDefaultSafetyScreening().reactantRows;
    }
  }
  syncSafetyInputsFromState();

  renderForm();
  refreshSummary();

  setLastSavedLabel(result.updatedAt, false);
  setCurrentFilePath(result.filePath);

  if (usedBalancedDefaults) {
    setStatus('Assessment loaded. Legacy all-5.00% template was auto-migrated to balanced default weights.');
  } else {
    setStatus('Assessment loaded from selected file.');
  }
}

async function loadAssessment() {
  setStatus('Loading previous assessment...');
  const result = await window.desktopAPI.loadAssessment();

  if (!result) {
    setCurrentFilePath(null);
    setStatus('No saved assessment found.');
    return;
  }

  if (result.error) {
    setCurrentFilePath(null);
    setStatus(`Load failed: ${result.message}`);
    return;
  }

  applyLoadedAssessmentResult(result);
}

async function openAssessmentFile() {
  setStatus('Opening assessment file...');
  const result = await window.desktopAPI.openAssessment();

  if (!result) {
    setStatus('No file opened.');
    return;
  }

  if (result.canceled) {
    setStatus('Open file canceled.');
    return;
  }

  if (result.error) {
    setStatus(`Open failed: ${result.message}`);
    return;
  }

  applyLoadedAssessmentResult(result);
}

async function createNewAssessmentFile() {
  if (!window.desktopAPI || typeof window.desktopAPI.createAssessmentFile !== 'function') {
    setStatus('New file API is unavailable in this build.');
    return;
  }

  setStatus('Creating new assessment file...');
  const result = await window.desktopAPI.createAssessmentFile(buildEmptyAssessmentPayload());

  if (!result) {
    setStatus('New file creation failed.');
    return;
  }

  if (result.canceled) {
    setStatus('New file creation canceled.');
    return;
  }

  if (result.error) {
    setStatus(`New file creation failed: ${result.message}`);
    return;
  }

  applyLoadedAssessmentResult(result);
  setStatus('New assessment file created and opened.');
}

async function openComparisonFiles() {
  if (!window.desktopAPI || typeof window.desktopAPI.openComparisonFiles !== 'function') {
    setStatus('Comparison API is unavailable in this build.');
    return;
  }

  setStatus('Opening comparison files...');
  const result = await window.desktopAPI.openComparisonFiles();

  if (!result) {
    setStatus('No comparison files loaded.');
    return;
  }

  if (result.canceled) {
    setStatus('Comparison file selection canceled.');
    return;
  }

  if (result.error) {
    setStatus(`Comparison load failed: ${result.message}`);
    return;
  }

  const normalizedEntries = Array.isArray(result.entries)
    ? result.entries.map(normalizeComparisonEntry).filter(Boolean)
    : [];

  const currentWeights = normalizeWeightVector(state.principleWeights);
  const acceptedEntries = [];
  const rejectedEntries = [];
  normalizedEntries.forEach((entry) => {
    if (hasSameWeightProfile(currentWeights, entry.weights)) {
      acceptedEntries.push(entry);
      return;
    }
    rejectedEntries.push({
      ...entry,
      mismatches: getWeightMismatchDetails(currentWeights, entry.weights)
    });
  });

  const merged = new Map(state.comparisonSnapshots.map((entry) => [entry.filePath, entry]));
  acceptedEntries.forEach((entry) => {
    if (entry.filePath) {
      merged.set(entry.filePath, entry);
    }
  });
  state.comparisonSnapshots = Array.from(merged.values());
  state.rejectedComparisonEntries = rejectedEntries;

  refreshSummary();

  const warningCount = Array.isArray(result.warnings) ? result.warnings.length : 0;
  if (rejectedEntries.length > 0) {
    const preview = rejectedEntries.slice(0, 2).map((entry) => entry.name).join(', ');
    setStatus(`Loaded ${acceptedEntries.length} comparison file(s). Rejected ${rejectedEntries.length} due to weight mismatch (e.g. ${preview}). Use identical weights to avoid pseudo-green comparison. Warnings: ${warningCount}.`);
    return;
  }

  setStatus(`Loaded ${acceptedEntries.length} comparison file(s). Active comparison set: ${state.comparisonSnapshots.length}. Warnings: ${warningCount}.`);
}

function clearComparisonFiles() {
  state.comparisonSnapshots = [];
  state.rejectedComparisonEntries = [];
  refreshSummary();
  setStatus('Comparison set cleared.');
}

async function exportReportPdf() {
  setStatus('Exporting PDF report...');

  const payload = buildAssessmentPayload();

  const result = await window.desktopAPI.exportReportPdf(payload);
  if (!result) {
    setStatus('Report export failed.');
    return;
  }

  if (result.canceled) {
    setStatus('Report export canceled.');
    return;
  }

  if (result.error) {
    setStatus(`Report export failed: ${result.message}`);
    return;
  }

  const exportedTime = result.updatedAt ? new Date(result.updatedAt).toLocaleString() : 'Unknown time';
  setStatus(`Report exported successfully (${exportedTime}).`);
}

if (newFileBtnEl) {
  newFileBtnEl.addEventListener('click', createNewAssessmentFile);
}
saveBtnEl.addEventListener('click', saveAssessment);
openBtnEl.addEventListener('click', openAssessmentFile);
exportBtnEl.addEventListener('click', exportReportPdf);
resetBtnEl.addEventListener('click', resetAll);
if (compareOpenBtnEl) {
  compareOpenBtnEl.addEventListener('click', openComparisonFiles);
}
if (compareClearBtnEl) {
  compareClearBtnEl.addEventListener('click', clearComparisonFiles);
}
if (safetyRouteAnalyzeBtnEl) {
  safetyRouteAnalyzeBtnEl.addEventListener('click', runRouteReactantRiskAnalysis);
}
if (openRouteSafetyBtnEl) {
  openRouteSafetyBtnEl.addEventListener('click', openRouteSafetyPage);
}
if (closeRouteSafetyBtnEl) {
  closeRouteSafetyBtnEl.addEventListener('click', closeRouteSafetyPage);
}
viewRadarBtnEl.addEventListener('click', () => setVisualizationView('radar'));
viewGaugeBtnEl.addEventListener('click', () => setVisualizationView('gauge'));
viewFlowerBtnEl.addEventListener('click', () => setVisualizationView('flower'));

renderForm();
attachRecommendationHelpTips();
attachSafetyFieldHelpTips();
bindSafetyInputs();
refreshSummary();

(async function init() {
  await restoreViewPreference();
  setVisualizationView(activeView, { persist: false });
  await loadAssessment();
})();
