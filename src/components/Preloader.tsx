"use client";

import { useEffect, useState } from "react";

const TARGET = "MECHNOVATE'26";

const MIN_DURATION = 1800;
const MAX_DURATION = 5000;
const EXIT_DURATION = 450;

type PreloaderProps = {
  onComplete?: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let progressTimer: ReturnType<typeof setInterval> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;

    const startTime = performance.now();
    let finished = false;

    const updateProgress = () => {
      if (finished) return;

      const elapsed = performance.now() - startTime;
      const raw = Math.min(elapsed / MIN_DURATION, 1);

      // Fast at first, smooth near completion.
      const eased = 1 - Math.pow(1 - raw, 2.4);

      // Never visually complete until the page is actually ready.
      setProgress(Math.min(92, Math.round(eased * 92)));
    };

    const complete = () => {
      if (finished) return;

      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);

      finishTimer = setTimeout(() => {
        if (finished) return;

        finished = true;
        setProgress(100);
        setExiting(true);

        exitTimer = setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, EXIT_DURATION);
      }, remaining);
    };

    const handleLoad = () => complete();

    updateProgress();
    progressTimer = setInterval(updateProgress, 80);

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    safetyTimer = setTimeout(complete, MAX_DURATION);

    return () => {
      finished = true;
      if (progressTimer) clearInterval(progressTimer);
      if (finishTimer) clearTimeout(finishTimer);
      if (exitTimer) clearTimeout(exitTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      window.removeEventListener("load", handleLoad);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={`mech-preloader${exiting ? " exiting" : ""}`}>
      <div className="mech-preloader-grid" />
      <div className="mech-preloader-glow" />

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

      <div className="mech-preloader-content">
        <div className="mech-preloader-title" aria-label={TARGET}>
          {TARGET.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className={char === " " ? "space" : ""}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        <div className="mech-preloader-progress">
          <div className="mech-preloader-progress-track">
            <div
              className="mech-preloader-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mech-preloader-progress-meta">
            <span>BOOT SEQUENCE</span>
            <span>{String(progress).padStart(3, "0")}%</span>
          </div>
        </div>

        
      </div>

      <style jsx>{`
        .mech-preloader {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          background: #05080f;
          color: #f5f5f7;

          font-family:
            var(--font-oxanium), "Oxanium", ui-monospace, SFMono-Regular,
            Menlo, Monaco, Consolas, monospace;

          opacity: 1;
          transform: scale(1);
          will-change: opacity, transform;

          transition:
            opacity ${EXIT_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1),
            transform ${EXIT_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mech-preloader.exiting {
          opacity: 0;
          transform: scale(1.015);
          pointer-events: none;
        }

        .mech-preloader-grid {
          position: absolute;
          inset: 0;
          opacity: 0.3;
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
            rgba(255, 79, 135, 0.13) 0%,
            rgba(255, 79, 135, 0.04) 38%,
            transparent 72%
          );
          filter: blur(14px);
          pointer-events: none;
        }

        .mech-preloader-content {
          position: relative;
          z-index: 5;
          width: min(720px, calc(100% - 48px));
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .mech-preloader-title {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 82px;
          width: 100%;
          white-space: nowrap;
          color: #f5f5f7;
          font-family: var(--font-sora), "Sora", Inter, sans-serif;
          font-size: clamp(28px, 4.5vw, 58px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.035em;
          text-shadow: 0 0 18px rgba(255, 79, 135, 0.08);
        }

        .mech-preloader-title span {
          display: inline-block;
          opacity: 0;
          transform: translateY(10px) scale(0.96);
          filter: blur(5px);
          animation: mech-title-in 520ms cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
          will-change: transform, opacity, filter;
        }

        .mech-preloader-title span.space {
          width: 0.28em;
        }

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
        }

        .mech-preloader-progress-fill {
          position: relative;
          height: 100%;
          background: #ff4f87;
          box-shadow:
            0 0 8px rgba(255, 79, 135, 0.7),
            0 0 18px rgba(255, 79, 135, 0.25);
          transition: width 100ms linear;
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
          background: #ff4f87;
        }

        .mech-preloader-line span:nth-child(2) {
          width: 30px;
          opacity: 0.45;
        }

        .mech-preloader-line span:nth-child(3) {
          width: 8px;
          opacity: 0.25;
        }

        .mech-preloader-subtitle {
          margin-top: 13px;
          color: rgba(245, 245, 247, 0.22);
          font-size: 7px;
          letter-spacing: 0.2em;
        }

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
          background: #ff4f87;
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

        @keyframes mech-title-in {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.96);
            filter: blur(5px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @media (max-width: 600px) {
          .mech-preloader-content {
            width: calc(100% - 32px);
          }

          .mech-preloader-title {
            font-size: clamp(20px, 6vw, 34px);
            letter-spacing: -0.025em;
            min-height: 55px;
          }

          .mech-preloader-progress {
            width: min(320px, 82vw);
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
          .mech-preloader,
          .mech-preloader-title span {
            transition: none !important;
            animation: none !important;
          }

          .mech-preloader-title span {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>
    </div>
  );
}
