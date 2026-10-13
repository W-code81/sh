"use client"

import { useSearchParams } from "next/navigation"
import GuideAndSchedule from "../section/camp-guide/GuideAndSchedule";
import CampCheckList from "../section/camp-guide/CampCheckList";

export default function CampFlow() {
    const searchParams = useSearchParams();
    const activeGuide = searchParams.get('guide')

    return (
        <>
            {activeGuide === "check-list" ? <CampCheckList /> : <GuideAndSchedule />}
        </>
    )
}