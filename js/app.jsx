/* Root app — wires side rail + phase detail + plan builder together.
   Persists tracker check state and the rollout plan in localStorage. */

const TRACKER_KEY = "ninety.rolloutTracker.v1";
const PLAN_KEY    = "ninety.rolloutPlan.v2";

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

function loadPlan() {
  const def = PLAN_DEFAULT();
  const saved = loadJSON(PLAN_KEY);
  if (!saved) return def;
  return {
    ...def,
    ...saved,
    rockDescription:
      saved.rockDescription && saved.rockDescription.trim() &&
      saved.rockDescription.includes("{commsPlan}")
        ? saved.rockDescription : def.rockDescription,
    waves: (saved.waves || def.waves).map((w) => ({ inRock: true, ...w })),
    extraMilestones: (saved.extraMilestones && saved.extraMilestones.length
      ? saved.extraMilestones
      : def.extraMilestones).map((m) => ({ inRock: true, ...m })),
  };
}

function App() {
  const phases = window.PHASES;

  const [activeId, setActiveId] = React.useState(phases[0].id);
  const [checkedMap, setCheckedMap] = React.useState(() =>
    reconcileChecks(loadJSON(TRACKER_KEY), phases)
  );
  const [plan, setPlan] = React.useState(() => loadPlan());

  React.useEffect(() => {
    try { localStorage.setItem(TRACKER_KEY, JSON.stringify(checkedMap)); } catch (e) {}
  }, [checkedMap]);

  React.useEffect(() => {
    try { localStorage.setItem(PLAN_KEY, JSON.stringify(plan)); } catch (e) {}
  }, [plan]);

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
        plan={plan}
        setPlan={setPlan}
      />
    </React.Fragment>
  );
}

const stage = document.getElementById("stage");
// Clear the loading placeholder before mounting.
stage.innerHTML = "";
ReactDOM.createRoot(stage).render(<App />);
