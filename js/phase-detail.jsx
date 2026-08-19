/* Phase detail panel — picture of done, why, video, steps, pro serve callout. */

function StepChip({ children }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 18,
        fontWeight: 700,
        color: "var(--color-white)",
        background: "var(--color-brand-blue)",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        letterSpacing: "-0.02em",
        lineHeight: 1,
        justifySelf: "start",
      }}>
      {children}
    </span>
  );
}

function PictureOfDone({ phase, checked, onToggle }) {
  const total = phase.pictureOfDone.length;
  const done = phase.pictureOfDone.filter((_, i) => checked[i]).length;
  // No percentage — that belongs to the Organizational Checkup, not this tracker.
  const frac = total > 0 ? (done / total) * 100 : 0;
  return (
    <section className="lp-card lp-pod">
      <header className="lp-card__head">
        <h4>Picture of done</h4>
        <span className="lp-card__kicker hand">Rollout Tracker</span>
      </header>
      <ul className="lp-pod__list">
        {phase.pictureOfDone.map((item, i) => {
          const isChecked = !!checked[i];
          return (
            <li key={i} className={isChecked ? "is-checked" : ""}>
              <button
                className="lp-pod__row"
                onClick={() => onToggle(i)}
                aria-pressed={isChecked}
                type="button"
              >
                <span className="lp-pod__box" aria-hidden="true">
                  {isChecked && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7.5 L6 11 L12 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="lp-pod__label">{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <footer className="lp-pod__foot">
        <span className="lp-pod__bar"><span style={{ width: frac + "%" }} /></span>
        <span className="lp-pod__count hand">{done} of {total}</span>
      </footer>
    </section>
  );
}

function Why({ phase }) {
  return (
    <section className="lp-why-card">
      <div className="lp-why-card__main">
        <span className="lp-card__eyebrow hand">Why this phase matters</span>
        <p className="lp-why-card__prose">{phase.why}</p>
      </div>
      <blockquote className="lp-quote">
        <span className="lp-quote__mark">“</span>
        <p>{phase.quote.text}</p>
        <cite>— {phase.quote.who}</cite>
      </blockquote>
    </section>
  );
}

function VideoCard({ phase }) {
  const [playing, setPlaying] = React.useState(false);
  return (
    <section className="lp-video">
      {!playing ? (
        <button
          className="lp-video__poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${phase.video.title}`}
          type="button"
        >
          <span className="lp-video__bg" aria-hidden="true" />
          <span className="lp-video__disc">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M11 8 L24 16 L11 24 Z" fill="currentColor" />
            </svg>
          </span>
          <span className="lp-video__cap">
            <span className="lp-video__eyebrow hand">Watch · {phase.video.duration}</span>
            <span className="lp-video__title">{phase.video.title}</span>
            <span className="lp-video__cue">{phase.video.cue}</span>
          </span>
        </button>
      ) : (
        <div className="lp-video__playing">
          <div>
            <div className="lp-video__playing-eyebrow">Now playing</div>
            <div className="lp-video__playing-title">{phase.video.title}</div>
            <button
              className="btn btn--sm"
              style={{ background: "rgba(255,255,255,0.18)" }}
              onClick={() => setPlaying(false)}
              type="button"
            >← Back to phase</button>
          </div>
        </div>
      )}
    </section>
  );
}

function ResourceItem({ item, accent }) {
  return (
    <li>
      <span className={"lp-kind" + (accent ? " is-accent" : "")}>{item.kind}</span>
      <span className="lp-rlabel">{item.label}</span>
      {/* .lp-rlist is a 3-column grid and each <li> is display:contents, so every
          item must contribute exactly three cells — otherwise the columns shift
          and a long label lands in the max-content column and blows the layout out. */}
      {item.url ? (
        <a className="lp-rlink" href={item.url} target="_blank" rel="noopener">
          Open
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </a>
      ) : (
        <span className="lp-rlink lp-rlink--none" aria-hidden="true" />
      )}
    </li>
  );
}

function ResourceSubList({ label, accent, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="lp-sublist">
      <h5 className={"lp-sublist__label" + (accent ? " is-accent" : "")}>
        {accent && (
          <img
            className="lp-sublist__brand"
            src={(window.__resources && window.__resources.ninetyLogo) || "assets/90-logo-black.png"}
            alt="Ninety"
          />
        )}
        <span>{label}</span>
      </h5>
      <ul className="lp-rlist">
        {items.map((it, i) => <ResourceItem key={i} item={it} accent={accent} />)}
      </ul>
    </div>
  );
}

function Step({ step, num, readiness, setReadiness }) {
  const hasNinety = step.ninety && step.ninety.length > 0;
  const hasResources = step.resources && step.resources.length > 0;
  const hasBoth = hasNinety && hasResources;
  const hasAny = hasNinety || hasResources;

  return (
    <article className="lp-step">
      <header className="lp-step__head">
        <StepChip>{num}</StepChip>
        <div>
          <span className="lp-step__eyebrow hand">Step {num}</span>
          <h3 className="lp-step__title">{step.title}</h3>
          <p className="lp-step__explain">{step.explain}</p>
        </div>
      </header>
      {step.readinessTool && (
        <Readiness readiness={readiness} setReadiness={setReadiness} embedded />
      )}
      {step.planningTool && <PlanningEssentials />}
      {hasAny && (
        <div className={"lp-step__lists" + (hasBoth ? "" : " is-single")}>
          <ResourceSubList label="Do this in Ninety" accent items={step.ninety} />
          <ResourceSubList label="Resources" items={step.resources} />
        </div>
      )}
    </article>
  );
}

function PhaseResources({ phase }) {
  // One button to the ROLLOUT member hub plus a list of what to look for there,
  // rather than a dozen separate links to the same destination. The hub is
  // deliberate: new resources are added regularly and the authors notify members.
  const r = phase.resources || {};
  const links = r.links || [];
  const hub = r.hub || [];
  if (!r.book && !hub.length && !links.length) return null;

  return (
    <section className="lp-pres">
      <header className="lp-pres__head">
        <h4 className="hand lp-pres__title">{phase.name} resources</h4>
        <span className="lp-pres__kicker">References for the whole {phase.name} phase</span>
      </header>

      <div className="lp-pres__grid">
        {r.book && (
          <a className="lp-bookcard" href={window.ROLLOUT_LINKS.book} target="_blank" rel="noopener">
            <img className="lp-bookcard__cover" src="assets/rollout-book-cover.webp" alt="" aria-hidden="true" />
            <span>
              <span className="lp-bookcard__label">In the book</span>
              <span className="lp-bookcard__ch">{r.book.label}</span>
              {r.book.note && <span className="lp-bookcard__note">{r.book.note}</span>}
            </span>
          </a>
        )}

        <div className="lp-pres__col">
          {hub.length > 0 && (
            <div className="lp-hub">
              <a className="btn btn--sm lp-hub__btn" href={window.ROLLOUT_LINKS.hub} target="_blank" rel="noopener">
                ROLLOUT resource hub
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </a>
              <span className="lp-hub__note">Free account. New resources are added regularly.</span>
              <span className="lp-hub__lead">Look for:</span>
              <ul className="lp-hub__list">
                {hub.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}

          {links.length > 0 && (
            <ul className="lp-rlist lp-pres__links">
              {links.map((it, i) => <ResourceItem key={i} item={it} />)}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function Sequence({ phase }) {
  const seq = phase.sequence || [];
  if (!seq.length) return null;
  return (
    <section className="lp-seq">
      <header className="lp-seq__head">
        <span className="eyebrow hand">A common order</span>
        <span className="lp-seq__note">Every rollout is different — adapt this to your circumstances.</span>
      </header>
      <ol className="lp-seq__list">
        {seq.map((s, i) => (
          <li key={i}>
            <span className="lp-seq__label">{s.label}</span>
            <span className="lp-seq__task">{s.task}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProServeCallout({ phase }) {
  return (
    <section className="lp-ps">
      <div className="lp-ps__body">
        <span className="eyebrow hand lp-ps__eyebrow">Stuck here?</span>
        <h3 className="lp-ps__title">Professional Services can help.</h3>
        <p className="lp-ps__stuck">
          <strong>Signs you're stuck:</strong> {phase.proServe.stuckSignal}
        </p>
        <div className="lp-ps__offer">
          <div className="lp-ps__offer-title">{phase.proServe.title}</div>
          {phase.proServe.blurb && <div className="lp-ps__offer-meta">{phase.proServe.blurb}</div>}
          <ul className="lp-ps__bullets">
            {phase.proServe.bullets.map((b, i) => (
              <li key={i}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7.5 L6 11 L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lp-ps__cta">
        <button className="btn btn--pill" type="button">Talk to our team</button>
        <span className="lp-ps__meta hand">Scoped to your team count</span>
      </div>
    </section>
  );
}

function ProServeSoft() {
  return (
    <section className="lp-ps-soft">
      <span className="lp-ps-soft__badge">90</span>
      <span className="lp-ps-soft__text">
        <strong>Ninety Professional Services</strong> can help with your Rollout. Give us a call.
      </span>
      <button className="btn btn--sm btn--ghost lp-ps-soft__cta" type="button">Talk to our team →</button>
    </section>
  );
}

function PhaseDetail({ phase, checkedMap, onToggleCheck, readiness, setReadiness }) {
  const checked = checkedMap[phase.id] || [];
  const steps = phase.steps || [];

  return (
    <article className="lp">
      <header className="lp__head">
        <span className="eyebrow hand lp__eyebrow">
          Phase {phase.num} · {phase.duration}
        </span>
        <div className="lp__title-row">
          <h2 className="lp__title">{phase.headline}</h2>
          <Sequence phase={phase} />
        </div>
      </header>

      <div className="lp-row lp-row--hero">
        <VideoCard key={phase.id} phase={phase} />
        <PictureOfDone phase={phase} checked={checked} onToggle={(i) => onToggleCheck(phase.id, i)} />
      </div>

      <Why phase={phase} />

      <section className="lp-steps">
        <header className="lp-steps__head">
          <span className="eyebrow hand">The work in this phase</span>
        </header>
        <div className="lp-steps__list">
          {steps.map((s, i) => (
            <Step key={i} step={s} num={i + 1} readiness={readiness} setReadiness={setReadiness} />
          ))}
        </div>
      </section>

      <PhaseResources phase={phase} />

      {phase.id === "integrate" ? (
        <ProServeCallout phase={phase} />
      ) : phase.id !== "prepare" ? (
        <ProServeSoft />
      ) : null}

      <style>{`
        .lp { display: flex; flex-direction: column; gap: 28px; }

        /* ---- suggested order (deliberately not a schedule) ---- */
        .lp-seq {
          margin-top: 10px;
          display: flex; flex-direction: column; gap: 7px;
        }
        .lp-seq__head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .lp-seq__head .eyebrow { color: var(--fg-2); }
        .lp-seq__note { font-size: var(--fs-body-sm); color: var(--fg-3); }
        .lp-seq__list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 7px;
        }
        .lp-seq__list li {
          display: grid; grid-template-columns: 54px 1fr; gap: 12px;
          align-items: baseline;
        }
        .lp-seq__label {
          font-family: var(--font-body); font-size: var(--fs-meta);
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--color-brand-blue);
        }
        .lp-seq__task { font-size: var(--fs-body-sm); color: var(--fg-2); line-height: 1.55; }
        @media (max-width: 640px) {
          .lp-seq__list li { grid-template-columns: 1fr; gap: 1px; }
        }

        /* ---- phase resources ---- */
        .lp-pres__grid {
          display: grid; grid-template-columns: minmax(0, 320px) minmax(0, 1fr); gap: 30px;
          align-items: start;
        }
        .lp-pres__col { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
        @media (max-width: 860px) {
          .lp-pres__grid { grid-template-columns: minmax(0, 1fr); gap: 20px; }
        }

        .lp-bookcard {
          display: grid; grid-template-columns: 46px minmax(0, 1fr); gap: 14px;
          align-items: start; text-decoration: none;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          transition: border-color var(--t-fast);
        }
        .lp-bookcard:hover { border-color: var(--color-brand-blue); }
        .lp-bookcard__cover {
          width: 46px; height: auto; border-radius: 2px;
          box-shadow: var(--shadow-sm);
        }
        .lp-bookcard > span { display: flex; flex-direction: column; gap: 2px; }
        .lp-bookcard__label {
          font-size: var(--fs-meta); font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-3);
        }
        .lp-bookcard__ch { font-size: var(--fs-body); font-weight: 600; color: var(--fg-1); }
        .lp-bookcard__note { font-size: var(--fs-body-sm); color: var(--fg-2); }

        .lp-hub { display: flex; flex-direction: column; gap: 7px; align-items: flex-start; }
        .lp-hub__btn { text-decoration: none; }
        .lp-hub__note { font-size: var(--fs-meta); color: var(--fg-3); }
        .lp-hub__lead {
          margin-top: 4px;
          font-size: var(--fs-meta); font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2);
        }
        .lp-hub__list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 4px;
        }
        .lp-hub__list li {
          font-size: var(--fs-body-sm); color: var(--fg-2);
          padding-left: 15px; position: relative; line-height: 1.5;
        }
        .lp-hub__list li::before {
          content: ""; position: absolute; left: 2px; top: 9px;
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--color-brand-slate);
        }
        .lp-pres__links { margin-top: 2px; }

        .lp__head { max-width: 920px; }
        .lp__eyebrow { color: var(--color-brand-blue); margin-bottom: 4px; }
        .lp__title-row {
          display: flex; flex-direction: column; gap: 4px;
        }
        .lp__title { margin: 0 0 8px; font-size: 38px; letter-spacing: -0.015em; }

        .lp-card {
          background: var(--bg-card);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px 22px;
          box-shadow: var(--shadow-xs);
        }
        .lp-card__head {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 12px; margin-bottom: 14px;
        }
        .lp-card__head h4 {
          margin: 0;
          font-family: var(--font-hand);
          font-size: 17px; font-weight: 700;
          color: var(--fg-1);
        }
        .lp-card__kicker {
          font-family: var(--font-hand);
          font-size: 13px; color: var(--fg-2);
          font-weight: 400;
        }
        .lp-card__eyebrow {
          display: inline-block;
          color: var(--fg-2);
          font-size: 13px; margin-bottom: 8px;
          font-weight: 700;
        }

        .lp-row {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
          gap: 22px;
          align-items: start;
        }
        @media (max-width: 880px) { .lp-row { grid-template-columns: minmax(0, 1fr); } }

        .lp-video {
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1.5px solid var(--border-subtle);
          background: #0f1316;
          position: relative;
        }
        .lp-video__poster {
          appearance: none;
          position: absolute; inset: 0;
          background: transparent;
          border: 0; cursor: pointer; padding: 0;
          color: var(--color-white);
          text-align: left;
          width: 100%; height: 100%;
        }
        .lp-video__bg {
          position: absolute; inset: 0;
          background: radial-gradient(120% 80% at 30% 25%, #3a4a55 0%, #1a1f24 70%, #0f1316 100%);
        }
        .lp-video__disc {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 76px; height: 76px;
          border-radius: 50%;
          background: var(--color-white);
          color: var(--color-brand-blue);
          display: grid; place-items: center;
          box-shadow: 0 14px 32px rgba(0,0,0,0.4);
          padding-left: 4px;
          transition: transform var(--t-base) var(--ease-out);
        }
        .lp-video__poster:hover .lp-video__disc { transform: translate(-50%, -50%) scale(1.06); }
        .lp-video__cap {
          position: absolute;
          left: 22px; right: 22px; bottom: 20px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .lp-video__eyebrow { font-size: 14px; color: rgba(255,255,255,0.85); }
        .lp-video__title {
          font-size: 18px; font-weight: 600;
          color: var(--color-white);
          line-height: 1.25;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .lp-video__cue { font-size: 13px; color: rgba(255,255,255,0.75); }
        .lp-video__playing {
          position: absolute; inset: 0;
          background: #0f1316;
          display: grid; place-items: center;
          text-align: center;
          color: #fff;
        }
        .lp-video__playing-eyebrow {
          font-family: var(--font-hand);
          font-size: 13px; letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
        }
        .lp-video__playing-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }

        .lp-pod__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
        .lp-pod__row {
          width: 100%; appearance: none;
          background: transparent; border: 0;
          padding: 7px 6px;
          display: grid;
          grid-template-columns: 22px 1fr;
          gap: 12px;
          text-align: left; cursor: pointer;
          border-radius: 6px;
          align-items: start;
          transition: background var(--t-fast);
        }
        .lp-pod__row:hover { background: rgba(47,139,170,0.05); }
        .lp-pod__box {
          width: 22px; height: 22px;
          border: 1.5px solid var(--color-brand-black);
          border-radius: 5px;
          display: grid; place-items: center;
          background: var(--color-white);
          color: var(--color-white);
          margin-top: 1px;
          transition: all var(--t-base);
        }
        .lp-pod li.is-checked .lp-pod__box {
          background: var(--color-brand-blue);
          border-color: var(--color-brand-blue);
        }
        .lp-pod__label { font-size: 14.5px; line-height: 1.45; color: var(--fg-1); }
        .lp-pod li.is-checked .lp-pod__label {
          color: var(--fg-2);
          text-decoration: line-through;
          text-decoration-thickness: 1.5px;
        }
        .lp-pod__foot {
          display: flex; align-items: center; gap: 12px;
          margin-top: 12px; padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }
        .lp-pod__bar {
          flex: 1;
          height: 6px;
          border: 1.5px solid var(--color-brand-black);
          background: var(--color-white);
          border-radius: 99px;
          overflow: hidden;
        }
        .lp-pod__bar > span { display: block; height: 100%; background: var(--color-brand-blue); transition: width 240ms var(--ease-out); }
        .lp-pod__count { font-size: 14px; color: var(--fg-2); white-space: nowrap; }

        .lp-why-card {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 22px;
          padding: 22px 24px;
          background: var(--bg-card);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xs);
        }
        @media (max-width: 880px) { .lp-why-card { grid-template-columns: 1fr; } }
        .lp-why-card__main { display: flex; flex-direction: column; }
        .lp-why-card__prose {
          margin: 0;
          font-size: 15px; line-height: 1.55;
          color: var(--fg-1);
        }
        .lp-quote {
          margin: 0;
          padding: 14px 18px;
          background: var(--color-brand-blue-08);
          border-left: 3px solid var(--color-brand-blue);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          position: relative;
        }
        .lp-quote__mark {
          position: absolute;
          top: -2px; left: 8px;
          font-family: Georgia, serif;
          font-size: 50px;
          color: var(--color-brand-blue);
          line-height: 1; opacity: 0.3;
        }
        .lp-quote p {
          margin: 0;
          font-family: var(--font-body);
          font-size: 17px; font-weight: 500;
          line-height: 1.4;
          color: var(--fg-1);
        }
        .lp-quote cite {
          display: block; margin-top: 6px;
          font-family: var(--font-body);
          font-style: normal;
          font-size: 12px; color: var(--fg-2); font-weight: 500;
        }

        .lp-steps__head { margin-bottom: 16px; }
        .lp-steps__head .eyebrow { color: var(--color-brand-blue); display: block; margin-bottom: 4px; font-size: 14px; }
        .lp-steps__list { display: flex; flex-direction: column; gap: 18px; }

        .lp-step {
          background: var(--bg-card);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 24px 26px 22px;
          box-shadow: var(--shadow-xs);
        }
        .lp-step__head {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 18px;
          align-items: start;
        }
        .lp-step__eyebrow {
          display: inline-block;
          font-size: 14px;
          color: var(--color-brand-blue);
          margin-bottom: 4px;
          font-weight: 700;
          white-space: nowrap;
        }
        .lp-step__title {
          margin: 0 0 8px;
          font-size: 22px;
          font-weight: 700;
          color: var(--fg-1);
          letter-spacing: -0.005em;
        }
        .lp-step__explain {
          margin: 0;
          font-size: 15px;
          line-height: 1.55;
          color: var(--fg-1);
        }
        .lp-step__lists {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .lp-step__lists.is-single { grid-template-columns: 1fr; }
        @media (max-width: 880px) { .lp-step__lists { grid-template-columns: 1fr; } }

        .lp-sublist__label {
          margin: 0 0 10px;
          font-family: var(--font-hand);
          font-size: 16px;
          font-weight: 700;
          color: var(--fg-2);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .lp-sublist__label.is-accent { color: var(--color-brand-blue); }
        .lp-sublist__brand { height: 16px; width: auto; display: block; }

        .lp-rlist {
          list-style: none;
          margin: 0; padding: 0;
          display: grid;
          grid-template-columns: max-content minmax(0, 1fr) max-content;
          column-gap: 12px;
          row-gap: 10px;
          align-items: start;
        }
        .lp-rlist li { display: contents; }
        .lp-kind {
          justify-self: end;
          align-self: start;
          font-family: var(--font-body);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-2);
          background: var(--bg-alt);
          border: 1px solid var(--border-subtle);
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
          margin-top: 1px;
        }
        .lp-kind.is-accent {
          background: var(--color-brand-blue-15);
          border-color: transparent;
          color: var(--color-brand-blue);
        }
        .lp-rlabel { font-size: 14px; color: var(--fg-1); line-height: 1.5; min-width: 0; }
        .lp-rlink {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12px; font-weight: 600;
          color: var(--color-brand-blue);
          text-decoration: none;
          white-space: nowrap;
          padding-top: 2px;
        }
        .lp-rlink:hover { color: var(--color-brand-black); }
        .lp-rlink--none { padding: 0; }

        .lp-pres {
          background: var(--bg-card);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 18px 22px;
          box-shadow: var(--shadow-xs);
        }
        .lp-pres__head { margin-bottom: 12px; }
        .lp-pres__title { margin: 0 0 2px; font-size: 16px; font-weight: 700; }
        .lp-pres__kicker { font-family: var(--font-hand); font-size: 13px; color: var(--fg-2); }

        /* Pro Serve callout — blue (Integrate) */
        .lp-ps {
          background: var(--color-brand-blue);
          color: var(--color-white);
          border-radius: var(--radius-md);
          padding: 28px 32px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 28px;
          align-items: center;
        }
        @media (max-width: 880px) { .lp-ps { grid-template-columns: 1fr; } }
        .lp-ps__body { display: flex; flex-direction: column; gap: 10px; }
        .lp-ps__eyebrow {
          color: rgba(255,255,255,0.85);
          font-family: var(--font-hand);
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.06em;
          text-transform: none;
        }
        .lp-ps__title { margin: 0; font-size: 26px; color: var(--color-white); letter-spacing: -0.01em; }
        .lp-ps__stuck { margin: 0; font-size: 14.5px; color: rgba(255,255,255,0.78); line-height: 1.5; }
        .lp-ps__offer {
          margin-top: 8px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.10);
          border-radius: var(--radius-sm);
        }
        .lp-ps__offer-title { font-weight: 600; font-size: 15px; color: var(--color-white); margin-bottom: 4px; }
        .lp-ps__offer-meta { font-size: 13px; color: rgba(255,255,255,0.78); margin-bottom: 8px; }
        .lp-ps__bullets {
          list-style: none; margin: 6px 0 0; padding: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .lp-ps__bullets li {
          display: flex; gap: 10px;
          font-size: 14px; color: var(--color-white);
          align-items: center;
        }
        .lp-ps__bullets svg { color: var(--color-white); flex: 0 0 14px; }
        .lp-ps__cta { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
        .lp-ps__meta { font-size: 13px; color: rgba(255,255,255,0.78); }
        .lp-ps .btn--pill {
          background: var(--color-white);
          color: var(--color-brand-blue);
          border-color: var(--color-white);
        }
        .lp-ps .btn--pill:hover {
          background: var(--color-brand-black);
          color: var(--color-white);
          border-color: var(--color-brand-black);
        }

        .lp-ps-soft {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 14px 18px;
          background: var(--bg-card);
          border: 1.5px solid var(--color-brand-blue);
          border-radius: var(--radius-md);
        }
        @media (max-width: 700px) { .lp-ps-soft { grid-template-columns: 1fr; text-align: left; } }
        .lp-ps-soft__badge {
          width: 32px; height: 32px;
          background: var(--color-brand-blue);
          color: var(--color-white);
          border-radius: 6px;
          display: grid; place-items: center;
          font-size: 13px; font-weight: 800;
          letter-spacing: -0.03em;
        }
        .lp-ps-soft__text { font-size: 14.5px; color: var(--fg-1); }
        .lp-ps-soft__text strong { color: var(--color-brand-blue); font-weight: 700; }

        /* ── Mobile (<= 640px) ── */
        @media (max-width: 640px) {
          .lp { gap: 20px; }
          .lp__title { font-size: 26px; }

          .lp-card { padding: 16px 16px; }
          .lp-card__head { margin-bottom: 10px; }

          .lp-why-card { padding: 16px 16px; gap: 16px; }
          .lp-why-card__prose { font-size: 14.5px; }
          .lp-quote p { font-size: 15px; }

          .lp-step { padding: 18px 16px 16px; }
          .lp-step__head { gap: 14px; }
          .lp-step__title { font-size: 18px; }
          .lp-step__explain { font-size: 14.5px; }
          .lp-step__lists { margin-top: 14px; padding-top: 12px; gap: 16px; }

          /* Resource lists: stack kind/label, hide redundant grid */
          .lp-rlist { grid-template-columns: 1fr max-content; column-gap: 8px; row-gap: 14px; }
          .lp-kind { justify-self: start; grid-column: 1; }
          .lp-rlabel { grid-column: 1 / -1; }
          .lp-rlink { grid-column: 2; align-self: start; }

          .lp-ps { padding: 20px 18px; gap: 16px; }
          .lp-ps__title { font-size: 20px; }
          .lp-ps__cta { align-items: stretch; }
          .lp-ps__cta .btn--pill { justify-content: center; }
          .lp-ps__meta { text-align: center; }

          .lp-ps-soft { padding: 12px 14px; gap: 12px; }
          .lp-ps-soft__cta { width: 100%; justify-content: center; }

          .lp-pres { padding: 14px 16px; }

          .lp-video__cap { left: 14px; right: 14px; bottom: 12px; }
          .lp-video__title { font-size: 15px; }
          .lp-video__cue { font-size: 12px; }
          .lp-video__disc { width: 56px; height: 56px; }
        }
      `}</style>
    </article>
  );
}

window.PhaseDetail = PhaseDetail;
