/* Rollout Plan Builder — captures launch date, Champion, comms plan, waves, milestones.
   Renders a Gantt timeline and a Ninety-style Rock preview the Champion can copy into Ninety. */

const PLAN_DEFAULT = () => ({
  launchDate: "",
  champion: "",
  commsPlan: "",
  rockDescription:
    "Specific — Roll EOS out company-wide: every team in scope sets up a Level 10 Meeting, a Scorecard, Quarterly Rocks, and a Departmental V/TO. " +
    "Measurable — 100% of teams in the rollout waves are running their weekly L10 with a published Scorecard and at least one Rock for the quarter. " +
    "Attainable — Leadership Team is aligned, the Rollout Plan is written, and Ninety Professional Services is on call for the Integrate stage if we get stuck. " +
    "Relevant — Required for the Organizational Checkup® to reach 80%+ Strong across the 6 Key Components™ and stay there. " +
    "Time-bound — Done by the end of the final rollout wave. See the milestones below for wave-by-wave completion dates. " +
    "Communication — {commsPlan}",
  waves: [
    { name: "Wave 1 — Department leader teams",      teams: "", weeksFromLaunch: 1, duration: 4, inRock: true },
    { name: "Wave 2 — Mid-managers & their teams",   teams: "", weeksFromLaunch: 5, duration: 4, inRock: true },
    { name: "Wave 3 — Everyone else",                teams: "", weeksFromLaunch: 9, duration: 4, inRock: true },
  ],
  extraMilestones: [
    { name: "Started running Quarterly Conversations", weeksFromLaunch: 12, inRock: true },
    { name: "Started Core Process documentation",      weeksFromLaunch: 8,  inRock: true },
  ],
});

function addWeeks(dateStr, weeks) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00");
  if (Number.isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + weeks * 7);
  return d;
}
function fmtDate(d) {
  if (!d) return "—";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function GanttTimeline({ plan }) {
  const prepareWeeks = 8;
  const lastWeek = Math.max(...plan.waves.map((w) => w.weeksFromLaunch + w.duration), 4);
  const rangeStart = -prepareWeeks;
  const rangeEnd = lastWeek + 1;
  const rangeLen = rangeEnd - rangeStart;
  const pct = (w) => ((w - rangeStart) / rangeLen) * 100;

  const ticks = [];
  for (let w = Math.ceil(rangeStart / 4) * 4; w <= rangeEnd; w += 4) ticks.push(w);

  const rows = [
    { key: "prepare", label: "Prepare", start: -prepareWeeks, dur: prepareWeeks, color: "soft",    hint: "SLT readiness" },
    { key: "launch",  label: "Launch",  start: 0,             dur: 1,             color: "accent",  hint: "All-company moment" },
    ...plan.waves.map((w, i) => ({
      key: "wave" + i,
      label: "Wave " + (i + 1),
      start: w.weeksFromLaunch,
      dur: w.duration,
      color: "primary",
      hint: w.name.replace(/^Wave \d+ — /, "")
    })),
  ];

  return (
    <div className="gantt">
      <div className="gantt__header">
        <span className="gantt__col-label hand">Phase</span>
        <div className="gantt__scale">
          {ticks.map((w) => (
            <span key={w} className="gantt__tick" style={{ left: pct(w) + "%" }}>
              <span className="gantt__tick-label">
                {w === 0 ? "Launch" : (w > 0 ? "+" : "") + w + "w"}
              </span>
            </span>
          ))}
          <span className="gantt__launch-line" style={{ left: pct(0) + "%" }} />
        </div>
      </div>

      <div className="gantt__rows">
        {rows.map((r) => {
          const left = pct(r.start);
          const width = (r.dur / rangeLen) * 100;
          const launchDate = addWeeks(plan.launchDate, r.start);
          return (
            <div className="gantt__row" key={r.key}>
              <div className="gantt__label">
                <span className="gantt__label-main">{r.label}</span>
                <span className="gantt__label-hint hand">{r.hint}</span>
              </div>
              <div className="gantt__track">
                <span className="gantt__launch-line" style={{ left: pct(0) + "%" }} />
                <span
                  className={"gantt__bar gantt__bar--" + r.color}
                  style={{ left: left + "%", width: width + "%" }}
                  title={fmtDate(launchDate)}
                >
                  {r.key !== "launch" && plan.launchDate && (
                    <span className="gantt__bar-date">{fmtDate(launchDate)}</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function resolveDescription(text, plan) {
  if (!text) return "";
  const comms = (plan.commsPlan || "").trim() || "(none set — fill in the Communication plan above)";
  return text.replace(/\{commsPlan\}/g, comms);
}

function commsMilestones(plan) {
  const text = (plan.commsPlan || "").toLowerCase();
  const out = [];
  if (/weekly/.test(text))    out.push({ name: "First weekly comms checkpoint sent",   week: 1,  source: "comms" });
  if (/monthly/.test(text))   out.push({ name: "First monthly digest sent",            week: 4,  source: "comms" });
  if (/quarterly/.test(text)) out.push({ name: "First Quarterly State of the Company", week: 13, source: "comms" });
  return out;
}

function RockPreview({ plan, onDescriptionChange }) {
  const launchDate = plan.launchDate ? new Date(plan.launchDate + "T00:00") : null;
  const wavesInRock = plan.waves.filter((w) => w.inRock !== false);
  const milestonesInRock = (plan.extraMilestones || []).filter((m) => m.inRock !== false);
  const commsMs = commsMilestones(plan);

  const allMilestones = [
    { label: "All-company launch held", week: 0 },
    ...wavesInRock.map((w) => ({
      label: w.name.replace(/^Wave \d+ — /, "Wave " + (plan.waves.indexOf(w) + 1) + ": ") + " running L10s",
      week: w.weeksFromLaunch + w.duration,
    })),
    ...milestonesInRock.map((m) => ({ label: m.name, week: m.weeksFromLaunch })),
    ...commsMs.map((m) => ({ label: m.name, week: m.week, source: "comms" })),
  ].sort((a, b) => a.week - b.week);

  const lastWeek = allMilestones.length ? Math.max(...allMilestones.map((m) => m.week), 4) : 4;
  const dueDate = addWeeks(plan.launchDate, lastWeek);
  const resolvedDescription = resolveDescription(plan.rockDescription, plan);
  const hasToken = (plan.rockDescription || "").includes("{commsPlan}");

  const [copied, setCopied] = React.useState(false);
  const copyDescription = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(resolvedDescription).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="rock-preview">
      <div className="rock-preview__head">
        <span className="rock-preview__brand">
          <img
            className="rock-preview__brand-logo"
            src={(window.__resources && window.__resources.ninetyLogo) || "assets/90-logo-black.png"}
            alt="Ninety"
          />
          <span>
            <span className="rock-preview__kicker">From your Rollout Plan · ready to copy into Ninety</span>
            <span className="rock-preview__title">Run a complete EOS Rollout</span>
          </span>
        </span>
        <button
          className={"rock-preview__copy" + (copied ? " is-copied" : "")}
          onClick={copyDescription}
          aria-label="Copy description"
          title={copied ? "Copied" : "Copy description"}
          type="button"
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5 L7 12 L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="3" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 11 V5 a1.5 1.5 0 0 1 1.5 -1.5 H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      <div className="rock-preview__meta">
        <div>
          <span className="rock-preview__meta-label hand">Owner</span>
          <span className="rock-preview__meta-val">{plan.champion || "— assign your Champion above —"}</span>
        </div>
        <div>
          <span className="rock-preview__meta-label hand">Launch</span>
          <span className="rock-preview__meta-val">{plan.launchDate ? fmtDate(launchDate) : "— set a launch date —"}</span>
        </div>
        <div>
          <span className="rock-preview__meta-label hand">Due</span>
          <span className="rock-preview__meta-val">{dueDate ? fmtDate(dueDate) : "—"}</span>
        </div>
      </div>

      <div className="rock-preview__smart">
        <header className="rock-preview__smart-head">
          <span className="rock-preview__smart-tag">SMART description</span>
          <span className="rock-preview__smart-hint hand">
            click to edit · auto-saves
            {hasToken && <span className="rock-preview__token-hint"> · {"{commsPlan}"} pulls from your Communication plan</span>}
          </span>
        </header>
        <textarea
          className="rock-preview__smart-text"
          rows="4"
          value={plan.rockDescription || ""}
          onChange={onDescriptionChange}
        />
        {hasToken && (
          <div className="rock-preview__smart-preview">
            <span className="rock-preview__smart-preview-tag">Final description — copy &amp; paste into Ninety</span>
            <p>{resolvedDescription}</p>
          </div>
        )}
      </div>

      <div className="rock-preview__milestones">
        <span className="rock-preview__ms-head hand">Milestones</span>
        <ul>
          {allMilestones.map((m, i) => {
            const d = addWeeks(plan.launchDate, m.week);
            return (
              <li key={i}>
                <span className="rock-preview__ms-dot" />
                <span>
                  {m.label}
                  {m.source === "comms" && <span className="rock-preview__ms-source"> · from comms plan</span>}
                </span>
                <span className="rock-preview__ms-date">{d ? fmtDate(d) : "—"}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function PlanBuilder({ plan, setPlan }) {
  const setField = (k) => (e) => setPlan((p) => ({ ...p, [k]: e.target.value }));
  const setWave = (i, k) => (e) => {
    const val = e.target.type === "number" ? Number(e.target.value)
              : e.target.type === "checkbox" ? e.target.checked
              : e.target.value;
    setPlan((p) => ({
      ...p,
      waves: p.waves.map((w, j) => (j === i ? { ...w, [k]: val } : w)),
    }));
  };
  const setMilestone = (i, k) => (e) => {
    const val = e.target.type === "number" ? Number(e.target.value)
              : e.target.type === "checkbox" ? e.target.checked
              : e.target.value;
    setPlan((p) => ({
      ...p,
      extraMilestones: p.extraMilestones.map((m, j) => (j === i ? { ...m, [k]: val } : m)),
    }));
  };

  const completion =
    (plan.launchDate ? 1 : 0) +
    (plan.champion.trim() ? 1 : 0) +
    (plan.commsPlan.trim() ? 1 : 0) +
    plan.waves.filter((w) => w.teams.trim()).length;
  const totalChecks = 3 + plan.waves.length;
  // Count, not a percentage — see the note in side-rail.jsx.
  const frac = totalChecks > 0 ? (completion / totalChecks) * 100 : 0;

  return (
    <section className="lpb">
      <header className="lpb__head">
        <div>
          <span className="eyebrow hand" style={{ color: "var(--color-brand-blue)" }}>Phase 1 workspace</span>
          <h3 className="lpb__title">Build your Rollout Plan</h3>
          <p className="lpb__lead">
            Pick a launch date, your Champion, and how you'll roll EOS out in waves. As you fill it in,
            the timeline below builds itself — and your Rollout Plan copies into a Company Rock in Ninety.
            This is a starting point to adapt, not a template to follow.
          </p>
        </div>
        <div className="lpb__meter">
          <div className="lpb__meter-num">{completion}<span>/{totalChecks}</span></div>
          <div className="lpb__meter-label">drafted</div>
          <div className="lpb__meter-bar"><span style={{ width: frac + "%" }} /></div>
        </div>
      </header>

      <div className="lpb__basics">
        <label className="lpb__field">
          <span>When is your all-company launch?</span>
          <input type="date" value={plan.launchDate} onChange={setField("launchDate")} />
        </label>
        <label className="lpb__field">
          <span>Who is your Champion? <em>they run the rollout end-to-end</em></span>
          <input type="text" placeholder="Name" value={plan.champion} onChange={setField("champion")} />
        </label>
        <label className="lpb__field lpb__field--full">
          <span>Communication plan <em>channels, cadence, message hooks — repetition is how it lands</em></span>
          <textarea
            rows="3"
            placeholder='e.g. All-hands at launch · Weekly L10 recap in Slack · Monthly Champion digest · "Here is the vision. Here is how we get there. Here is your role."'
            value={plan.commsPlan}
            onChange={setField("commsPlan")}
          />
        </label>
      </div>

      <div className="lpb__waves">
        <header className="lpb__waves-head">
          <h4 className="lpb__waves-title">Rollout Integrate Waves</h4>
          <p className="lpb__waves-blurb">
            EOS rolls out in waves: department leaders first, then mid-managers, then everyone else.
            This way each layer can gain expertise before they need to teach teams below them.
            Define who's in each wave and how far apart they start.
          </p>
        </header>
        {plan.waves.map((wave, i) => (
          <div className="lpb__wave" key={i}>
            <div className="lpb__wave-num">{i + 1}</div>
            <div className="lpb__wave-fields">
              <div className="lpb__wave-top">
                <input
                  className="lpb__wave-name"
                  type="text"
                  value={wave.name}
                  onChange={setWave(i, "name")}
                />
                <label className="lpb__wave-include" title="Include this wave's milestone in the Company Rock">
                  <input
                    type="checkbox"
                    checked={wave.inRock !== false}
                    onChange={setWave(i, "inRock")}
                  />
                  <span>Include in Rock</span>
                </label>
              </div>
              <textarea
                className="lpb__wave-teams"
                rows="2"
                placeholder={
                  i === 0 ? "e.g. Sales, Marketing, Engineering, Operations, Finance" :
                  i === 1 ? "e.g. All mid-managers and their direct reports" :
                  "e.g. Remaining individual contributors"
                }
                value={wave.teams}
                onChange={setWave(i, "teams")}
              />
              <div className="lpb__wave-row">
                <label>
                  <span className="hand">Starts</span>
                  <span className="lpb__wave-inline">
                    <input type="number" min="0" max="52" value={wave.weeksFromLaunch} onChange={setWave(i, "weeksFromLaunch")} />
                    <span className="lpb__wave-unit">weeks after launch</span>
                  </span>
                </label>
                <label>
                  <span className="hand">Duration</span>
                  <span className="lpb__wave-inline">
                    <input type="number" min="1" max="26" value={wave.duration} onChange={setWave(i, "duration")} />
                    <span className="lpb__wave-unit">weeks</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lpb__milestones-edit">
        <header className="lpb__milestones-head">
          <h4 className="lpb__milestones-title">Additional Rock milestones</h4>
          <p className="lpb__milestones-blurb">
            EOS Rocks benefit from interim milestones. These get added to the milestones list on the Rock —
            toggle off any you don't want included.
          </p>
        </header>
        {plan.extraMilestones.map((m, i) => (
          <div className="lpb__milestone" key={i}>
            <input
              className="lpb__milestone-name"
              type="text"
              value={m.name}
              onChange={setMilestone(i, "name")}
            />
            <span className="lpb__milestone-when">
              <input
                type="number"
                min="0" max="52"
                value={m.weeksFromLaunch}
                onChange={setMilestone(i, "weeksFromLaunch")}
              />
              <span className="lpb__wave-unit">weeks after launch</span>
            </span>
            <label className="lpb__wave-include" title="Include this milestone in the Company Rock">
              <input
                type="checkbox"
                checked={m.inRock !== false}
                onChange={setMilestone(i, "inRock")}
              />
              <span>Include in Rock</span>
            </label>
          </div>
        ))}
      </div>

      <div className="lpb__viz">
        <header className="lpb__viz-head">
          <h4 className="lpb__viz-title">Your rollout timeline</h4>
          <span className="hand lpb__viz-kicker">Updates as you edit above</span>
        </header>
        <GanttTimeline plan={plan} />
      </div>

      <RockPreview plan={plan} onDescriptionChange={setField("rockDescription")} />

      <style>{`
        .lpb {
          background: var(--bg-card);
          border: 1.5px solid var(--color-brand-blue);
          border-radius: var(--radius-md);
          padding: 26px 30px;
          box-shadow: var(--shadow-xs);
        }
        .lpb__head {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 28px;
          align-items: end;
          margin-bottom: 22px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-subtle);
        }
        @media (max-width: 760px) { .lpb__head { grid-template-columns: 1fr; } }
        .lpb__title { margin: 6px 0 8px; font-size: 26px; }
        .lpb__lead { margin: 0; color: var(--fg-2); max-width: 60ch; font-size: 14.5px; }

        .lpb__meter {
          min-width: 200px;
          display: grid;
          grid-template-columns: auto auto;
          grid-template-rows: auto auto;
          column-gap: 10px; row-gap: 4px;
          align-items: baseline;
        }
        .lpb__meter-num {
          font-family: var(--font-sketch);
          font-size: 48px; font-weight: 700;
          color: var(--color-brand-blue);
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .lpb__meter-num span { font-size: 22px; font-weight: 600; }
        .lpb__meter-label { color: var(--fg-2); font-size: 14px; align-self: end; font-family: var(--font-hand); }
        .lpb__meter-bar {
          grid-column: 1 / -1;
          height: 6px;
          border: 1.5px solid var(--color-brand-black);
          background: var(--color-white);
          border-radius: 99px; overflow: hidden;
          margin-top: 6px;
        }
        .lpb__meter-bar > span { display: block; height: 100%; background: var(--color-brand-blue); transition: width 240ms var(--ease-out); }

        .lpb__basics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 18px;
          margin-bottom: 24px;
        }
        @media (max-width: 760px) { .lpb__basics { grid-template-columns: 1fr; } }
        .lpb__field { display: flex; flex-direction: column; gap: 6px; }
        .lpb__field--full { grid-column: 1 / -1; }
        .lpb__field > span {
          font-family: var(--font-hand);
          font-size: 14px;
          font-weight: 700;
          color: var(--fg-1);
        }
        .lpb__field > span em {
          font-style: normal;
          color: var(--fg-3);
          font-size: 12px;
          margin-left: 6px;
          font-weight: 400;
          font-family: var(--font-body);
        }
        .lpb__field input,
        .lpb__field textarea {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--fg-1);
          background: var(--color-white);
          border: 1.5px solid var(--border-strong);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          outline: none;
          transition: all var(--t-fast);
        }
        .lpb__field input:focus,
        .lpb__field textarea:focus {
          border-color: var(--color-brand-blue);
          box-shadow: 0 0 0 3px var(--color-brand-blue-15);
        }
        .lpb__field textarea { resize: vertical; min-height: 72px; }

        .lpb__waves { margin-bottom: 24px; }
        .lpb__waves-head { margin-bottom: 14px; }
        .lpb__waves-title { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
        .lpb__waves-blurb { margin: 0; font-size: 13px; color: var(--fg-2); max-width: 70ch; }

        .lpb__milestones-edit { margin-bottom: 24px; }
        .lpb__milestones-head { margin-bottom: 14px; }
        .lpb__milestones-title { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
        .lpb__milestones-blurb { margin: 0; font-size: 13px; color: var(--fg-2); max-width: 70ch; }
        .lpb__milestone {
          display: grid;
          grid-template-columns: minmax(0, 2fr) auto auto;
          gap: 14px;
          align-items: center;
          background: var(--bg-alt);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          margin-bottom: 8px;
        }
        @media (max-width: 760px) { .lpb__milestone { grid-template-columns: 1fr; } }
        .lpb__milestone-name {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          background: transparent;
          border: 0;
          border-bottom: 1.5px solid transparent;
          padding: 4px 0;
          color: var(--fg-1);
          outline: none;
        }
        .lpb__milestone-name:focus { border-bottom-color: var(--color-brand-blue); }
        .lpb__milestone-when {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; color: var(--fg-2);
        }
        .lpb__milestone-when input {
          width: 60px;
          font-family: var(--font-body);
          font-size: 14px;
          padding: 6px 8px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          background: var(--color-white);
          outline: none;
        }
        .lpb__milestone-when input:focus { border-color: var(--color-brand-blue); }

        .lpb__wave {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 14px;
          background: var(--bg-alt);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          margin-bottom: 10px;
        }
        .lpb__wave-num {
          width: 38px; height: 38px;
          background: var(--color-brand-blue);
          color: var(--color-white);
          border-radius: 50%;
          display: grid; place-items: center;
          font-family: var(--font-sketch);
          font-size: 22px; font-weight: 700;
          line-height: 1;
        }
        .lpb__wave-fields { display: flex; flex-direction: column; gap: 8px; }
        .lpb__wave-top {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .lpb__wave-name {
          flex: 1; min-width: 200px;
          font-family: var(--font-body);
          font-size: 16px; font-weight: 600;
          background: transparent;
          border: 0;
          border-bottom: 1.5px solid transparent;
          padding: 4px 0;
          color: var(--fg-1);
          outline: none;
        }
        .lpb__wave-name:focus { border-bottom-color: var(--color-brand-blue); }
        .lpb__wave-include {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 13px; font-weight: 600;
          color: var(--fg-2);
          cursor: pointer;
          user-select: none;
          padding: 4px 10px;
          border: 1px solid var(--border-subtle);
          border-radius: 99px;
          background: var(--color-white);
          transition: all var(--t-fast);
        }
        .lpb__wave-include:hover {
          border-color: var(--color-brand-blue);
          color: var(--color-brand-blue);
        }
        .lpb__wave-include input[type="checkbox"] {
          appearance: none;
          width: 16px; height: 16px;
          border: 1.5px solid var(--color-brand-black);
          border-radius: 4px;
          background: var(--color-white);
          display: grid; place-items: center;
          cursor: pointer;
          margin: 0;
        }
        .lpb__wave-include input[type="checkbox"]:checked {
          background: var(--color-brand-blue);
          border-color: var(--color-brand-blue);
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'><path d='M2.5 7.5L5.5 10.5L11.5 3.5' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/></svg>");
          background-repeat: no-repeat;
          background-position: center;
        }
        .lpb__wave-include:has(input:checked) {
          color: var(--color-brand-blue);
          border-color: var(--color-brand-blue);
        }
        .lpb__wave-teams {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--fg-1);
          background: var(--color-white);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
          outline: none;
          resize: vertical;
          min-height: 50px;
        }
        .lpb__wave-teams:focus { border-color: var(--color-brand-blue); }
        .lpb__wave-row {
          display: flex; gap: 18px; align-items: center; flex-wrap: wrap;
        }
        .lpb__wave-row label {
          display: flex; flex-direction: column; gap: 4px;
          font-size: 13px;
        }
        .lpb__wave-row label > span:first-child {
          font-family: var(--font-hand);
          font-weight: 700;
          font-size: 13px;
          color: var(--fg-2);
        }
        .lpb__wave-inline { display: inline-flex; align-items: center; gap: 8px; }
        .lpb__wave-inline input {
          width: 60px;
          font-family: var(--font-body);
          font-size: 14px;
          padding: 6px 8px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          background: var(--color-white);
          outline: none;
        }
        .lpb__wave-inline input:focus { border-color: var(--color-brand-blue); }
        .lpb__wave-unit { font-size: 13px; color: var(--fg-2); }

        .lpb__viz { margin-bottom: 24px; }
        .lpb__viz-head {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 12px; margin-bottom: 12px;
        }
        .lpb__viz-title { margin: 0; font-size: 18px; font-weight: 700; }
        .lpb__viz-kicker { font-size: 14px; color: var(--fg-2); }

        .gantt {
          background: var(--color-white);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 18px 20px 22px;
          overflow: hidden;
        }
        .gantt__header {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 12px;
          padding-bottom: 8px;
          border-bottom: 1px dashed var(--line-soft);
          margin-bottom: 14px;
        }
        .gantt__col-label { font-size: 14px; color: var(--fg-2); }
        .gantt__scale { position: relative; height: 22px; }
        .gantt__tick {
          position: absolute;
          top: 0; bottom: 0;
          width: 0;
          border-left: 1px dashed var(--line-soft);
        }
        .gantt__tick-label {
          position: absolute;
          top: 0; left: 4px;
          font-family: var(--font-hand);
          font-size: 12px;
          color: var(--fg-3);
          white-space: nowrap;
        }
        .gantt__launch-line {
          position: absolute;
          top: 0; bottom: 0;
          width: 0;
          border-left: 2px solid var(--color-brand-blue);
          z-index: 1;
        }
        .gantt__rows { display: flex; flex-direction: column; gap: 10px; }
        .gantt__row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 12px;
          align-items: center;
        }
        .gantt__label { display: flex; flex-direction: column; }
        .gantt__label-main { font-weight: 600; font-size: 14px; color: var(--fg-1); }
        .gantt__label-hint { font-size: 12.5px; color: var(--fg-3); }
        .gantt__track {
          position: relative;
          height: 32px;
          background: rgba(38,38,38,0.025);
          border-radius: 4px;
        }
        .gantt__bar {
          position: absolute;
          top: 6px; bottom: 6px;
          border-radius: 4px;
          display: flex; align-items: center; padding: 0 10px;
          font-size: 12px; font-weight: 600;
          color: var(--color-white);
          background: var(--color-brand-blue);
          overflow: hidden;
          white-space: nowrap;
          min-width: 6px;
        }
        .gantt__bar--soft { background: var(--color-brand-stone); color: var(--fg-1); }
        .gantt__bar--accent { background: var(--color-brand-black); }
        .gantt__bar-date {
          font-family: var(--font-hand);
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
        }
        .gantt__bar--soft .gantt__bar-date { color: var(--fg-1); }

        .rock-preview {
          background: var(--color-white);
          border: 1.5px solid var(--color-brand-black);
          border-radius: var(--radius-md);
          padding: 20px 22px;
          box-shadow: 4px 4px 0 0 var(--color-brand-blue-15);
        }
        .rock-preview__head {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .rock-preview__brand {
          display: flex; gap: 12px; align-items: flex-start;
        }
        .rock-preview__brand-logo { height: 32px; width: auto; display: block; }
        .rock-preview__kicker {
          display: block;
          font-family: var(--font-hand);
          font-size: 13px;
          color: var(--fg-2);
          font-weight: 700;
        }
        .rock-preview__title {
          display: block;
          font-family: var(--font-body);
          font-size: 20px;
          font-weight: 700;
          color: var(--fg-1);
          letter-spacing: -0.01em;
        }
        .rock-preview__meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        @media (max-width: 700px) { .rock-preview__meta { grid-template-columns: 1fr; } }
        .rock-preview__meta > div { display: flex; flex-direction: column; gap: 2px; }
        .rock-preview__meta-label {
          font-size: 12px;
          color: var(--fg-2);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .rock-preview__meta-val { font-size: 15px; font-weight: 600; color: var(--fg-1); }
        .rock-preview__milestones { padding-top: 14px; }

        .rock-preview__smart {
          padding: 14px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .rock-preview__smart-head {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 12px;
          margin-bottom: 6px;
        }
        .rock-preview__smart-tag {
          font-family: var(--font-body);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-brand-blue);
          background: var(--color-brand-blue-15);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .rock-preview__smart-hint { font-size: 12.5px; color: var(--fg-3); }
        .rock-preview__token-hint {
          color: var(--color-brand-blue);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 11.5px;
        }
        .rock-preview__smart-preview {
          margin-top: 10px;
          padding: 12px 14px;
          background: var(--color-brand-blue-08);
          border-left: 3px solid var(--color-brand-blue);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
        .rock-preview__smart-preview-tag {
          display: inline-block;
          font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-brand-blue);
          margin-bottom: 6px;
        }
        .rock-preview__smart-preview p {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--fg-1);
        }
        .rock-preview__copy {
          appearance: none;
          background: transparent;
          border: 1.5px solid var(--border-strong);
          color: var(--fg-2);
          width: 30px; height: 30px;
          border-radius: 6px;
          display: grid; place-items: center;
          cursor: pointer;
          transition: all var(--t-fast);
          align-self: center;
        }
        .rock-preview__copy:hover {
          border-color: var(--color-brand-blue);
          color: var(--color-brand-blue);
        }
        .rock-preview__copy.is-copied {
          background: var(--color-brand-blue);
          border-color: var(--color-brand-blue);
          color: var(--color-white);
        }
        .rock-preview__ms-source {
          font-family: var(--font-hand);
          font-size: 12px;
          color: var(--color-brand-blue);
          margin-left: 4px;
        }
        .rock-preview__smart-text {
          width: 100%;
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.55;
          color: var(--fg-1);
          background: var(--color-white);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          outline: none;
          resize: vertical;
          min-height: 100px;
          transition: all var(--t-fast);
        }
        .rock-preview__smart-text:focus {
          border-color: var(--color-brand-blue);
          box-shadow: 0 0 0 3px var(--color-brand-blue-15);
        }
        .rock-preview__ms-head {
          display: block;
          font-size: 15px;
          color: var(--fg-2);
          margin-bottom: 8px;
          font-weight: 700;
        }
        .rock-preview__milestones ul {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .rock-preview__milestones li {
          display: grid;
          grid-template-columns: 14px 1fr auto;
          gap: 10px;
          align-items: center;
          font-size: 14px;
        }
        .rock-preview__ms-dot {
          width: 10px; height: 10px;
          border: 1.5px solid var(--color-brand-blue);
          border-radius: 50%;
          background: var(--color-white);
        }
        .rock-preview__ms-date {
          font-family: var(--font-hand);
          font-size: 13px;
          color: var(--fg-2);
        }

        /* ── Mobile (<= 640px) ── */
        @media (max-width: 640px) {
          .lpb { padding: 18px 16px; }
          .lpb__head { gap: 14px; margin-bottom: 16px; padding-bottom: 14px; }
          .lpb__title { font-size: 22px; margin-top: 4px; }
          .lpb__lead { font-size: 13.5px; }
          .lpb__meter { min-width: 0; }
          .lpb__meter-num { font-size: 36px; }
          .lpb__meter-num span { font-size: 18px; }

          .lpb__waves-title,
          .lpb__milestones-title { font-size: 16px; }
          .lpb__waves-blurb,
          .lpb__milestones-blurb { font-size: 12.5px; }

          .lpb__wave { padding: 12px 12px; gap: 10px; grid-template-columns: 32px 1fr; }
          .lpb__wave-num { width: 32px; height: 32px; font-size: 17px; }
          .lpb__wave-name { font-size: 15px; }
          .lpb__wave-include { padding: 4px 8px; font-size: 12px; }
          .lpb__wave-row { gap: 12px; }
          .lpb__wave-inline input,
          .lpb__milestone-when input { width: 52px; padding: 5px 6px; }
          .lpb__wave-unit { font-size: 12px; }

          .lpb__milestone { padding: 10px 12px; gap: 10px; }

          /* Gantt: collapse the label column on mobile — stack label over track */
          .gantt { padding: 14px 14px 18px; }
          .gantt__header { grid-template-columns: 1fr; gap: 0; }
          .gantt__col-label { display: none; }
          .gantt__row { grid-template-columns: 1fr; gap: 4px; }
          .gantt__label { flex-direction: row; gap: 8px; align-items: baseline; }
          .gantt__label-main { font-size: 13px; }
          .gantt__label-hint { font-size: 12px; }
          .gantt__tick-label { font-size: 11px; }
          .gantt__track { height: 28px; }
          .gantt__bar-date { font-size: 11px; }

          .rock-preview { padding: 16px 14px; }
          .rock-preview__head { gap: 12px; padding-bottom: 12px; }
          .rock-preview__title { font-size: 17px; }
          .rock-preview__brand-logo { height: 26px; }
          .rock-preview__meta { gap: 10px; padding: 12px 0; }
          .rock-preview__meta-val { font-size: 14px; }
          .rock-preview__smart-head { flex-direction: column; align-items: flex-start; gap: 4px; }
          .rock-preview__smart-text { min-height: 130px; font-size: 13.5px; }
          .rock-preview__milestones li {
            grid-template-columns: 14px 1fr;
            row-gap: 2px;
          }
          .rock-preview__ms-date {
            grid-column: 2;
          }
        }
      `}</style>
    </section>
  );
}

window.PlanBuilder = PlanBuilder;
window.PLAN_DEFAULT = PLAN_DEFAULT;
