"use client";

import { useEffect, useState } from "react";

const TARGET = "MECHNOVATE'26";
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-<>?/";

const MIN_DURATION = 3200;
const MAX_DURATION = 6500;
const HOLD_DURATION = 600;
const EXIT_DURATION = 800;

export default function Preloader() {
  const [displayText, setDisplayText] = useState("");
  const [offsets, setOffsets] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let animationFrame: number;
    let finishTimer: ReturnType<typeof setTimeout>;
    let holdTimer: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;
    let safetyTimer: ReturnType<typeof setTimeout>;

    const startTime = performance.now();

    // Calculate sequential lock time per character (smooth left-to-right cascade)
    const lockTimes = TARGET.split("").map((_, index) => 450 + index * 160);

    const randomChar = () =>
      CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

    const renderFrame = (elapsed: number, forceLocked = false) => {
      const nextOffsets: number[] = [];
      const currentActiveIndex = lockTimes.findIndex((time) => elapsed < time);

      const result = TARGET.split("")
        .map((char, index) => {
          const locked = forceLocked || elapsed >= lockTimes[index];
          nextOffsets.push(locked ? 0 : (Math.random() - 0.5) * 1.8);

          if (char === " " || locked) return char;

          // Sequential reveal: only scramble the active character position
          if (
            !forceLocked &&
            currentActiveIndex !== -1 &&
            index > currentActiveIndex
          ) {
            return " ";
          }

          return randomChar();
        })
        .join("");

      setDisplayText(result);
      setOffsets(nextOffsets);
    };

    renderFrame(0);

    let lastScrambleTime = 0;
    const SCRAMBLE_INTERVAL = 40; // Silky smooth character swapping speed

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const duration = lockTimes[lockTimes.length - 1] + 250;
      const raw = Math.min(elapsed / duration, 1);

      // Smooth ease-out curve for progress counter
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(eased * 100);

      if (elapsed - lastScrambleTime >= SCRAMBLE_INTERVAL) {
        lastScrambleTime = elapsed;
        renderFrame(elapsed);
      }

      const lockedCount = lockTimes.filter((time) => elapsed >= time).length;

      if (elapsed < MIN_DURATION || lockedCount < TARGET.length) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    const beginExit = () => {
      setExiting(true);
      exitTimer = setTimeout(() => setVisible(false), EXIT_DURATION);
    };

    const showCompleteThenExit = () => {
      setProgress(100);
      renderFrame(0, true);
      holdTimer = setTimeout(beginExit, HOLD_DURATION);
    };

    const finishLoading = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      finishTimer = setTimeout(showCompleteThenExit, remaining);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
    }

    safetyTimer = setTimeout(showCompleteThenExit, MAX_DURATION);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(finishTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  if (!visible) return null;

  const isFinalIndex = (index: number) => index === TARGET.length - 1;

  return (
    <>
      <div className={`mech-preloader${exiting ? " exiting" : ""}`}>
        {/* Background grid */}
        <div className="mech-preloader-grid" />

        {/* Ambient glow */}
        <div className="mech-preloader-glow" />

        {/* Corner HUD details */}
        <div className="mech-preloader-corner top-left">
          <span />
          <span />
          <span />
        </div>

        <div className="mech-preloader-corner top-right">
          <span />
          <span />
          <span />
        </div>

        <div className="mech-preloader-corner bottom-left">
          <span />
          <span />
          <span />
        </div>

        <div className="mech-preloader-corner bottom-right">
          <span />
          <span />
          <span />
        </div>

        {/* Main content */}
        <div className="mech-preloader-content">
          <div className="mech-preloader-status">
            <span className="mech-preloader-dot" />
            SYSTEM INITIALIZING
          </div>

          <div className="mech-preloader-title">
            {displayText.split("").map((char, index) => {
              const isLocked = char === TARGET[index];
              const isLast = isFinalIndex(index);

              let statusClass = "scrambling";
              if (char === " ") {
                statusClass = "hidden-char";
              } else if (isLocked) {
                statusClass = isLast ? "final-locked" : "locked";
              }

              return (
                <span
                  key={index}
                  className={statusClass}
                  style={
                    {
                      "--random-offset": offsets[index] ?? 0,
                    } as React.CSSProperties
                  }
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>

          {/* Progress */}
          <div className="mech-preloader-progress">
            <div className="mech-preloader-progress-track">
              <div
                className="mech-preloader-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mech-preloader-progress-meta">
              <span>BOOT SEQUENCE</span>
              <span>{Math.round(progress).toString().padStart(3, "0")}%</span>
            </div>
          </div>

          <div className="mech-preloader-line">
            <span />
            <span />
            <span />
          </div>

          <div className="mech-preloader-subtitle">
            MECHNOVATE ENGINEERING SYSTEMS
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .mech-preloader {
            position: fixed;
            inset: 0;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;

            background: var(--bg, #05080f);
            color: var(--text, #f5f5f7);

            font-family:
              var(--font-oxanium), "Oxanium", ui-monospace, SFMono-Regular,
              Menlo, Monaco, Consolas, monospace;

            opacity: 1;
            transform: scale(1);
            will-change: opacity, transform;

            transition:
              opacity ${EXIT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1),
              transform ${EXIT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .mech-preloader.exiting {
            opacity: 0;
            transform: scale(1.03);
            pointer-events: none;
          }

          /* GRID */
          .mech-preloader-grid {
            position: absolute;
            inset: 0;

            opacity: 0.34;

            background-image:
              linear-gradient(rgba(255, 79, 135, 0.045) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(255, 79, 135, 0.045) 1px,
                transparent 1px
              );

            background-size: 48px 48px;

            mask-image: radial-gradient(
              circle at center,
              black 0%,
              transparent 72%
            );

            pointer-events: none;
          }

          /* GLOW */
          .mech-preloader-glow {
            position: absolute;

            width: 520px;
            height: 320px;

            top: 50%;
            left: 50%;

            transform: translate(-50%, -50%);

            border-radius: 50%;

            background: radial-gradient(
              ellipse,
              rgba(255, 79, 135, 0.14) 0%,
              rgba(255, 79, 135, 0.045) 38%,
              transparent 72%
            );

            filter: blur(14px);

            pointer-events: none;
          }

          /* CONTENT */
          .mech-preloader-content {
            position: relative;
            z-index: 5;

            width: min(720px, calc(100% - 48px));

            display: flex;
            flex-direction: column;
            align-items: center;

            text-align: center;
          }

          /* STATUS */
          .mech-preloader-status {
            display: flex;
            align-items: center;
            gap: 9px;

            margin-bottom: 28px;

            color: rgba(245, 245, 247, 0.48);

            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.22em;

            animation: mech-status-in 600ms ease both;
          }

          .mech-preloader-dot {
            width: 6px;
            height: 6px;

            border-radius: 50%;

            background: var(--accent, #ff4f87);

            box-shadow:
              0 0 7px rgba(255, 79, 135, 0.85),
              0 0 16px rgba(255, 79, 135, 0.3);

            animation: mech-dot-pulse 850ms ease-in-out infinite;
          }

          /* TITLE & SPACING */
          .mech-preloader-title {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.1em;

            min-height: 82px;

            white-space: nowrap;

            color: var(--text, #f5f5f7);

            font-family: var(--font-sora), "Sora", Inter, sans-serif;

            font-size: clamp(28px, 4.5vw, 58px);
            font-weight: 700;

            text-shadow: 0 0 18px rgba(255, 79, 135, 0.08);
          }

          .mech-preloader-title span {
            display: inline-block;
            width: 0.62em;
            text-align: center;

            transition:
              color 200ms cubic-bezier(0.16, 1, 0.3, 1),
              text-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 200ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .mech-preloader-title span.hidden-char {
            opacity: 0;
          }

          .mech-preloader-title span.scrambling {
            color: rgba(245, 245, 247, 0.4);
            opacity: 0.85;

            text-shadow: 0 0 12px rgba(255, 79, 135, 0.25);

            transform: translateY(calc(var(--random-offset, 0) * 1px));
            will-change: transform;
          }

          /* Standard Letter Lock */
          .mech-preloader-title span.locked {
            color: var(--accent, #ff4f87);
            opacity: 1;

            text-shadow:
              0 0 12px rgba(255, 79, 135, 0.6),
              0 0 32px rgba(255, 79, 135, 0.2);

            animation: mech-letter-lock 240ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* Ultra Smooth Final Character Entry */
          .mech-preloader-title span.final-locked {
            color: var(--accent, #ff4f87);
            opacity: 1;

            text-shadow:
              0 0 16px rgba(255, 79, 135, 0.85),
              0 0 40px rgba(255, 79, 135, 0.4);

            animation: mech-final-lock 420ms cubic-bezier(0.16, 1, 0.3, 1)
              forwards;
          }

          /* PROGRESS BAR */
          .mech-preloader-progress {
            width: min(390px, 80vw);

            margin-top: 30px;
          }

          .mech-preloader-progress-track {
            position: relative;

            width: 100%;
            height: 2px;

            overflow: hidden;

            background: rgba(157, 166, 184, 0.18);

            box-shadow: 0 0 8px rgba(255, 79, 135, 0.03);
          }

          .mech-preloader-progress-fill {
            position: relative;

            height: 100%;

            background: var(--accent, #ff4f87);

            box-shadow:
              0 0 8px rgba(255, 79, 135, 0.7),
              0 0 18px rgba(255, 79, 135, 0.25);

            transition: none;
            will-change: width;
          }

          .mech-preloader-progress-fill::after {
            content: "";

            position: absolute;

            top: -3px;
            right: 0;

            width: 12px;
            height: 8px;

            background: #ff6fa0;

            filter: blur(3px);

            opacity: 0.8;
          }

          .mech-preloader-progress-meta {
            display: flex;
            justify-content: space-between;

            margin-top: 9px;

            color: rgba(245, 245, 247, 0.32);

            font-size: 7px;
            font-weight: 600;
            letter-spacing: 0.16em;
          }

          .mech-preloader-progress-meta span:last-child {
            color: rgba(255, 79, 135, 0.75);
          }

          /* DECORATIVE LINE */
          .mech-preloader-line {
            display: flex;
            align-items: center;
            gap: 5px;

            margin-top: 28px;

            width: 82px;
            height: 8px;

            opacity: 0.55;
          }

          .mech-preloader-line span {
            display: block;

            width: 18px;
            height: 1px;

            background: var(--accent, #ff4f87);
          }

          .mech-preloader-line span:nth-child(2) {
            width: 30px;
            opacity: 0.45;
          }

          .mech-preloader-line span:nth-child(3) {
            width: 8px;
            opacity: 0.25;
          }

          /* SUBTITLE */
          .mech-preloader-subtitle {
            margin-top: 13px;

            color: rgba(245, 245, 247, 0.22);

            font-size: 7px;
            letter-spacing: 0.2em;
          }

          /* CORNER HUD MARKS */
          .mech-preloader-corner {
            position: absolute;

            width: 55px;
            height: 55px;

            opacity: 0.55;

            pointer-events: none;
          }

          .mech-preloader-corner::before,
          .mech-preloader-corner::after {
            content: "";

            position: absolute;

            background: rgba(255, 79, 135, 0.5);
          }

          .mech-preloader-corner::before {
            width: 34px;
            height: 1px;
          }

          .mech-preloader-corner::after {
            width: 1px;
            height: 34px;
          }

          .top-left {
            top: 32px;
            left: 32px;
          }

          .top-left::before,
          .top-left::after {
            top: 0;
            left: 0;
          }

          .top-right {
            top: 32px;
            right: 32px;
            transform: rotate(90deg);
          }

          .bottom-left {
            bottom: 32px;
            left: 32px;
            transform: rotate(-90deg);
          }

          .bottom-right {
            right: 32px;
            bottom: 32px;
            transform: rotate(180deg);
          }

          .mech-preloader-corner span {
            position: absolute;

            width: 3px;
            height: 3px;

            background: var(--accent, #ff4f87);

            box-shadow: 0 0 6px rgba(255, 79, 135, 0.7);
          }

          .mech-preloader-corner span:nth-child(1) {
            top: -1px;
            left: 40px;
          }

          .mech-preloader-corner span:nth-child(2) {
            top: 8px;
            left: 47px;
            opacity: 0.5;
          }

          .mech-preloader-corner span:nth-child(3) {
            top: 16px;
            left: 52px;
            opacity: 0.25;
          }

          /* KEYFRAMES */
          @keyframes mech-status-in {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes mech-dot-pulse {
            0%,
            100% {
              opacity: 0.45;
              transform: scale(0.85);
            }

            50% {
              opacity: 1;
              transform: scale(1.15);
            }
          }

          @keyframes mech-letter-lock {
            0% {
              opacity: 0.3;
              transform: scale(0.88);
              filter: blur(2px);
            }

            50% {
              opacity: 1;
              transform: scale(1.05);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes mech-final-lock {
            0% {
              opacity: 0.2;
              transform: scale(0.8) translateY(2px);
              filter: blur(4px);
            }

            60% {
              opacity: 1;
              transform: scale(1.14) translateY(0);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
              filter: blur(0);
            }
          }

          /* MOBILE RESPONSIVENESS */
          @media (max-width: 600px) {
            .mech-preloader-content {
              width: calc(100% - 32px);
            }

            .mech-preloader-title {
              font-size: clamp(20px, 6vw, 34px);
              gap: 0.06em;
            }

            .mech-preloader-progress {
              width: min(320px, 82vw);
            }

            .mech-preloader-status {
              margin-bottom: 20px;
              font-size: 7px;
            }

            .mech-preloader-subtitle {
              font-size: 6px;
              letter-spacing: 0.13em;
            }

            .mech-preloader-corner {
              transform: scale(0.7);
            }

            .top-right {
              transform: rotate(90deg) scale(0.7);
            }

            .bottom-left {
              transform: rotate(-90deg) scale(0.7);
            }

            .bottom-right {
              transform: rotate(180deg) scale(0.7);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .mech-preloader {
              transition-duration: 0ms;
            }

            .mech-preloader-status,
            .mech-preloader-dot,
            .mech-preloader-title span {
              animation: none !important;
            }

            .mech-preloader-title span.scrambling {
              transform: none !important;
            }
          }
        `}
      </style>
    </>
  );
}