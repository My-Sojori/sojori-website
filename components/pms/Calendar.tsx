"use client";

interface BookingData {
  propIdx: number;
  startDay: number;
  length: number;
  color: string;
  label: string;
}

export function Calendar({ header, properties }: { header: string; properties: string[] }) {
  // Full month: 31 days starting from day 1
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const bookings: BookingData[] = [
    [0, 2, 5, '#FF5A5F', 'Sarah J. · Airbnb'],
    [0, 9, 7, '#003580', 'Marco R. · Booking'],
    [0, 18, 6, '#0E64A4', 'Emma · Vrbo'],
    [0, 26, 4, '#FF5A5F', 'Lisa M. · Airbnb'],
    [1, 3, 6, '#FF5A5F', 'James P. · Airbnb'],
    [1, 12, 10, '#003580', 'Wei L. · Booking'],
    [1, 24, 5, '#0E64A4', 'Nina T. · Vrbo'],
    [2, 1, 8, '#FF5A5F', 'Carlos · Airbnb'],
    [2, 11, 5, '#FFC72C', 'Linh N. · Expedia'],
    [2, 18, 9, '#003580', 'Ahmed R. · Booking'],
    [3, 5, 7, '#003580', 'Yumi K. · Booking'],
    [3, 14, 6, '#FF5A5F', 'Ali B. · Airbnb'],
    [3, 22, 8, '#0E64A4', 'Kim S. · Vrbo'],
    [4, 2, 8, '#FF5A5F', 'Diego · Airbnb'],
    [4, 12, 5, '#003580', 'Sofia · Booking'],
    [4, 19, 7, '#FFC72C', 'Tom W. · Expedia'],
    [4, 27, 4, '#FF5A5F', 'Julia P. · Airbnb'],
  ].map((b) => ({ propIdx: b[0] as number, startDay: b[1] as number, length: b[2] as number, color: b[3] as string, label: b[4] as string }));

  const colW = 38;
  const rowH = 50;
  const headW = 160;

  // ScrollPaginationDots only for mobile
  const daysPerView = 7;
  const itemWidth = daysPerView * colW;
  const itemCount = Math.ceil(days.length / daysPerView);

  return (
    <div className="pms-calendar-wrapper">
      <div className="pms-calendar-card card" style={{ padding: 0, overflowX: 'auto' }}>
        <div className="pms-calendar-inner" style={{ minWidth: headW + days.length * colW }}>
        <div className="pms-calendar-header" style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, background: 'rgba(20,20,28,0.95)', backdropFilter: 'blur(10px)', zIndex: 2 }}>
          <div className="pms-calendar-header-label" style={{ width: headW, padding: '14px 18px', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1 }}>{header}</div>
          {days.map((d) => (
            <div key={d} className="pms-calendar-day" style={{ width: colW, padding: '14px 0', textAlign: 'center', fontSize: 11, color: d === 12 ? '#f4cf5e' : 'var(--text-3)', fontFamily: 'Geist Mono', fontWeight: d === 12 ? 700 : 400, borderLeft: '1px solid rgba(255,255,255,0.04)' }}>{d}</div>
          ))}
        </div>
        {properties.map((p, i) => (
          <div key={p} className="pms-calendar-row" style={{ display: 'flex', borderBottom: i < properties.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', position: 'relative', height: rowH }}>
            <div className="pms-calendar-property-name" style={{ width: headW, padding: '14px 18px', fontSize: 13, fontWeight: 500, color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.4)' }} />
              {p}
            </div>
            <div style={{ position: 'relative', flex: 1, height: rowH }}>
              {days.map((d, j) => (
                <div key={d} style={{ position: 'absolute', left: j * colW, top: 0, width: colW, height: rowH, borderLeft: '1px solid rgba(255,255,255,0.03)' }} />
              ))}
              {bookings.filter((b) => b.propIdx === i).map((b, k) => {
                const { startDay, length, color, label } = b;
                return (
                  <div
                    key={k}
                    className="pms-calendar-booking"
                    style={{
                      position: 'absolute',
                      left: (startDay - 1) * colW + 3,
                      top: 9,
                      height: rowH - 18,
                      width: length * colW - 6,
                      background: `linear-gradient(135deg, ${color}dd, ${color}aa)`,
                      border: `1px solid ${color}`,
                      borderRadius: 7,
                      padding: '4px 8px',
                      fontSize: 10,
                      color: '#fff',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      boxShadow: `0 4px 10px ${color}44`,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Mobile optimizations */}
      <style jsx global>{`
        /* Section responsiveness for parent */
        @media (max-width: 768px) {
          section:has(.pms-calendar-card) {
            padding: 16px 16px 60px !important;
          }

          section:has(.pms-calendar-card) .uppercase-sm {
            font-size: 9px !important;
            margin-bottom: 10px !important;
          }

          section:has(.pms-calendar-card) > div > div:nth-child(2) {
            font-size: 22px !important;
            margin-bottom: 24px !important;
            padding: 0 12px;
          }
        }

        @media (max-width: 480px) {
          section:has(.pms-calendar-card) {
            padding: 12px 12px 50px !important;
          }

          section:has(.pms-calendar-card) .uppercase-sm {
            font-size: 8px !important;
            margin-bottom: 8px !important;
          }

          section:has(.pms-calendar-card) > div > div:nth-child(2) {
            font-size: 18px !important;
            margin-bottom: 20px !important;
            line-height: 1.3 !important;
          }
        }
      `}</style>

      <style jsx>{`
        .pms-calendar-card {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(139,92,246,0.3) rgba(255,255,255,0.05);
        }

        .pms-calendar-card::-webkit-scrollbar {
          height: 8px;
        }

        .pms-calendar-card::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }

        .pms-calendar-card::-webkit-scrollbar-thumb {
          background: rgba(139,92,246,0.3);
          border-radius: 4px;
        }

        .pms-calendar-card::-webkit-scrollbar-thumb:hover {
          background: rgba(139,92,246,0.5);
        }

        .pms-calendar-booking:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }

        /* Desktop: no scroll, show everything */
        @media (min-width: 769px) {
          .pms-calendar-card {
            overflow-x: visible !important;
          }
          .pms-calendar-inner {
            width: 100% !important;
            min-width: auto !important;
          }
        }

        /* Mobile: enable horizontal scroll */
        @media (max-width: 768px) {
          .pms-calendar-card {
            overflow-x: auto !important;
            scrollbar-width: thin;
          }
        }

        @media (max-width: 768px) {
          .pms-calendar-header-label {
            width: 90px !important;
            padding: 8px 10px !important;
            font-size: 7px !important;
            letter-spacing: 0.3px !important;
          }

          .pms-calendar-day {
            width: 28px !important;
            padding: 8px 0 !important;
            font-size: 8px !important;
          }

          .pms-calendar-row {
            height: 38px !important;
          }

          .pms-calendar-property-name {
            width: 90px !important;
            padding: 8px 10px !important;
            font-size: 9px !important;
            gap: 4px !important;
          }

          .pms-calendar-property-name > div:first-child {
            width: 4px !important;
            height: 4px !important;
          }

          .pms-calendar-booking {
            font-size: 7px !important;
            padding: 2px 5px !important;
            border-radius: 5px !important;
          }
        }

        @media (max-width: 480px) {
          .pms-calendar-header-label {
            width: 70px !important;
            padding: 6px 8px !important;
            font-size: 6px !important;
          }

          .pms-calendar-day {
            width: 24px !important;
            padding: 6px 0 !important;
            font-size: 7px !important;
          }

          .pms-calendar-row {
            height: 32px !important;
          }

          .pms-calendar-property-name {
            width: 70px !important;
            padding: 6px 8px !important;
            font-size: 7.5px !important;
          }

          .pms-calendar-booking {
            font-size: 6px !important;
            padding: 2px 4px !important;
          }
        }
      `}</style>
    </div>
  );
}
