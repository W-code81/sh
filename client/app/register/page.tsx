import { Suspense } from "react";
import RegisterFlow from "./RegisterFlow";

function RegisterLoading() {
  return (
    <main className="min-h-[70vh] w-full bg-background px-5 py-8 sm:px-8 sm:py-12" aria-busy="true" aria-label="Loading registration">
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-4 w-40 rounded bg-surface-container" />
        <div className="h-10 max-w-lg rounded bg-surface-container" />
        <div className="h-20 rounded-2xl bg-surface-container" />
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterFlow />
    </Suspense>
  );
}
