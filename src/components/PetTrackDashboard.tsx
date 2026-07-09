"use client";

import { useEffect, useRef, useState } from "react";

export default function PetTrackDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [bpm, setBpm] = useState(92);

  useEffect(() => {
    // --- ECG logic ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let offset = 0;
    const W = canvas.width;
    const H = canvas.height;
    const mid = H / 2;

    const ecgFunction = (x: number) => {
      const c = x % 60;
      if (c < 20) return 0;
      if (c < 24) return -(c - 20) * 2.5;
      if (c < 26) return (c - 24) * 12;
      if (c < 28) return 24 - (c - 26) * 16;
      if (c < 30) return -8 + (c - 28) * 8;
      if (c < 34) return (c - 30) * 1.5;
      if (c < 38) return 6 - (c - 34) * 1.5;
      return 0;
    };

    let animationFrameId: number;
    const drawEcg = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.strokeStyle = "#4d9e1a";
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      for (let px = 0; px <= W; px++) {
        const y = mid - ecgFunction((px + offset) * 0.55);
        px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
      }
      ctx.stroke();
      offset += 1.4;
      animationFrameId = requestAnimationFrame(drawEcg);
    };
    drawEcg();

    // --- GPS dot logic ---
    let ang = 0;
    let dotAnimationFrameId: number;
    const moveDot = () => {
      ang += 0.008;
      const cx = 55 + Math.cos(ang) * 16;
      const cy = 50 + Math.sin(ang) * 10;
      if (dotRef.current) {
        dotRef.current.style.left = `${cx}%`;
        dotRef.current.style.top = `${cy}%`;
      }
      dotAnimationFrameId = requestAnimationFrame(moveDot);
    };
    moveDot();

    // --- BPM variation ---
    const bpmInterval = setInterval(() => {
      setBpm((prev) => {
        const change =
          Math.random() * 2 *
          (prev > 96 ? -1 : prev < 88 ? 1 : Math.random() > 0.5 ? 1 : -1);
        return Math.round(prev + change);
      });
    }, 1200);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(dotAnimationFrameId);
      clearInterval(bpmInterval);
    };
  }, []);

  return (
    <>
      <style>{`
        .pettrack-scene {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 900px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: transparent;
        }
        .phone-wrap {
          animation: ptFloatY 4s ease-in-out infinite, ptRotateIn .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes ptFloatY {
          0%, 100% { transform: rotateY(-12deg) rotateX(4deg) translateY(0px); }
          50% { transform: rotateY(-12deg) rotateX(4deg) translateY(-12px); }
        }
        @keyframes ptRotateIn {
          from { transform: rotateY(-80deg) rotateX(10deg) scale(.7); opacity: 0; }
          to { transform: rotateY(-12deg) rotateX(4deg) scale(1); opacity: 1; }
        }
        .pt-phone {
          width: 230px;
          height: 480px;
          background: linear-gradient(160deg, #1a1a1a, #0d0d0d);
          border-radius: 40px;
          padding: 10px;
          border: 1.5px solid #333;
          position: relative;
        }
        .pt-phone::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 40px;
          background: linear-gradient(135deg, rgba(255,255,255,.07) 0%, transparent 60%);
          pointer-events: none;
          z-index: 10;
        }
        .pt-screen {
          border-radius: 32px;
          overflow: hidden;
          background: #fff;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .pt-notch {
          background: #0d0d0d;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }
        .pt-notch-pill { background: #000; width: 70px; height: 14px; border-radius: 99px; }
        .pt-notch-time { position: absolute; left: 13px; font-size: 9px; color: #fff; font-weight: 500; }
        .pt-notch-sig { position: absolute; right: 13px; font-size: 8px; color: #fff; }

        .pt-content { flex: 1; overflow: hidden; display: flex; flex-direction: column; padding: 13px 12px 0; }

        .pt-gps-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #fff;
          border: .5px solid #e0e0e0;
          border-radius: 99px;
          padding: 4px 10px;
          font-size: 9px;
          color: #2e6b0a;
          font-weight: 600;
          margin-bottom: 10px;
          width: fit-content;
          animation: ptSlideDown .6s .5s both;
        }
        @keyframes ptSlideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        .pt-dot-blink {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4d9e1a;
          animation: ptBlinkDot 1.4s ease-in-out infinite;
        }
        @keyframes ptBlinkDot { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }

        .pt-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 9px; animation: ptFadeUp .5s .3s both; }
        @keyframes ptFadeUp { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        .pt-map-box { background: #eef4ea; border-radius: 10px; height: 90px; position: relative; overflow: hidden; margin-bottom: 9px; animation: ptFadeUp .5s .4s both; }
        .pt-map-dot { position: absolute; width: 10px; height: 10px; background: #2e6b0a; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 3px rgba(46,107,10,.2); z-index: 2; transform: translate(-50%, -50%); }
        .pt-map-ring { position: absolute; border: 1px solid rgba(46,107,10,.2); border-radius: 50%; animation: ptRipple 2.2s ease-out infinite; transform: translate(-50%, -50%); }
        @keyframes ptRipple { 0% { transform: translate(-50%, -50%) scale(1); opacity: .5; } 100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; } }

        .pt-stats-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 9px; animation: ptFadeUp .5s .5s both; }
        .pt-stat { background: #f8f8f8; border-radius: 9px; padding: 7px 6px; text-align: center; }
        .pt-stat-val { font-size: 14px; font-weight: 700; line-height: 1; }
        .pt-stat-lbl { font-size: 7px; color: #bbb; text-transform: uppercase; margin-top: 2px; }

        .pt-ecg-box { background: #f8f8f8; border-radius: 9px; padding: 7px 9px; margin-bottom: 9px; animation: ptFadeUp .5s .6s both; }
        .pt-ecg-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }

        .pt-zone-bar { background: #eaf3de; border-radius: 8px; padding: 6px 9px; display: flex; align-items: center; gap: 6px; animation: ptFadeUp .5s .7s both; }

        .pt-tabbar { height: 46px; display: flex; justify-content: space-around; align-items: center; border-top: .5px solid #e8e8e8; background: #fff; flex-shrink: 0; }
        .pt-tab { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 8px; }
      `}</style>

      <div className="pettrack-scene">
        <div className="phone-wrap">
          <div className="pt-phone">
            <div className="pt-screen">
              <div className="pt-notch">
                <span className="pt-notch-time">9:41</span>
                <div className="pt-notch-pill" />
                <span className="pt-notch-sig">▲ ▮▮▮</span>
              </div>

              <div className="pt-content">
                <div className="pt-gps-badge">
                  <div className="pt-dot-blink" />
                  GPS Activo
                </div>

                <div className="pt-header-row">
                  <div>
                    <div style={{ fontSize: 9, color: "#aaa" }}>Hola, Karen</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Panel de Max</div>
                  </div>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      backgroundColor: "#fff3f3",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#e24b4a",
                    }}
                  >
                    ♥
                  </div>
                </div>

                <div className="pt-map-box">
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                    <defs>
                      <pattern id="hero-mg" width="18" height="18" patternUnits="userSpaceOnUse">
                        <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(46,107,10,.1)" strokeWidth=".5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-mg)" />
                  </svg>
                  <div className="pt-map-ring" style={{ width: 50, height: 50, top: "50%", left: "55%", animationDelay: "0s" }} />
                  <div className="pt-map-ring" style={{ width: 50, height: 50, top: "50%", left: "55%", animationDelay: ".7s" }} />
                  <div className="pt-map-dot" ref={dotRef} style={{ top: "50%", left: "55%" }} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      background: "#fff",
                      borderRadius: 99,
                      padding: "3px 8px",
                      fontSize: 8,
                      color: "#27500a",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    🛡️ Protegido
                  </div>
                </div>

                <div className="pt-stats-row">
                  <div className="pt-stat">
                    <div className="pt-stat-val" style={{ color: "#e24b4a" }}>{bpm}</div>
                    <div className="pt-stat-lbl">BPM</div>
                  </div>
                  <div className="pt-stat">
                    <div className="pt-stat-val" style={{ color: "#ef9f27" }}>38.5°</div>
                    <div className="pt-stat-lbl">Temp</div>
                  </div>
                  <div className="pt-stat">
                    <div className="pt-stat-val" style={{ color: "#378add" }}>98%</div>
                    <div className="pt-stat-lbl">SpO2</div>
                  </div>
                </div>

                <div className="pt-ecg-box">
                  <div className="pt-ecg-header">
                    <span style={{ fontSize: 8, color: "#aaa" }}>ECG en vivo</span>
                    <span style={{ fontSize: 8, color: "#4d9e1a", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      <div className="pt-dot-blink" style={{ width: 5, height: 5 }} />
                      Normal
                    </span>
                  </div>
                  <canvas ref={canvasRef} width={180} height={32} style={{ width: "100%", height: 32, display: "block" }} />
                </div>

                <div className="pt-zone-bar">
                  <span>📍</span>
                  <span style={{ fontSize: 8, color: "#27500a", fontWeight: 500 }}>Max está seguro en zona autorizada</span>
                </div>
              </div>

              <div className="pt-tabbar">
                <div className="pt-tab" style={{ color: "#2e6b0a" }}>🏠<span>Inicio</span></div>
                <div className="pt-tab" style={{ color: "#bbb" }}>📍<span>GPS</span></div>
                <div className="pt-tab" style={{ color: "#bbb" }}>❤️<span>Salud</span></div>
                <div className="pt-tab" style={{ color: "#bbb" }}>🔔<span>Alertas</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
