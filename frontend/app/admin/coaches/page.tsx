"use client";

import { useAdminSettings } from "@/providers/settings/AdminSettingsProvider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DisplayCoaches } from "@/app/pages/coaches/display/CoachesList";
import { DisplayInvitations } from "@/app/pages/coaches/display/InvitationsList";
import { useInvitationActions } from "@/app/pages/coaches/actions/useInvitations";
import { AiOutlinePlus } from "react-icons/ai";

const CoachesPage = () => {
    const { setSettings } = useAdminSettings();
    const { handleInviteCoach, rowActions } = useInvitationActions();
    const [activeTab, setActiveTab] = useState("coaches");

    useEffect(() => {
        setSettings({
            header: "Coaches",
            subHeader: "Manage coaches, programs and clients",
        });
    }, [setSettings]);

    return (
        <div className="text-platinum">
            <div className="flex justify-end mb-6">
                <Button
                    onClick={handleInviteCoach}
                    className="bg-platinum text-night hover:bg-platinum/90"
                >
                    <AiOutlinePlus className="h-4 w-4 mr-2" />
                    Invite Coach
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-mid-night/60 border border-mid-night/60">
                    <TabsTrigger value="coaches">Coaches</TabsTrigger>
                    <TabsTrigger value="invitations">Invitations</TabsTrigger>
                </TabsList>

                <TabsContent value="coaches" className="mt-6">
                    <DisplayCoaches />
                </TabsContent>

                <TabsContent value="invitations" className="mt-6">
                    <DisplayInvitations rowActions={rowActions} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CoachesPage;
