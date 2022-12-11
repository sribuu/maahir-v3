import { useState } from "react";
import Script from "next/script";
import type { AppProps } from "next/app";
import "@/src/core/ui/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as snippet from "@segment/snippet";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

  const loadSegment = () => {
    const options = {
      apiKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
    };
    if (process.env.NEXT_PUBLIC_NODE_ENV) {
      return snippet.max(options);
    } else {
      return snippet.min(options);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Script
        dangerouslySetInnerHTML={{ __html: loadSegment() }}
        id={"segmentScript"}
      />
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
