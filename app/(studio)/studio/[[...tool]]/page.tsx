import { connection } from "next/server";
import { Suspense } from "react";

import SanityStudio from "@/components/SanityStudio";

export { metadata, viewport } from "next-sanity/studio";

async function StudioRuntime() {
  await connection();

  return <SanityStudio />;
}

export default function StudioPage() {
  return (
    <Suspense fallback={null}>
      <StudioRuntime />
    </Suspense>
  );
}
