import { useSession } from "next-auth/react";
import PocketBase from "pocketbase";

const client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

import { createContext, ReactNode, useEffect } from "react";

export interface PocketBaseContext {
  pocketBaseClient: PocketBase;
}

export const PocketBaseContext = createContext<PocketBaseContext>({
  pocketBaseClient: client,
});

export const PocketBaseProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session === null) return;
    if (typeof session === "undefined") return;
    client.AuthStore.save(
      session.profile.authdata.token,
      session.profile.authdata.user
    );
  }, [session]);

  return (
    <PocketBaseContext.Provider
      value={{
        pocketBaseClient: client,
      }}
    >
      {children}
    </PocketBaseContext.Provider>
  );
};
