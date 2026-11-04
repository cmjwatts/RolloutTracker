/* Shared phase data for the Rollout Journey. v4
   Revised against Marisa Smith + Beth Fahey feedback (call of 14 Aug 2026),
   ROLLOUT Ch. 4 ("Getting Ready for Rollout", pp. 52-84), and Marisa's
   Markup.io review of all four phases (Oct 2026).

   Conventions:
   - Ninety actions live on the STEP they belong to (steps[].ninety), not at
     phase level — one place, next to the work they support.
   - "resources" = { hub: [...] } — one button to the ROLLOUT member hub plus
     a list of what to look for there, rather than a dozen links to the same
     destination. The hub also carries the EOS Worldwide pieces, so those are
     listed there too.
   - No "common order" list per phase — one "every Rollout is unique" line
     under the work heading instead (stepsNote, or STEPS_NOTE_DEFAULT). Marisa
     asked us not to sound prescriptive about timing, and not to call the
     cards "steps": they all have to happen, not in a fixed order.
   - "explainList" on a STEP — bullet points under (or instead of) explain.
   - "readThis" on a STEP — one-line pointers at the end of the card: the
     ROLLOUT chapter, plus the EOS library book for that section if there is one.
   - resources = { hub: [...] }: a title string, or { title, thumb } (a cover
     image in assets/). Everything renders as one group behind the single hub
     button. Only Phase 1 uses thumbnails — the other phases use the icon, so
     the difference is visible side by side. The book itself is not listed
     here — the Read-this lines on each card already point at the chapter.
   - explain / explainList text may contain [label](url) — rendered as a link.
   - "suggested" on a STEP — an optional, recommended aspect, shown as a callout.
   - "url" on a NINETY item — the help-center how-to for that action; renders
     as a "How-to" link at the row's far right.
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

  gridLeadMastered:
    "Tool by tool: have we mastered it? Open a tool to work through the book's questions for it.",
  gridLeadShare:
    "You don't have to be ready to share everything — you just have to agree on what you are sharing.",
  colMastered: "Mastered?",
  colShare: "Ready to share?",

  holdNote:
    "If a tool feels particularly shaky or uncertain, it's perfectly fine to wait a quarter or " +
    "two before rolling it out to the rest of your company. Sometimes, readiness means slowing " +
    "down just a bit to go faster later.",
  holdNoteCite: "ROLLOUT, p. 67",

  /* The five key questions, worded as they appear on p. 52. Questions 1 and 2
     each run over the same five tools — mastered? / ready to share? — so each
     opens the tool grid from its own angle (Marisa: keep them as two questions). */
  questions: [
    {
      id: "tools-mastered",
      num: "1",
      kind: "grid",
      mode: "mastered",
      page: "pp. 55–68",
      q: "Has the leadership team mastered the five EOS Foundational Tools (V/TO, The Accountability Chart, Rocks, The Meeting Pulse, Scorecard)?",
    },
    {
      id: "tools-share",
      num: "2",
      kind: "grid",
      mode: "share",
      page: "pp. 55–68",
      q: "Are you ready to share your EOS tools with the organization?",
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
    "Four areas determine whether your Rollout creates lasting change or becomes another " +
    "forgotten initiative.",
  cite: "ROLLOUT, p. 88",
  essentials: [
    {
      n: "1",
      title: "Define your approach and timeline",
      summary: "Create a phased rollout that matches your company's capacity for change.",
      page: "pp. 88–91",
      items: [
        "All departments at once, one at a time, or something in between",
        "Key meetings and milestones that make sense for your company",
        "Training sessions for different groups",
        "Communication points and regular check-ins",
      ],
      footnote: "Build in more time than you think you'll need — most leadership teams underestimate rollout time by 50 percent.",
    },
    {
      n: "2",
      title: "Clarify roles and responsibilities",
      summary: "Assign clear ownership and involve the right people at the right times.",
      page: "pp. 91–92",
      items: [
        "Designate one Rollout Champion to own the process — often the Integrator, but anyone with genuine belief and credibility",
        "Involve mid-managers as champions, not passive participants — they're the bridge to the frontline",
        "Include them in planning; their read on capacity for change is what makes a plan realistic",
      ],
    },
    {
      n: "3",
      title: "Plan your communication",
      summary: "Develop messages that build excitement and address potential resistance to change.",
      page: "pp. 92–94",
      items: [
        "Why are we implementing EOS?",
        "What does this mean for me?",
        "When will this happen?",
        "Who can I ask for help?",
        "What if I don't understand or agree?",
      ],
      footnote: "Expect scepticism from initiatives that faded before. People need to hear the message at least seven times.",
    },
    {
      n: "4",
      title: "Keep it simple and flexible",
      summary: "Don't over-engineer it with complex tracking systems and rigid processes.",
      page: "pp. 94–95",
      items: [
        "Who needs to be involved at each phase",
        "What tools will be introduced when",
        "When key meetings and milestones will occur",
        "How you'll measure progress",
        "Why each phase matters",
      ],
    },
  ],
  closing: {
    text: "The best plan is the one your team will actually execute consistently, not the one that looks perfect on paper (or wins awards for complexity).",
    cite: "ROLLOUT, p. 95",
  },
};

/* ------------------------------------------------------------------
   Introduction — shown above Phase 1. Text is the intro from the top of the
   printed Rollout Tracker (Marisa). Two videos are planned; no URLs yet.
------------------------------------------------------------------ */
window.INTRO = {
  lead:
    "Rollout equips your entire team with the tools they need to help you achieve your vision. " +
    "Fully implementing EOS requires leadership team mastery, a clear plan, and commitment to " +
    "make it stick. Every organization is different, so develop a Rollout plan that's right for you.",
  howToTitle: "How to use this tracker",
  howTo: [
    { t: "Establish Your Baseline", d: "Complete this assessment before beginning your Rollout to see where you are today" },
    { t: "Update Regularly",        d: "Return to it periodically to measure progress" },
    { t: "Identify Next Steps",     d: "Use your “NO” answers to identify what needs attention next" },
  ],
  videos: [
    { title: "What the Heck is EOS Rollout?", presenter: "Marisa Smith", cue: "The idea behind Rollout, in five minutes" },
    { title: "Why Rollout is Hard",           presenter: "Beth Fahey",   cue: "What gets in the way — and what to do about it" },
  ],
};

/* Default line under "The work in this phase". Phases can override (stepsNote).
   These are not steps in a fixed order — they all have to happen eventually. */
window.STEPS_NOTE_DEFAULT =
  "Every Rollout is unique — you know your team best, so adapt these suggestions as needed.";

/* "Read this" (readThis on a STEP): [{ text, book }] — short lines at the
   foot of a card. book: "rollout" links to the book site; "other" (the EOS
   library titles Marisa named for Integration) is plain text. */

window.PHASES = [
  {
    id: "prepare",
    num: "01",
    name: "Preparation",
    headline: "The Leadership Team is Ready for Rollout",
    tagline: "The Leadership Team is ready for Rollout.",
    why: "A successful Rollout starts long before anyone beyond the leadership team hears the word “EOS.” This phase is about getting the leadership team aligned, clear on the Vision, and ready to model the behaviors they’ll be asking of everyone else. Skip it or rush it, and you’ll be asking your people to sing a song the leaders haven’t learned yet.",
    quote: {
      text: "Readiness doesn't require perfection; it requires commitment, consistency, and the courage to begin.",
      who: "ROLLOUT, p. 83",
    },
    pictureOfDone: [
      "Leadership team is aligned and ready to communicate the 5 EOS Foundational Tools™ (V/TO®, The Accountability Chart®, Rocks, The Meeting Pulse®, and Scorecard)",
      "Rollout Plan created (Timeline, Roles & Responsibilities, Communication, etc.)",
    ],
    stepsNote: "Every Rollout is unique — you know your team best, so create a plan that works for you.",
    video: {
      title: "What is the Rollout Roadmap?",
      presenter: "Marisa Smith",
      duration: "~5 min",
      cue: "The four phases · why Preparation is non-negotiable",
    },
    resources: {
      hub: [
        { title: "Rollout Reflection Guide", thumb: "assets/hub-reflection-guide.webp" },
        { title: "Tips for Managing Change",  thumb: "assets/hub-tips-managing-change.webp" },
      ],
      links: [],
    },
    steps: [
      {
        title: "Assess your readiness",
        readinessTool: true,
        explain: "Five questions decide whether you begin now or shore up the foundation first — and they're the book's, not ours. Work through them as a leadership team; the conversations are the useful part.",
        ninety: [
          { kind: "V/TO",      label: "Open the V/TO® and Accountability Chart and review them together — they need to be current before you decide what to share" },
          { kind: "Scorecard", label: "Review your Leadership Team Scorecard — confirm every leader owns their numbers and you'd trust the data in front of the company" },
        ],
        readThis: [
          { text: "Learn more about Getting Ready for Rollout in Chapter 4 of ROLLOUT.", book: "rollout" },
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
        readThis: [
          { text: "Learn more about Planning Your Rollout in Chapter 5 of ROLLOUT.", book: "rollout" },
        ],
        resources: [],
      },
    ],
    proServe: {
      title: "Rollout Diagnostic + Leadership Alignment",
      blurb: "Scoped to you — see below",
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
    headline: "The Leadership Team has introduced the vision and EOS to everyone",
    tagline: "Every employee has heard the why, seen the V/TO®, and knows the plan.",
    why: "The Launch is your company’s first real look at EOS, and first impressions shape how people feel about everything that follows. When you share the context of why you’re running on EOS and what it means for each person, you turn uncertainty into curiosity and give people a reason to lean in rather than wait it out.",
    quote: {
      text: "Content without context will create confusion, and confusion kills momentum.",
      who: "ROLLOUT, p. 109",
    },
    pictureOfDone: [
      "EOS Foundational Tools (context + content) introduced to everyone",
      "Copies of What the Heck is EOS? handed out",
      "Next Quarterly State of the Company planned/scheduled",
    ],
    video: {
      title: "Five Best Practices for a Great Launch",
      presenter: "Beth Fahey",
      duration: "~5 min",
      cue: "The launch-day checklist",
    },
    resources: {
      hub: [
        "Tips for Launching Your Rollout",
        "Tips for Sharing the Context of EOS®",
        "Glossary of EOS Acronyms",
        "EOS Basics for Employees (Handout + Postcard)",
        "20+ EOS Terms Your Employees Need to Know",
      ],
      links: [],
    },
    steps: [
      {
        title: "Introduce your vision and EOS to the entire organization",
        explain: "Don't wing it — walk the Leadership Team through who's saying what first. Then run the all-company moment: V/TO® and Accountability Chart walkthrough, why EOS, what's coming next. Mid-managers get briefed before the all-company moment, not after. Make it visible: swag, displays, Ninety shared along with resources like the Rollout Plan and What the Heck is EOS?",
        ninety: [
          { kind: "V/TO",      label: "Add your team to Ninety as Observers so they can view the V/TO® and Accountability Chart", url: "https://help.eos.ninety.io/en/articles/13719367-ninety-s-observer-role-explained" },
          { kind: "Knowledge Portal", label: "Share launch content and the Rollout Plan in Knowledge Portal", url: "https://help.eos.ninety.io/en/articles/13653880-creating-and-editing-content-in-the-knowledge-portal" },
        ],
        resources: [],
      },
      {
        title: "Hand out a copy of What the Heck is EOS? to everyone",
        explain: "[What the Heck is EOS?](https://www.eosworldwide.com/what-the-heck-is-eos) was written specifically for employees, so it gives everyone a simple, shared understanding of the basics in plain language before you dive into your own tools. When people understand the “why” behind EOS ahead of time, they’re more receptive to learning it, and your launch conversations can go deeper, faster.",
        ninety: [],
        resources: [],
      },
      {
        title: "Schedule your next State of the Company",
        explain: "Put your first quarterly State of the Company on the calendar so your team knows the vision isn’t a one-time announcement. These short meetings, typically under 45 minutes, cover where you’ve been, where you are, and where you’re going. They give you a built-in cadence for repeating the vision, celebrating progress, and keeping everyone aligned every 90 days.",
        ninety: [],
        readThis: [
          { text: "Learn more about launching your Vision and EOS to the company in Chapter 6 of ROLLOUT.", book: "rollout" },
        ],
        resources: [],
      },
    ],
    proServe: {
      title: "Launch Day Prep",
      blurb: "Scoped to you — see below",
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
    name: "Integration",
    headline: "EOS Tools & Disciplines are Fully Integrated Company-wide",
    tagline: "Every department runs a Meeting Pulse®, uses Core Values, and is accountable to numbers.",
    why: "Launch creates awareness, and Integration creates mastery. This is where the EOS Tools take root in every department, and your vision starts guiding everyday decisions.",
    quote: {
      text: "You’re not just implementing tools. You’re transforming the way your organization operates. Keep going.",
      who: "ROLLOUT, p. 206",
    },
    pictureOfDone: [
      "Every department has its own Meeting Pulse (Level 10 Meeting / Quarterly / Annual)",
      "Leaders and Managers use Core Values to hire, fire, review, reward, and recognize",
      "Leaders and Managers have read How to Be a Great Boss, have mastered LMA™, and are having Quarterly Conversations",
      "Core Processes are Documented and FBA",
      "Everyone has at least one number they're accountable for keeping on track",
    ],
    video: {
      title: "Rolling Out to Departments",
      presenter: "Marisa Smith",
      duration: "~5 min",
      cue: "Departmental Meeting Pulse® and accountability",
    },
    resources: {
      hub: [
        "Tips for Sharing the Context of EOS®",
        "Tips for Bringing Your Vision to Life",
        "Tips for Checking for Understanding",
        "Tips for Managing Change",
        "Rollout Troubleshooting Guide",
        "How to Lead World-Class Meetings (ebook)",
        "How to Be a Great Boss Toolkit",
      ],
    },
    steps: [
      {
        title: "Every department has a Meeting Pulse",
        explainList: [
          "Meet regularly using the Level 10 Meeting Agenda",
          "Meet quarterly to review the Company V/TO and Departmental Plan, set Departmental and Individual Rocks, and solve issues",
          "Meet annually to review the Company V/TO, update the Departmental Plan (Goals and Rocks), and solve issues",
        ],
        ninety: [
          { kind: "Meetings", label: "Stand up each department's Level 10 in Meetings", url: "https://help.eos.ninety.io/en/articles/13639370-level-10-meetings-powered-by-ninety" },
          { kind: "Rocks",    label: "Set Departmental Rocks each quarter; share Rocks across teams", url: "https://help.eos.ninety.io/en/articles/13639806-creating-and-setting-up-rocks" },
          { kind: "V/TO",     label: "Build a Departmental V/TO for each team", url: "https://help.eos.ninety.io/en/articles/13639337-documenting-your-company-or-team-vision" },
        ],
        readThis: [
          { text: "Learn more about Rolling Out to Departments in Chapter 7 of ROLLOUT.", book: "rollout" },
          { text: "Issues, by Sue Hawkes & Jill Young", book: "other" },
        ],
      },
      {
        title: "Leaders and Managers Have Created an Environment of Accountability",
        explain: "Leaders and Managers:",
        explainList: [
          "Use Core Values to hire, fire, review, reward, and recognize",
          "Have read How to Be a Great Boss and understand LMA™",
          "Are answering YES to the Leadership & Management Self-Assessments",
          "Are holding Quarterly Conversations with direct reports",
        ],
        ninety: [
          { kind: "1-on-1s", label: "Each manager becomes familiar with the People Analyzer® to hire, fire, and promote based on it", url: "https://help.eos.ninety.io/en/articles/13653795-the-people-analyzer" },
          { kind: "1-on-1s", label: "Each manager sets up their Quarterly Conversations and is ready to run those consistently", url: "https://help.eos.ninety.io/en/articles/13653770-quarterly-and-annual-reviews" },
        ],
        readThis: [
          { text: "Learn more about Creating an Environment of Accountability in Chapter 9 of ROLLOUT.", book: "rollout" },
        ],
      },
      {
        title: "Core Processes are Documented, Simplified and Followed by All (FBA)",
        explain: "Capture the way the work actually gets done.",
        ninety: [
          { kind: "Knowledge Portal", label: "Document Core Processes in Knowledge Portal", url: "https://help.eos.ninety.io/en/articles/13653878-documenting-your-processes-with-the-knowledge-portal" },
        ],
        readThis: [
          { text: "Process!, by Mike Paton & Lisa Gonzalez", book: "other" },
        ],
      },
      {
        title: "Everyone has a Number",
        explain: "When everyone in the company owns at least one number, they know exactly what’s expected in their role and can see how their performance contributes to the company’s success.",
        ninety: [
          { kind: "Scorecard", label: "Build a Departmental Scorecard per leader; share measurables across teams", url: "https://help.eos.ninety.io/en/articles/13642363-creating-and-updating-measurables" },
        ],
        readThis: [
          { text: "Data, by Mark Stanley & Angela Kalemis", book: "other" },
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
    },
  },
  {
    id: "sustain",
    num: "04",
    name: "Sustainability",
    headline: "The Leadership Team is Committed to Running on EOS…Forever.",
    tagline: "The org is 80%+ strong and stays there.",
    why: "The companies that get the most out of EOS treat it as a lifelong commitment, not a one-time project. Sustainability is about staying disciplined so you don’t drift back into old habits: keeping the tools sharp, checking for understanding, and bringing new team members up to speed. That way, running on EOS becomes your permanent operating system rather than a phase you went through.",
    quote: {
      text: "EOS is a process. And like any process, it only works when it’s followed by all.",
      who: "ROLLOUT, p. 215",
    },
    pictureOfDone: [
      "Deliver a State of the Company every quarter",
      "Achieve and maintain 80%+ on the Organizational Checkup®",
      "Complete 80%+ of Goals every year",
      "Complete 80%+ of Rocks every quarter",
      "Complete 90%+ of To-Dos weekly",
    ],
    video: {
      title: "Running on EOS… Forever",
      presenter: "Beth Fahey",
      duration: "~5 min",
      cue: "The sustain cadence",
    },
    resources: {
      hub: [
        "Rollout Troubleshooting Guide",
      ],
    },
    steps: [
      {
        title: "Deliver a State of the Company, every quarter…forever",
        explain: "A quarterly State of the Company keeps your vision front and center, so it doesn’t fade into the background once the excitement of launch wears off. Every 90 days, it gives you a chance to celebrate progress, report honestly on where you stand, and reconnect everyone to where you’re going, which keeps the whole company aligned for the long haul.",
        ninety: [
          { kind: "State of the Co.", label: "Run the Quarterly State of the Company with your data", url: "https://youtu.be/4OIwDANO3wc", cta: "Watch" },
          { kind: "Meetings",         label: "Run the weekly, quarterly, annual meeting pulse in Meetings", url: "https://help.eos.ninety.io/en/articles/13639439-introduction-to-meetings" },
        ],
        resources: [],
      },
      {
        title: "Achieve and maintain 80%+ on the Organizational Checkup®",
        explain: "Reaching 80%+ strong is where you’ll feel the “organizational flow” that makes running your business easier, and maintaining it is how you know EOS hasn’t started to drift. Taking the Checkup both as a leadership team and as an entire organization shows you whether the rest of the company sees things the same way you do. Any gaps between the scores reveal exactly where your Rollout needs more attention.",
        ninety: [
          { kind: "Assessment", label: "Take the Organizational Checkup® on an annual schedule", url: "https://help.eos.ninety.io/en/articles/14062622-measuring-your-six-key-components-with-the-org-assessment" },
        ],
        resources: [],
      },
      {
        title: "Sustain your results",
        explain: "When you hit these numbers consistently, you build momentum that compounds, and every week, quarter, and year moves you closer to your vision:",
        explainList: [
          "Complete 80%+ of Goals every year",
          "Complete 80%+ of Rocks every quarter",
          "Complete 90%+ of To-Dos weekly",
        ],
        ninety: [
          { kind: "Insights", label: "Track Goals + Rocks + To-Do performance reports", url: "https://help.eos.ninety.io/en/articles/13719148-introduction-to-insights" },
        ],
        readThis: [
          { text: "Learn more about Running on EOS Forever in Chapter 10 of ROLLOUT.", book: "rollout" },
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
