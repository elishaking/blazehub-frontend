import { AuthUser } from "./auth";

export interface PostData {
  key: string;
  date: number;
  imageUrl: boolean;
  isBookmarked: boolean;
  text: string;
  user?: AuthUser;
  likes?: any;
  comment?: any;
}
