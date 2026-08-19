/* Planning essentials — ROLLOUT Ch. 5 ("Planning Your Rollout", pp. 86-95).

   Reference, not a workspace. Marisa and Beth didn't want a plan builder, and
   the book's own fourth essential warns against "elaborate spreadsheets or
   Gantt charts". So this shows a team what to consider and gets out of the way:
   four essentials, each opening to the book's guidance. Nothing to fill in,
   nothing to score. */

function Essential({ item, open, onToggle }) {
  return (
    <div className={"pl-item" + (open ? " is-open" : "")}>
      <button type="button" className="pl-item__head" aria-expanded={open} onClick={onToggle}>
        <span className="pl-item__n">{item.n}</span>
        <span className="pl-item__text">
          <span className="pl-item__title">{item.title}</span>
          <span className="pl-item__summary">{item.summary}</span>
        </span>
        <span className="pl-item__page">{item.page}</span>
        <svg className="pl-item__chev" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4 2 L8 6 L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="pl-item__body">
          <ul className="pl-list">
            {item.items.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
          {item.footnote && <p className="pl-foot">{item.footnote}</p>}
        </div>
      )}
    </div>
  );
}

function PlanningEssentials() {
  const P = window.PLANNING;
  const [open, setOpen] = React.useState(null);

  return (
    <section className="pl">
      <header className="pl__head">
        <h4 className="pl__title">{P.title}</h4>
        <p className="pl__lead">{P.lead}</p>
      </header>

      <div className="pl__list">
        {P.essentials.map((e) => (
          <Essential
            key={e.n}
            item={e}
            open={open === e.n}
            onToggle={() => setOpen(open === e.n ? null : e.n)}
          />
        ))}
      </div>

      <blockquote className="pl__closing">
        <p>{P.closing.text}</p>
        <cite>— {P.closing.cite}</cite>
      </blockquote>

      <style>{`
        .pl {
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          background: var(--bg-card);
          padding: 24px 26px 26px;
          display: flex; flex-direction: column; gap: 18px;
          box-shadow: var(--shadow-xs);
          margin-top: 4px;
        }
        @media (max-width: 640px) { .pl { padding: 18px 16px 20px; gap: 14px; } }

        .pl__head { display: flex; flex-direction: column; gap: 3px; }
        .pl__title { margin: 0; font-size: var(--fs-h4); font-weight: 600; }
        .pl__lead { margin: 0; color: var(--fg-2); font-size: var(--fs-body-sm); max-width: 72ch; }

        .pl__list {
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .pl-item { border-bottom: 1px solid var(--border-subtle); }
        .pl-item:last-child { border-bottom: 0; }
        .pl-item.is-open { background: var(--color-brand-ice); }

        .pl-item__head {
          appearance: none; background: transparent; border: 0; width: 100%;
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr) auto 14px;
          gap: 14px; align-items: center;
          padding: 14px 16px; cursor: pointer; text-align: left;
          font-family: var(--font-body);
        }
        .pl-item__head:hover .pl-item__title { color: var(--color-brand-blue); }
        .pl-item__head:focus-visible { outline: 2px solid var(--color-brand-blue); outline-offset: -2px; }
        .pl-item__n {
          width: 26px; height: 26px; border-radius: 50%;
          background: var(--color-brand-blue-15);
          color: var(--color-brand-blue);
          display: grid; place-items: center;
          font-size: 13px; font-weight: 700;
        }
        .pl-item.is-open .pl-item__n {
          background: var(--color-brand-blue); color: var(--color-white);
        }
        .pl-item__text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .pl-item__title { font-size: var(--fs-body-sm); font-weight: 600; color: var(--fg-1); }
        .pl-item__summary { font-size: 13px; color: var(--fg-2); line-height: 1.45; }
        .pl-item__page { font-size: 11px; color: var(--fg-3); white-space: nowrap; }
        .pl-item__chev { color: var(--fg-3); transition: transform var(--t-fast); }
        .pl-item.is-open .pl-item__chev { transform: rotate(90deg); }

        .pl-item__body {
          padding: 14px 18px 18px 60px;
          display: flex; flex-direction: column; gap: 10px;
          border-top: 1px dashed var(--border-subtle);
          margin-top: 2px;
        }
        @media (max-width: 640px) {
          .pl-item__head { grid-template-columns: 26px minmax(0, 1fr) 14px; gap: 10px; }
          .pl-item__page { display: none; }
          .pl-item__body { padding-left: 16px; }
        }

        .pl-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px; }
        .pl-list li {
          font-size: var(--fs-body-sm); color: var(--fg-1); line-height: 1.5;
          padding-left: 16px; position: relative;
        }
        .pl-list li::before {
          content: ""; position: absolute; left: 2px; top: 8px;
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--color-brand-slate);
        }
        .pl-foot {
          margin: 0; font-size: 13px; color: var(--fg-3);
          line-height: 1.55; font-style: italic;
        }

        .pl__closing {
          margin: 0;
          border-left: 3px solid var(--color-brand-blue);
          background: var(--color-brand-blue-08);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          padding: 14px 18px;
        }
        .pl__closing p { margin: 0; font-size: var(--fs-body-sm); color: var(--fg-1); line-height: 1.6; }
        .pl__closing cite {
          display: block; margin-top: 6px; font-style: normal;
          font-size: var(--fs-meta); color: var(--fg-3); font-weight: 600;
        }
      `}</style>
    </section>
  );
}

window.PlanningEssentials = PlanningEssentials;
