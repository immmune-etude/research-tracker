export const STATUS_OPTIONS = [
  { value: "not_started", label: "Not started", color: "#9a9690" },
  { value: "in_progress", label: "In progress", color: "#6b93f0" },
  { value: "submitted", label: "Submitted", color: "#6bb8a8" },
  { value: "interviewing", label: "Interviewing", color: "#e0a06a" },
  { value: "accepted", label: "Accepted", color: "#5cb88a" },
  { value: "rejected", label: "Rejected", color: "#e08a84" },
  { value: "pass", label: "Passing on", color: "#a8a4a0" },
];

export const CATEGORY_FILTERS = [
  "All",
  "National",
  "UCLA",
  "Cancer",
  "Cardiology",
  "Clinical",
];

export const FIT_FILTERS = ["All", "Strong fit", "Good fit", "Explore"];


/** Compare dates as YYYY-MM-DD against local today. */
export function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isApplicationOpen(program, today = todayISO()) {
  if (!program.opensOn) return false;
  if (today < program.opensOn) return false;
  if (program.closesOn && today > program.closesOn) return false;
  return true;
}

export function hasApplicationClosed(program, today = todayISO()) {
  return Boolean(program.closesOn && today > program.closesOn);
}

export const CHECKLIST_KEYS = [
  { key: "transcript", label: "Transcript" },
  { key: "essay", label: "Essay / statements" },
  { key: "lor", label: "Letters of rec" },
  { key: "eligibility", label: "Eligibility checked" },
];

/**
 * Seeded for Eddy Yao (UCLA MCDB ’29): cardiology research, clinical research,
 * lab skills, NREMT, strong STEM background. Targeting Summer 2027 cycle
 * (applications open Fall 2026 / Winter 2027).
 */
export const PROGRAMS = [
  {
    id: "nih-sip",
    name: "NIH Summer Internship Program (SIP)",
    org: "National Institutes of Health",
    category: "National",
    fit: "Strong fit",
    location: "Bethesda, MD & other NIH campuses",
    duration: "~8–12 weeks (summer)",
    benefits: "Paid stipend; parking/transit support; poster day",
    deadline: "Mid-Nov 2026 → Mid-Feb 2027",
    opensOn: "2026-11-15",
    closesOn: "2027-02-15",
    opensLabel: "Mid-Nov 2026",
    closesLabel: "Mid-Feb 2027",
    dateNote: "NIH: opens mid-Nov, closes mid-Feb",
    summary:
      "Paid biomedical research across NIH labs. Strong national signal for premeds and MD/PhD-leaning applicants.",
    whyFit:
      "Matches your lab skills (histology, cell culture) and manuscript experience in cardiology; great for broadening beyond UCLA.",
    requirements: "US citizen/PR; enrolled undergrad; CV, personal statement, coursework list, 2 references",
    applyUrl: "https://www.training.nih.gov/research-training/pb/sip/",
    tags: ["biomedical", "federal", "paid"],
    source: "list",
  },
  {
    id: "nsf-reu",
    name: "NSF REU Programs",
    org: "National Science Foundation (many host universities)",
    category: "National",
    fit: "Strong fit",
    location: "Various US universities",
    duration: "Usually 8–10 weeks",
    benefits: "Stipend; often housing and travel",
    deadline: "Typically Nov 2026 (varies by site) → Often Jan–Mar 2027",
    opensOn: "2026-11-01",
    closesOn: "2027-03-15",
    opensLabel: "Typically Nov 2026 (varies by site)",
    closesLabel: "Often Jan–Mar 2027",
    dateNote: "Browse NSF directory anytime; each REU site sets its own window",
    summary:
      "Funded undergraduate research sites in biology, biomedical engineering, computational biology, and more. Apply to individual sites.",
    whyFit:
      "MCDB + engineering background from FIRST/robotics makes biology and BME REUs a natural match. Use the NSF directory to shortlist 5–8 sites.",
    requirements: "Usually US citizen/PR; site-specific GPA and coursework",
    applyUrl: "https://www.nsf.gov/funding/initiatives/reu/search",
    tags: ["biology", "engineering", "stipend"],
    source: "list",
  },
  {
    id: "amgen-scholars",
    name: "Amgen Scholars (UCLA & national)",
    org: "Amgen Foundation / UCLA & peer universities",
    category: "UCLA",
    fit: "Strong fit",
    location: "UCLA (or other Amgen host campuses)",
    duration: "10 weeks",
    benefits: "Stipend; housing/meals (campus-dependent); symposium",
    deadline: "Nov 1, 2026 → Typically ~Feb 1, 2027",
    opensOn: "2026-11-01",
    closesOn: "2027-02-01",
    opensLabel: "Nov 1, 2026",
    closesLabel: "Typically ~Feb 1, 2027",
    dateNote: "Amgen US cycle opens Nov 1; UCLA host deadline historically Feb 1",
    summary:
      "Competitive summer biomedical research at top universities. Explicitly strong for research-heavy medicine / MD-PhD pathways.",
    whyFit:
      "You already have a UCLA Cardiology mentor path; Amgen can fund a full-time summer in that lab or a new biomedical lab. GPA 3.8 clears the 3.2 bar.",
    requirements: "US citizen/PR; sophomore+; GPA ≥3.2; interest in PhD or MD/PhD",
    applyUrl: "https://sciences.ugresearch.ucla.edu/programs-and-scholarships/amgen-scholars/",
    tags: ["biomedical", "UCLA", "MD-PhD"],
    source: "list",
  },
  {
    id: "mayo-surf",
    name: "Mayo Clinic SURF",
    org: "Mayo Clinic Graduate School of Biomedical Sciences",
    category: "National",
    fit: "Strong fit",
    location: "Rochester, MN / Arizona / Florida (campus varies)",
    duration: "10 weeks (May–July 2027 window)",
    benefits: "$6,000 stipend; housing available",
    deadline: "Nov 1, 2026 → Feb 3, 2027",
    opensOn: "2026-11-01",
    closesOn: "2027-02-03",
    opensLabel: "Nov 1, 2026",
    closesLabel: "Feb 3, 2027",
    dateNote: null,
    summary:
      "Immersive biomedical research fellowship with faculty mentoring and poster session. Strong clinical-research institution brand.",
    whyFit:
      "Your cardiology literature review + wet-lab skills map well to Mayo’s biomedical/clinical translational tracks; aimed at PhD/MD-PhD interest.",
    requirements: "Completed ≥1–2 years college; GPA ≥3.0; personal statement; transcripts; 2 LORs",
    applyUrl:
      "https://college.mayo.edu/academics/biomedical-research-training/summer-undergraduate-research-fellowship-surf/application-process/",
    tags: ["biomedical", "paid", "MD-PhD"],
    source: "list",
  },
  {
    id: "mayo-crisp",
    name: "Mayo Clinic CRISP",
    org: "Mayo Clinic (Florida)",
    category: "Clinical",
    fit: "Strong fit",
    location: "Jacksonville, FL",
    duration: "10 weeks",
    benefits: "Paid (~$3,000 stipend historically)",
    deadline: "Nov 1, 2026 → Jan 31, 2027",
    opensOn: "2026-11-01",
    closesOn: "2027-01-31",
    opensLabel: "Nov 1, 2026",
    closesLabel: "Jan 31, 2027",
    dateNote: "Official: opens Nov 1, closes Jan 31",
    summary:
      "Clinical research internship with a faculty mentor — designed for students exploring medicine and health careers.",
    whyFit:
      "Directly aligns with your VA clinical research volunteer work and patient-facing data collection experience.",
    requirements: "GPA ≥3.5; completed freshman year; US citizen/PR (limited F-1 exceptions); LORs + statement",
    applyUrl:
      "https://college.mayo.edu/academics/non-clinical-education/clinical-research-internship-study-program-florida/",
    tags: ["clinical", "premed", "paid"],
    source: "list",
  },
  {
    id: "jhu-sip",
    name: "Johns Hopkins Summer Internship Program (SIP)",
    org: "Johns Hopkins School of Medicine",
    category: "National",
    fit: "Strong fit",
    location: "Baltimore, MD",
    duration: "~10 weeks",
    benefits: "Stipend (varies by SIP division); research immersion",
    deadline: "Fall 2026 (est. Oct) → Typically ~Feb 1, 2027",
    opensOn: "2026-10-01",
    closesOn: "2027-02-01",
    opensLabel: "Fall 2026 (est. Oct)",
    closesLabel: "Typically ~Feb 1, 2027",
    dateNote: "Portal expected Fall 2026; deadline historically Feb 1",
    summary:
      "Biomedical and public health research across multiple SIP divisions (BSI-SIP and others). Free to apply.",
    whyFit:
      "Multiple divisions let you aim basic science or more translational work; strong for students with existing research + MD/PhD interest.",
    requirements: "CV, personal statement, transcripts, 2 LORs; some divisions need 2 years of college completed",
    applyUrl: "https://www.hopkinsmedicine.org/som/pathway/summer-internship-program",
    tags: ["biomedical", "public-health"],
    source: "list",
  },
  {
    id: "broad-bsrp",
    name: "Broad Summer Research Program (BSRP)",
    org: "Broad Institute of MIT and Harvard",
    category: "National",
    fit: "Good fit",
    location: "Cambridge, MA",
    duration: "9 weeks",
    benefits: "Paid research; genomics/biomedical labs; presentations",
    deadline: "Oct 2026 → Typically mid-Jan 2027",
    opensOn: "2026-10-01",
    closesOn: "2027-01-15",
    opensLabel: "Oct 2026",
    closesLabel: "Typically mid-Jan 2027",
    dateNote: "Broad: check back Oct 2026; prior deadline was mid-Jan",
    summary:
      "Intensive computational or experimental research in genomics, cancer, infectious disease, and related areas.",
    whyFit:
      "Your BioE/CS-adjacent robotics + scraping/automation skills + MCDB make computational biology / genomics a compelling angle.",
    requirements: "GPA ≥3.2; interest in PhD or MD-PhD; transcript, CV, essays, 2 LORs",
    applyUrl: "https://www.broadinstitute.org/bsrp/broad-summer-research-program-bsrp",
    tags: ["genomics", "computational", "biomedical"],
    source: "list",
  },
  {
    id: "penn-suip",
    name: "Penn SUIP",
    org: "University of Pennsylvania Perelman School of Medicine",
    category: "Cancer",
    fit: "Good fit",
    location: "Philadelphia, PA",
    duration: "10 weeks",
    benefits: "Stipend; seminars; SUIP symposium",
    deadline: "Oct 1, 2026 → Feb 1, 2027",
    opensOn: "2026-10-01",
    closesOn: "2027-02-01",
    opensLabel: "Oct 1, 2026",
    closesLabel: "Feb 1, 2027",
    dateNote: null,
    summary:
      "Prestigious biomedical summer internship emphasizing research readiness for PhD / discovery careers. Cancer and broad biomed options.",
    whyFit:
      "Competitive but realistic with your GPA, honors, and active faculty-mentored research; good East Coast academic-medical exposure.",
    requirements: "US citizen/PR typical; research + personal statements; LORs; portal via Penn BGS",
    applyUrl: "https://www.med.upenn.edu/research-trainee-affairs/suip/",
    tags: ["biomedical", "cancer", "PhD"],
    source: "list",
  },
  {
    id: "md-anderson",
    name: "MD Anderson Summer Research Programs",
    org: "UT MD Anderson Cancer Center",
    category: "Cancer",
    fit: "Good fit",
    location: "Houston, TX",
    duration: "~10 weeks",
    benefits: "Stipend/support varies by track (e.g. UPWARDS)",
    deadline: "Mid-Nov 2026 → Typically mid-Jan 2027",
    opensOn: "2026-11-17",
    closesOn: "2027-01-14",
    opensLabel: "Mid-Nov 2026",
    closesLabel: "Typically mid-Jan 2027",
    dateNote: "2026 cycle was Nov 17–Jan 14; similar timeline expected",
    summary:
      "Multiple undergraduate cancer research tracks via CATALYST. Strong immersion at a major cancer center.",
    whyFit:
      "Cancer programs from your list; your wet-lab + clinical research combo is relevant. Check eligibility notes per track.",
    requirements: "Resume, official transcript, research statement, 2 LORs (track-specific rules)",
    applyUrl:
      "https://www.mdanderson.org/education-training/research-training/early-career-pathway-programs/summer-research-programs/how-to-apply.html",
    tags: ["cancer", "biomedical"],
    source: "list",
  },
  {
    id: "st-jude-poe",
    name: "St. Jude Pediatric Oncology Education (POE)",
    org: "St. Jude Children’s Research Hospital",
    category: "Cancer",
    fit: "Good fit",
    location: "Memphis, TN",
    duration: "≥10–11 weeks",
    benefits: "$600/week; housing for non-local participants",
    deadline: "Nov 1, 2026 → Feb 1, 2027",
    opensOn: "2026-11-01",
    closesOn: "2027-02-01",
    opensLabel: "Nov 1, 2026",
    closesLabel: "Feb 1, 2027",
    dateNote: null,
    summary:
      "Lab or clinical oncology research internship with lectures and mentor matching — excellent for pediatric oncology interest.",
    whyFit:
      "You already have pediatric patient-centered engineering experience (Go Baby Go). Requires prior research — you meet that bar.",
    requirements: "US citizen/PR; GPA ≥3.4 science & overall; prior research; sophomore+ by summer start",
    applyUrl: "https://www.stjude.org/education-training/research-training/undergraduate/poe.html",
    tags: ["cancer", "pediatric", "paid"],
    source: "list",
  },
  {
    id: "msk-irsp",
    name: "MSK Immunology Research Summer Program (IRSP)",
    org: "Memorial Sloan Kettering Cancer Center",
    category: "Cancer",
    fit: "Explore",
    location: "New York, NY",
    duration: "10 weeks",
    benefits: "Paid research experience (confirm current cycle)",
    deadline: "Early Nov 2026 → Typically early Feb 2027",
    opensOn: "2026-11-03",
    closesOn: "2027-02-02",
    opensLabel: "Early Nov 2026",
    closesLabel: "Typically early Feb 2027",
    dateNote: "Prior cycle opened early Nov; confirm 2027 portal",
    summary:
      "Immunology / cancer immuno-oncology research for rising juniors and seniors with prior research.",
    whyFit:
      "More competitive timing (often rising junior+). Worth tracking for later summers; immunology is adjacent to your biomed path.",
    requirements: "GPA ≥3.0; advanced science coursework; prior research; 2 LORs; essay",
    applyUrl:
      "https://www.mskcc.org/education-training/summer-scientific-undergraduate-programs/immunology-research-summer-program",
    tags: ["cancer", "immunology"],
    source: "list",
  },
  {
    id: "ucla-urc-summer",
    name: "UCLA URC-Sciences Summer Program",
    org: "UCLA Undergraduate Research Center — Sciences",
    category: "UCLA",
    fit: "Strong fit",
    location: "UCLA",
    duration: "10 weeks (June–August)",
    benefits: "Stipend up to ~$6,000 full-time / ~$2,000 part-time",
    deadline: "Typically mid-Jan 2027 → Typically early Mar 2027",
    opensOn: "2027-01-12",
    closesOn: "2027-03-02",
    opensLabel: "Typically mid-Jan 2027",
    closesLabel: "Typically early Mar 2027",
    dateNote: "2026 window was Jan 12–Mar 2; expect similar",
    summary:
      "Funded summer research with your UCLA faculty mentor plus workshops/seminars. UCLA students only.",
    whyFit:
      "You already work in UCLA Cardiology — this can pay you to continue that project full-time over summer without leaving campus.",
    requirements: "UCLA undergrad; GPA ≥3.0; confirmed faculty mentor; interested in PhD or dual degree with PhD",
    applyUrl:
      "https://sciences.ugresearch.ucla.edu/programs-and-scholarships/urc-sciences-summer-program/",
    tags: ["UCLA", "paid", "continue-lab"],
    source: "added",
  },
  {
    id: "cdu-ucla-ucrtp",
    name: "CDU/UCLA Undergraduate Cancer Research Training Program",
    org: "Charles R. Drew University + UCLA Jonsson Cancer Center",
    category: "Cancer",
    fit: "Good fit",
    location: "Los Angeles (CDU / UCLA labs)",
    duration: "10 weeks",
    benefits: "Cancer research internship (confirm stipend on portal)",
    deadline: "Winter 2026–27 (est.) → TBD — check portal",
    opensOn: "2026-12-01",
    closesOn: "2027-03-01",
    opensLabel: "Winter 2026–27 (est.)",
    closesLabel: "TBD — check portal",
    dateNote: "2027 dates not posted; estimate based on prior winter application pattern",
    summary:
      "Local cancer research pairing with CDU or UCLA faculty — stay in LA while gaining cancer-center exposure.",
    whyFit:
      "Local option that doesn’t require relocating; builds cancer research alongside your cardiology base.",
    requirements: "GPA ≥3.0; full-time student; no concurrent summer courses; basic lab preferred",
    applyUrl:
      "https://ucrtp.smapply.io/prog/cduucla_undergraduate_cancer_research_training_program_-_summer_2026/",
    tags: ["cancer", "LA", "UCLA"],
    source: "added",
  },
  {
    id: "aha-sure",
    name: "AHA SURE Scholars (cardiovascular summer research)",
    org: "American Heart Association (host institutions)",
    category: "Cardiology",
    fit: "Strong fit",
    location: "Participating universities nationwide",
    duration: "8–10 weeks",
    benefits: "Stipend; mentoring; often Scientific Sessions exposure",
    deadline: "Typically Jan–Feb 2027 (by host) → Host-specific (often Mar)",
    opensOn: "2027-01-01",
    closesOn: "2027-03-31",
    opensLabel: "Typically Jan–Feb 2027 (by host)",
    closesLabel: "Host-specific (often Mar)",
    dateNote: "Apply via individual AHA host institutions",
    summary:
      "Mentored cardiovascular research at AHA partner sites. Apply through individual host institutions.",
    whyFit:
      "Closest thematic match to your transthyretin amyloidosis / cardiology work. Prioritize hosts that accept external undergrads.",
    requirements: "Varies by host; typically rising sophomore+ with STEM/health interest",
    applyUrl: "https://professional.heart.org/en/research-programs/sure-scholars",
    tags: ["cardiology", "paid"],
    source: "added",
  },
  {
    id: "aha-undergrad-scholars",
    name: "AHA Undergraduate Scholars Program",
    org: "American Heart Association",
    category: "Cardiology",
    fit: "Good fit",
    location: "National (research + community health focus)",
    duration: "16 weeks (academic-year style program)",
    benefits: "Mentorship, research/community engagement, national network",
    deadline: "Typically mid-Jun 2027 → Typically mid-Jul 2027",
    opensOn: "2027-06-15",
    closesOn: "2027-07-17",
    opensLabel: "Typically mid-Jun 2027",
    closesLabel: "Typically mid-Jul 2027",
    dateNote: "2026 window was Jun 15–Jul 17; next cycle expected similar",
    summary:
      "National AHA program for undergrads in science advancing careers in science, medicine, and research.",
    whyFit:
      "Complements lab summers; reinforces your cardiology identity and community-health leadership (Vitality Medical Initiative).",
    requirements: "Science GPA ≥3.2; sophomore–senior; essay + 1 LOR; full-time enrollment",
    applyUrl: "https://www.heart.org/en/aha-scholars/undergraduate",
    tags: ["cardiology", "national"],
    source: "added",
  },
  {
    id: "stanford-ssrp",
    name: "Stanford SSRP / Amgen at Stanford",
    org: "Stanford University",
    category: "National",
    fit: "Good fit",
    location: "Stanford, CA",
    duration: "~8–9 weeks",
    benefits: "Stipend; housing typically included",
    deadline: "Nov 1, 2026 (expected) → Typically Feb 1, 2027",
    opensOn: "2026-11-01",
    closesOn: "2027-02-01",
    opensLabel: "Nov 1, 2026 (expected)",
    closesLabel: "Typically Feb 1, 2027",
    dateNote: "Prior cycle opened Nov 1; confirm when 2027 page updates",
    summary:
      "Highly selective West Coast biomedical summer research. Stanford hosts Amgen Scholars and related bioscience summer programs.",
    whyFit:
      "Geographic convenience from LA; strong brand; competitive for students with proven research like yours.",
    requirements: "Check current SSRP/Amgen Stanford pages; generally strong academics + research interest",
    applyUrl: "https://biosciences.stanford.edu/prospective-students/diversity-programs/ssrp-amgen/",
    tags: ["biomedical", "CA", "selective"],
    source: "added",
  },
  {
    id: "caltech-wave",
    name: "Caltech WAVE Fellows",
    org: "California Institute of Technology",
    category: "National",
    fit: "Explore",
    location: "Pasadena, CA (near UCLA)",
    duration: "10 weeks",
    benefits: "Competitive stipend; housing support historically",
    deadline: "Nov 1, 2026 (expected) → Typically Jan 9, 2027",
    opensOn: "2026-11-01",
    closesOn: "2027-01-09",
    opensLabel: "Nov 1, 2026 (expected)",
    closesLabel: "Typically Jan 9, 2027",
    dateNote: "Prior cycle opened Nov 1 and closed Jan 9; confirm on Caltech SFP",
    summary:
      "Summer research fellowships across Caltech labs, including biology and bioengineering-adjacent groups.",
    whyFit:
      "Local, rigorous option; robotics/engineering background helps for quantitative biology labs.",
    requirements: "US citizen/PR or DACA often preferred for funding; strong academics",
    applyUrl: "https://www.sfp.caltech.edu/programs/wave_fellows",
    tags: ["CA", "STEM", "selective"],
    source: "added",
  },
  {
    id: "scripps-surf",
    name: "Scripps Research Summer Undergraduate Research Fellows",
    org: "Scripps Research",
    category: "National",
    fit: "Good fit",
    location: "La Jolla, CA",
    duration: "~10 weeks",
    benefits: "Stipend; biomedical research immersion",
    deadline: "Nov 1, 2026 → Feb 1, 2027",
    opensOn: "2026-11-01",
    closesOn: "2027-02-01",
    opensLabel: "Nov 1, 2026",
    closesLabel: "Feb 1, 2027",
    dateNote: "Scripps SURF window is Nov 1–Feb 1 annually",
    summary:
      "Biomedical research at a top independent research institute — strong chemistry/biology interface.",
    whyFit:
      "Southern California biomedical option with serious lab culture; good if you want industry-adjacent basic science.",
    requirements: "Check annual eligibility; typically undergrads with science coursework",
    applyUrl: "https://education.scripps.edu/undergraduate/summer-internship/",
    tags: ["biomedical", "CA"],
    source: "added",
  },
];

/** Default progress seeds (empty checklist) */
export const SEED_APPLICATIONS = Object.fromEntries(
  PROGRAMS.map((p) => [
    p.id,
    {
      status: "not_started",
      dateApplied: "",
      notes: "",
      checklist: {
        transcript: false,
        essay: false,
        lor: false,
        eligibility: false,
      },
    },
  ])
);
