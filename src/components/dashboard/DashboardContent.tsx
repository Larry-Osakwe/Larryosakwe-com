import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubSignIn } from "@/components/auth/providers.tsx/GithubSignIn";
import GitHubInviteHandler from "@/hooks/GitHubInviteHandler";
import type { AuthUser } from '@/lib/auth/types';

interface GitHubProfile {
    github_username: string | null;
    github_invite_sent: boolean;
  }
  
  interface DashboardContentProps {
    user: AuthUser;
    githubProfile: GitHubProfile;
  }

  export function DashboardContent({ user, githubProfile }: DashboardContentProps) {
    const needsGithubConnection = !githubProfile.github_username;

  return (
    <div className="flex items-center justify-center p-4">
      {githubProfile && (
        <GitHubInviteHandler 
          github_username={githubProfile.github_username} 
          github_invite_sent={githubProfile.github_invite_sent} 
        />
      )}
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Dashboard</CardTitle>
          </div>
          <CardDescription>Welcome, {user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          {needsGithubConnection ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To access the code, please connect your GitHub account.
              </p>
              <GithubSignIn />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your account is fully set up and connected.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}