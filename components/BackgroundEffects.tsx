export function BackgroundEffects() {
  return (
    <>
      <div className="bg-stage" />
      <div className="bg-grid" />
      <div className="bg-noise" />
      {/* Animated soft orbs (Aurora variant) */}
      <div className="orb" style={{ width: 400, height: 400, background: 'rgba(244,207,94,0.35)', top: -100, left: -50 }} />
      <div className="orb" style={{ width: 350, height: 350, background: 'rgba(196,181,253,0.40)', top: 200, right: '5%', animationDelay: '-8s' }} />
      <div className="orb" style={{ width: 300, height: 300, background: 'rgba(103,232,249,0.30)', bottom: '10%', left: '35%', animationDelay: '-15s' }} />
    </>
  );
}
