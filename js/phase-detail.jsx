/* Phase detail panel — intro (Phase 1 only), picture of done, why, video,
   the work in this phase, resources, pro serve callout.

   The work cards are deliberately NOT numbered or called "steps" — Marisa:
   they don't have to be done in this order, they just all have to happen. */

function WorkMark() {
  return (
    <span className="lp-step__mark" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5 L7 12 L13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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

function VideoCard({ video, backLabel }) {
  const [playing, setPlaying] = React.useState(false);
  return (
    <section className="lp-video">
      {!playing ? (
        <button
          className="lp-video__poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${video.title}`}
          type="button"
        >
          <span className="lp-video__bg" aria-hidden="true" />
          <span className="lp-video__disc">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M11 8 L24 16 L11 24 Z" fill="currentColor" />
            </svg>
          </span>
          <span className="lp-video__cap">
            <span className="lp-video__eyebrow hand">
              {video.duration ? `Watch · ${video.duration}` : "Watch"}
            </span>
            <span className="lp-video__title">{video.title}</span>
            {video.cue && <span className="lp-video__cue">{video.cue}</span>}
          </span>
        </button>
      ) : (
        <div className="lp-video__playing">
          <div>
            <div className="lp-video__playing-eyebrow">Now playing</div>
            <div className="lp-video__playing-title">{video.title}</div>
            <button
              className="btn btn--sm"
              style={{ background: "rgba(255,255,255,0.18)" }}
              onClick={() => setPlaying(false)}
              type="button"
            >← {backLabel || "Back"}</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* Introduction — the intro from the top of the printed Tracker, plus the two
   planned intro videos. Shown above Phase 1 only. */
function Intro() {
  const I = window.INTRO;
  if (!I) return null;
  return (
    <section className="lp-intro">
      <div className="lp-intro__text">
        <span className="eyebrow hand lp__eyebrow">Introduction</span>
        <p className="lp-intro__lead">{I.lead}</p>
        <h4 className="lp-intro__how">{I.howToTitle}</h4>
        <ol className="lp-intro__list">
          {I.howTo.map((h, i) => (
            <li key={i}>
              <strong>{h.t}:</strong> {h.d}
            </li>
          ))}
        </ol>
      </div>
      <div className="lp-intro__videos">
        {I.videos.map((v, i) => (
          <VideoCard key={i} video={v} backLabel="Back" />
        ))}
      </div>
    </section>
  );
}

/* "Read this" — pointer to a chapter of ROLLOUT (with the cover) or another book. */
function ReadThis({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="lp-read">
      <h5 className="lp-read__label">Read this</h5>
      <ul className="lp-read__list">
        {items.map((it, i) => {
          const isRollout = it.book === "rollout";
          const body = (
            <React.Fragment>
              {isRollout ? (
                <img className="lp-read__cover" src="assets/rollout-book-cover.webp" alt="" aria-hidden="true" />
              ) : (
                <span className="lp-read__icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M4 3.5h5.5a2 2 0 0 1 2 2V17a1.5 1.5 0 0 0-1.5-1.5H4V3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                    <path d="M16 3.5h-5.5a2 2 0 0 0-2 2V17a1.5 1.5 0 0 1 1.5-1.5H16V3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
              <span className="lp-read__text">{it.text}</span>
            </React.Fragment>
          );
          return (
            <li key={i}>
              {isRollout ? (
                <a className="lp-read__item" href={window.ROLLOUT_LINKS.book} target="_blank" rel="noopener">{body}</a>
              ) : (
                <span className="lp-read__item">{body}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
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
          {item.cta || (accent ? "How-to" : "Open")}
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

function Step({ step, readiness, setReadiness }) {
  const hasNinety = step.ninety && step.ninety.length > 0;
  const hasResources = step.resources && step.resources.length > 0;
  const hasBoth = hasNinety && hasResources;
  const hasAny = hasNinety || hasResources;

  return (
    <article className="lp-step">
      <header className="lp-step__head">
        <WorkMark />
        <div>
          <h3 className="lp-step__title">{step.title}</h3>
          {step.explain && <p className="lp-step__explain">{step.explain}</p>}
          {step.explainList && step.explainList.length > 0 && (
            <ul className="lp-step__list">
              {step.explainList.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          )}
          {step.suggested && (
            <p className="lp-step__suggested">
              <span className="lp-step__suggested-tag">Suggested</span>
              {step.suggested}
            </p>
          )}
        </div>
      </header>
      {step.readinessTool && (
        <Readiness readiness={readiness} setReadiness={setReadiness} />
      )}
      {step.planningTool && <PlanningEssentials />}
      {hasAny && (
        <div className={"lp-step__lists" + (hasBoth ? "" : " is-single")}>
          <ResourceSubList label="Do this in Ninety" accent items={step.ninety} />
          <ResourceSubList label="Resources" items={step.resources} />
        </div>
      )}
      <ReadThis items={step.readThis} />
    </article>
  );
}

function PhaseResources({ phase }) {
  // One card per reference — the book first, then each hub resource — so the
  // row reads as three equal boxes instead of a card beside a bullet list.
  // Every hub card points at the same member hub: it's deliberate, because new
  // resources are added there regularly and the authors notify members.
  const r = phase.resources || {};
  const links = r.links || [];
  // Hub items are strings (on the Rollout hub) or { title, source, url }.
  const hub = (r.hub || []).map((h) => (typeof h === "string" ? { title: h } : h));
  if (!r.book && !hub.length && !links.length) return null;

  const docIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11.5 2.5H5.5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V6.5l-4-4Z"
            stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11.5 2.5V6.5h4M7.5 10.5h5M7.5 13.5h5"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
  const extIcon = (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );

  return (
    <section className="lp-pres">
      <header className="lp-pres__head">
        <h4 className="hand lp-pres__title">
          Rollout Resources for Phase {parseInt(phase.num, 10)}: {phase.name}
        </h4>
        <span className="lp-pres__kicker">References for the whole {phase.name} phase</span>
      </header>

      <div className="lp-pres__grid">
        {r.book && (
          <a className="lp-rescard" href={window.ROLLOUT_LINKS.book} target="_blank" rel="noopener">
            <img className="lp-rescard__cover" src="assets/rollout-book-cover.webp" alt="" aria-hidden="true" />
            <span className="lp-rescard__body">
              <span className="lp-rescard__label">In the book</span>
              <span className="lp-rescard__title">{r.book.label}</span>
              {r.book.note && <span className="lp-rescard__note">{r.book.note}</span>}
            </span>
          </a>
        )}

        {hub.map((h, i) => {
          const onHub = !h.source;
          const href = h.url || (onHub ? window.ROLLOUT_LINKS.hub : null);
          const inner = (
            <React.Fragment>
              <span className="lp-rescard__icon" aria-hidden="true">{docIcon}</span>
              <span className="lp-rescard__body">
                <span className="lp-rescard__label">
                  {onHub ? "On the hub" : h.source}
                  {href && extIcon}
                </span>
                <span className="lp-rescard__title">{h.title}</span>
              </span>
            </React.Fragment>
          );
          return href ? (
            <a key={i} className="lp-rescard" href={href} target="_blank" rel="noopener">{inner}</a>
          ) : (
            <span key={i} className="lp-rescard lp-rescard--static">{inner}</span>
          );
        })}
      </div>

      {hub.length > 0 && (
        <div className="lp-pres__foot">
          <a className="btn btn--sm lp-hub__btn" href={window.ROLLOUT_LINKS.hub} target="_blank" rel="noopener">
            Rollout Resources Hub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </a>
          <span className="lp-hub__note">Free account. New resources are added regularly.</span>
        </div>
      )}

      {links.length > 0 && (
        <ul className="lp-rlist lp-pres__links">
          {links.map((it, i) => <ResourceItem key={i} item={it} />)}
        </ul>
      )}
    </section>
  );
}

function ProServeCallout({ phase }) {
  return (
    <section className="lp-ps">
      <div className="lp-ps__body">
        <span className="eyebrow hand lp-ps__eyebrow">Want a hand with this phase?</span>
        <h3 className="lp-ps__title">You can run this Rollout yourself. You don't have to.</h3>
        <p className="lp-ps__stuck">
          Everyone can roll out EOS. What usually gets in the way is time and expertise. If you'd
          rather lean on people who do this every week, Ninety Professional Services works with you
          to develop and execute your plan.
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
      {phase.id === "prepare" && <Intro />}

      <header className="lp__head">
        <span className="eyebrow hand lp__eyebrow">
          Phase {phase.num}: <span className="lp__eyebrow-name">{phase.name}</span>
        </span>
        <h2 className="lp__title">{phase.headline}</h2>
      </header>

      <div className="lp-row lp-row--hero">
        <VideoCard key={phase.id} video={phase.video} backLabel="Back to phase" />
        <PictureOfDone phase={phase} checked={checked} onToggle={(i) => onToggleCheck(phase.id, i)} />
      </div>

      <Why phase={phase} />

      <section className="lp-steps">
        <header className="lp-steps__head">
          <span className="eyebrow hand">The work in this phase</span>
          <span className="lp-steps__note">{phase.stepsNote || window.STEPS_NOTE_DEFAULT}</span>
        </header>
        <div className="lp-steps__list">
          {steps.map((s, i) => (
            <Step key={i} step={s} readiness={readiness} setReadiness={setReadiness} />
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

        /* ---- phase resources ---- */
        /* Three equal cards across: the book, then one per hub resource. */
        .lp-pres__grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px;
          align-items: stretch;
        }
        @media (max-width: 1100px) {
          .lp-pres__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .lp-pres__grid { grid-template-columns: minmax(0, 1fr); gap: 12px; }
        }

        .lp-rescard {
          display: grid; grid-template-columns: 46px minmax(0, 1fr); gap: 14px;
          align-items: start; text-decoration: none;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px;
          background: var(--bg-card);
          transition: border-color var(--t-fast), box-shadow var(--t-fast);
        }
        .lp-rescard:hover {
          border-color: var(--color-brand-blue);
          box-shadow: var(--shadow-xs);
        }
        .lp-rescard__cover {
          width: 46px; height: auto; border-radius: 2px;
          box-shadow: var(--shadow-sm);
        }
        .lp-rescard__icon {
          display: flex; align-items: center; justify-content: center;
          width: 46px; height: 46px; border-radius: var(--radius-sm);
          background: var(--color-brand-blue-08);
          color: var(--color-brand-blue);
        }
        .lp-rescard__body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .lp-rescard__label {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: var(--fs-meta); font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-3);
        }
        .lp-rescard__title {
          font-size: var(--fs-body); font-weight: 600; color: var(--fg-1);
          line-height: 1.3;
        }
        .lp-rescard__note { font-size: var(--fs-body-sm); color: var(--fg-2); }
        .lp-rescard--static { cursor: default; }
        .lp-rescard--static:hover { border-color: var(--border-subtle); box-shadow: none; }

        .lp-pres__foot {
          display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
          margin-top: 16px;
        }
        .lp-hub__btn { text-decoration: none; }
        .lp-hub__note { font-size: var(--fs-meta); color: var(--fg-3); }
        .lp-pres__links { margin-top: 16px; }

        .lp__head { max-width: 920px; }
        .lp__eyebrow { color: var(--color-brand-blue); margin-bottom: 4px; }
        .lp__eyebrow-name { text-transform: uppercase; }

        /* ---- introduction (Phase 1 only) ---- */
        .lp-intro {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          gap: 22px;
          padding: 22px 24px;
          background: var(--bg-card);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xs);
        }
        .lp-intro__text { display: flex; flex-direction: column; }
        .lp-intro__lead { margin: 0 0 14px; font-size: 15px; line-height: 1.55; color: var(--fg-1); }
        .lp-intro__how {
          margin: 0 0 8px; font-family: var(--font-hand);
          font-size: 15px; font-weight: 700; color: var(--fg-1);
        }
        .lp-intro__list { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
        .lp-intro__list li { font-size: 14.5px; line-height: 1.5; color: var(--fg-1); }
        .lp-intro__list strong { font-weight: 600; }
        .lp-intro__videos { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; align-content: start; }
        .lp-intro .lp-video__disc { width: 56px; height: 56px; top: 38%; }
        .lp-intro .lp-video__cap { left: 16px; right: 16px; bottom: 14px; }
        .lp-intro .lp-video__title { font-size: 16px; }
        @media (max-width: 1180px) {
          .lp-intro { grid-template-columns: minmax(0, 1fr); }
          .lp-intro__videos { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) { .lp-intro__videos { grid-template-columns: minmax(0, 1fr); } }

        /* ---- "Read this" callout ---- */
        .lp-read {
          margin-top: 18px; padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .lp-read__label {
          margin: 0 0 10px;
          font-family: var(--font-hand);
          font-size: 16px; font-weight: 700; color: var(--fg-2);
        }
        .lp-read__list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
        .lp-read__item {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 10px 14px 10px 10px;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          background: var(--bg-alt);
          text-decoration: none;
          color: var(--fg-1);
          transition: border-color var(--t-fast), box-shadow var(--t-fast);
        }
        a.lp-read__item:hover { border-color: var(--color-brand-blue); box-shadow: var(--shadow-xs); }
        .lp-read__cover { width: 34px; height: auto; border-radius: 2px; box-shadow: var(--shadow-sm); flex: 0 0 auto; }
        .lp-read__icon {
          display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
          width: 34px; height: 46px; border-radius: 3px;
          background: var(--color-brand-blue-08); color: var(--color-brand-blue);
        }
        .lp-read__text { font-size: 14px; line-height: 1.45; font-weight: 500; }
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
        .lp-steps__note { font-size: var(--fs-body-sm); color: var(--fg-2); }
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
        .lp-step__mark {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--color-brand-blue-15);
          color: var(--color-brand-blue);
          display: grid; place-items: center;
          justify-self: start;
          margin-top: 2px;
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
        .lp-step__explain + .lp-step__list { margin-top: 8px; }
        .lp-step__list {
          margin: 0; padding-left: 20px;
          display: flex; flex-direction: column; gap: 5px;
          font-size: 15px; line-height: 1.5; color: var(--fg-1);
        }
        .lp-step__suggested {
          margin: 10px 0 0;
          padding: 10px 14px;
          border-left: 3px solid var(--color-brand-blue);
          background: var(--color-brand-blue-08);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: var(--fs-body-sm); color: var(--fg-2); line-height: 1.55;
        }
        .lp-step__suggested-tag {
          display: inline-block; margin-right: 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--color-brand-blue);
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
          .lp-step__head { gap: 14px; grid-template-columns: 32px 1fr; }
          .lp-step__mark { width: 32px; height: 32px; }
          .lp-intro { padding: 16px 16px; gap: 16px; }
          .lp-read__item { width: 100%; }
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
