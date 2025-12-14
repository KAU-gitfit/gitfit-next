export interface User {
  userId: number;
  githubId: string;
  githubUsername: string;
  displayName: string;
  email: string | null;
  avatarUrl: string;
  createdAt: string;
}

export interface UserProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: User;
}
