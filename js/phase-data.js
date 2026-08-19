/* Shared phase data for the Rollout Journey. v3
   Revised against Marisa Smith + Beth Fahey feedback (call of 14 Aug 2026) and
   ROLLOUT Ch. 4 ("Getting Ready for Rollout", pp. 52-84).

   Conventions:
   - Ninety actions live on the STEP they belong to (steps[].ninety), not at
     phase level — one place, next to the work they support.
   - "resources" = { hub: [...], book: {...}, links: [...] } — one button to the
     ROLLOUT member hub plus a list of what to look for there, rather than a
     dozen links to the same destination.
   - "sequence" = a SUGGESTED order, deliberately not a schedule and deliberately
     unlabelled. Marisa asked us not to sound prescriptive about timing.
   - "readinessTool" flag on a STEP — renders the readiness assessment inside it.
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
  lead:
    "Here are the questions that will help you decide if you're ready to begin Rollout or need " +
    "to shore up your foundation first:",
  leadCite: "ROLLOUT, p. 52",

  // Yes / No only. "Getting there" is a no — it just sounds kinder.
  scale: [
    { id: "no",  label: "No" },
    { id: "yes", label: "Yes" },
  ],

  gridLead:
    "Two questions per tool: have we mastered it, and are we ready to share it? You don't have " +
    "to be ready to share everything — you just have to agree on what you are sharing.",
  colMastered: "Mastered?",
  colShare: "Ready to share?",

  holdNote:
    "If a tool feels particularly shaky or uncertain, it's perfectly fine to wait a quarter or " +
    "two before rolling it out to the rest of your company. Sometimes, readiness means slowing " +
    "down just a bit to go faster later.",
  holdNoteCite: "ROLLOUT, p. 67",

  /* The five key questions, worded as they appear on p. 52. Questions 1 and 2
     run over the same five tools from two angles, so they share one row and
     open a single grid. */
  questions: [
    {
      id: "tools",
      num: "1 · 2",
      kind: "grid",
      page: "pp. 55–68",
      q: "Has the leadership team mastered the five EOS Foundational Tools (V/TO, The Accountability Chart, Rocks, The Meeting Pulse, Scorecard)?",
      q2: "Are you ready to share your EOS tools with the organization?",
    },
    {
      id: "united-front",
      num: "3",
      kind: "checks",
      page: "p. 71",
      q: "Are you ready to present a united front as a leadership team?",
      items: [
        "Is every leader using consistent language?",
        "Are we committed to supporting each other publicly, even when we disagree privately?",
        "Have we worked through any significant conflicts or trust issues between team members?",
        "Do we agree on how to handle questions we can't answer immediately?",
      ],
    },
    {
      id: "open-honest",
      num: "4",
      kind: "checks",
      page: "p. 75",
      q: "Are you ready to be open and honest with your team?",
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
      num: "5",
      kind: "checks",
      page: "p. 77",
      q: "Are you ready to shift from student to teacher?",
      items: [
        "Are we genuinely excited about teaching EOS, not just implementing it?",
        "Can we explain the “why” behind each tool in compelling terms?",
        "Are we prepared to answer questions we might not have considered?",
        "Do we have the patience to explain concepts multiple times in multiple ways?",
        "Are we committed to modeling what we teach, even when it's difficult?",
      ],
    },
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
    },
  ],
};

/* ------------------------------------------------------------------
   Planning essentials — ROLLOUT Ch. 5 ("Planning Your Rollout", pp. 86-95).

   Reference, not a form. Marisa and Beth didn't want a plan-builder workspace,
   and the book's fourth planning essential is literally "try not to
   overcomplicate things with elaborate spreadsheets or Gantt charts." So this
   shows what to consider and leaves the planning to the team.
------------------------------------------------------------------ */
window.PLANNING = {
  title: "The four planning essentials",
  lead:
    "Successful Rollout planning requires attention to four key areas that will determine whether " +
    "your Rollout creates lasting change or becomes another forgotten initiative.",
  cite: "ROLLOUT, p. 88",
  essentials: [
    {
      n: "1",
      title: "Define your approach and timeline",
      summary: "Create a phased rollout that matches your company's capacity for change.",
      page: "pp. 88–91",
      blocks: [
        { kind: "tip", text: "Decide whether it makes sense to Rollout to all departments simultaneously, one department at a time, or use a different approach." },
        { kind: "list", label: "Build a timeline that considers", items: [
          "Key meetings and milestones that make sense for your company",
          "Training sessions for different groups",
          "Communication points to keep everyone informed",
          "Regular check-ins to assess progress and make adjustments",
        ]},
        { kind: "split", label: "Timeline reality check", note: "Most leadership teams underestimate rollout time by 50 percent.",
          leftLabel: "What accelerates it", left: [
            "The leadership team models EOS consistently",
            "Mid-managers readily embrace change",
            "Existing meeting discipline and a strong culture",
            "Clear consequences for non-participation",
            "A history of successful change initiatives",
          ],
          rightLabel: "What slows it down", right: [
            "A history of failed change initiatives",
            "Remote or multi-location teams",
            "High turnover during the rollout period",
            "Change-resistant cultures",
            "Competing priorities or major business disruptions",
          ]},
        { kind: "tip", text: "Build in more time than you think you'll need for each phase. Rollout can take longer than expected, and rushing can create chaos and resistance." },
      ],
    },
    {
      n: "2",
      title: "Clarify roles and responsibilities",
      summary: "Assign clear ownership and involve the right people at the right times.",
      page: "pp. 91–92",
      blocks: [
        { kind: "note", label: "Designate a Rollout Champion", text: "One person should own the rollout process and keep it moving. The Integrator often fills this role, but it could be anyone passionate about EOS, comfortable with facilitation, or detail-oriented — your Operations Leader, for instance. The qualities that matter are a genuine belief in what you're building and the credibility to drive change. Sometimes the best champions aren't the obvious choices." },
        { kind: "note", label: "Involve your mid-managers", text: "Mid-managers are the bridge between leadership vision and frontline execution. They'll either carry the message down effectively or become bottlenecks that slow progress — so include them in planning as champions, not passive participants." },
        { kind: "tip", text: "Include mid-managers in your Rollout planning discussions. Their insights about team dynamics, communication preferences, and capacity for change will make your plan more realistic and effective." },
      ],
    },
    {
      n: "3",
      title: "Plan your communication",
      summary: "Develop messages that build excitement and address potential resistance to change.",
      page: "pp. 92–94",
      blocks: [
        { kind: "list", label: "Align on core messages that answer", items: [
          "Why are we implementing EOS? What problem are we solving, and how will this help?",
          "What does this mean for me? How will my daily work change, and what's expected of me?",
          "When will this happen? What's the timeline in the coming weeks and months?",
          "Who can I ask for help? Where do I go with questions or concerns?",
          "What if I don't understand or agree? How can I voice my concerns and get clarity?",
        ]},
        { kind: "note", text: "Plan both formal communication (meetings, written updates) and informal reinforcement (daily conversations, visual reminders). Consistent talking points prevent mixed messages and make sure everyone hears the same explanation of why EOS matters." },
        { kind: "list", label: "Expect to hear", items: [
          "“Is this just another flavor of the month?”",
          "“Why should we believe this will be different?”",
          "“Don't we already have enough on our plates?”",
          "“What happens if we don't get on board?”",
        ]},
        { kind: "note", text: "Many team members carry “initiative PTSD” from programs that promised transformation and faded away. Acknowledge past disappointments and your role in them. Resistance usually signals legitimate concerns about pace, support, or communication gaps — not opposition to improvement." },
        { kind: "tip", text: "People need to hear your messages at least seven times before they really sink in. Build that repetition into the plan from the beginning, not as an afterthought when you realise people “didn't get it” the first time." },
      ],
    },
    {
      n: "4",
      title: "Keep it simple and flexible",
      summary: "Don't over-engineer it with complex tracking systems and rigid processes. Adapt as you learn.",
      page: "pp. 94–95",
      blocks: [
        { kind: "list", label: "The best Rollout Plans focus on", items: [
          "Who needs to be involved at each phase",
          "What tools will be introduced when",
          "When key meetings and milestones will occur",
          "How you'll measure progress",
          "Why each phase matters",
        ]},
        { kind: "note", text: "Trust your leaders to develop their own approaches for making EOS stick in their areas — the people closest to the work have the best insights into what will resonate. Build in regular chances to gather feedback, share what's working across departments, and celebrate milestones. Stay open to refining your approach rather than rigidly sticking to the original plan." },
      ],
    },
  ],
  closing: {
    text: "The best plan is the one your team will actually execute consistently, not the one that looks perfect on paper (or wins awards for complexity).",
    cite: "ROLLOUT, p. 95",
  },
};

window.PHASES = [
  {
    id: "prepare",
    num: "01",
    name: "Prepare",
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
      { task: "Assess your readiness together: have you mastered the five Foundational Tools, and which are you ready to share?" },
      { task: "Create your Rollout Plan — timeline, roles, communication." },
    ],
    video: {
      title: "What is the Rollout Roadmap?",
      presenter: "Marisa Smith",
      duration: "~5 min",
      cue: "The four phases · why Prepare is non-negotiable",
    },
    resources: {
      book: { label: "ROLLOUT — Ch. 1–5", note: "Ch. 4 is readiness; Ch. 5 is building the plan" },
      hub: [
        "Rollout Reflection Guide",
        "Rollout Troubleshooting Guide",
        "Rollout Tracker (printable)",
      ],
      links: [],
    },
    steps: [
      {
        title: "Assess your readiness",
        readinessTool: true,
        explain: "Five questions decide whether you begin now or shore up the foundation first — and they're the book's, not ours. Work them as a Leadership Team; the disagreements are the useful part.",
        ninety: [
          { kind: "V/TO",      label: "Open the V/TO® and Accountability Chart and review them together — they need to be current before you decide what to share" },
          { kind: "Scorecard", label: "Review your Leadership Team Scorecard — confirm every leader owns their numbers and you'd trust the data in front of the company" },
        ],
        resources: [],
      },
      {
        title: "Create your Rollout Plan",
        planningTool: true,
        explain: "Every Rollout Plan is unique — this isn't a template to follow, it's an approach built for your circumstances, your culture, and your capacity for change. Four areas decide whether it creates lasting change or becomes another forgotten initiative.",
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
      { task: "Practice the all-company announcement with the Leadership Team — don't wing it." },
      { task: "Brief your mid-managers — before the all-company launch, not after." },
      { task: "Hold the all-company launch — V/TO® and Accountability Chart walkthrough, why EOS, what's coming." },
      { task: "Make it visible: swag, displays, Ninety shared along with resources like the Rollout Plan, and What the Heck is EOS?" },
      { task: "Schedule the following quarter's State of the Company meetings." },
    ],
    video: {
      title: "Five Best Practices for a Great Launch",
      presenter: "Beth Fahey",
      duration: "~5 min",
      cue: "The launch-day checklist",
    },
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
          { kind: "Headlines",        label: "Post Headlines for the launch moment" },
          { kind: "Knowledge Portal", label: "Share launch content and the Rollout Plan in Knowledge Portal" },
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
      { task: "Department by department: set up Scorecard, Rocks, and Level 10 Meeting Agenda with each leader." },
      { task: "Facilitate the first L10 of each department — make sure it sticks." },
      { task: "Build Departmental V/TOs and the quarterly planning cadence." },
      { task: "Document Core Processes; run People Analyzer® across the org." },
    ],
    video: {
      title: "Rolling Out to Departments",
      presenter: "Marisa Smith",
      duration: "~5 min",
      cue: "Departmental Meeting Pulse® and accountability",
    },
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
      { task: "Run Weekly, Quarterly, and Annual pulse across all teams in the company." },
      { task: "Run the Organizational Checkup® with the Leadership Team to measure 80%+ strong across the 6 Key Components™." },
      { task: "Introduce EOS + Ninety as new employees join the company." },
    ],
    video: {
      title: "Running on EOS… Forever",
      presenter: "Beth Fahey",
      duration: "~5 min",
      cue: "The sustain cadence",
    },
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
          { kind: "Meetings",         label: "Run the weekly, quarterly, annual meeting pulse in Meetings" },
          { kind: "State of the Co.", label: "Run the Quarterly State of the Company with the State brief" },
          { kind: "Insights",         label: "Track Goals + Rocks + To-Do performance reports" },
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
