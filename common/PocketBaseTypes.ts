import { User } from "pocketbase";

export interface PocketBaseAuthData {
  meta: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    token: {
      access_token: string;
      token_type: string;
      refresh_token: string;
      expiry: Date;
    };
  };
  token: string;
  user: User;
}
