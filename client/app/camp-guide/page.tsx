import { Suspense } from "react";
import CampFlow from "./CampFlow";
import Loading from "../components/Loading";


export default function CampGuide() {
   return (
    <Suspense fallback={<Loading />}>
      <CampFlow/>
    </Suspense>
  );
}
