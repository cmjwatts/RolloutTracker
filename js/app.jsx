/* Root app — wires the side rail to the phase detail panel.
   Persists tracker checks and the readiness assessment in localStorage. */

const TRACKER_KEY   = "ninety.rolloutTracker.v1";
const READINESS_KEY = "ninety.rolloutReadiness.v1";

function loadJSON(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
}

function emptyChecks(phases) {
  const map = {};
  phases.forEach((p) => { map[p.id] = p.pictureOfDone.map(() => false); });
  return map;
}

function reconcileChecks(saved, phases) {
  // Ensure saved arrays match current pictureOfDone lengths in case content was updated.
  const out = emptyChecks(phases);
  if (!saved) return out;
  phases.forEach((p) => {
    const savedArr = saved[p.id] || [];
    out[p.id] = p.pictureOfDone.map((_, i) => !!savedArr[i]);
  });
  return out;
}

function App() {
  const phases = window.PHASES;

  const [activeId, setActiveId] = React.useState(phases[0].id);
  const [checkedMap, setCheckedMap] = React.useState(() =>
    reconcileChecks(loadJSON(TRACKER_KEY), phases)
  );
  const [readiness, setReadiness] = React.useState(
    () => loadJSON(READINESS_KEY) || { tools: {}, answers: {} }
  );

  React.useEffect(() => {
    try { localStorage.setItem(TRACKER_KEY, JSON.stringify(checkedMap)); } catch (e) {}
  }, [checkedMap]);

  React.useEffect(() => {
    try { localStorage.setItem(READINESS_KEY, JSON.stringify(readiness)); } catch (e) {}
  }, [readiness]);

  const onToggleCheck = (phaseId, idx) => {
    setCheckedMap((prev) => {
      const next = { ...prev };
      next[phaseId] = next[phaseId].slice();
      next[phaseId][idx] = !next[phaseId][idx];
      return next;
    });
  };

  const onResetTracker = () => {
    setCheckedMap(emptyChecks(phases));
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  const phase = phases.find((p) => p.id === activeId);

  return (
    <React.Fragment>
      <SideRail
        phases={phases}
        activeId={activeId}
        setActiveId={setActiveId}
        checkedMap={checkedMap}
        onReset={onResetTracker}
      />

      <PhaseDetail
        phase={phase}
        checkedMap={checkedMap}
        onToggleCheck={onToggleCheck}
        readiness={readiness}
        setReadiness={setReadiness}
      />
    </React.Fragment>
  );
}

const stage = document.getElementById("stage");
// Clear the loading placeholder before mounting.
stage.innerHTML = "";
ReactDOM.createRoot(stage).render(<App />);
