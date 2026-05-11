"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA, SectionHead } from "@/components/SharedComponents";
import { ScrollPaginationDots } from "@/components/shared/ScrollPaginationDots";

// ========================================
// WhatsApp Phone Component (Réutilisable)
// ========================================

interface Message {
  from: "user" | "sojori" | "system";
  text: string;
  time: string;
  type?: "text" | "date" | "system";
  ext?: string;
  status?: "read" | "sent";
}

interface WhatsAppPhoneProps {
  title: string;
  subtitle: string;
  messages: Message[];
  time?: string;
}

function WhatsAppPhone({ title, subtitle, messages, time = "14:32" }: WhatsAppPhoneProps) {
  return (
    <div style={{
      width: 340, height: 680, borderRadius: 38, padding: 10,
      background: "linear-gradient(180deg, #f5f5f5, #e8e8e8)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08) inset",
      border: "1px solid rgba(0,0,0,0.08)",
      flexShrink: 0,
    }}>
      <div style={{width: "100%", height: "100%", borderRadius: 32, background: "#fff", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative"}}>
        {/* Dynamic Island */}
        <div style={{position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 110, height: 28, borderRadius: 14, background: "#000", zIndex: 10}} />

        {/* Status Bar */}
        <div style={{display: "flex", justifyContent: "space-between", padding: "14px 24px 8px", fontSize: 11, color: "#000", fontWeight: 600, fontFamily: "var(--font-mono)"}}>
          <span>{time}</span>
          <span>📶 5G ⚡ 87%</span>
        </div>

        {/* WhatsApp Header */}
        <div style={{background: "#075e54", padding: "14px 14px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(0,0,0,0.1)"}}>
          <span style={{color: "#fff", fontSize: 18}}>‹</span>
          <div style={{width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #f4cf5e, #e6b022)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#1a1408", position: "relative"}}>
            S
            <span style={{position: "absolute", bottom: 0, right: 0, width: 11, height: 11, borderRadius: "50%", background: "#10b981", border: "2px solid #075e54"}} />
          </div>
          <div style={{flex: 1, lineHeight: 1.2}}>
            <div style={{color: "#fff", fontSize: 13.5, fontWeight: 600}}>{title}</div>
            <div style={{color: "rgba(255,255,255,0.8)", fontSize: 10.5}}>{subtitle}</div>
          </div>
          <span style={{color: "#fff", fontSize: 15, opacity: 0.9}}>📞</span>
          <span style={{color: "#fff", fontSize: 15, opacity: 0.9}}>⋮</span>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          background: "#ece5dd",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23d9d2c5' opacity='0.4'%3E%3Cpath d='M30 5 L35 15 L30 25 L25 15 Z'/%3E%3Ccircle cx='10' cy='40' r='3'/%3E%3Ccircle cx='50' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          padding: "12px 10px",
          overflowY: "auto",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          {messages.map((m, i) => <Bubble key={i} {...m} />)}
        </div>

        {/* Input Area */}
        <div style={{background: "#f0f0f0", padding: "8px 10px", display: "flex", alignItems: "center", gap: 6, borderTop: "1px solid rgba(0,0,0,0.08)"}}>
          <div style={{flex: 1, background: "#fff", borderRadius: 22, padding: "9px 14px", color: "rgba(0,0,0,0.5)", fontSize: 12.5, display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(0,0,0,0.08)"}}>
            <span>😊</span>
            <span>Message</span>
            <span style={{marginLeft: "auto", opacity: 0.7}}>📎 📷</span>
          </div>
          <div style={{width: 38, height: 38, borderRadius: "50%", background: "#00a884", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16}}>🎤</div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ from, text, time, type = "text", ext, status }: Message) {
  const isUser = from === "user";
  const isAI = from === "sojori";

  if (type === "date") return <div style={{alignSelf: "center", background: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.6)", fontSize: 10, padding: "4px 11px", borderRadius: 11, margin: "6px 0", fontWeight: 500}}>{text}</div>;
  if (type === "system") return <div style={{alignSelf: "center", background: "rgba(255,217,90,0.2)", color: "#d4a017", fontSize: 10, padding: "5px 12px", borderRadius: 11, margin: "4px 0", display: "flex", alignItems: "center", gap: 5, fontWeight: 500}}>🔒 {text}</div>;

  return (
    <div style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "80%",
      background: isUser ? "#dcf8c6" : "#fff",
      borderRadius: isUser ? "13px 13px 2px 13px" : "13px 13px 13px 2px",
      padding: "8px 11px 5px",
      position: "relative",
      boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
      border: isAI ? "1px solid rgba(244,207,94,0.2)" : "none",
    }}>
      {isAI && <div style={{display: "flex", alignItems: "center", gap: 4, marginBottom: 4, color: "#f4cf5e", fontSize: 9, fontWeight: 600, fontFamily: "var(--font-mono)", letterSpacing: "0.6px"}}>✨ SOJORI AI</div>}
      <div style={{color: "#111", fontSize: 13, lineHeight: 1.45, whiteSpace: "pre-wrap"}}>{text}</div>
      {ext && <div style={{marginTop: 7, padding: 9, background: "rgba(0,0,0,0.05)", borderRadius: 7, fontSize: 11.5, color: "#111", lineHeight: 1.4, border: "1px solid rgba(0,0,0,0.08)"}}>{ext}</div>}
      <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3, marginTop: 3, fontSize: 9.5, color: "#667781"}}>
        <span>{time}</span>
        {isUser && <span style={{color: status === "read" ? "#53bdeb" : "#667781"}}>✓✓</span>}
      </div>
    </div>
  );
}

type WaSystemId = "guest" | "staff" | "admin" | "booking";

const WA_SECTION_ORDER: WaSystemId[] = ["staff", "admin", "booking", "guest"];

function GuestMenuBlock() {
  const t = useTranslations("whatsapp");
  const [more, setMore] = useState(false);
  const icons = ["📋", "🌍", "📅", "👥", "🔐", "🏠", "📋", "🧹", "🛎️", "🆘"];
  const keys = ["A", "B", "C", "E", "F", "G", "H", "I", "J", "K"];

  return (
    <>
      <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15 }}>
        {t("details.guest.title")} <span className="gradient-text">{t("details.guest.titleGradient")}</span>
      </h2>
      <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28 }}>
        {t("details.guest.description")}
      </p>

      <div className="wa-detail-block" style={{ marginBottom: 12 }}>
        <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 14 }}>{t("details.guest.menuTitle")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {keys.slice(0, 5).map((key, idx) => {
            const menuItem = t.raw(`details.guest.menu.${idx}`) as { key: string; label: string };
            return (
              <div key={key} className="wa-detail-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", borderRadius: 10 }}>
                <div className="mono" style={{ fontSize: 12, fontWeight: 700, color: "#25D366", width: 20 }}>{menuItem.key}</div>
                <div style={{ fontSize: 16 }}>{icons[idx]}</div>
                <div style={{ fontSize: 13.5, color: "var(--text-2)" }}>{menuItem.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <button type="button" className="btn btn-ghost" onClick={() => setMore((v) => !v)} style={{ marginBottom: more ? 16 : 8, alignSelf: "flex-start" }}>
        {more ? t("guestMenu.less") : t("guestMenu.more")}
      </button>

      {more && (
        <div
          className="wa-guest-menu-more-row"
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            paddingBottom: 10,
            marginBottom: 24,
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {keys.slice(5).map((key, idx) => {
            const realIdx = idx + 5;
            const menuItem = t.raw(`details.guest.menu.${realIdx}`) as { key: string; label: string };
            return (
              <div
                key={key}
                className="wa-detail-card"
                style={{
                  flex: "0 0 auto",
                  minWidth: "min(288px, 88vw)",
                  maxWidth: 320,
                  scrollSnapAlign: "start",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  background: "rgba(37,211,102,0.07)",
                  border: "1px solid rgba(37,211,102,0.28)",
                  borderRadius: 12,
                }}
              >
                <div className="mono" style={{ fontSize: 12, fontWeight: 700, color: "#25D366", width: 20 }}>{menuItem.key}</div>
                <div style={{ fontSize: 16 }}>{icons[realIdx]}</div>
                <div style={{ fontSize: 13.5, color: "var(--text-2)" }}>{menuItem.label}</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="glass" style={{ padding: 18, borderRadius: 12 }}>
        <ScrollPaginationDots itemCount={3} gap={14} peekCarousel className="sj-peek-sm wa-stats-row">
          {[0, 1, 2].map((idx) => {
            const stat = t.raw(`details.guest.stats.${idx}`) as { key: string; label: string };
            return (
              <div key={idx} data-carousel-slide className="wa-stat-metric" style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 26, fontWeight: 700 }} className="gradient-text">{stat.key}</div>
                <div className="wa-stat-label" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 3 }}>{stat.label}</div>
              </div>
            );
          })}
        </ScrollPaginationDots>
      </div>
    </>
  );
}

function NonGuestDetails({ systemId }: { systemId: "staff" | "admin" | "booking" }) {
  const t = useTranslations("whatsapp");

  if (systemId === "staff") {
    return (
      <>
        <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15 }}>
          {t("details.staff.title")} <span className="gradient-text">{t("details.staff.titleGradient")}</span>
        </h2>
        <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28 }}>
          {t("details.staff.description")}
        </p>

        <div className="wa-detail-block" style={{ marginBottom: 28 }}>
          <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 14 }}>{t("details.staff.featuresTitle")}</div>
          <div className="wa-flow-menu-strip">
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const feature = t.raw(`details.staff.features.${idx}`) as { label: string; detail: string };
              const icons = ["📋", "📅", "📍", "✅", "⏱️", "🔔"];
              return (
                <div key={idx} className="wa-detail-card" style={{ display: "flex", gap: 12, padding: "12px 14px", background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 10 }}>
                  <div style={{ fontSize: 18 }}>{icons[idx]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 2 }}>{feature.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{feature.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass" style={{ padding: 18, borderRadius: 12 }}>
          <ScrollPaginationDots itemCount={3} gap={14} peekCarousel className="sj-peek-sm wa-stats-row">
            {[0, 1, 2].map((idx) => {
              const stat = t.raw(`details.staff.stats.${idx}`) as { key: string; label: string };
              return (
                <div key={idx} data-carousel-slide className="wa-stat-metric" style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 26, fontWeight: 700 }} className="gradient-text">{stat.key}</div>
                  <div className="wa-stat-label" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 3 }}>{stat.label}</div>
                </div>
              );
            })}
          </ScrollPaginationDots>
        </div>
      </>
    );
  }

  if (systemId === "admin") {
    return (
      <>
        <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15 }}>
          {t("details.admin.title")} <span className="gradient-text">{t("details.admin.titleGradient")}</span>
        </h2>
        <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28 }}>
          {t("details.admin.description")}
        </p>

        <div className="wa-detail-block" style={{ marginBottom: 28 }}>
          <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 14 }}>{t("details.admin.menuTitle")}</div>
          <div className="wa-flow-menu-strip">
            {["T", "D", "R", "M", "V", "L"].map((key, idx) => {
              const menuItem = t.raw(`details.admin.menu.${idx}`) as { key: string; label: string };
              const icons = ["✅", "📋", "📅", "💬", "⭐", "🎯"];
              const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f4cf5e", "#ec4899"];
              return (
                <div key={key} className="wa-detail-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `${colors[idx]}08`, border: `1px solid ${colors[idx]}30`, borderRadius: 10 }}>
                  <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: colors[idx], width: 20 }}>{menuItem.key}</div>
                  <div style={{ fontSize: 18 }}>{icons[idx]}</div>
                  <div style={{ fontSize: 14, color: "var(--text-2)", flex: 1 }}>{menuItem.label}</div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[idx], boxShadow: `0 0 10px ${colors[idx]}` }} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass" style={{ padding: 18, borderRadius: 12 }}>
          <ScrollPaginationDots itemCount={3} gap={14} peekCarousel className="sj-peek-sm wa-stats-row">
            {[0, 1, 2].map((idx) => {
              const stat = t.raw(`details.admin.stats.${idx}`) as { key: string; label: string };
              return (
                <div key={idx} data-carousel-slide className="wa-stat-metric" style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 26, fontWeight: 700 }} className="gradient-text">{stat.key}</div>
                  <div className="wa-stat-label" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 3 }}>{stat.label}</div>
                </div>
              );
            })}
          </ScrollPaginationDots>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15 }}>
        {t("details.booking.title")} <span className="gradient-text">{t("details.booking.titleGradient")}</span>
      </h2>
      <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28 }}>
        {t("details.booking.description")}
      </p>

      <div className="wa-detail-block" style={{ marginBottom: 28 }}>
        <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 14 }}>{t("details.booking.advantagesTitle")}</div>
        <div className="wa-flow-menu-strip">
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const advantage = t.raw(`details.booking.advantages.${idx}`) as { label: string; detail: string };
            const icons = ["💰", "🔄", "💳", "⚡", "📊", "🎁"];
            const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899", "#f4cf5e"];
            return (
              <div key={idx} className="wa-detail-card" style={{ display: "flex", gap: 12, padding: "12px 14px", background: `${colors[idx]}08`, border: `1px solid ${colors[idx]}30`, borderRadius: 10 }}>
                <div style={{ fontSize: 18 }}>{icons[idx]}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 2 }}>{advantage.label}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>{advantage.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass" style={{ padding: 18, borderRadius: 12 }}>
        <ScrollPaginationDots itemCount={3} gap={14} peekCarousel className="sj-peek-sm wa-stats-row">
          {[0, 1, 2].map((idx) => {
            const stat = t.raw(`details.booking.stats.${idx}`) as { key: string; label: string };
            return (
              <div key={idx} data-carousel-slide className="wa-stat-metric" style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 26, fontWeight: 700 }} className="gradient-text">{stat.key}</div>
                <div className="wa-stat-label" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 3 }}>{stat.label}</div>
              </div>
            );
          })}
        </ScrollPaginationDots>
      </div>
    </>
  );
}

// ========================================
// Main Component
// ========================================

export default function WhatsAppPage() {
  const t = useTranslations("whatsapp");

  // Build SYSTEMS array from translations
  const SYSTEMS = [
    {
      id: "guest",
      label: t("systems.guest.label"),
      badge: t("systems.guest.badge"),
      icon: "🌟",
      color: "#25D366",
      stat: t("systems.guest.stat")
    },
    {
      id: "staff",
      label: t("systems.staff.label"),
      badge: t("systems.staff.badge"),
      icon: "🔧",
      color: "#34d399",
      stat: t("systems.staff.stat")
    },
    {
      id: "admin",
      label: t("systems.admin.label"),
      badge: t("systems.admin.badge"),
      icon: "📊",
      color: "#a78bfa",
      stat: t("systems.admin.stat")
    },
    {
      id: "booking",
      label: t("systems.booking.label"),
      badge: t("systems.booking.badge"),
      icon: "🎫",
      color: "#f59e0b",
      stat: t("systems.booking.stat")
    },
  ];

  // Build messages arrays from translations
  const GUEST_MESSAGES: Message[] = [
    { from: "system", type: "date", text: t("messages.guest.today"), time: "" },
    { from: "sojori", text: t("messages.guest.welcome"), time: "13:00" },
    { from: "sojori", text: t("messages.guest.access"), ext: t("messages.guest.wifi"), time: "13:00" },
    { from: "user", text: t("messages.guest.userQuestion"), time: "13:15", status: "read" },
    { from: "sojori", text: t("messages.guest.aiResponse"), time: "13:16" },
    { from: "user", text: t("messages.guest.userThanks"), time: "13:17", status: "read" },
    { from: "system", type: "system", text: t("messages.guest.checkinComplete"), time: "" },
  ];

  const STAFF_MESSAGES: Message[] = [
    { from: "system", type: "date", text: t("messages.staff.today"), time: "" },
    { from: "sojori", text: t("messages.staff.tasks"), time: "08:30" },
    { from: "user", text: t("messages.staff.received"), time: "08:45", status: "read" },
    { from: "sojori", text: t("messages.staff.confirmation"), time: "08:45" },
    { from: "system", type: "system", text: t("messages.staff.taskStarted"), time: "" },
    { from: "user", text: t("messages.staff.taskComplete"), time: "10:20", status: "read" },
    { from: "sojori", text: t("messages.staff.validation"), time: "10:21" },
  ];

  const ADMIN_MESSAGES: Message[] = [
    { from: "system", type: "date", text: t("messages.admin.monday"), time: "" },
    { from: "sojori", text: t("messages.admin.dashboard"), time: "15:00" },
    { from: "user", text: t("messages.admin.userCommand"), time: "15:05", status: "read" },
    { from: "sojori", text: t("messages.admin.messagesList"), time: "15:05" },
    { from: "user", text: t("messages.admin.userChoice"), time: "15:06", status: "read" },
    { from: "sojori", text: t("messages.admin.transferred"), time: "15:06" },
  ];

  const BOOKING_MESSAGES: Message[] = [
    { from: "system", type: "date", text: t("messages.booking.tuesday"), time: "" },
    { from: "user", text: t("messages.booking.userRequest"), time: "10:00", status: "read" },
    { from: "sojori", text: t("messages.booking.available"), time: "10:01" },
    { from: "user", text: t("messages.booking.userInterest"), time: "10:03", status: "read" },
    { from: "sojori", text: t("messages.booking.pricing"), time: "10:03" },
    { from: "user", text: t("messages.booking.userBook"), time: "10:05", status: "read" },
    { from: "system", type: "system", text: t("messages.booking.paymentReceived"), time: "" },
    { from: "sojori", text: t("messages.booking.confirmed"), time: "10:06" },
  ];

  function messagesFor(sid: WaSystemId): Message[] {
    if (sid === "guest") return GUEST_MESSAGES;
    if (sid === "staff") return STAFF_MESSAGES;
    if (sid === "admin") return ADMIN_MESSAGES;
    return BOOKING_MESSAGES;
  }

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 22px 16px !important; }

          /* Use cases grid - scroll horizontal on mobile */
          .use-cases-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          .use-cases-grid > * {
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
            min-width: 280px !important;
            max-width: 320px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(4, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 12px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(4, 1fr)'"] > * {
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }

          div[style*="gridTemplateColumns: '380px 1fr'"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] > * {
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }

          div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] > * {
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }

          div[style*="gridTemplateColumns: 'repeat(7, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 12px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(7, 1fr)'"] > * {
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }

          div[style*="width: 340"] {
            width: 100% !important;
            max-width: 340px !important;
            margin: 0 auto !important;
          }

          .btn {
            min-height: 44px !important;
            padding: 12px 20px !important;
          }

          .wa-anchor-section {
            scroll-margin-top: 88px;
          }

          .wa-section-nav {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 6px;
            scroll-snap-type: x proximity;
          }

          .wa-section-nav a {
            scroll-snap-align: start;
            flex: 0 0 auto;
          }

          /*
           * Page /whatsapp uniquement : mobile — meilleure lecture, sans toucher au desktop.
           * Texte avant le mockup, grille plus serrée, typo et cartes un peu plus compactes.
           */
          .whatsapp-page .wa-split-flow {
            gap: 22px !important;
          }

          .whatsapp-page .wa-split-copy {
            order: -1;
          }

          .whatsapp-page .wa-split-phone {
            order: 1;
          }

          .whatsapp-page .wa-anchor-section {
            padding-top: 28px !important;
            padding-bottom: 40px !important;
          }

          .whatsapp-page .wa-anchor-section > div > .uppercase-sm:first-of-type {
            margin-bottom: 16px !important;
          }

          .whatsapp-page .wa-split-copy h2 {
            font-size: clamp(26px, 6.5vw, 34px) !important;
            line-height: 1.12 !important;
            margin-bottom: 10px !important;
          }

          .whatsapp-page .wa-split-copy > p {
            font-size: 14.5px !important;
            line-height: 1.5 !important;
            margin-bottom: 18px !important;
          }

          .whatsapp-page .wa-split-copy .wa-detail-block {
            margin-bottom: 18px !important;
          }

          .whatsapp-page .wa-split-copy .wa-detail-card {
            padding: 10px 12px !important;
            gap: 10px !important;
          }

          .whatsapp-page .wa-split-copy .wa-flow-menu-strip {
            gap: 8px !important;
          }

          .whatsapp-page .wa-split-copy .glass {
            padding: 12px 10px !important;
            border-radius: 11px !important;
          }

          .whatsapp-page .wa-split-phone {
            transform: scale(0.94);
            transform-origin: center top;
          }

          .whatsapp-page .wa-jump-nav {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-bottom: 20px !important;
          }

          .whatsapp-page .wa-section-nav a {
            padding: 9px 14px !important;
            font-size: 12px !important;
          }
        }

        @media (min-width: 769px) {
          .whatsapp-page .wa-split-copy,
          .whatsapp-page .wa-split-phone {
            order: unset !important;
            transform: none !important;
          }

          /* Use cases grid - 4 columns on desktop */
          .use-cases-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            overflow-x: visible !important;
            scroll-snap-type: none !important;
          }

          .use-cases-grid > * {
            min-width: unset !important;
            max-width: unset !important;
          }
        }
      `}</style>
      <BackgroundEffects />
      <div className="whatsapp-page" style={{ position: "relative", zIndex: 1 }}>
        <PageHeader pageTitle={t("pageTitle")} />

        {/* Hero */}
        <PageHero
          badge={t("hero.badge")}
          title={<>{t("hero.title")}<br /><span className="gradient-text">{t("hero.titleGradient")}</span></>}
          subtitle={t("hero.subtitle")}
        />

        {/* Jump nav — les 4 flux visibles (scroll horizontal), sans onglet caché */}
        <section className="wa-jump-nav" style={{ padding: "0 32px 28px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <nav className="wa-section-nav" aria-label="WhatsApp flows">
              {WA_SECTION_ORDER.map((sid) => {
                const sys = SYSTEMS.find((s) => s.id === sid)!;
                return (
                  <a
                    key={sid}
                    href={`#wa-${sid}`}
                    style={{
                      padding: "12px 18px",
                      borderRadius: 999,
                      border: `1.5px solid ${sys.color}45`,
                      background: `linear-gradient(135deg, ${sys.color}14, rgba(255,255,255,0.02))`,
                      textDecoration: "none",
                      color: "var(--text-1)",
                      fontWeight: 600,
                      fontSize: 13,
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span aria-hidden>{sys.icon}</span>
                    {sys.label}
                  </a>
                );
              })}
            </nav>
            <p className="uppercase-sm" style={{ marginTop: 14, color: "var(--text-3)", lineHeight: 1.5 }}>
              {t("sectionNav.hint")}
            </p>
          </div>
        </section>

        {/* 4 blocs écran + texte : Staff → Admin → Booking → Guest (en bas) */}
        {WA_SECTION_ORDER.map((sid, sectionIdx) => {
          const sys = SYSTEMS.find((s) => s.id === sid)!;
          const msgs = messagesFor(sid);
          const title = t(`phone.${sid}.title`);
          const subtitle = t(`phone.${sid}.subtitle`);
          return (
            <section
              key={sid}
              id={`wa-${sid}`}
              className="wa-anchor-section"
              style={{
                padding: "20px 32px 40px",
                borderTop: sectionIdx === 0 ? "1px solid var(--glass-border)" : "1px solid var(--glass-border)",
                background: sid === "guest"
                  ? "linear-gradient(180deg, rgba(37,211,102,0.04), transparent 55%)"
                  : sectionIdx % 2 === 1
                    ? "linear-gradient(180deg, transparent, rgba(139,92,246,0.03) 45%, transparent)"
                    : undefined,
              }}
            >
              <div style={{ maxWidth: 1150, margin: "0 auto" }}>
                <div className="uppercase-sm" style={{ color: "var(--text-3)", textAlign: "center", marginBottom: 24 }}>
                  ● {sys.badge}
                </div>

                <div className="sj-mobile-hscroll wa-split-flow" style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 70, alignItems: "center" }}>
                  <div className="wa-split-phone" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: "-50px",
                        background: `radial-gradient(circle, ${sys.color}22, transparent 70%)`,
                        pointerEvents: "none",
                        filter: "blur(40px)",
                      }}
                    />
                    <WhatsAppPhone title={title} subtitle={subtitle} messages={msgs} />
                  </div>

                  <div className="wa-split-copy">
                    {sid === "guest" ? <GuestMenuBlock /> : <NonGuestDetails systemId={sid} />}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Benefits Section */}
        <section style={{padding: "36px 32px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{maxWidth: 1200, margin: "0 auto"}}>
            <SectionHead
              badge={t("benefits.badge")}
              title={<>{t("benefits.title")} <span className="gradient-text">{t("benefits.titleGradient")}</span></>}
              subtitle={t("benefits.subtitle")}
            />

            <ScrollPaginationDots itemCount={6} gap={16} peekCarousel>
              {[0, 1, 2, 3, 4, 5].map(idx => {
                const benefit = t.raw(`benefits.items.${idx}`);
                const icons = ["🤖", "⚡", "🔄", "📊", "🔐", "📈"];
                return (
                  <div key={idx} data-carousel-slide className="card" style={{padding: 22, flexShrink: 0}}>
                    <div style={{fontSize: 32, marginBottom: 12}}>{icons[idx]}</div>
                    <div style={{fontSize: 16, fontWeight: 600, marginBottom: 6}}>{benefit.title}</div>
                    <div style={{fontSize: 13, color: "var(--text-3)", lineHeight: 1.5}}>{benefit.description}</div>
                  </div>
                );
              })}
            </ScrollPaginationDots>
          </div>
        </section>

        {/* Use Cases */}
        <section style={{padding: "36px 32px", background: "linear-gradient(180deg, transparent, rgba(139,92,246,0.03) 50%, transparent)"}}>
          <div style={{maxWidth: 1400, margin: "0 auto"}}>
            <SectionHead
              badge={t("useCases.badge")}
              title={<>{t("useCases.title")} <span className="gradient-text">{t("useCases.titleGradient")}</span></>}
              subtitle={t("useCases.subtitle")}
            />

            <div className="use-cases-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
              marginTop: 50
            }}>
              {[0, 1, 2, 3].map(caseIdx => {
                const useCase = t.raw(`useCases.cases.${caseIdx}`);
                const colors = ["#25D366", "#3b82f6", "#f59e0b", "#10b981"];
                return (
                  <div key={caseIdx} className="glass" style={{padding: 24, borderRadius: 14, border: `1px solid ${colors[caseIdx]}30`}}>
                    <div style={{fontSize: 18, fontWeight: 700, marginBottom: 16, color: "var(--text-1)"}}>{useCase.title}</div>
                    <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                      {useCase.steps.map((step: string, i: number) => (
                        <div key={i} style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
                          <div style={{
                            minWidth: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: `${colors[caseIdx]}20`,
                            border: `1.5px solid ${colors[caseIdx]}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: colors[caseIdx],
                            marginTop: 2
                          }}>
                            {i + 1}
                          </div>
                          <div style={{fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.5, flex: 1}}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WhatsApp AI Admin Flow - Full Cycle */}
        <section style={{padding: "44px 32px", borderTop: "1px solid var(--glass-border)", background: "linear-gradient(180deg, rgba(139,92,246,0.02), transparent)"}}>
          <div style={{maxWidth: 1400, margin: "0 auto"}}>
            <SectionHead
              badge={t("fullCycle.badge")}
              title={<>{t("fullCycle.title")} <span className="gradient-text">{t("fullCycle.titleGradient")}</span></>}
              subtitle={t("fullCycle.subtitle")}
            />

            {/* Flow en 7 étapes - Cycle complet */}
            <div className="wa-fullcycle-wrap" style={{ marginTop: 50, position: "relative" }}>
              {/* Connecting gradient line — derrière les cartes (z-index via globals) */}
              <div
                className="wa-fullcycle-connector"
                style={{
                  position: "absolute",
                  top: "clamp(24px, 3.5vw, 34px)",
                  left: "5%",
                  right: "5%",
                  height: 3,
                  background: "linear-gradient(90deg, #FF5A5F, #8b5cf6, #25D366, #f4cf5e, #06b6d4, #8b5cf6, #FF5A5F)",
                  opacity: 0.35,
                  borderRadius: 2,
                  pointerEvents: "none",
                }}
              />

              <ScrollPaginationDots itemCount={7} gap={10} peekCarousel className="sj-peek-sm wa-fullcycle-steps">
                {[0, 1, 2, 3, 4, 5, 6].map(idx => {
                  const step = t.raw(`fullCycle.steps.${idx}`);
                  const colors = ["#FF5A5F", "#8b5cf6", "#25D366", "#f4cf5e", "#06b6d4", "#8b5cf6", "#FF5A5F"];
                  const icons = ["🏠", "📥", "💬", "🧠", "✅", "📤", "✈️"];
                  return (
                    <div key={idx} data-carousel-slide style={{position: "relative", zIndex: 1, flexShrink: 0}}>
                      <div className="card wa-fullcycle-card" style={{
                        padding: 16,
                        textAlign: "center",
                        background: `linear-gradient(135deg, ${colors[idx]}10, rgba(255,255,255,0.03))`,
                        border: `2px solid ${colors[idx]}30`
                      }}>
                        <div className="wa-fullcycle-icon" style={{
                          width: 50,
                          height: 50,
                          margin: "0 auto 12px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${colors[idx]}, ${colors[idx]}cc)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                          boxShadow: `0 6px 16px ${colors[idx]}30`
                        }}>{icons[idx]}</div>
                        <div className="wa-fullcycle-title" style={{fontSize: 13, fontWeight: 700, marginBottom: 6, color: "var(--text-1)"}}>{step.title}</div>
                        <div className="wa-fullcycle-desc" style={{fontSize: 11, color: "var(--text-3)", lineHeight: 1.4, marginBottom: 10, whiteSpace: "pre-line"}}>
                          {step.description}
                        </div>
                        <div className="glass wa-fullcycle-msg" style={{padding: 8, fontSize: 10, fontStyle: "italic", color: "var(--text-2)", borderRadius: 6, lineHeight: 1.3, whiteSpace: "pre-line"}}>
                          {step.message}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollPaginationDots>
            </div>

            {/* Mode Pilote Automatique */}
            <div className="card wa-autopilot-card" style={{
              marginTop: 50,
              padding: 32,
              background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))",
              border: "2px solid rgba(139,92,246,0.4)",
              borderRadius: 16
            }}>
              <div style={{display: "flex", alignItems: "center", gap: 20}}>
                <div
                  className="wa-autopilot-robot"
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    flexShrink: 0,
                    boxShadow: "0 12px 30px rgba(139,92,246,0.45), 0 0 0 2px rgba(255,255,255,0.12) inset",
                  }}
                  aria-hidden
                >
                  🤖
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em"}}>
                    {t("fullCycle.autopilot.title")} <span className="gradient-text">{t("fullCycle.autopilot.titleGradient")}</span>
                  </div>
                  <div style={{fontSize: 15, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 12}}>
                    {t("fullCycle.autopilot.description")}
                  </div>
                  <div style={{display: "flex", gap: 12, flexWrap: "wrap"}}>
                    {[0, 1, 2, 3].map(idx => {
                      const feature = t.raw(`fullCycle.autopilot.features.${idx}`);
                      const icons = ["⚡", "🌙", "👁️", "🔔"];
                      const colors = ["#f59e0b", "#8b5cf6", "#06b6d4", "#ef4444"];
                      return (
                        <div
                          key={idx}
                          className="wa-autopilot-chip"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 14px",
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 600,
                            border: `1px solid ${colors[idx]}55`,
                          }}
                        >
                          <span aria-hidden>{icons[idx]}</span>
                          <span style={{ color: "var(--text-1)" }}>{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsBar stats={[0, 1, 2, 3].map(idx => {
          const stat = t.raw(`stats.${idx}`);
          return { k: stat.key, l: stat.label };
        })} />

        {/* Final CTA */}
        <FinalCTA
          title={<>{t("finalCTA.title")} <span className="gradient-text">{t("finalCTA.titleGradient")}</span></>}
          subtitle={t("finalCTA.subtitle")}
        />

        <PageFooter />
      </div>
    </>
  );
}
