import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import { SideNav } from "~/components/SideNav";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="This is Twitter Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="align-items-start container mx-auto flex sm:pr-4">
        <SideNav />
        <div className="min-h-scree flex-grow border-x">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
