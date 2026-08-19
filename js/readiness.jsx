/* Readiness assessment — ROLLOUT Ch. 4 (pp. 52-84), rendered inside Prepare's
   first step.

   Structure mirrors p. 52: the five key readiness questions, worded as the book
   words them, each opening to its detail. Questions 1 and 2 run over the same
   five Foundational Tools from two angles — have we mastered it, are we ready
   to share it — so they share one row and open a single grid. That pairing is
   also Marisa's "context vs. content" framing.

   Deliberately does NOT score, grade, total, or gate. Readiness is not a
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

function CheckList({ items, checks, onToggle, className }) {
  return (
    <ul className={"rd-checks" + (className ? " " + className : "")}>
      {items.map((q, i) => (
        <li key={i} className={checks[i] ? "is-checked" : ""}>
          <button type="button" onClick={() => onToggle(i)} aria-pressed={!!checks[i]}>
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
  );
}

function ToolRow({ tool, state, setState, scale, open, onToggleOpen }) {
  const st = state[tool.id] || {};
  const set = (field) => (val) =>
    setState({ ...state, [tool.id]: { ...st, [field]: val } });

  const checks = st.checks || {};
  const toggleCheck = (i) =>
    setState({ ...state, [tool.id]: { ...st, checks: { ...checks, [i]: !checks[i] } } });

  const checkedCount = tool.mastered.filter((_, i) => checks[i]).length;

  return (
    <div className={"rd-row" + (open ? " is-open" : "")}>
      <div className="rd-row__main">
        <button type="button" className="rd-row__name" aria-expanded={open} onClick={onToggleOpen}>
          <svg className="rd-row__chev" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4 2 L8 6 L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{tool.name}</span>
          {checkedCount > 0 && (
            <span className="rd-row__count">{checkedCount}/{tool.mastered.length}</span>
          )}
        </button>
        <RatingPicker value={st.mastered} onChange={set("mastered")} scale={scale}
          label={tool.name + " — mastered?"} />
        <RatingPicker value={st.share} onChange={set("share")} scale={scale}
          label={tool.name + " — ready to share?"} />
      </div>

      {open && (
        <div className="rd-row__detail">
          <h6 className="rd-detail__label">Have we mastered it? <span className="rd-detail__pg">{tool.page}</span></h6>
          <CheckList items={tool.mastered} checks={checks} onToggle={toggleCheck} />
        </div>
      )}
    </div>
  );
}

function ToolGrid({ readiness, setReadiness }) {
  const R = window.READINESS;
  const [openTool, setOpenTool] = React.useState(null);
  const tools = readiness.tools || {};
  const setTools = (next) => setReadiness({ ...readiness, tools: next });

  const sharing = R.tools.filter((t) => (tools[t.id] || {}).share === "yes");
  const holding = R.tools.filter((t) => (tools[t.id] || {}).share === "no");

  return (
    <React.Fragment>
      <p className="rd__grid-lead">{R.gridLead}</p>

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

      <blockquote className="rd__note">
        <p>{R.holdNote}</p>
        <cite>— {R.holdNoteCite}</cite>
      </blockquote>
    </React.Fragment>
  );
}

function QuestionRow({ item, open, onToggleOpen, readiness, setReadiness }) {
  const answers = readiness.answers || {};
  const checks = (answers[item.id] || {}).checks || {};
  const toggle = (i) =>
    setReadiness({
      ...readiness,
      answers: {
        ...answers,
        [item.id]: { ...(answers[item.id] || {}), checks: { ...checks, [i]: !checks[i] } },
      },
    });
  const count = item.items ? item.items.filter((_, i) => checks[i]).length : 0;

  return (
    <div className={"rd-q" + (open ? " is-open" : "")}>
      <button type="button" className="rd-q__head" aria-expanded={open} onClick={onToggleOpen}>
        <span className="rd-q__n">{item.num}</span>
        <span className="rd-q__text">
          <span className="rd-q__q">{item.q}</span>
          {item.q2 && <span className="rd-q__q">{item.q2}</span>}
        </span>
        {count > 0 && <span className="rd-row__count">{count}/{item.items.length}</span>}
        <span className="rd-q__pg">{item.page}</span>
        <svg className="rd-q__chev" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4 2 L8 6 L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="rd-q__body">
          {item.kind === "grid"
            ? <ToolGrid readiness={readiness} setReadiness={setReadiness} />
            : <CheckList items={item.items} checks={checks} onToggle={toggle} className="rd-checks--wide" />}
        </div>
      )}
    </div>
  );
}

function Readiness({ readiness, setReadiness }) {
  const R = window.READINESS;
  const [open, setOpen] = React.useState(null);

  return (
    <section className="rd">
      <p className="rd__lead">
        {R.lead}
        <cite className="rd__lead-cite">— {R.leadCite}</cite>
      </p>

      <div className="rd__qs">
        {R.questions.map((q) => (
          <QuestionRow
            key={q.id}
            item={q}
            open={open === q.id}
            onToggleOpen={() => setOpen(open === q.id ? null : q.id)}
            readiness={readiness}
            setReadiness={setReadiness}
          />
        ))}
      </div>

      <style>{`
        .rd {
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          background: var(--bg-card);
          padding: 24px 26px 26px;
          display: flex; flex-direction: column; gap: 16px;
          box-shadow: var(--shadow-xs);
          margin-top: 4px;
        }
        @media (max-width: 640px) { .rd { padding: 18px 16px 20px; gap: 14px; } }

        .rd__lead { margin: 0; color: var(--fg-2); font-size: var(--fs-body-sm); line-height: 1.6; }
        .rd__lead-cite {
          display: block; margin-top: 4px; font-style: normal;
          font-size: var(--fs-meta); color: var(--fg-3); font-weight: 600;
        }

        /* ---- the five questions, as worded on p. 52 ---- */
        .rd__qs {
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .rd-q { border-bottom: 1px solid var(--border-subtle); }
        .rd-q:last-child { border-bottom: 0; }
        .rd-q.is-open { background: var(--color-brand-ice); }

        .rd-q__head {
          appearance: none; background: transparent; border: 0; width: 100%;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto auto 14px;
          gap: 14px; align-items: center;
          padding: 14px 16px; cursor: pointer; text-align: left;
          font-family: var(--font-body);
        }
        .rd-q__head:hover .rd-q__q { color: var(--color-brand-blue); }
        .rd-q__head:focus-visible { outline: 2px solid var(--color-brand-blue); outline-offset: -2px; }
        .rd-q__n {
          min-width: 26px; height: 26px; padding: 0 8px; border-radius: 99px;
          background: var(--color-brand-blue-15);
          color: var(--color-brand-blue);
          display: grid; place-items: center;
          font-size: 12px; font-weight: 700; white-space: nowrap;
        }
        .rd-q.is-open .rd-q__n { background: var(--color-brand-blue); color: var(--color-white); }
        .rd-q__text { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .rd-q__q {
          font-size: var(--fs-body-sm); font-weight: 600;
          color: var(--fg-1); line-height: 1.45;
        }
        .rd-q__text .rd-q__q + .rd-q__q { font-weight: 500; color: var(--fg-2); }
        .rd-q__pg { font-size: 11px; color: var(--fg-3); white-space: nowrap; }
        .rd-q__chev { color: var(--fg-3); transition: transform var(--t-fast); }
        .rd-q.is-open .rd-q__chev { transform: rotate(90deg); }

        .rd-q__body {
          padding: 16px 18px 20px 20px;
          border-top: 1px dashed var(--border-subtle);
          display: flex; flex-direction: column; gap: 14px;
        }
        @media (max-width: 640px) {
          .rd-q__head { grid-template-columns: auto minmax(0, 1fr) 14px; gap: 10px; }
          .rd-q__pg { display: none; }
          .rd-q__body { padding: 14px 14px 16px; }
        }

        .rd__grid-lead { margin: 0; color: var(--fg-2); font-size: var(--fs-body-sm); }

        .rd__note {
          margin: 0;
          border-left: 3px solid var(--border-strong);
          background: var(--color-brand-mist);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          padding: 14px 18px;
        }
        .rd__note p { margin: 0; font-size: var(--fs-body-sm); color: var(--fg-1); line-height: 1.6; }
        .rd__note cite {
          display: block; margin-top: 6px; font-style: normal;
          font-size: var(--fs-meta); color: var(--fg-3); font-weight: 600;
        }

        /* ---- tool grid (questions 1 and 2) ---- */
        .rd-grid {
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--bg-card);
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
        .rd-row.is-open .rd-row__chev { transform: rotate(90deg); }
        .rd-row__count {
          font-size: var(--fs-meta); font-weight: 700; color: var(--color-brand-blue);
          background: var(--color-brand-blue-15); border-radius: 99px; padding: 1px 7px;
          white-space: nowrap;
        }

        .rd-rate { display: inline-flex; gap: 4px; padding: 8px 12px; flex-wrap: wrap; }
        .rd-rate__btn {
          appearance: none; background: transparent;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          padding: 4px 11px 4px 9px;
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
        .rd-rate__btn.is-yes.is-active { border-color: var(--color-brand-blue); background: var(--color-brand-blue-08); }
        .rd-rate__btn.is-yes.is-active .rd-rate__dot { background: var(--color-brand-blue); border-color: var(--color-brand-blue); }
        .rd-rate__btn.is-no.is-active  { border-color: var(--color-brand-grey); background: var(--color-brand-mist); }
        .rd-rate__btn.is-no.is-active  .rd-rate__dot { background: var(--color-brand-grey); border-color: var(--color-brand-grey); }
        .rd-rate__btn:focus-visible { outline: 2px solid var(--color-brand-blue); outline-offset: 1px; }

        .rd-row__detail {
          display: flex; flex-direction: column; gap: 8px;
          padding: 12px 16px 18px;
          border-top: 1px dashed var(--border-subtle);
          margin-top: 2px;
        }
        .rd-detail__label {
          margin: 0; font-size: var(--fs-meta); font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2);
          display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
        }
        .rd-detail__pg {
          font-weight: 500; letter-spacing: 0.02em; text-transform: none;
          color: var(--fg-3); font-size: 11px;
        }

        /* ---- checklists ---- */
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

        @media (max-width: 860px) {
          .rd-grid__head { display: none; }
          .rd-row__main { grid-template-columns: minmax(0, 1fr); gap: 0; padding-bottom: 6px; }
          .rd-rate { padding: 2px 14px 6px; }
          .rd-summary { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </section>
  );
}

window.Readiness = Readiness;
