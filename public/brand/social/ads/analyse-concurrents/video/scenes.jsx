/* ===== Sojori — Analyse concurrentielle : scènes vidéo (1080×1920) ===== */
const { useScene, interpolate, Easing } = window;

/* ---------- tokens ---------- */
const C = {
  paper:'#F7F3EA', paper2:'#FFFFFF',
  ink:'#1C1710', ink2:'#6B6152', ink3:'#9A9082',
  gold:'#E6B022', goldSoft:'#F4CF5E', goldDeep:'#B8881A',
  grad:'linear-gradient(135deg,#F4CF5E,#E6B022 54%,#B8881A)',
  glass:'rgba(255,255,255,.72)', glassBorder:'rgba(230,176,34,.28)',
  line:'rgba(28,23,16,.10)',
  sans:"'Geist',-apple-system,system-ui,sans-serif",
  mono:"'Geist Mono',ui-monospace,monospace",
};
const money = n => (Number.isFinite(n)?Math.round(n):0).toLocaleString('fr-FR').replace(/[,\u202f]/g,' ');

/* ---------- shared motion ---------- */
// content fades up after start, settles, fades out before end → scene
// boundaries show only the shared background+chrome (frame-match).
function vis(t, dur, {inDur=0.42, outDur=0.32, rise=42}={}){
  t = Number.isFinite(t) ? t : 0; dur = Number.isFinite(dur) ? dur : 3;
  const o = Math.min(
    interpolate([0,inDur],[0,1],Easing.easeOutCubic)(t),
    interpolate([dur-outDur,dur],[1,0],Easing.easeInCubic)(t));
  const y = interpolate([0,inDur],[rise,0],Easing.easeOutCubic)(t);
  return {opacity:o, transform:`translateY(${y}px)`};
}
const easeO = Easing.easeOutCubic, easeIO = Easing.easeInOutCubic;

/* ---------- brand mark (orchestrator keyhole) ---------- */
function Mark({ size=64 }){
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{display:'block'}}>
      <defs><linearGradient id="mgv" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F4CF5E"/><stop offset="52%" stopColor="#E6B022"/><stop offset="100%" stopColor="#B8881A"/>
      </linearGradient></defs>
      <circle cx="20" cy="20" r="17" stroke="url(#mgv)" strokeWidth="2" fill="none" strokeDasharray="3 4" opacity="0.5"/>
      <circle cx="20" cy="20" r="11" stroke="url(#mgv)" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M 12 26 Q 20 26 20 20 Q 20 14 28 14" stroke="url(#mgv)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="20" r="2.5" fill="#E6B022"/>
    </svg>
  );
}

/* ---------- persistent stage: background + chrome (identical every scene) ---------- */
function Backdrop(){
  return (
    <div style={{position:'absolute',inset:0,background:
      `radial-gradient(78% 46% at 22% 8%,rgba(244,207,94,.55),transparent 60%),
       radial-gradient(64% 40% at 92% 96%,rgba(230,176,34,.30),transparent 62%),
       linear-gradient(180deg,#FBF8F1,#F3ECDD)`}}>
      {/* zellige filigree */}
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.06}}>
        <defs><pattern id="zelv" width="150" height="150" patternUnits="userSpaceOnUse">
          <path d="M75 16 L92 58 L134 75 L92 92 L75 134 L58 92 L16 75 L58 58 Z" fill="none" stroke="#B8881A" strokeWidth="1.6"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#zelv)"/>
      </svg>
    </div>
  );
}
function Chrome({ step, label }){
  return (
    <div style={{position:'absolute',top:0,left:0,right:0,padding:'62px 72px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{display:'flex',alignItems:'center',gap:18}}>
        <Mark size={58}/>
        <span style={{fontFamily:C.sans,fontWeight:800,fontSize:44,letterSpacing:'-.045em',color:C.ink}}>sojori</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:14,fontFamily:C.mono,fontSize:22,fontWeight:600,letterSpacing:'.12em',color:C.goldDeep,textTransform:'uppercase'}}>
        <span style={{width:36,height:2,background:C.gold,borderRadius:2}}/>{label}
      </div>
    </div>
  );
}
// progress rail at bottom, driven by absolute scene index
function Rail({ index, count }){
  return (
    <div style={{position:'absolute',bottom:52,left:72,right:72,display:'flex',gap:10}}>
      {Array.from({length:count}).map((_,i)=>(
        <div key={i} style={{flex:1,height:6,borderRadius:6,background:i<=index?C.grad:'rgba(28,23,16,.12)',
          boxShadow:i===index?'0 0 12px rgba(230,176,34,.6)':'none'}}/>
      ))}
    </div>
  );
}
function Frame({ index, count, label, children }){
  return (<>
    <Backdrop/>
    {children}
    <Chrome label={label}/>
    <Rail index={index} count={count}/>
  </>);
}

/* helpers for cards */
const glassCard = (extra={})=>({background:C.glass,backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',
  border:`1px solid ${C.glassBorder}`,borderRadius:34,boxShadow:'0 30px 70px rgba(120,90,20,.16)',...extra});
const CX=540, CY=1010; // content center-ish anchor

/* =================== SCENE 1 — HOOK =================== */
function Hook(){
  const _sc = useScene(); let t = Number.isFinite(_sc.localTime)?_sc.localTime:0; const { dur, index, count } = _sc;
  const v = vis(t,dur,{rise:54});
  const caret = Math.floor(t*2)%2===0;
  const typed = 'airbnb.com/rooms/9713…';
  const shown = typed.slice(0, Math.min(typed.length, Math.floor(interpolate(t,[0.5,1.6],[0,typed.length],{clamp:true}))));
  return (
    <Frame index={index} count={count} label="Analyse gratuite">
      <div style={{position:'absolute',left:72,right:72,top:520,...v}}>
        <div style={{fontFamily:C.sans,fontWeight:800,fontSize:104,lineHeight:.98,letterSpacing:'-.035em',color:C.ink}}>
          Votre Airbnb<br/>gagne-t-il <span style={{background:C.grad,WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>autant<br/>qu'il pourrait&nbsp;?</span>
        </div>
        <div style={{marginTop:36,fontFamily:C.sans,fontSize:40,lineHeight:1.4,color:C.ink2,fontWeight:400}}>
          Collez votre lien. On analyse le marché.
        </div>
        {/* input mock */}
        <div style={{marginTop:64,display:'flex',alignItems:'center',gap:22,...glassCard({borderRadius:26,padding:'30px 34px'})}}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={C.goldDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1"/><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>
          <span style={{fontFamily:C.mono,fontSize:34,color:C.ink,letterSpacing:'-.01em'}}>{shown}<span style={{opacity:caret?1:0,color:C.gold,fontWeight:700}}>|</span></span>
        </div>
      </div>
    </Frame>
  );
}

/* =================== SCENE 2 — REVENU ESTIMÉ =================== */
function Revenu(){
  const _sc = useScene(); let t = Number.isFinite(_sc.localTime)?_sc.localTime:0; const { dur, index, count } = _sc;
  const v = vis(t,dur);
  const n = interpolate([0.35,1.7],[0,131000],easeO)(t);
  const chipV = interpolate([1.4,2.0],[0,1],easeO)(t);
  return (
    <Frame index={index} count={count} label="Étape 1 · revenu">
      <div style={{position:'absolute',left:72,right:72,top:640,textAlign:'center',...v}}>
        <div style={{fontFamily:C.mono,fontSize:30,fontWeight:600,letterSpacing:'.18em',textTransform:'uppercase',color:C.ink2}}>Votre revenu estimé</div>
        <div style={{marginTop:26,fontFamily:C.sans,fontWeight:900,letterSpacing:'-.04em',fontSize:170,lineHeight:.9,
          background:C.grad,WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>{money(n)}</div>
        <div style={{marginTop:8,fontFamily:C.mono,fontSize:38,color:C.ink,fontWeight:500,letterSpacing:'.02em'}}>MAD <span style={{color:C.ink3}}>/ an</span></div>
        <div style={{marginTop:70,display:'flex',gap:26,justifyContent:'center',opacity:chipV,transform:`translateY(${(1-chipV)*24}px)`}}>
          <Stat big="1 100" unit="MAD / nuit" cap="Prix marché"/>
          <Stat big="20" unit="autour de vous" cap="Concurrents"/>
        </div>
      </div>
    </Frame>
  );
}
function Stat({ big, unit, cap }){
  return (
    <div style={{...glassCard({padding:'34px 44px',minWidth:340})}}>
      <div style={{fontFamily:C.mono,fontSize:24,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:C.goldDeep}}>{cap}</div>
      <div style={{marginTop:12,fontFamily:C.sans,fontWeight:800,fontSize:74,letterSpacing:'-.03em',color:C.ink,lineHeight:1}}>{big}</div>
      <div style={{marginTop:6,fontFamily:C.sans,fontSize:28,color:C.ink2}}>{unit}</div>
    </div>
  );
}

/* =================== SCENE 3 — CALENDRIER =================== */
function Calendrier(){
  const _sc = useScene(); let t = Number.isFinite(_sc.localTime)?_sc.localTime:0; const { dur, index, count } = _sc;
  const v = vis(t,dur);
  const cells = 49; // 7×7 grid
  const filledFrac = interpolate([0.3,1.7],[0,0.45],easeIO)(t);
  const days = Math.round(interpolate([0.3,1.7],[0,164],easeIO)(t)); // 365j × 45% d'occupation ≈ 164 nuits réservées/an
  const occ = Math.round(interpolate([0.4,1.8],[0,45],easeIO)(t));
  const badgeV = interpolate([1.5,2.0],[0,1],easeO)(t);
  return (
    <Frame index={index} count={count} label="Étape 2 · calendrier">
      <div style={{position:'absolute',left:72,right:72,top:600,...v}}>
        <div style={{fontFamily:C.sans,fontWeight:800,fontSize:64,letterSpacing:'-.03em',color:C.ink,textAlign:'center'}}>On lit votre calendrier réel</div>
        <div style={{margin:'56px auto 0',width:840,...glassCard({padding:44})}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:16}}>
            {Array.from({length:cells}).map((_,i)=>{
              // deterministic order of fill
              const order = (i*17+5)%cells;
              const on = order < filledFrac*cells;
              return <div key={i} style={{aspectRatio:'1',borderRadius:14,
                background:on?C.grad:'rgba(28,23,16,.06)',
                border:on?'none':`1px solid ${C.line}`,
                boxShadow:on?'0 6px 16px rgba(230,176,34,.28)':'none',transition:'none'}}/>;
            })}
          </div>
          <div style={{marginTop:34,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{fontFamily:C.sans,fontSize:34,color:C.ink,fontWeight:600}}>
              <span style={{fontWeight:800,fontSize:44,color:C.goldDeep}}>{days}</span> jours réservés / an
            </div>
            <div style={{opacity:badgeV,transform:`scale(${0.8+badgeV*0.2})`,display:'inline-flex',alignItems:'center',gap:12,
              background:C.grad,color:'#2A1E08',fontFamily:C.sans,fontWeight:800,fontSize:34,padding:'16px 26px',borderRadius:999}}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2A1E08" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6"/></svg>
              {occ}% d'occupation
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* =================== SCENE 4 — CONCURRENTS (radar) =================== */
const DOT_PRICES=[938,1050,890,1120,831,738,1180,970,891,1005,1065,972,1025,1100,880,940,777,1038,1150,830];
const DOTS = Array.from({length:20}).map((_,i)=>{
  const ang = (i*137.5+20)*Math.PI/180;    // golden-angle scatter
  const r = 150 + ((i*67)%180);            // 150..330
  return { x:Math.cos(ang)*r, y:Math.sin(ang)*r, r, price:DOT_PRICES[i], big:false };
});
// label the 4 farthest, well-separated dots (avoid the vertical centre column)
[...DOTS.keys()].filter(i=>Math.abs(DOTS[i].x)>110).sort((a,b)=>DOTS[b].r-DOTS[a].r).slice(0,4).forEach(i=>DOTS[i].big=true);
function Concurrents(){
  const _sc = useScene(); let t = Number.isFinite(_sc.localTime)?_sc.localTime:0; const { dur, index, count } = _sc;
  const v = vis(t,dur);
  const cnt = Math.round(interpolate([0.4,1.7],[0,20],easeO)(t));
  const ring = interpolate([0.2,1.4],[0,1],easeO)(t);
  const R=380;
  return (
    <Frame index={index} count={count} label="Étape 3 · concurrents">
      <div style={{position:'absolute',left:0,right:0,top:560,...v}}>
        <div style={{fontFamily:C.sans,fontWeight:800,fontSize:64,letterSpacing:'-.03em',color:C.ink,textAlign:'center'}}>
          <span style={{color:C.goldDeep}}>20 annonces Airbnb</span> comparables
        </div>
        <div style={{fontFamily:C.sans,fontSize:36,color:C.ink2,textAlign:'center',marginTop:12}}>analysées autour de votre bien</div>
        <div style={{position:'relative',width:R*2,height:R*2,margin:'56px auto 0'}}>
          {/* radar rings */}
          <svg width={R*2} height={R*2} style={{position:'absolute',inset:0}}>
            {[0.42,0.72,1].map((f,i)=>(
              <circle key={i} cx={R} cy={R} r={R*f*ring} fill="none" stroke="rgba(184,136,26,.42)" strokeWidth="2" strokeDasharray="4 8"/>
            ))}
            <line x1={R} y1="0" x2={R} y2={R*2} stroke="rgba(184,136,26,.20)" strokeWidth="1.5"/>
            <line x1="0" y1={R} x2={R*2} y2={R} stroke="rgba(184,136,26,.20)" strokeWidth="1.5"/>
          </svg>
          {/* competitor dots */}
          {DOTS.map((d,i)=>{
            const show = i < cnt;
            const pop = show ? interpolate([0.4+i*0.055,0.4+i*0.055+0.3],[0,1],easeO)(t) : 0;
            const sz = d.big?34:22;
            const leftSide = d.x < 0;
            return (<div key={i} style={{position:'absolute',left:R+d.x-sz/2,top:R+d.y-sz/2,opacity:pop,transform:`scale(${pop})`}}>
              <div style={{width:sz,height:sz,borderRadius:999,background:C.grad,boxShadow:'0 6px 16px rgba(230,176,34,.55)',
                border:'2px solid rgba(255,255,255,.9)'}}/>
              {d.big && <div style={{position:'absolute',top:sz/2-16,whiteSpace:'nowrap',background:C.paper2,
                ...(leftSide?{right:sz+8}:{left:sz+8}),
                border:`1px solid ${C.glassBorder}`,borderRadius:999,padding:'5px 12px',fontFamily:C.mono,fontSize:22,fontWeight:600,
                color:C.ink,boxShadow:'0 6px 16px rgba(120,90,20,.14)'}}>{money(d.price)} MAD</div>}
            </div>);
          })}
          {/* your listing center */}
          <div style={{position:'absolute',left:R-72,top:R-72,width:144,height:144,borderRadius:999,
            background:C.paper2,border:`4px solid ${C.gold}`,boxShadow:'0 14px 36px rgba(230,176,34,.45)',
            display:'grid',placeItems:'center',textAlign:'center'}}>
            <div>
              <div style={{fontFamily:C.mono,fontSize:24,fontWeight:700,color:C.goldDeep,letterSpacing:'.06em'}}>VOUS</div>
              <div style={{fontFamily:C.sans,fontSize:22,color:C.ink,marginTop:2,fontWeight:600}}>800 MAD</div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* =================== SCENE 5 — DUEL =================== */
function Duel(){
  const _sc = useScene(); let t = Number.isFinite(_sc.localTime)?_sc.localTime:0; const { dur, index, count } = _sc;
  const v = vis(t,dur);
  const rows=[
    ['Prix / nuit','800 MAD','1 100 MAD'],
    ['Occupation','45 %','85 %'],
    ['Revenu / an','131 000','341 000'],
  ];
  const punchV = interpolate([1.9,2.5],[0,1],easeO)(t);
  const pulse = 1 + 0.05*Math.sin(Math.max(0,t-2.2)*7)*Math.exp(-Math.max(0,t-2.2)*1.3);
  return (
    <Frame index={index} count={count} label="Étape 4 · face-à-face">
      <div style={{position:'absolute',left:72,right:72,top:520,...v}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:8}}>
          <Head who="Vous" tone="you"/>
          <Head who="Le meilleur concurrent" tone="them"/>
        </div>
        <div style={{...glassCard({padding:'8px 34px'})}}>
          {rows.map((r,i)=>{
            const rv = interpolate([0.4+i*0.22,0.4+i*0.22+0.4],[0,1],easeO)(t);
            return (
              <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr',alignItems:'center',padding:'30px 0',
                borderBottom:i<2?`1px solid ${C.line}`:'none',opacity:rv,transform:`translateY(${(1-rv)*16}px)`}}>
                <div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',fontFamily:C.mono,fontSize:22,
                  color:C.ink3,letterSpacing:'.06em',textTransform:'uppercase',pointerEvents:'none',width:'auto'}}>{r[0]}</div>
                <div style={{fontFamily:C.sans,fontWeight:800,fontSize:60,color:C.ink,letterSpacing:'-.03em'}}>{r[1]}</div>
                <div style={{fontFamily:C.sans,fontWeight:800,fontSize:60,color:C.goldDeep,letterSpacing:'-.03em',textAlign:'right'}}>{r[2]}</div>
              </div>
            );
          })}
        </div>
        {/* punchline */}
        <div style={{marginTop:44,opacity:punchV,transform:`scale(${punchV*pulse})`,transformOrigin:'center',
          background:C.grad,borderRadius:28,padding:'40px 40px',textAlign:'center',boxShadow:'0 24px 60px rgba(230,176,34,.4)'}}>
          <div style={{fontFamily:C.sans,fontWeight:900,fontSize:78,letterSpacing:'-.03em',color:'#2A1E08',lineHeight:1}}>+210 000 MAD/an</div>
          <div style={{fontFamily:C.sans,fontWeight:600,fontSize:38,color:'#4A360E',marginTop:8}}>de manque à gagner</div>
        </div>
      </div>
    </Frame>
  );
}
function Head({ who, tone }){
  const them = tone==='them';
  return (
    <div style={{textAlign:'center',fontFamily:C.mono,fontSize:26,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',
      color:them?'#2A1E08':C.ink2,background:them?C.grad:'rgba(28,23,16,.06)',borderRadius:'20px 20px 0 0',padding:'20px 10px'}}>{who}</div>
  );
}

/* =================== SCENE 6 — BILAN =================== */
function Bilan(){
  const _sc = useScene(); let t = Number.isFinite(_sc.localTime)?_sc.localTime:0; const { dur, index, count } = _sc;
  const v = vis(t,dur);
  const actV = interpolate([1.2,1.9],[0,1],easeO)(t);
  return (
    <Frame index={index} count={count} label="Bilan Sojori">
      <div style={{position:'absolute',left:72,right:72,top:640,...v}}>
        <div style={{...glassCard({padding:'56px 52px'})}}>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:10,background:C.grad,color:'#2A1E08',borderRadius:999,padding:'12px 22px',
              fontFamily:C.mono,fontWeight:700,fontSize:26,letterSpacing:'.06em'}}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#2A1E08" stroke="none"><path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9L12 3.5Z"/></svg>
              BON PRIX · MAUVAIS REMPLISSAGE
            </div>
          </div>
          <div style={{marginTop:34,fontFamily:C.sans,fontSize:52,lineHeight:1.28,color:C.ink,fontWeight:600,letterSpacing:'-.02em'}}>
            Votre prix est bon — mais votre annonce ne se remplit qu&apos;à <b style={{fontWeight:800,color:C.goldDeep}}>45&nbsp;%</b>, contre <b style={{fontWeight:800}}>85&nbsp;%</b> pour un concurrent au même tarif.
          </div>
          <div style={{marginTop:44,opacity:actV,transform:`translateX(${(1-actV)*-24}px)`,
            display:'flex',alignItems:'center',gap:22,borderLeft:`6px solid ${C.gold}`,paddingLeft:28}}>
            <div>
              <div style={{fontFamily:C.mono,fontSize:24,fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:C.goldDeep}}>Action clé</div>
              <div style={{marginTop:8,fontFamily:C.sans,fontWeight:800,fontSize:56,letterSpacing:'-.03em',color:C.ink}}>Optimisez votre taux de remplissage</div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* =================== SCENE 7 — CTA =================== */
function CTA(){
  const _sc = useScene(); let t = Number.isFinite(_sc.localTime)?_sc.localTime:0; const { dur, index, count } = _sc;
  const v = vis(t,dur,{rise:40});
  const btnV = interpolate([0.7,1.3],[0,1],easeO)(t);
  const glow = 0.5+0.5*Math.sin(t*3);
  return (
    <Frame index={index} count={count} label="Gratuit · instantané">
      <div style={{position:'absolute',left:72,right:72,top:0,bottom:0,display:'flex',flexDirection:'column',
        alignItems:'center',justifyContent:'center',textAlign:'center',...v}}>
        <div style={{transform:'scale(1.7)',marginBottom:36}}><Mark size={96}/></div>
        <div style={{fontFamily:C.sans,fontWeight:800,fontSize:60,letterSpacing:'-.045em',color:C.ink}}>sojori</div>
        <div style={{marginTop:54,fontFamily:C.sans,fontWeight:800,fontSize:82,lineHeight:1.05,letterSpacing:'-.035em',color:C.ink,maxWidth:820}}>
          Analyse gratuite<br/>de <span style={{background:C.grad,WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>VOTRE annonce</span>
        </div>
        <div style={{marginTop:64,opacity:btnV,transform:`translateY(${(1-btnV)*24}px)`,
          display:'inline-flex',alignItems:'center',gap:20,background:C.grad,color:'#2A1E08',
          fontFamily:C.sans,fontWeight:800,fontSize:48,letterSpacing:'-.02em',padding:'34px 56px',borderRadius:26,
          boxShadow:`0 26px ${40+glow*30}px rgba(230,176,34,${0.4+glow*0.25})`}}>
          business.sojori.com
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#2A1E08" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15m-6-6l6 6-6 6"/></svg>
        </div>
        <div style={{marginTop:34,fontFamily:C.mono,fontSize:30,fontWeight:600,letterSpacing:'.08em',color:C.ink2,textTransform:'uppercase',
          display:'flex',alignItems:'center',gap:14}}>
          <span style={{width:9,height:9,borderRadius:999,background:C.gold}}/>Résultat instantané
        </div>
      </div>
    </Frame>
  );
}

window.SOJORI_SCENES = { Hook, Revenu, Calendrier, Concurrents, Duel, Bilan, CTA };
Object.assign(window, { SojoriVideoTokens:C });
