"use client";

import { useState } from "react";
import { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";
import { ScrollPaginationDots } from "@/components/shared/ScrollPaginationDots";

interface Channel {
  id: string;
  l: string;
  icon: string;
  color?: string;
  count: number;
}

interface Thread {
  id: number;
  name: string;
  ch: string;
  color: string;
  preview: string;
  time: string;
  unread: number;
  avatar: string;
  active?: boolean;
}

interface ConversationMessage {
  from: "them" | "sojori";
  t: string;
  time: string;
}

function Inbox() {
  const t = useTranslations('inbox');
  const [active, setActive] = useState(1);

  const CHANNELS: Channel[] = [
    { id: "all", l: t('channels.all'), icon: "✦", count: 24 },
    { id: "wa", l: t('channels.whatsapp'), icon: "💬", color: "#25D366", count: 12 },
    { id: "ab", l: t('channels.airbnb'), icon: "A", color: "#FF5A5F", count: 6 },
    { id: "bk", l: t('channels.booking'), icon: "B", color: "#003580", count: 4 },
    { id: "em", l: t('channels.email'), icon: "@", color: "#a78bfa", count: 2 },
  ];

  const THREADS: Thread[] = [
    { id: 1, name: "Sarah Johnson", ch: "wa", color: "#25D366", preview: t('threads.thread1'), time: "2 min", unread: 0, avatar: "#f59e0b", active: true },
    { id: 2, name: "Marco Rossi", ch: "ab", color: "#FF5A5F", preview: t('threads.thread2'), time: "8 min", unread: 2, avatar: "#06b6d4" },
    { id: 3, name: "Emma Rodriguez", ch: "wa", color: "#25D366", preview: t('threads.thread3'), time: "14 min", unread: 0, avatar: "#a78bfa" },
    { id: 4, name: "James Park", ch: "ab", color: "#FF5A5F", preview: t('threads.thread4'), time: "34 min", unread: 0, avatar: "#10b981" },
    { id: 5, name: "Linh Nguyen", ch: "bk", color: "#003580", preview: t('threads.thread5'), time: "1h", unread: 1, avatar: "#ec4899" },
    { id: 6, name: "Carlos M.", ch: "wa", color: "#25D366", preview: t('threads.thread6'), time: "2h", unread: 0, avatar: "#f97316" },
    { id: 7, name: "Wei Liu", ch: "em", color: "#a78bfa", preview: t('threads.thread7'), time: "3h", unread: 0, avatar: "#3b82f6" },
  ];
  return (
    <div className="inbox-container" style={{background: "rgba(10,10,16,0.6)", borderRadius: 12, border: "1px solid var(--glass-border)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", display: "flex", height: 480}}>
      <div className="inbox-channels" style={{width: 64, background: "rgba(0,0,0,0.3)", borderRight: "1px solid var(--glass-border)", padding: "10px 6px", display: "flex", flexDirection: "column", gap: 4, alignItems: "center"}}>
        {CHANNELS.map(c => (
          <div key={c.id} style={{
            width: 48, padding: "8px 4px", borderRadius: 8,
            background: c.id === "all" ? "rgba(244,207,94,0.12)" : "transparent",
            border: c.id === "all" ? "1px solid rgba(244,207,94,0.3)" : "1px solid transparent",
            textAlign: "center", cursor: "pointer", position: "relative",
          }}>
            <div style={{width: 26, height: 26, borderRadius: 6, background: c.color || "transparent", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto"}}>{c.icon}</div>
            <div style={{fontSize: 7, color: "var(--text-3)", marginTop: 3}}>{c.l}</div>
            {c.count > 0 && <span style={{position: "absolute", top: 2, right: 2, fontSize: 7, background: "#ef4444", color: "#fff", padding: "1px 4px", borderRadius: 999, fontWeight: 700}}>{c.count}</span>}
          </div>
        ))}
      </div>
      <div className="inbox-threads" style={{width: 260, borderRight: "1px solid var(--glass-border)", display: "flex", flexDirection: "column"}}>
        <div style={{padding: "10px 12px", borderBottom: "1px solid var(--glass-border)"}}>
          <div style={{fontSize: 11, fontWeight: 600, marginBottom: 6}}>{t('threadList.title')}</div>
          <div style={{background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", borderRadius: 6, padding: "5px 10px", fontSize: 10, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6}}>🔍 {t('threadList.searchPlaceholder')}</div>
        </div>
        <div style={{flex: 1, overflowY: "auto"}}>
          {THREADS.map(t => (
            <div key={t.id} onClick={() => setActive(t.id)} style={{
              padding: "8px 12px", display: "flex", gap: 10, cursor: "pointer",
              background: active === t.id ? "rgba(244,207,94,0.08)" : "transparent",
              borderLeft: active === t.id ? "2px solid #f4cf5e" : "2px solid transparent",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}>
              <div style={{position: "relative", flexShrink: 0}}>
                <div style={{width: 32, height: 32, borderRadius: "50%", background: t.avatar, fontSize: 11, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center"}}>{t.name.split(" ").map(p => p[0]).join("")}</div>
                <div style={{position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: 3, background: t.color, fontSize: 7, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #0a0a10"}}>{CHANNELS.find(c => c.id === t.ch)?.icon}</div>
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 2, gap: 6, minWidth: 0}}>
                  <span style={{fontSize: 11, fontWeight: 600, color: "var(--text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0, flex: 1}}>{t.name}</span>
                  <span style={{fontSize: 8, color: "var(--text-3)", fontFamily: "Geist Mono", flexShrink: 0}}>{t.time}</span>
                </div>
                <div style={{fontSize: 10, color: t.unread ? "var(--text-1)" : "var(--text-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: t.unread ? 500 : 400, lineHeight: 1.3}}>{t.preview}</div>
              </div>
              {t.unread > 0 && <div style={{width: 16, height: 16, borderRadius: 8, background: "#f4cf5e", color: "#1a1408", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center"}}>{t.unread}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="inbox-conversation" style={{flex: 1, display: "flex", flexDirection: "column"}}>
        <div style={{padding: "10px 14px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={{display: "flex", alignItems: "center", gap: 10}}>
            <div style={{width: 30, height: 30, borderRadius: "50%", background: "#f59e0b", fontSize: 11, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center"}}>SJ</div>
            <div>
              <div style={{fontSize: 11, fontWeight: 600}}>{t('conversation.header.name')}</div>
              <div style={{fontSize: 9, color: "var(--text-3)"}}>{t('conversation.header.details')}</div>
            </div>
          </div>
          <div className="inbox-buttons" style={{display: "flex", gap: 4}}>
            <button style={{background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", color: "var(--text-1)", padding: "4px 8px", borderRadius: 5, fontSize: 9, cursor: "pointer"}}>{t('conversation.buttons.guestProfile')}</button>
            <button style={{background: "rgba(244,207,94,0.1)", border: "1px solid rgba(244,207,94,0.3)", color: "#f4cf5e", padding: "4px 8px", borderRadius: 5, fontSize: 9, cursor: "pointer", fontWeight: 600}}>✨ {t('conversation.buttons.aiAssist')}</button>
          </div>
        </div>
        <div style={{flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 8, overflow: "auto"}}>
          {[
            { from: "them", t: t('conversation.messages.message1'), time: "14:00" },
            { from: "sojori", t: t('conversation.messages.message2'), time: "14:00" },
            { from: "them", t: t('conversation.messages.message3'), time: "14:55" },
            { from: "sojori", t: t('conversation.messages.message4'), time: "14:55" },
          ].map((m, i) => (
            <div key={i} style={{alignSelf: m.from === "them" ? "flex-start" : "flex-end", maxWidth: "70%"}}>
              <div style={{background: m.from === "them" ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, rgba(244,207,94,0.18), rgba(244,207,94,0.08))", border: m.from === "sojori" ? "1px solid rgba(244,207,94,0.3)" : "1px solid var(--glass-border)", borderRadius: m.from === "them" ? "10px 10px 10px 2px" : "10px 10px 2px 10px", padding: "8px 11px", fontSize: 11, color: "var(--text-1)", lineHeight: 1.4}}>
                {m.from === "sojori" && <div style={{fontSize: 7, color: "#f4cf5e", fontWeight: 700, letterSpacing: 0.5, marginBottom: 3, fontFamily: "Geist Mono"}}>✨ {t('conversation.messages.aiLabel')}</div>}
                {m.t}
                <div style={{fontSize: 7, color: "var(--text-3)", marginTop: 3, textAlign: "right", fontFamily: "Geist Mono"}}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{padding: "10px 14px", borderTop: "1px solid var(--glass-border)"}}>
          <div className="inbox-quick-actions" style={{display: "flex", gap: 4, marginBottom: 8}}>
            {[t('conversation.quickActions.confirmArrival'), t('conversation.quickActions.resendGPS'), t('conversation.quickActions.suggestDinner')].map(s => (
              <button key={s} style={{background: "rgba(244,207,94,0.08)", border: "1px solid rgba(244,207,94,0.25)", color: "#f4cf5e", padding: "4px 8px", borderRadius: 5, fontSize: 9, cursor: "pointer", whiteSpace: "nowrap"}}>{s}</button>
            ))}
          </div>
          <div style={{display: "flex", gap: 6, alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", borderRadius: 8, padding: "8px 11px"}}>
            <span style={{color: "var(--text-3)", fontSize: 12}}>📎</span>
            <input placeholder={t('conversation.input.placeholder')} style={{flex: 1, background: "transparent", border: "none", color: "var(--text-1)", fontSize: 11, outline: "none"}} />
            <button style={{background: "#f4cf5e", border: "none", color: "#1a1408", width: 28, height: 28, borderRadius: 6, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InboxPage() {
  const t = useTranslations('inbox');

  return (
    <>
      <style jsx global>{`
        @media (max-width: 1024px) {
          .inbox-container {
            transform: scale(0.85);
            transform-origin: top center;
          }
        }

        @media (max-width: 768px) {
          section { padding: 60px 20px !important; }

          div[style*="padding: '20px 32px 80px'"] { padding: 20px 20px 60px !important; }
          div[style*="padding: '40px 32px 80px'"] { padding: 40px 20px 60px !important; }

          .inbox-container {
            flex-direction: column !important;
            height: auto !important;
            min-height: 500px !important;
            transform: scale(1);
          }

          .inbox-channels {
            width: 100% !important;
            flex-direction: row !important;
            padding: 8px 6px !important;
            overflow-x: auto !important;
            border-right: none !important;
            border-bottom: 1px solid var(--glass-border);
          }

          .inbox-threads {
            width: 100% !important;
            max-height: 250px !important;
            border-right: none !important;
            border-bottom: 1px solid var(--glass-border);
          }

          .inbox-conversation {
            min-height: 300px !important;
          }

          .inbox-buttons {
            gap: 2px !important;
          }

          .inbox-buttons button {
            font-size: 8px !important;
            padding: 3px 6px !important;
          }

          .inbox-quick-actions {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
          }

          .btn {
            min-height: 44px !important;
            padding: 10px 16px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
      <BackgroundEffects />
      <div style={{position: "relative", zIndex: 1}}>
        <PageHeader pageTitle={t('pageTitle')} />
        <PageHero
          badge={t('hero.badge')}
          title={<>{t('hero.title')}<br /><span className="gradient-text">{t('hero.titleGradient')}</span></>}
          subtitle={t('hero.subtitle')}
          cta1={t('hero.cta1')} cta2={t('hero.cta2')}
        />
        <section style={{padding: "20px 32px 80px"}}>
          <div style={{maxWidth: 1280, margin: "0 auto"}}>
            <Inbox />
          </div>
        </section>
        <section style={{padding: "40px 32px 80px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{maxWidth: 1200, margin: "0 auto"}}>
            <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 12}}>{t('capabilities.badge')}</div>
            <div style={{fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, maxWidth: 700}}>{t('capabilities.title')} <span className="gradient-text">{t('capabilities.titleGradient')}</span></div>
            <ScrollPaginationDots itemCount={6} gap={16} peekCarousel>
              {Array.from({ length: 6 }, (_, i) => ({
                i: t(`capabilities.items.${i}.icon`),
                t: t(`capabilities.items.${i}.title`),
                d: t(`capabilities.items.${i}.description`)
              })).map(c => (
                <div key={c.t} data-carousel-slide className="card" style={{padding: 22, flexShrink: 0}}>
                  <div style={{fontSize: 28, marginBottom: 10}}>{c.i}</div>
                  <div style={{fontSize: 16, fontWeight: 600, marginBottom: 4}}>{c.t}</div>
                  <div style={{fontSize: 13, color: "var(--text-3)", lineHeight: 1.55}}>{c.d}</div>
                </div>
              ))}
            </ScrollPaginationDots>
          </div>
        </section>
        <StatsBar stats={[
          {k: t('stats.stat1.key'), l: t('stats.stat1.label')},
          {k: t('stats.stat2.key'), l: t('stats.stat2.label')},
          {k: t('stats.stat3.key'), l: t('stats.stat3.label')},
          {k: t('stats.stat4.key'), l: t('stats.stat4.label')}
        ]} />
        <FinalCTA title={<>{t('finalCTA.title')} <span className="gradient-text">{t('finalCTA.titleGradient')}</span></>} subtitle={t('finalCTA.subtitle')} />
        <PageFooter />
      </div>
    </>
  );
}
