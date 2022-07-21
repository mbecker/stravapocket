import "../styles/scss/main.scss";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Sidebar from "../components/layout/sidebar";
import React from "react";
import SignIn from "./signin";
import BottomNavigation from "../components/layout/BottomNavigation";
import { PocketBaseProvider } from "../lib/PocketBaseProvider";

function SportsPocketApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </Head>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <PocketBaseProvider>
          <div id="app">
            <div className="app-layout">
              <AuthGuard>
                <>
                  <Sidebar />
                  <div className="app-body pb-10 md:pb-0">
                    <Component {...pageProps} />
                  </div>
                  <BottomNavigation />
                </>
              </AuthGuard>
            </div>
          </div>
        </PocketBaseProvider>
      </SessionProvider>
    </>
  );
}
export function AuthGuard({ children }: { children: JSX.Element }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  // useEffect(() => {
  //   if (!initializing) {
  //     //auth is initialized and there is no user
  //     if (!user) {
  //       // remember the page that user tried to access
  //       setRedirect(router.route)
  //       router.push("/signin")
  //     }
  //   }
  // }, [initializing, router, user, setRedirect])

  // if auth initialized with a valid user show protected page
  if (isUser) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <SignIn />;
}

export default SportsPocketApp;
