/* Readiness assessment — ROLLOUT Ch. 4 (pp. 52-84), rendered in Phase 1.

   Design note: the book asks ~44 questions across five headline readiness
   questions. Q1 (mastered the five Foundational Tools?) and Q2 (ready to share
   them?) both run over the SAME five tools, so they collapse into one grid with
   two columns — which is also Marisa's "context vs. content" framing. Q3-Q5 are
   team-level and render as three collapsed prompts.

   Collapsed, the whole thing is five rows plus three lines. Every question is
   one tap away; none are lost.

   This deliberately does NOT score, grade, total, or gate. Readiness is not a
   percentage — see ROLLOUT p. 83. */

function RatingPicker({ value, onChange, scale, label }) {
  return (
    <span className="rd-rate" role="group" aria-label={label}>
      {scale.map((s) => {
        const active = value === s.id;
        return (
          <button
            key={s.id}
            type="button"
            className={"rd-rate__btn is-" + s.id + (active ? " is-active" : "")}
            aria-pressed={active}
            title={s.label}
            onClick={() => onChange(active ? null : s.id)}
          >
            <span className="rd-rate__dot" aria-hidden="true" />
            <span className="rd-rate__txt">{s.label}</span>
          </button>
        );
      })}
    </span>
  );
}

function ToolRow({ tool, state, setState, scale, open, onToggleOpen }) {
  const st = state[tool.id] || {};
  const set = (field) => (val) =>
    setState({ ...state, [tool.id]: { ...st, [field]: val } });

  const checks = st.checks || {};
  const toggleCheck = (i) =>
    setState({
      ...state,
      [tool.id]: { ...st, checks: { ...checks, [i]: !checks[i] } },
    });

  const checkedCount = tool.mastered.filter((_, i) => checks[i]).length;

  return (
    <div className={"rd-row" + (open ? " is-open" : "")}>
      <div className="rd-row__main">
        <button
          type="button"
          className="rd-row__name"
          aria-expanded={open}
          onClick={onToggleOpen}
        >
          <svg className="rd-row__chev" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4 2 L8 6 L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{tool.name}</span>
          {checkedCount > 0 && (
            <span className="rd-row__count">{checkedCount}/{tool.mastered.length}</span>
          )}
        </button>
        <RatingPicker
          value={st.mastered}
          onChange={set("mastered")}
          scale={scale}
          label={tool.name + " — mastered?"}
        />
        <RatingPicker
          value={st.share}
          onChange={set("share")}
          scale={scale}
          label={tool.name + " — ready to share?"}
        />
      </div>

      {open && (
        <div className="rd-row__detail">
          <div className="rd-detail__col">
            <h6 className="rd-detail__label">Have we mastered it? <span className="rd-detail__pg">{tool.page}</span></h6>
            <ul className="rd-checks">
              {tool.mastered.map((q, i) => (
                <li key={i} className={checks[i] ? "is-checked" : ""}>
                  <button type="button" onClick={() => toggleCheck(i)} aria-pressed={!!checks[i]}>
                    <span className="rd-box" aria-hidden="true">
                      {checks[i] && (
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7.5 L6 11 L12 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span>{q}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rd-detail__col">
            <h6 className="rd-detail__label">Are we ready to share it? <span className="rd-detail__pg">pp. 67–68</span></h6>
            <p className="rd-detail__share">{tool.share}</p>
            <label className="rd-detail__note">
              <span>What we'll share, and what we'll hold</span>
              <textarea
                rows={3}
                value={st.note || ""}
                placeholder="e.g. Share the Accountability Chart now; teach what a Scorecard is but hold ours until Q2."
                onChange={(e) => set("note")(e.target.value)}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

function TeamPrompt({ item, state, setState, open, onToggleOpen }) {
  const checks = (state[item.id] || {}).checks || {};
  const toggle = (i) =>
    setState({
      ...state,
      [item.id]: { ...(state[item.id] || {}), checks: { ...checks, [i]: !checks[i] } },
    });
  const count = item.items.filter((_, i) => checks[i]).length;

  return (
    <div className={"rd-team" + (open ? " is-open" : "")}>
      <button type="button" className="rd-team__q" aria-expanded={open} onClick={onToggleOpen}>
        <svg className="rd-row__chev" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4 2 L8 6 L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>{item.q}</span>
        {count > 0 && <span className="rd-row__count">{count}/{item.items.length}</span>}
        <span className="rd-team__pg">{item.page}</span>
      </button>
      {open && (
        <ul className="rd-checks rd-checks--team">
          {item.items.map((q, i) => (
            <li key={i} className={checks[i] ? "is-checked" : ""}>
              <button type="button" onClick={() => toggle(i)} aria-pressed={!!checks[i]}>
                <span className="rd-box" aria-hidden="true">
                  {checks[i] && (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7.5 L6 11 L12 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span>{q}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Readiness({ readiness, setReadiness, embedded }) {
  const R = window.READINESS;
  const [openTool, setOpenTool] = React.useState(null);
  const [openTeam, setOpenTeam] = React.useState(null);

  const tools = readiness.tools || {};
  const team = readiness.team || {};
  const setTools = (next) => setReadiness({ ...readiness, tools: next });
  const setTeam  = (next) => setReadiness({ ...readiness, team: next });

  // Tools the team has said they're ready to share — the actual output of this
  // exercise, and the input to the Rollout Plan below.
  const sharing = R.tools.filter((t) => (tools[t.id] || {}).share === "yes");
  const holding = R.tools.filter((t) => (tools[t.id] || {}).share === "no");

  return (
    <section className={"rd" + (embedded ? " rd--embedded" : "")}>
      {!embedded && (
        <header className="rd__head">
          <span className="eyebrow hand rd__eyebrow">{R.eyebrow}</span>
          <h3 className="rd__title">{R.title}</h3>
          <p className="rd__lead">{R.lead}</p>
        </header>
      )}

      <div className="rd__block">
        <div className="rd__block-head">
          <h4 className="rd__block-title">{R.gridTitle}</h4>
          <p className="rd__block-lead">{R.gridLead}</p>
        </div>

        <div className="rd-grid">
          <div className="rd-grid__head" aria-hidden="true">
            <span>Tool</span>
            <span>{R.colMastered}</span>
            <span>{R.colShare}</span>
          </div>
          {R.tools.map((t) => (
            <ToolRow
              key={t.id}
              tool={t}
              state={tools}
              setState={setTools}
              scale={R.scale}
              open={openTool === t.id}
              onToggleOpen={() => setOpenTool(openTool === t.id ? null : t.id)}
            />
          ))}
        </div>

        {(sharing.length > 0 || holding.length > 0) && (
          <div className="rd-summary">
            <div>
              <span className="rd-summary__label">Launching with</span>
              <span className="rd-summary__val">
                {sharing.length ? sharing.map((t) => t.name).join(" · ") : "—"}
              </span>
            </div>
            <div>
              <span className="rd-summary__label">Holding for now</span>
              <span className="rd-summary__val">
                {holding.length ? holding.map((t) => t.name).join(" · ") : "—"}
              </span>
            </div>
          </div>
        )}

        <blockquote className="rd__note rd__note--soft">
          <p>{R.holdNote}</p>
          <cite>— {R.holdNoteCite}</cite>
        </blockquote>
      </div>

      <div className="rd__block">
        <div className="rd__block-head">
          <h4 className="rd__block-title">{R.teamTitle}</h4>
          <p className="rd__block-lead">{R.teamLead}</p>
        </div>
        <div className="rd-teams">
          {R.team.map((t) => (
            <TeamPrompt
              key={t.id}
              item={t}
              state={team}
              setState={setTeam}
              open={openTeam === t.id}
              onToggleOpen={() => setOpenTeam(openTeam === t.id ? null : t.id)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .rd {
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          background: var(--bg-card);
          padding: 28px 30px 30px;
          display: flex; flex-direction: column; gap: 22px;
          box-shadow: var(--shadow-xs);
        }
        @media (max-width: 640px) { .rd { padding: 20px 16px 22px; gap: 18px; } }
        /* Inside a step the heading is already above it — don't say it twice. */
        .rd--embedded { margin-top: 4px; }

        .rd__head { display: flex; flex-direction: column; gap: 4px; }
        .rd__eyebrow { color: var(--color-brand-blue); }
        .rd__title { font-size: var(--fs-h3); margin: 0; }
        .rd__lead { margin: 4px 0 0; color: var(--fg-2); max-width: 68ch; font-size: var(--fs-body); }

        .rd__note {
          margin: 0;
          border-left: 3px solid var(--color-brand-blue);
          background: var(--color-brand-blue-08);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          padding: 14px 18px;
        }
        .rd__note p { margin: 0; font-size: var(--fs-body-sm); color: var(--fg-1); line-height: 1.6; }
        .rd__note cite {
          display: block; margin-top: 6px; font-style: normal;
          font-size: var(--fs-meta); color: var(--fg-3); font-weight: 600;
        }
        .rd__note--soft {
          border-left-color: var(--border-strong);
          background: var(--color-brand-mist);
        }

        .rd__block { display: flex; flex-direction: column; gap: 14px; }
        .rd__block-head { display: flex; flex-direction: column; gap: 2px; }
        .rd__block-title {
          margin: 0; font-size: var(--fs-h4); font-weight: 600;
        }
        .rd__block-lead { margin: 0; color: var(--fg-2); font-size: var(--fs-body-sm); }

        /* ---- grid ---- */
        .rd-grid {
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .rd-grid__head, .rd-row__main {
          display: grid;
          grid-template-columns: minmax(160px, 1fr) 176px 176px;
          align-items: center;
        }
        .rd-grid__head {
          background: var(--color-brand-mist);
          border-bottom: 1.5px solid var(--border-subtle);
        }
        .rd-grid__head span {
          padding: 9px 14px;
          font-size: var(--fs-meta); font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--fg-2);
        }
        .rd-row { border-bottom: 1px solid var(--border-subtle); }
        .rd-row:last-child { border-bottom: 0; }
        .rd-row.is-open { background: var(--color-brand-ice); }

        .rd-row__name {
          appearance: none; background: transparent; border: 0;
          display: flex; align-items: center; gap: 8px;
          padding: 12px 14px; cursor: pointer; text-align: left;
          font-family: var(--font-body); font-size: var(--fs-body-sm);
          font-weight: 600; color: var(--fg-1); width: 100%;
        }
        .rd-row__name:hover { color: var(--color-brand-blue); }
        .rd-row__chev { transition: transform var(--t-fast); flex: 0 0 auto; color: var(--fg-3); }
        .rd-row.is-open .rd-row__chev, .rd-team.is-open .rd-row__chev { transform: rotate(90deg); }
        .rd-row__count {
          font-size: var(--fs-meta); font-weight: 700; color: var(--color-brand-blue);
          background: var(--color-brand-blue-15); border-radius: 99px; padding: 1px 7px;
        }

        .rd-rate { display: inline-flex; gap: 4px; padding: 8px 12px; flex-wrap: wrap; }
        .rd-rate__btn {
          appearance: none; background: transparent;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          padding: 4px 9px 4px 8px;
          display: inline-flex; align-items: center; gap: 5px;
          cursor: pointer; transition: all var(--t-fast);
          font-family: var(--font-body); font-size: 11.5px; color: var(--fg-2);
          white-space: nowrap;
        }
        .rd-rate__btn:hover { border-color: var(--border-strong); }
        .rd-rate__dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: 1.5px solid var(--border-strong); background: transparent;
        }
        .rd-rate__btn.is-active { color: var(--fg-1); font-weight: 600; }
        .rd-rate__btn.is-yes.is-active  { border-color: var(--color-brand-blue); background: var(--color-brand-blue-08); }
        .rd-rate__btn.is-yes.is-active  .rd-rate__dot { background: var(--color-brand-blue); border-color: var(--color-brand-blue); }
        .rd-rate__btn.is-no.is-active   { border-color: var(--color-brand-grey); background: var(--color-brand-mist); }
        .rd-rate__btn.is-no.is-active   .rd-rate__dot { background: var(--color-brand-grey); border-color: var(--color-brand-grey); }
        .rd-rate__btn:focus-visible { outline: 2px solid var(--color-brand-blue); outline-offset: 1px; }

        .rd-row__detail {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 26px;
          padding: 6px 16px 20px;
          border-top: 1px dashed var(--border-subtle);
          margin-top: 2px;
        }
        .rd-detail__col { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .rd-detail__label {
          margin: 12px 0 0; font-size: var(--fs-meta); font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2);
          display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
        }
        .rd-detail__pg {
          font-weight: 500; letter-spacing: 0.02em; text-transform: none;
          color: var(--fg-3); font-size: 11px;
        }
        .rd-detail__share {
          margin: 0; font-size: var(--fs-body-sm); color: var(--fg-1);
          line-height: 1.55; font-style: italic;
        }
        .rd-detail__note { display: flex; flex-direction: column; gap: 5px; margin-top: 6px; }
        .rd-detail__note > span {
          font-size: var(--fs-meta); font-weight: 600; color: var(--fg-2);
        }
        .rd-detail__note textarea { max-width: 100%;
          font-family: var(--font-body); font-size: var(--fs-body-sm);
          padding: 9px 11px; border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-sm); resize: vertical; color: var(--fg-1);
          background: var(--color-white);
        }
        .rd-detail__note textarea:focus {
          outline: none; border-color: var(--color-brand-blue);
        }

        .rd-checks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
        .rd-checks button {
          appearance: none; background: transparent; border: 0;
          display: grid; grid-template-columns: 18px 1fr; gap: 9px;
          align-items: start; text-align: left; cursor: pointer;
          padding: 5px 6px 5px 0; width: 100%;
          font-family: var(--font-body); font-size: var(--fs-body-sm);
          color: var(--fg-2); line-height: 1.5;
        }
        .rd-checks button:hover { color: var(--fg-1); }
        .rd-checks li.is-checked button { color: var(--fg-3); }
        .rd-checks li.is-checked span:last-child { text-decoration: line-through; }
        .rd-box {
          width: 17px; height: 17px; border-radius: 4px; margin-top: 1px;
          border: 1.5px solid var(--border-strong);
          background: var(--color-white);
          display: grid; place-items: center; color: var(--color-white);
        }
        .rd-checks li.is-checked .rd-box {
          background: var(--color-brand-blue); border-color: var(--color-brand-blue);
        }

        /* ---- summary ---- */
        .rd-summary {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px;
          border: 1.5px dashed var(--border-strong);
          border-radius: var(--radius-md);
          padding: 14px 18px;
        }
        .rd-summary > div { display: flex; flex-direction: column; gap: 3px; }
        .rd-summary__label {
          font-size: var(--fs-meta); font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-3);
        }
        .rd-summary__val { font-size: var(--fs-body-sm); font-weight: 600; color: var(--fg-1); }

        /* ---- team prompts ---- */
        .rd-teams {
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .rd-team { border-bottom: 1px solid var(--border-subtle); }
        .rd-team:last-child { border-bottom: 0; }
        .rd-team.is-open { background: var(--color-brand-ice); }
        .rd-team__q {
          appearance: none; background: transparent; border: 0; width: 100%;
          display: flex; align-items: center; gap: 9px;
          padding: 13px 14px; cursor: pointer; text-align: left;
          font-family: var(--font-body); font-size: var(--fs-body-sm);
          font-weight: 600; color: var(--fg-1);
        }
        .rd-team__q:hover { color: var(--color-brand-blue); }
        .rd-team__pg { margin-left: auto; font-size: 11px; color: var(--fg-3); font-weight: 500; }
        .rd-checks--team { padding: 0 16px 16px 38px; }

        @media (max-width: 860px) {
          .rd-grid__head { display: none; }
          .rd-row__main { grid-template-columns: 1fr; gap: 0; padding-bottom: 6px; }
          .rd-rate { padding: 2px 14px 6px; }
          .rd-row__detail { grid-template-columns: 1fr; gap: 4px; }
          .rd-summary { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

window.Readiness = Readiness;
