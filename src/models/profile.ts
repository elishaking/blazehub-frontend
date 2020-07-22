export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  birth: string;
}

export interface ErrorProfileData {
  name?: string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  birth?: string;
}
