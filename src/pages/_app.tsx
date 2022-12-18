import { useState, useEffect, useRef } from "react";
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
  const onMounted = useRef(false);
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
    if (onMounted.current) {
      TagManager.initialize(tagManagerArgs);

      onMounted.current = false;
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Script
        dangerouslySetInnerHTML={{ __html: loadSegment() }}
        id={"segmentScript"}
      /> */}
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
