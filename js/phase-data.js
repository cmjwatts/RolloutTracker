/* Shared phase data for the Rollout Journey wireframe. v2
   - Sequence rewritten for Phase 1 (Org Checkup → align → build plan → brief mid-mgrs)
   - Resources collapsed into a single list per phase
   - "inNinety" = platform-specific actions
   - "video" = one main embed per phase (placeholder thumbnail in wireframe)
   - "rolloutPlanBuilder" flag — only Prepare renders the inline plan builder */

window.PHASES = [
  {
    id: "prepare",
    num: "01",
    name: "Prepare",
    duration: "1–3 months",
    headline: "Get the leadership team ready",
    tagline: "The Leadership Team is ready for rollout.",
    why: "Before you teach anyone else EOS, the Leadership Team has to become teachers themselves. Most rollouts stall here because leaders haven't shifted from student to teacher, haven't agreed on a plan, or aren't ready to present a united front.",
    quote: {
      text: "80% of the battle is rolling EOS out to the rest of the company.",
      who: "Gino Wickman",
    },
    pictureOfDone: [
      "Leadership Team committed to being open and honest",
      "Leadership Team shifted from student to teacher",
      "Written Rollout Plan exists and agreement across Leadership Team to it",
    ],
    sequence: [
      { label: "First", task: "Take the Org Checkup® as a leadership team — make sure everyone is aligned and able to represent the why behind all EOS tools." },
      { label: "Next",  task: "Create your Rollout Plan in the workspace below — timeline, roles, communication." },
    ],
    video: {
      title: "What is the Rollout Roadmap? — with Marisa Smith",
      duration: "6:42",
      cue: "Marisa frames the 4 phases · why Prepare is non-negotiable",
    },
    inNinety: [
      { kind: "Assessment", label: "Run the Org Fitness / Org Checkup® as a Leadership Team" },
      { kind: "V/TO",        label: "Open the V/TO® and Accountability Chart; review together to ensure they're up to date" },
      { kind: "Rocks",       label: "Add your Rollout Plan as a Company Rock" },
    ],
    resources: [
      { kind: "Book",       label: "ROLLOUT — Ch. 1–4 (Prepare)" },
      { kind: "Tool",       label: "Rollout Tracker · rolloutbook.com" },
      { kind: "Guide",      label: "Troubleshooting Guide · rolloutbook.com" },
      { kind: "Assessment", label: "Free EOS Assessment · organizationalcheckup.com" },
      { kind: "Workshop",   label: "EOS Worldwide → Implementer referral" },
    ],
    steps: [
      {
        title: "Take the Org Checkup",
        explain: "Score the Org Checkup® together as a Leadership Team. The disagreements are the gift — they show where you still need shared context before you can teach anyone else.",
        ninety: [
          { kind: "Assessment", label: "Run the Org Checkup® for your Leadership Team" },
          { kind: "V/TO",       label: "Open the V/TO® and Accountability Chart; review together to make sure they're current" },
        ],
        resources: [],
      },
      {
        title: "Create your Rollout Plan",
        explain: "Every Rollout Plan is unique. Use the workspace below to capture your timeline, roles, and communication. Then brief your mid-managers — before the all-company launch.",
        ninety: [
          { kind: "Rocks",      label: "Add your Rollout Plan as a Company Rock so it stays alive" },
        ],
        resources: [
          { kind: "Guide",      label: "Reflection Guide · rolloutbook.com" },
          { kind: "Guide",      label: "Troubleshooting Guide · rolloutbook.com" },
          { kind: "Meeting",    label: "Implementer Help First Hour (free)" },
        ],
      },
    ],
    proServe: {
      title: "Rollout Diagnostic + SLT Alignment",
      blurb: "4 weeks · 7 meetings · ~$2,500",
      bullets: [
        "Diagnostic to identify where the SLT actually stands",
        "Facilitated alignment sessions",
        "Co-author the Rollout Plan with Christine",
        "Mid-manager prep workshop",
      ],
      stuckSignal: "SLT keeps disagreeing on basics. No written plan. Mid-managers blindsided.",
    },
  },
  {
    id: "launch",
    num: "02",
    name: "Launch",
    duration: "1–2 weeks",
    headline: "Introduce EOS to the whole company",
    tagline: "Every employee has heard the why, seen the V/TO®, and knows the plan.",
    why: "Launch is one moment in time — but it sets the tone for everything after. Without context, employees see L10s as another meeting. With context, they see the operating system they're now part of building.",
    quote: {
      text: "Context + Content = Clarity and Comprehension.",
      who: "Marisa Smith",
    },
    pictureOfDone: [
      "Entire leadership team involved in the launch",
      "Mid-managers were briefed first — not after",
      "Rollout is visible — branding, displays, digital",
      "Plan to repeat the message often is in place",
    ],
    sequence: [
      { label: "First", task: "Practice the all-company announcement with the Leadership Team — don't wing it." },
      { label: "Next",  task: "Hold the all-company launch — V/TO® and Accountability Chart walkthrough, why EOS, what's coming." },
      { label: "Then",  task: "Make it visible: swag, displays, Ninety shared along with resources like the Rollout Plan, and What the Heck is EOS Book." },
      { label: "Last",  task: "Schedule the following quarter's State of the Company meetings." },
    ],
    video: {
      title: "Five Best Practices for a Great Launch",
      duration: "8:15",
      cue: "Marisa walks through the launch-day checklist",
    },
    inNinety: [
      { kind: "V/TO",       label: "Share the V/TO® read-only link with the whole company" },
      { kind: "Headlines",  label: "Post Headlines for the launch moment" },
      { kind: "Template",   label: "Use the State of the Company template" },
    ],
    resources: [
      { kind: "Book",       label: "ROLLOUT — Ch. 5–8 (Launch)" },
      { kind: "Template",   label: "All-company launch agenda + State of the Company template" },
      { kind: "Script",     label: "V/TO® talking-points script" },
      { kind: "Tip sheet",  label: "Tips for Sharing Context of EOS" },
      { kind: "Guide",      label: "Rollout Troubleshooting Guide" },
    ],
    steps: [
      {
        title: "Hold the all-company launch",
        explain: "Don't wing it — walk the Leadership Team through who's saying what first. Then run the all-company moment: V/TO® and Accountability Chart walkthrough, why EOS, what's coming next. Mid-managers get briefed before the all-company moment, not after. Make it visible: swag, displays, Ninety shared along with resources like the Rollout Plan and What the Heck is EOS book.",
        ninety: [
          { kind: "V/TO™",      label: "Add your team to Ninety as Observers so they can view the V/TO and Accountability Chart" },
          { kind: "Headlines",  label: "Post Headlines for the launch moment, or could leverage Knowledge Portal for sharing content" },
        ],
        resources: [
          { kind: "Template",  label: "All-company launch agenda template" },
          { kind: "Script",    label: "V/TO® talking-points script" },
          { kind: "Tip sheet", label: "Tips for Sharing Context of EOS" },
        ],
      },
      {
        title: "Schedule the State of the Company cadence",
        explain: "Lock the next quarter's State of the Company on the calendar before you leave the launch moment. Repetition is how the message lands.",
        ninety: [],
        resources: [
          { kind: "Template",   label: "Use the State of the Company template" },
        ],
      },
    ],
    proServe: {
      title: "Launch Day Prep",
      blurb: "2 meetings · agenda + dry-run",
      bullets: [
        "Build your all-company agenda with Christine",
        "Dry-run the V/TO® presentation",
        "Pre-launch comms templates",
      ],
      stuckSignal: "Leaders don't know who's saying what. V/TO® presentation feels flat.",
    },
  },
  {
    id: "integrate",
    num: "03",
    name: "Integrate",
    duration: "3–9 months",
    headline: "Roll EOS into every department",
    tagline: "Every department runs a Meeting Pulse®, uses Core Values, and is accountable to numbers.",
    why: "This is where most companies stall. Launch was a moment — Integration is a grind. Departments need their own L10s, Scorecards, Rocks, and managers who understand LMA™. Skip this, and EOS becomes leadership-team theater.",
    quote: {
      text: "Companies focus on Level 10 mechanics and miss the broader integration work.",
      who: "Marisa Smith",
    },
    pictureOfDone: [
      "Every department runs a Meeting Pulse® (Level 10 Meeting™ / Quarterly / Annual)",
      "Managers have run Quarterly Conversations, and use Core Values to Hire / Fire / Review / Reward / Recognize",
      "Core Processes documented and Followed by All",
      "Every seat has at least one number on a Scorecard",
    ],
    sequence: [
      { label: "First", task: "Department-by-department: set up Scorecard, Rocks, and Level 10 Meeting Agenda with each leader." },
      { label: "Next",  task: "Facilitate the first L10 of each department — make sure it sticks." },
      { label: "Then",  task: "Build Departmental V/TOs and the quarterly planning cadence." },
      { label: "Last",  task: "Document Core Processes; run People Analyzer® across the org." },
    ],
    video: {
      title: "Rolling Out to Departments",
      duration: "11:04",
      cue: "Marisa on Departmental Meeting Pulse® and accountability",
    },
    inNinety: [
      { kind: "Meetings",          label: "Stand up each department's Level 10 Meeting in Meetings" },
      { kind: "Scorecard",         label: "Build a Departmental Scorecard per leader; share measurables across teams" },
      { kind: "Rocks",             label: "Set Departmental Rocks each quarter; share Rocks across teams" },
      { kind: "Knowledge Portal",  label: "Document Core Processes in Knowledge Portal" },
      { kind: "1-on-1s",           label: "Run People Analyzer® inside 1-on-1s" },
    ],
    resources: [
      { kind: "Book",       label: "ROLLOUT — Ch. 9–14 (Integrate)" },
      { kind: "Books",      label: "Issues! · Process! · Data! · How to Be a Great Boss" },
      { kind: "Workshops",  label: "EOSW Great Boss Workshop · Issues Gym" },
      { kind: "Guide",      label: "Quarterly Conversation guide" },
    ],
    steps: [
      {
        title: "Set up each department's Level 10",
        explain: "Department-by-department: build the Scorecard, Rocks, and Level 10 Meeting Agenda with each leader. Treat each department like a mini-rollout of its own.",
        ninety: [
          { kind: "Meetings",   label: "Stand up each department's Level 10 in Meetings" },
          { kind: "Scorecard",  label: "Build a Departmental Scorecard per leader; share measurables across teams" },
          { kind: "Rocks",      label: "Set Departmental Rocks each quarter; share Rocks across teams" },
        ],
        resources: [
          { kind: "Video",     label: "Department L10 setup — walkthrough" },
          { kind: "Workshop",  label: "Issues Gym" },
          { kind: "Book",      label: "Issues!" },
          { kind: "Book",      label: "Meetings Kinda Suck" },
          { kind: "Book",      label: "Data!" },
        ],
      },
      {
        title: "Build Departmental V/TOs and the quarterly cadence",
        explain: "Each department's V/TO connects their work to the company V/TO. The quarterly planning cadence keeps it honest.",
        ninety: [
          { kind: "V/TO",        label: "Build a Departmental V/TO for each team" },
        ],
        resources: [
          { kind: "Video",       label: "Departmental V/TO — walkthrough" },
        ],
      },
      {
        title: "Document Core Processes",
        explain: "Core Processes Documented, Simplified, and Followed by All. Capture the way the work actually gets done.",
        ninety: [
          { kind: "Knowledge Portal", label: "Document Core Processes in Knowledge Portal" },
        ],
        resources: [
          { kind: "Video",      label: "Document Core Processes — walkthrough" },
          { kind: "Book",       label: "Process!" },
        ],
      },
      {
        title: "Roll out the People tools — People Analyzer®, Quarterly Conversations, LMA™",
        explain: "Managers learn to lead and manage. They use the People Analyzer® to make Right Person / Right Seat calls, and run Quarterly Conversations consistently with every direct report.",
        ninety: [
          { kind: "1-on-1s",    label: "Each manager becomes familiar with the People Analyzer® to hire, fire, and promote based on it" },
          { kind: "1-on-1s",    label: "Each manager sets up their Quarterly Conversations and is ready to run those consistently" },
        ],
        resources: [
          { kind: "Video",      label: "People tools — walkthrough" },
          { kind: "Book",       label: "How to Be a Great Boss" },
          { kind: "Workshop",   label: "Great Boss Workshops" },
        ],
      },
    ],
    proServe: {
      title: "Rollout Engagement: For the Integration Stage",
      blurb: "",
      bullets: [
        "1:1 with each department leader",
        "Build Scorecard, Rocks, L10 agenda together",
        "Facilitated first Level 10",
        "Set up Departmental V/TOs + Quarterly Pulse™",
      ],
      stuckSignal: "The vision was shared once, and people still can't tell you what it is or new hires have never heard of EOS.",
    },
  },
  {
    id: "sustain",
    num: "04",
    name: "Sustain",
    duration: "ongoing",
    headline: "Run on EOS… forever",
    tagline: "The org is 80%+ strong and stays there.",
    why: "EOS is a discipline, not a project. Sustain is the cadence that keeps the company healthy: quarterly drumbeat, an annual health check, and the metrics that prove it's working.",
    quote: {
      text: "Rollout is a journey, not an event.",
      who: "Marisa Smith",
    },
    pictureOfDone: [
      "Quarterly State of the Company is on the calendar forever",
      "Organizational Checkup® stays at 80%+",
      "Completing 80%+ of Goals every year, and 80%+ Rocks every quarter",
      "Completing 90%+ of weekly To-Dos",
    ],
    sequence: [
      { label: "First", task: "Run Weekly, Quarterly, and Annual pulse across all teams in the Company." },
      { label: "Next",  task: "Run the Organizational Checkup® with the Leadership Team to measure 80%+ strong across the 6 Key Components™." },
      { label: "Then",  task: "Introduce EOS + Ninety as new employees join the company." },
    ],
    video: {
      title: "Running on EOS… Forever",
      duration: "7:30",
      cue: "Marisa on the sustain cadence",
    },
    inNinety: [
      { kind: "State of the Co.", label: "Run the Quarterly State of the Company with the State brief" },
      { kind: "Org Checkup",      label: "Take the Org Checkup® on a quarterly schedule" },
      { kind: "Dashboards",       label: "Run the weekly, quarterly, and annual meeting pulse and track Goals + Rocks + To-Do performance" },
    ],
    resources: [
      { kind: "Book",       label: "ROLLOUT — Ch. 15+ (Sustain)" },
      { kind: "Assessment", label: "organizationalcheckup.com" },
      { kind: "Guide",      label: "Reflection Guide · rolloutbook.com" },
      { kind: "Guide",      label: "Ninety: Stages of Development guide" },
    ],
    steps: [
      {
        title: "Run the weekly, quarterly, and annual pulse across all teams",
        explain: "The meeting pulse is the heartbeat. Once it's running every week, every quarter, every year — across every team — the rollout is done and the discipline begins.",
        ninety: [
          { kind: "Meetings",    label: "Run the weekly, quarterly, annual meeting pulse in Meetings" },
          { kind: "Insights",    label: "Track Goals + Rocks + To-Do performance reports" },
        ],
        resources: [],
      },
      {
        title: "Run the Org Checkup® with the Leadership Team",
        explain: "Re-score quarterly with the Leadership Team. Aim for 80%+ Strong across the 6 Key Components™.",
        ninety: [
          { kind: "Assessment",  label: "Take the Org Checkup® on a quarterly schedule" },
        ],
        resources: [],
      },
      {
        title: "Introduce EOS + Ninety to new employees",
        explain: "Every new hire gets the same context the original team got. Keep What the Heck is EOS? and your V/TO® on the onboarding shelf.",
        ninety: [
          { kind: "Knowledge Portal", label: "Create new hire onboarding that reviews EOS + Ninety and add it to Knowledge Portal to assign it to new hires to complete." },
        ],
        resources: [
          { kind: "Guide", label: "Reflection Guide · rolloutbook.com" },
        ],
      },
    ],
    proServe: {
      title: "Annual Health Check",
      blurb: "Yearly retainer · keeps the rollout from drifting",
      bullets: [
        "Re-score the Rollout Tracker",
        "Refresh the Rollout Plan for the next year",
        "Coaching for the Champion",
      ],
      stuckSignal: "Completion rates slipping. Quarterly State of the Company keeps getting skipped.",
    },
  },
];
