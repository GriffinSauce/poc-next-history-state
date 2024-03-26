"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface Overlay {
  id: string;
}
interface HistoryState {
  overlays?: Overlay[];
}

const EMPTY_OVERLAYS: Overlay[] = [];

export default function Home() {
  const searchParams = useSearchParams();
  const params = useParams();

  const [historyState, setHistoryState] = useState<HistoryState>({});
  const overlays = historyState.overlays || EMPTY_OVERLAYS;

  const onPush = () => {
    const id = nanoid();
    const newOverlay = { id };
    const newOverlays = [...overlays, newOverlay];

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("overlay", id);

    window.history.pushState({ overlays: newOverlays }, "", newUrl);
  };

  const overlayId = searchParams.get("overlay");
  useEffect(() => {
    setHistoryState(history.state);
  }, [overlayId]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-6">
      <button className="bg-slate-800 p-3 rounded-xl" onClick={onPush}>
        Push state
      </button>
      <div>
        <h2>Current overlays</h2>
        <pre className="text-xs">{JSON.stringify(overlays, null, 2)}</pre>
        <h2>Current params</h2>
        <pre className="text-xs">{searchParams.toString()}</pre>
        <pre className="text-xs">{JSON.stringify(params, null, 2)}</pre>
      </div>
    </main>
  );
}
