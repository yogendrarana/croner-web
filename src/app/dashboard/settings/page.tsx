import { Button } from '@/components/ui/button';
import ProfileSetting from './_components/profile-setting';
import NotificationSetting from './_components/notification-setting';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecuritySetting from './_components/security-setting';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            Save changes
          </Button>
        </div>

        <TabsContent value="profile">
          <ProfileSetting />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSetting />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySetting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
