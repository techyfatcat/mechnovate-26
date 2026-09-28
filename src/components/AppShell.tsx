"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}

      <main
        style={{
          visibility: ready ? "visible" : "hidden",
          opacity: ready ? 1 : 0,
          pointerEvents: ready ? "auto" : "none",
          minHeight: "100vh",
          transition: "opacity 220ms ease",
        }}
      >
        {children}
      </main>
    </>
  );
}
