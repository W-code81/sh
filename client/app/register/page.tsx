import { Suspense } from "react";
import RegisterFlow from "./RegisterFlow";
import Loading from "../components/Loading";


export default function RegisterPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RegisterFlow />
    </Suspense>
  );
}
