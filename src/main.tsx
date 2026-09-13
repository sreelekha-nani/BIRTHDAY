import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './story.css'

const birthdayConfig = { name: 'Nani', birthDate: '13 September 2004', birthday: '13 September 2026', age: 22, coupleLogo: 'HS' }
const sceneCopy = [
  { eyebrow: 'a tiny secret', line: 'Tonight is yours.', detail: 'She’s hanging every little light for him.', mood: 'prepare' },
  { eyebrow: 'there he is', line: 'You + me.', detail: 'A little hiding. A little catching. A lot of laughing.', mood: 'meet' },
  { eyebrow: 'their little world', line: 'Just us ❤️', detail: 'Small moments became our favorite kind of magic.', mood: 'love' },
  { eyebrow: 'one more secret', line: 'Close your eyes…', detail: 'A gift small enough to hold, bright enough to keep.', mood: 'gift' },
  { eyebrow: 'make a wish', line: `Happy ${birthdayConfig.age}nd Birthday, ${birthdayConfig.name} ❤️`, detail: '13 • 09 • 2004   ·   13 • 09 • 2026', mood: 'party' },
  { eyebrow: 'from her heart', line: 'I hope I get to celebrate many more birthdays with you. ❤️', detail: 'Everything your heart wants — and all of us, too.', mood: 'night' },
]

function Bear({ kind, pose = 'idle' }: { kind: 'girl' | 'boy', pose?: string }) {
  return <div className={`bear ${kind} ${pose}`} aria-label={kind === 'girl' ? 'Girl bear' : 'Nani bear'}>
    <i className="ear left"/><i className="ear right"/><div className="head"><i className="eye left"/><i className="eye right"/><i className="muzzle"/><i className="cheek left"/><i className="cheek right"/>{kind === 'girl' && <b className="bow">♡</b>}</div>
    <div className="body"><i className="paw left"/><i className="paw right"/><i className="belly"/>{kind === 'boy' && <b className="scarf"/>}{kind === 'girl' && <b className="bracelet">HS</b>}</div>
  </div>
}

function Music({ started }: { started: boolean }) {
  const audio = useRef<HTMLAudioElement>(null); const [on, setOn] = useState(true); const [vol, setVol] = useState(.55)
  useEffect(() => { const a = audio.current; if (!a || !started) return; a.volume = vol; if (on) a.play().catch(() => undefined); else a.pause() }, [on, vol, started])
  return <><audio ref={audio} src="/audio/birthday-song.mp3" loop preload="none"/><div className="music"><button onClick={() => setOn(!on)} aria-label="Toggle music">{on ? '♫' : '♩'}</button><span>{on ? 'Music' : 'Muted'}</span><input aria-label="Music volume" type="range" min="0" max="1" step=".05" value={vol} onChange={e => setVol(Number(e.target.value))}/></div></>
}

function App() {
  const [opened, setOpened] = useState(false); const [scene, setScene] = useState(0); const stars = useMemo(() => Array.from({length: 42}, (_, i) => ({ left: `${(i * 41) % 101}%`, top: `${(i * 67) % 88}%`, delay: `${(i % 8) * .45}s` })), [])
  useEffect(() => { if (!opened || scene >= sceneCopy.length - 1) return; const t = window.setTimeout(() => setScene(s => s + 1), 7200); return () => clearTimeout(t) }, [opened, scene])
  const current = sceneCopy[scene]
  return <main className={`story ${opened ? 'opened' : 'intro'} mood-${current.mood}`}>
    <div className="starfield">{stars.map((s,i) => <i key={i} style={s}/>)}</div><div className="grain"/>
    {!opened ? <section className="opening"><div className="opening-bear"><Bear kind="girl"/></div><p className="whisper">Shhh... <em>🤫</em></p><h1>I made something<br/>for you<span>…</span></h1><small>HS ♡</small><button className="open" onClick={() => setOpened(true)}>Open it <span>♥</span></button></section> : <>
      <Music started={opened}/><section className="scene" key={scene}>
        <div className="moon"/><div className="fairy fairy-a"/><div className="fairy fairy-b"/><div className="petals">✦　♡　✦</div>
        <div className={`world ${current.mood}`}>
          <div className="props"><i className="lamp"/><i className="flowers">✽</i>{current.mood === 'gift' && <i className="present">HS</i>}{current.mood === 'party' && <><i className="cake">{Array.from({length:22},(_,i)=><b key={i}/>)}</i><i className="balloon one"/><i className="balloon two"/></>}</div>
          <div className="couple"><Bear kind="girl" pose={current.mood}/><Bear kind="boy" pose={current.mood}/></div>
        </div>
        <div className="copy"><p>{current.eyebrow}</p><h2>{current.line}</h2><span>{current.detail}</span></div>
        <div className="progress">{sceneCopy.map((_,i)=><i className={i <= scene ? 'active' : ''} key={i}/>)}</div>
        <button className="skip" onClick={() => setScene(s => s === sceneCopy.length-1 ? 0 : s+1)}>{scene === sceneCopy.length-1 ? 'Replay ↻' : 'next →'}</button>
      </section>
      {scene === sceneCopy.length-1 && <div className="forever"><i/><i/><b>HS ∞</b><strong>NANI ❤️</strong><span>HAPPY 22nd BIRTHDAY</span></div>}
    </>}
  </main>
}
createRoot(document.getElementById('root')!).render(<App />)
