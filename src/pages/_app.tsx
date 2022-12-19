import { useState, useEffect } from "react";
import Script from "next/script";
import type { AppProps } from "next/app";
import "@/src/core/ui/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TagManager, { TagManagerArgs } from "react-gtm-module";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const gtmId = String(process.env.NEXT_PUBLIC_GTM_ID) || "";
  const tagManagerArgs: TagManagerArgs = {
    gtmId,
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Script
        strategy={"afterInteractive"}
        src={"https://www.googletagmanager.com/gtag/js?id=G-B8WNSRRC1H"}
      />
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
