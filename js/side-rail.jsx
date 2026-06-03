/* Sticky side rail — overall progress + 4 phase entries connected by a vertical journey-line. */

function SideRail({ phases, activeId, setActiveId, checkedMap, onReset }) {
  const allTotal = phases.reduce((s, p) => s + p.pictureOfDone.length, 0);
  const allDone  = phases.reduce(
    (s, p) => s + (checkedMap[p.id] || []).filter(Boolean).length, 0
  );
  const allPct = allTotal > 0 ? Math.round((allDone / allTotal) * 100) : 0;

  const handleReset = () => {
    if (window.confirm("Reset all tracker progress? This clears every Picture-of-Done check. Your Rollout Plan is kept.")) {
      onReset();
    }
  };

  return (
    <aside className="rail">
      <div className="rail__progress">
        <div className="rail__progress-row">
          <span className="eyebrow">Your rollout</span>
          <span className="rail__pct">{allPct}%</span>
        </div>
        <div className="rail__bar">
          <span style={{ width: allPct + "%" }} />
        </div>
        <div className="rail__progress-meta">
          {allDone} of {allTotal} tracker items complete
        </div>
      </div>

      <nav className="rail__nav" aria-label="Rollout phases">
        {phases.map((p) => {
          const checks = checkedMap[p.id] || [];
          const done = checks.filter(Boolean).length;
          const total = p.pictureOfDone.length;
          const active = p.id === activeId;
          const complete = done === total && total > 0;
          const inProgress = done > 0 && !complete;
          return (
            <button
              key={p.id}
              className={
                "rail__item " +
                (active ? "is-active " : "") +
                (complete ? "is-done " : "") +
                (inProgress ? "is-progress " : "")
              }
              onClick={() => setActiveId(p.id)}
              aria-current={active ? "page" : undefined}
            >
              <span className="rail__node">
                {complete ? (
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                    <path d="M3 8.5 L7 12 L13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span className="rail__node-num">{p.num}</span>
                )}
              </span>
              <span className="rail__body">
                <span className="rail__name">{p.name}</span>
                <span className="rail__meta">{p.duration}</span>
                <span className="rail__count">
                  Tasks {done}/{total}
                  {complete && <span className="rail__yes">DONE ✓</span>}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      <button className="rail__reset" onClick={handleReset} type="button">
        Reset tracker progress
      </button>

      <style>{`
        .rail {
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (max-width: 980px) {
          .rail { position: static; gap: 14px; }
        }
        @media (max-width: 640px) {
          .rail__progress { padding: 14px 16px 12px; }
          .rail__pct { font-size: 28px; }
          .rail__nav {
            display: flex;
            flex-direction: row;
            gap: 8px;
            overflow-x: auto;
            padding: 4px 2px 10px;
            margin: 0 calc(var(--gutter) * -1);
            padding-left: var(--gutter);
            padding-right: var(--gutter);
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
          }
          .rail__nav::before { display: none; }
          .rail__item {
            flex: 0 0 auto;
            grid-template-columns: 22px 1fr;
            gap: 10px;
            padding: 10px 12px;
            min-width: 168px;
            border: 1px solid var(--border-subtle);
            scroll-snap-align: start;
            align-items: center;
          }
          .rail__item.is-active { border-color: var(--color-brand-blue); }
          .rail__item.is-active::after { display: none; }
          .rail__node { width: 22px; height: 22px; }
          .rail__node-num { font-size: 13px; }
          .rail__body { padding-top: 0; gap: 1px; }
          .rail__name { font-size: 13.5px; }
          .rail__meta { display: none; }
          .rail__count { font-size: 11px; }
        }

        .rail__progress {
          background: var(--bg-card);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 18px 20px 16px;
          box-shadow: var(--shadow-xs);
        }
        .rail__progress-row {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 10px; margin-bottom: 8px; white-space: nowrap;
        }
        .rail__progress-row .eyebrow {
          font-family: var(--font-hand);
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .rail__pct {
          font-family: var(--font-sketch);
          font-size: 38px; font-weight: 700;
          color: var(--color-brand-blue);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .rail__bar {
          height: 6px;
          border: 1.5px solid var(--color-brand-black);
          background: var(--color-white);
          border-radius: 99px;
          overflow: hidden;
        }
        .rail__bar > span {
          display: block; height: 100%;
          background: var(--color-brand-blue);
          transition: width 240ms var(--ease-out);
        }
        .rail__progress-meta {
          margin-top: 8px;
          font-family: var(--font-hand);
          font-size: 13px;
          color: var(--fg-2);
        }

        .rail__nav {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 4px 0;
        }
        .rail__nav::before {
          content: "";
          position: absolute;
          left: 14px;
          top: 32px; bottom: 32px;
          width: 0;
          border-left: 2px solid var(--border-subtle);
        }
        .rail__item {
          appearance: none;
          background: transparent;
          border: 0;
          padding: 12px 12px 12px 0;
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 14px;
          align-items: start;
          cursor: pointer;
          text-align: left;
          position: relative;
          border-radius: 8px;
          transition: background var(--t-fast);
        }
        .rail__item:hover { background: var(--color-brand-blue-08); }
        .rail__item.is-active { background: var(--color-brand-blue-08); }
        .rail__item.is-active::after {
          content: "";
          position: absolute;
          right: -16px; top: 12px; bottom: 12px;
          width: 3px;
          background: var(--color-brand-blue);
          border-radius: 3px;
        }
        .rail__node {
          position: relative;
          z-index: 1;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--color-white);
          border: 2px solid var(--border-subtle);
          color: var(--fg-2);
          display: grid; place-items: center;
          font-weight: 700; font-size: 12px;
          transition: all var(--t-base);
        }
        .rail__node-num {
          font-family: var(--font-sketch);
          font-size: 16px; font-weight: 700;
          color: var(--color-brand-black);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .rail__item.is-active .rail__node {
          background: var(--color-brand-blue);
          border-color: var(--color-brand-blue);
        }
        .rail__item.is-active .rail__node-num { color: var(--color-white); }
        .rail__item.is-progress:not(.is-active) .rail__node {
          border-color: var(--color-brand-blue);
        }
        .rail__item.is-progress:not(.is-active) .rail__node-num { color: var(--color-brand-blue); }
        .rail__item.is-done .rail__node {
          background: var(--color-brand-blue);
          border-color: var(--color-brand-blue);
          color: var(--color-white);
        }

        .rail__body { display: flex; flex-direction: column; gap: 2px; padding-top: 2px; }
        .rail__name {
          font-weight: 600; font-size: 15px;
          color: var(--fg-1); letter-spacing: -0.005em;
        }
        .rail__item.is-active .rail__name { color: var(--color-brand-blue); }
        .rail__meta {
          font-family: var(--font-hand);
          font-size: 13px; color: var(--fg-2);
        }
        .rail__count {
          font-family: var(--font-hand);
          font-size: 12px; color: var(--fg-2);
          margin-top: 2px;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .rail__yes {
          color: var(--color-brand-blue);
          font-weight: 700; letter-spacing: 0.06em;
          font-size: 10px; font-family: var(--font-body);
        }

        .rail__reset {
          appearance: none;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--fg-3);
          font-size: 12px;
          font-family: var(--font-body);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--t-fast);
        }
        .rail__reset:hover {
          color: var(--color-brand-black);
          border-color: var(--color-brand-black);
        }
      `}</style>
    </aside>
  );
}

window.SideRail = SideRail;
