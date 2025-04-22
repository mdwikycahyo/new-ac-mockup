import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your assessment platform settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your platform preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Organization Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@acmecorp.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-description">Organization Description</Label>
                  <Textarea
                    id="org-description"
                    defaultValue="Acme Corporation is a leading provider of assessment solutions for enterprise organizations."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Assessment Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="default-duration">Default Duration (minutes)</Label>
                    <Input id="default-duration" type="number" defaultValue={60} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-passing-score">Default Passing Score (%)</Label>
                    <Input id="default-passing-score" type="number" defaultValue={70} />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-grade" defaultChecked />
                  <Label htmlFor="auto-grade">Auto-grade assessments upon completion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-results" defaultChecked />
                  <Label htmlFor="show-results">Show results to participants immediately</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-assessment-created">Assessment Created</Label>
                    <Switch id="notify-assessment-created" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-assessment-completed">Assessment Completed</Label>
                    <Switch id="notify-assessment-completed" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-participant-added">Participant Added</Label>
                    <Switch id="notify-participant-added" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-report-generated">Report Generated</Label>
                    <Switch id="notify-report-generated" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Participant Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-participant-invitation">Assessment Invitation</Label>
                    <Switch id="notify-participant-invitation" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-participant-reminder">Assessment Reminder</Label>
                    <Switch id="notify-participant-reminder" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-participant-results">Assessment Results</Label>
                    <Switch id="notify-participant-results" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Access Control</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                    <Switch id="two-factor-auth" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue={30} className="w-24" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Assessment Security</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="prevent-copy-paste">Prevent Copy/Paste in Assessments</Label>
                    <Switch id="prevent-copy-paste" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="prevent-tab-switching">Prevent Tab Switching</Label>
                    <Switch id="prevent-tab-switching" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-webcam">Require Webcam for Identity Verification</Label>
                    <Switch id="require-webcam" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Manage your platform integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">HR Systems</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Workday Integration</Label>
                      <p className="text-sm text-muted-foreground">Connect to your Workday instance</p>
                    </div>
                    <Switch id="workday-integration" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">BambooHR Integration</Label>
                      <p className="text-sm text-muted-foreground">Connect to your BambooHR instance</p>
                    </div>
                    <Switch id="bamboohr-integration" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Learning Management Systems</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Canvas LMS Integration</Label>
                      <p className="text-sm text-muted-foreground">Connect to your Canvas LMS instance</p>
                    </div>
                    <Switch id="canvas-integration" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Moodle Integration</Label>
                      <p className="text-sm text-muted-foreground">Connect to your Moodle instance</p>
                    </div>
                    <Switch id="moodle-integration" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
