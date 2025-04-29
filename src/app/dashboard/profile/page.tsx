"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  Mail,
  Building,
  MapPin,
  Globe,
  Twitter,
  Github,
  Linkedin,
  Upload
} from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save changes" : "Edit profile"}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal information and public profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="font-semibold">Profile photo</h3>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload new photo
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  defaultValue="Doe"
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Job title</Label>
              <Input
                id="title"
                defaultValue="Senior Developer"
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                defaultValue="Acme Inc"
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                defaultValue="San Francisco, CA"
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                className="min-h-[100px]"
                placeholder="Write a short bio..."
                defaultValue="Full-stack developer with a passion for building scalable applications and automating workflows."
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Social Profiles</CardTitle>
            <CardDescription>
              Connect your social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Twitter className="h-6 w-6 text-[#1DA1F2]" />
              <div className="flex-1">
                <Input
                  placeholder="Twitter username"
                  defaultValue="@johndoe"
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Github className="h-6 w-6" />
              <div className="flex-1">
                <Input
                  placeholder="GitHub username"
                  defaultValue="johndoe"
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Linkedin className="h-6 w-6 text-[#0A66C2]" />
              <div className="flex-1">
                <Input
                  placeholder="LinkedIn profile URL"
                  defaultValue="linkedin.com/in/johndoe"
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Globe className="h-6 w-6 text-muted-foreground" />
              <div className="flex-1">
                <Input
                  placeholder="Personal website"
                  defaultValue="johndoe.com"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Manage your profile visibility and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Profile</Label>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to other users
              </p>
            </div>
            <Switch defaultChecked disabled={!isEditing} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Job Title</Label>
              <p className="text-sm text-muted-foreground">
                Display your job title on your profile
              </p>
            </div>
            <Switch defaultChecked disabled={!isEditing} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Company</Label>
              <p className="text-sm text-muted-foreground">
                Display your company name on your profile
              </p>
            </div>
            <Switch defaultChecked disabled={!isEditing} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Location</Label>
              <p className="text-sm text-muted-foreground">
                Display your location on your profile
              </p>
            </div>
            <Switch defaultChecked disabled={!isEditing} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}