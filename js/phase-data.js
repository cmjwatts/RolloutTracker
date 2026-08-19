/* Shared phase data for the Rollout Journey. v3
   Revised against Marisa Smith + Beth Fahey feedback (call of 14 Aug 2026) and
   ROLLOUT Ch. 4 ("Getting Ready for Rollout", pp. 52-84).

   Conventions:
   - "inNinety" = platform-specific actions, rendered as an accent sublist.
   - "resources" = { hub: [...], book: {...}, links: [...] } — one button to the
     ROLLOUT member hub plus a list of what to look for there, rather than a
     dozen links to the same destination.
   - "sequence" = a SUGGESTED order, deliberately not a schedule. Marisa asked us
     not to sound prescriptive about timing.
   - "rolloutPlanBuilder" flag — only Prepare renders the inline plan builder.
   - "readinessTool" flag — only Prepare renders the readiness assessment.
   - No percentages anywhere. The percentage belongs to the Organizational
     Checkup (80%+), not to this tracker. Progress is shown as counts only.
*/

window.ROLLOUT_LINKS = {
  hub:     "https://www.rolloutbook.com/rollout-resources",
  book:    "https://www.rolloutbook.com/",
  checkup: "https://www.organizationalcheckup.com/",
};

/* ------------------------------------------------------------------
   Readiness assessment — ROLLOUT Ch. 4, pp. 52-84.

   The book frames five key readiness questions. Q1 (have we mastered the five
   Foundational Tools?) and Q2 (are we ready to share them?) both run tool by
   tool over the same five tools, so they render as one grid with two columns
   rather than two lists of ~25 and 5. Marisa's "context vs. content" framing
   from the call is exactly those two columns.

   Q3-Q5 are team-level and render as three collapsed prompts.

   IMPORTANT: this must never score, grade, or gate. p.83 — "Readiness doesn't
   require perfection; it requires commitment, consistency, and the courage to
   begin."
------------------------------------------------------------------ */
window.READINESS = {
  eyebrow: "Before you build the plan",
  title: "Assess your readiness",
  lead:
    "Five questions decide whether you're ready to begin Rollout or need to shore up your " +
    "foundation first. Work them as a Leadership Team — the disagreements are the useful part.",
  note:
    "Readiness doesn't require perfection; it requires commitment, consistency, and the courage " +
    "to begin. If you can't check every box, focus your energy on strengthening weak areas " +
    "before proceeding.",
  noteCite: "ROLLOUT, p. 83",

  gridTitle: "The five EOS Foundational Tools",
  gridLead:
    "Two questions per tool: have we mastered it, and are we ready to share it? You don't have " +
    "to be ready to share everything — you just have to agree on what you are sharing.",
  colMastered: "Mastered?",
  colShare: "Ready to share?",

  scale: [
    { id: "no",   label: "Not yet" },
    { id: "part", label: "Getting there" },
    { id: "yes",  label: "Yes" },
  ],

  tools: [
    {
      id: "vto",
      name: "V/TO®",
      page: "p. 55",
      mastered: [
        "Have you completed all 8 sections of the V/TO?",
        "Is every leader genuinely excited about this vision?",
        "Does every leader understand and believe in every word of the V/TO?",
        "Can you imagine the impact the V/TO will have when everyone knows where the company is going and how you're going to get there?",
      ],
      share:
        "Are we ready to share the entire V/TO, or should we introduce it section by section over time?",
    },
    {
      id: "accountability-chart",
      name: "The Accountability Chart®",
      page: "p. 57",
      mastered: [
        "Are you committed to this organizational structure, even if you're not certain yet?",
        "Do you have a plan to address any remaining Right People Right Seats issues?",
        "Does everyone on the leadership team understand their role in the new structure?",
        "Are you committed to devoting the time necessary to lead and manage your people?",
        "Can you imagine the impact The Accountability Chart will have on the rest of the team when everyone is clear on who is accountable for what?",
      ],
      share:
        "Is The Accountability Chart ready to be distributed, or are there still some sensitive conversations that need to happen first?",
    },
    {
      id: "rocks",
      name: "Rocks",
      page: "p. 60",
      mastered: [
        "Are you consistently setting Rocks that are truly S.M.A.R.T. (Specific, Measurable, Attainable, Realistic, Timely)?",
        "Are team members comfortable speaking up when Rocks go off-track?",
        "Are you using IDS to solve Rock-related issues and get things back on track?",
        "Are you learning from both completed and incomplete Rocks?",
        "Can you imagine the impact that Rocks will have when everyone is getting 80 percent or more done every quarter?",
      ],
      share:
        "Are Rocks something we want to roll out immediately, or would it be better to wait a quarter or two until we've demonstrated more consistency and proficiency?",
    },
    {
      id: "meeting-pulse",
      name: "The Meeting Pulse®",
      page: "pp. 63–64",
      mastered: [
        "Are you holding Level 10 Meetings every week, on the same day, at the same time, without exception?",
        "Does everyone show up on time, stay engaged, and contribute meaningfully?",
        "Are you sticking to the agenda and resisting the urge to go down rabbit holes?",
        "Are you actually solving issues using IDS, not just talking about them?",
        "Are To-dos from meetings getting completed before the next meeting?",
      ],
      share:
        "Would certain teams benefit from having Level 10 Meetings immediately, while other teams might need more preparation?",
    },
    {
      id: "scorecard",
      name: "Scorecard",
      page: "p. 66",
      mastered: [
        "Are you reviewing your Scorecard every week without fail?",
        "Do the numbers actually drive meaningful conversations and decisions?",
        "Can you trust the data you're seeing each week?",
        "When numbers are off track, do you dig into why and take corrective action?",
        "Are you willing to adjust Measurables that aren't adding value?",
        "Does each leadership team member own their numbers and take responsibility for results?",
      ],
      share:
        "Are Scorecards really important right out of the gate, or do we need to make sure our data reporting is accurate at the leadership team level first?",
    },
  ],

  holdNote:
    "If a tool feels particularly shaky or uncertain, it's perfectly fine to wait a quarter or " +
    "two before rolling it out to the rest of your company. Sometimes, readiness means slowing " +
    "down just a bit to go faster later.",
  holdNoteCite: "ROLLOUT, p. 67",

  teamTitle: "And the Leadership Team itself",
  teamLead: "Three questions about how you'll show up, not about the tools.",
  team: [
    {
      id: "united-front",
      q: "Are you ready to present a united front?",
      page: "p. 71",
      items: [
        "Is every leader using consistent language?",
        "Are we committed to supporting each other publicly, even when we disagree privately?",
        "Have we worked through any significant conflicts or trust issues between team members?",
        "Do we agree on how to handle questions we can't answer immediately?",
      ],
    },
    {
      id: "open-honest",
      q: "Are you ready to be open and honest?",
      page: "p. 75",
      items: [
        "Are we genuinely committed to transparency, even when it feels uncomfortable?",
        "Do we trust our team with the truth about our challenges and opportunities?",
        "Are we prepared to admit when we don't know something or when we make mistakes?",
        "Can we focus on collective success rather than individual credit or blame?",
        "Are we willing to be vulnerable in service of the organization's growth?",
      ],
    },
    {
      id: "student-teacher",
      q: "Are you ready to shift from student to teacher?",
      page: "p. 77",
      items: [
        "Are we genuinely excited about teaching EOS, not just implementing it?",
        "Can we explain the “why” behind each tool in compelling terms?",
        "Are we prepared to answer questions we might not have considered?",
        "Do we have the patience to explain concepts multiple times in multiple ways?",
        "Are we committed to modeling what we teach, even when it's difficult?",
      ],
    },
  ],
};

window.PHASES = [
  {
    id: "prepare",
    num: "01",
    name: "Prepare",
    duration: "Most teams: 1–3 months",
    headline: "Get the leadership team ready",
    tagline: "The Leadership Team is ready for rollout.",
    why: "Before you teach anyone else EOS, the Leadership Team has to become teachers themselves. Most rollouts stall here because leaders haven't shifted from student to teacher, haven't agreed on a plan, or aren't ready to present a united front.",
    quote: {
      text: "Readiness doesn't require perfection; it requires commitment, consistency, and the courage to begin.",
      who: "ROLLOUT, p. 83",
    },
    pictureOfDone: [
      "Leadership Team committed to being open and honest",
      "Leadership Team shifted from student to teacher",
      "Readiness assessed together — and agreement on which tools you're sharing first",
      "Written Rollout Plan exists and agreement across Leadership Team to it",
    ],
    sequence: [
      { label: "Start", task: "Take the Organizational Checkup® as a Leadership Team — make sure everyone is aligned and able to represent the why behind all EOS tools." },
      { label: "Then",  task: "Assess your readiness together: have you mastered the five Foundational Tools, and which are you ready to share?" },
      { label: "Then",  task: "Create your Rollout Plan in the workspace below — timeline, roles, communication." },
      { label: "Then",  task: "Brief your mid-managers — before the all-company launch, not after." },
    ],
    video: {
      title: "What is the Rollout Roadmap?",
      presenter: "Marisa Smith",
      duration: "~5 min",
      cue: "The four phases · why Prepare is non-negotiable",
    },
    inNinety: [
      { kind: "Assessment", label: "Run the Organizational Checkup® as a Leadership Team" },
      { kind: "V/TO",       label: "Open the V/TO® and Accountability Chart; review together to ensure they're up to date" },
      { kind: "Scorecard",  label: "Review your Leadership Team Scorecard — every leader owning their numbers" },
      { kind: "Rocks",      label: "Add your Rollout Plan as a Company Rock" },
    ],
    resources: {
      book: { label: "ROLLOUT — Ch. 1–5", note: "Ch. 4 is readiness; Ch. 5 is building the plan" },
      hub: [
        "Rollout Reflection Guide",
        "Rollout Troubleshooting Guide",
        "Rollout Tracker (printable)",
      ],
      links: [
        { kind: "Assessment", label: "Organizational Checkup®", url: "https://www.organizationalcheckup.com/" },
        { kind: "Implementer", label: "Working with an EOS Implementer? Send them your plan and your launch deck and ask for feedback and examples — they've seen this go well and badly many times over." },
      ],
    },
    readinessTool: true,
    rolloutPlanBuilder: true,
    steps: [
      {
        title: "Take the Organizational Checkup®",
        explain: "Score the Organizational Checkup® together as a Leadership Team. The disagreements are the gift — they show where you still need shared context before you can teach anyone else.",
        ninety: [
          { kind: "Assessment", label: "Run the Organizational Checkup® for your Leadership Team" },
          { kind: "V/TO",       label: "Open the V/TO® and Accountability Chart; review together to make sure they're current" },
        ],
        resources: [],
      },
      {
        title: "Assess your readiness",
        explain: "Five questions decide whether you begin now or shore up the foundation first: have you mastered the five Foundational Tools, are you ready to share them, can you present a united front, can you be open and honest, and can you shift from student to teacher. Use the assessment below — and remember you don't have to share everything at once, you just have to agree on what you are sharing.",
        ninety: [
          { kind: "V/TO",      label: "Make sure you're aligned on the content of the V/TO® before deciding what to share" },
          { kind: "Scorecard", label: "Confirm your Leadership Team Scorecard data is one you'd trust in front of the company" },
        ],
        resources: [],
      },
      {
        title: "Create your Rollout Plan",
        explain: "Every Rollout Plan is unique — this isn't a template to follow, it's an approach to fit your circumstances. Use the workspace below to capture your timeline, roles, and communication. Then brief your mid-managers, before the all-company launch.",
        ninety: [
          { kind: "Rocks", label: "Add your Rollout Plan as a Company Rock so it stays alive" },
        ],
        resources: [],
      },
    ],
    proServe: {
      title: "Rollout Diagnostic + Leadership Alignment",
      blurb: "Scoped to your team count — see below",
      bullets: [
        "Leadership alignment: confirm what's rolling out, to whom, in what order",
        "Facilitated readiness and alignment sessions",
        "Co-author the Rollout Plan with a Ninety Pro Serve guide",
        "Mid-manager prep workshop",
      ],
      stuckSignal: "Leadership Team keeps disagreeing on basics. No written plan. Mid-managers blindsided.",
    },
  },
  {
    id: "launch",
    num: "02",
    name: "Launch",
    duration: "Most teams: 1–2 weeks",
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
      { label: "Start", task: "Practice the all-company announcement with the Leadership Team — don't wing it." },
      { label: "Then",  task: "Hold the all-company launch — V/TO® and Accountability Chart walkthrough, why EOS, what's coming." },
      { label: "Then",  task: "Make it visible: swag, displays, Ninety shared along with resources like the Rollout Plan, and What the Heck is EOS?" },
      { label: "Then",  task: "Schedule the following quarter's State of the Company meetings." },
    ],
    video: {
      title: "Five Best Practices for a Great Launch",
      presenter: "Beth Fahey",
      duration: "~5 min",
      cue: "The launch-day checklist",
    },
    inNinety: [
      { kind: "V/TO",      label: "Add your team as Observers so they can view the V/TO® and Accountability Chart" },
      { kind: "Headlines", label: "Post Headlines for the launch moment" },
      { kind: "Knowledge Portal", label: "Share launch content and the Rollout Plan in Knowledge Portal" },
    ],
    resources: {
      book: { label: "ROLLOUT — Launch chapters", note: "Chapter numbers to confirm against the book" },
      hub: [
        "Tips for Launching Your Rollout",
        "Tips for Sharing the Context of EOS®",
        "Tips for Bringing Your Vision to Life",
        "Tips for Checking for Understanding",
        "Rollout Troubleshooting Guide",
      ],
      links: [
        { kind: "Book",  label: "What the Heck is EOS? — order in bulk for the whole team", url: "https://www.eosworldwide.com/" },
        { kind: "Guide", label: "How to Run a Great Level 10 Meeting · EOS Worldwide library", url: "https://www.eosworldwide.com/" },
        { kind: "Guide", label: "The 20 EOS Tools Your Team Should Know · EOS Worldwide library", url: "https://www.eosworldwide.com/" },
      ],
    },
    steps: [
      {
        title: "Hold the all-company launch",
        explain: "Don't wing it — walk the Leadership Team through who's saying what first. Then run the all-company moment: V/TO® and Accountability Chart walkthrough, why EOS, what's coming next. Mid-managers get briefed before the all-company moment, not after. Make it visible: swag, displays, Ninety shared along with resources like the Rollout Plan and What the Heck is EOS?",
        ninety: [
          { kind: "V/TO",      label: "Add your team to Ninety as Observers so they can view the V/TO® and Accountability Chart" },
          { kind: "Headlines", label: "Post Headlines for the launch moment, or use Knowledge Portal for sharing content" },
        ],
        resources: [],
      },
      {
        title: "Schedule the State of the Company cadence",
        explain: "Lock the next quarter's State of the Company on the calendar before you leave the launch moment. Repetition is how the message lands.",
        ninety: [
          { kind: "Meetings", label: "Schedule the quarterly State of the Company in Meetings" },
        ],
        resources: [],
      },
    ],
    proServe: {
      title: "Launch Day Prep",
      blurb: "Scoped to your team count — see below",
      bullets: [
        "Build your all-company agenda with a Ninety Pro Serve guide",
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
    duration: "Most teams: 3–9 months",
    headline: "Roll EOS into every department",
    tagline: "Every department runs a Meeting Pulse®, uses Core Values, and is accountable to numbers.",
    why: "This is where most companies stall. Launch was a moment — Integration is a grind. Departments need their own L10s, Scorecards, Rocks, and managers who understand LMA™. Skip this, and EOS becomes leadership-team theater.",
    quote: {
      text: "Vision without Traction is hallucination.",
      who: "Gino Wickman, quoted in ROLLOUT, p. 63",
    },
    pictureOfDone: [
      "Every department runs a Meeting Pulse® (Level 10 Meeting™ / Quarterly / Annual)",
      "Managers have run Quarterly Conversations, and use Core Values to Hire / Fire / Review / Reward / Recognize",
      "Core Processes documented and Followed by All",
      "Every seat has at least one number on a Scorecard",
    ],
    sequence: [
      { label: "Start", task: "Department by department: set up Scorecard, Rocks, and Level 10 Meeting Agenda with each leader." },
      { label: "Then",  task: "Facilitate the first L10 of each department — make sure it sticks." },
      { label: "Then",  task: "Build Departmental V/TOs and the quarterly planning cadence." },
      { label: "Then",  task: "Document Core Processes; run People Analyzer® across the org." },
    ],
    video: {
      title: "Rolling Out to Departments",
      presenter: "Marisa Smith",
      duration: "~5 min",
      cue: "Departmental Meeting Pulse® and accountability",
    },
    inNinety: [
      { kind: "Meetings",         label: "Stand up each department's Level 10 Meeting in Meetings" },
      { kind: "Scorecard",        label: "Build a Departmental Scorecard per leader; share measurables across teams" },
      { kind: "Rocks",            label: "Set Departmental Rocks each quarter; share Rocks across teams" },
      { kind: "Knowledge Portal", label: "Document Core Processes in Knowledge Portal" },
      { kind: "1-on-1s",          label: "Run People Analyzer® inside 1-on-1s" },
    ],
    resources: {
      book: { label: "ROLLOUT — Integrate chapters", note: "Chapter numbers to confirm against the book" },
      hub: [
        "Rollout Troubleshooting Guide",
        "Tips for Checking for Understanding",
      ],
      links: [
        { kind: "Books",     label: "Issues! · Process! · Data! · How to Be a Great Boss · Meetings Kinda Suck", url: "https://www.eosworldwide.com/" },
        { kind: "Workshops", label: "EOS Worldwide Great Boss Workshop · Issues Gym", url: "https://www.eosworldwide.com/" },
        { kind: "Guide",     label: "Quarterly Conversation guide · EOS Worldwide library", url: "https://www.eosworldwide.com/" },
      ],
    },
    steps: [
      {
        title: "Set up each department's Level 10",
        explain: "Department by department: build the Scorecard, Rocks, and Level 10 Meeting Agenda with each leader. Treat each department like a mini-rollout of its own.",
        ninety: [
          { kind: "Meetings",  label: "Stand up each department's Level 10 in Meetings" },
          { kind: "Scorecard", label: "Build a Departmental Scorecard per leader; share measurables across teams" },
          { kind: "Rocks",     label: "Set Departmental Rocks each quarter; share Rocks across teams" },
        ],
        resources: [
          { kind: "Video",    label: "Department L10 setup — walkthrough" },
          { kind: "Workshop", label: "Issues Gym" },
          { kind: "Book",     label: "Issues! · Data! · Meetings Kinda Suck" },
        ],
      },
      {
        title: "Build Departmental V/TOs and the quarterly cadence",
        explain: "Each department's V/TO connects their work to the company V/TO. The quarterly planning cadence keeps it honest.",
        ninety: [
          { kind: "V/TO", label: "Build a Departmental V/TO for each team" },
        ],
        resources: [
          { kind: "Video", label: "Departmental V/TO — walkthrough" },
        ],
      },
      {
        title: "Document Core Processes",
        explain: "Core Processes Documented, Simplified, and Followed by All. Capture the way the work actually gets done.",
        ninety: [
          { kind: "Knowledge Portal", label: "Document Core Processes in Knowledge Portal" },
        ],
        resources: [
          { kind: "Video", label: "Document Core Processes — walkthrough" },
          { kind: "Book",  label: "Process!" },
        ],
      },
      {
        title: "Roll out the People tools — People Analyzer®, Quarterly Conversations, LMA™",
        explain: "Managers learn to lead and manage. They use the People Analyzer® to make Right Person / Right Seat calls, and run Quarterly Conversations consistently with every direct report.",
        ninety: [
          { kind: "1-on-1s", label: "Each manager becomes familiar with the People Analyzer® to hire, fire, and promote based on it" },
          { kind: "1-on-1s", label: "Each manager sets up their Quarterly Conversations and is ready to run those consistently" },
        ],
        resources: [
          { kind: "Video",    label: "People tools — walkthrough" },
          { kind: "Book",     label: "How to Be a Great Boss" },
          { kind: "Workshop", label: "Great Boss Workshops" },
        ],
      },
    ],
    proServe: {
      title: "Rollout Engagement",
      blurb: "Leadership alignment → team-by-team training → wrap-up",
      bullets: [
        "Leadership alignment: kickoff with the Champion and leadership team to confirm what's rolling out, to whom, and in what order",
        "Team by team: a working session to set up Scorecard, Rocks, and the Level 10 agenda in Ninety — including connecting Rocks and Measurables across teams",
        "Team by team: a sit-in on the first Level 10 so the habits stick",
        "Wrap-up: closing check-in with the Champion on what's running, what needs attention, and what the team owns from here",
      ],
      stuckSignal: "The vision was shared once, and people still can't tell you what it is — or new hires have never heard of EOS.",
    },
  },
  {
    id: "sustain",
    num: "04",
    name: "Sustain",
    duration: "Ongoing",
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
      { label: "Start", task: "Run Weekly, Quarterly, and Annual pulse across all teams in the company." },
      { label: "Then",  task: "Run the Organizational Checkup® with the Leadership Team to measure 80%+ strong across the 6 Key Components™." },
      { label: "Then",  task: "Introduce EOS + Ninety as new employees join the company." },
    ],
    video: {
      title: "Running on EOS… Forever",
      presenter: "Beth Fahey",
      duration: "~5 min",
      cue: "The sustain cadence",
    },
    inNinety: [
      { kind: "State of the Co.", label: "Run the Quarterly State of the Company with the State brief" },
      { kind: "Assessment",       label: "Take the Organizational Checkup® on a quarterly schedule" },
      { kind: "Dashboards",       label: "Run the weekly, quarterly, and annual meeting pulse and track Goals + Rocks + To-Do performance" },
    ],
    resources: {
      book: { label: "ROLLOUT — Sustain chapters", note: "Chapter numbers to confirm against the book" },
      hub: [
        "Rollout Reflection Guide",
        "Rollout Troubleshooting Guide",
      ],
      links: [
        { kind: "Assessment", label: "Organizational Checkup®", url: "https://www.organizationalcheckup.com/" },
        { kind: "Guide",      label: "Ninety: Stages of Development guide" },
      ],
    },
    steps: [
      {
        title: "Run the weekly, quarterly, and annual pulse across all teams",
        explain: "The meeting pulse is the heartbeat. Once it's running every week, every quarter, every year — across every team — the rollout is done and the discipline begins.",
        ninety: [
          { kind: "Meetings", label: "Run the weekly, quarterly, annual meeting pulse in Meetings" },
          { kind: "Insights", label: "Track Goals + Rocks + To-Do performance reports" },
        ],
        resources: [],
      },
      {
        title: "Run the Organizational Checkup® with the Leadership Team",
        explain: "Re-score quarterly with the Leadership Team. Aim for 80%+ Strong across the 6 Key Components™. This is where the percentage lives — not on this tracker.",
        ninety: [
          { kind: "Assessment", label: "Take the Organizational Checkup® on a quarterly schedule" },
        ],
        resources: [],
      },
      {
        title: "Introduce EOS + Ninety to new employees",
        explain: "Every new hire gets the same context the original team got. Keep What the Heck is EOS? and your V/TO® on the onboarding shelf.",
        ninety: [
          { kind: "Knowledge Portal", label: "Create new-hire onboarding that reviews EOS + Ninety and assign it in Knowledge Portal" },
        ],
        resources: [],
      },
    ],
    proServe: {
      title: "Annual Health Check",
      blurb: "You run it — we help if you want us to",
      bullets: [
        "Re-score your own Organizational Checkup® and Rollout Tracker",
        "Refresh your Rollout Plan for the year ahead",
        "Optional: facilitated session and coaching for your Champion",
      ],
      stuckSignal: "Completion rates slipping. Quarterly State of the Company keeps getting skipped.",
    },
  },
];
