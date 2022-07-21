import "next-auth";
import { Profile } from "next-auth";
import { PocketBaseAuthData } from "./PocketBaseTypes";

interface AuthProfile extends Profile {
  authdata: PocketBaseAuthData;
}

declare module "next-auth" {
  interface Session {
    user: User;
    profile: AuthProfile;
  }
}
