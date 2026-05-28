type User = {
  id:number;
  username:string;
  avatarUrl:string;
  githubAppInstalled:boolean;
  githubAppTokenLinked:boolean;
  githubAppTokenExpired:boolean;
  githubAppAccessTokenExpiresAt:boolean;
  githubAppRefreshTokenExpiresAt:boolean;
};

export type {
    User,
}