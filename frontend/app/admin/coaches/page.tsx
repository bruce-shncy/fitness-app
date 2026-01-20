"use client";
import { useAdminSettings } from "@/providers/settings/AdminSettingsProvider"
import { useEffect } from "react"

const CoachesPage = () => {

    const {setSettings} = useAdminSettings()

    useEffect(() => {
        setSettings({
            header: 'Coaches',
            subHeader: '  Manage coaches, program and clients'
        })
    }, [])

    return (
        <div className="text-platinum">
            Coaches here
        </div>
    )
}

export default CoachesPage