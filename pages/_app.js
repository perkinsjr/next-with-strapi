import {
  StrapiMediaStore,
  StrapiProvider,
  StrapiClient,
} from "react-tinacms-strapi";

import { TinaCMS, TinaProvider } from "tinacms";

import { useMemo } from "react";

export default function MyApp({ Component, pageProps }) {
  const cms = useMemo(
    () =>
      new TinaCMS({
        enabled: true,
        toolbar: true,
        apis: {
          strapi: new StrapiClient(process.env.NEXT_PUBLIC_STRAPI_API_URL),
        },
        media: new StrapiMediaStore(process.env.NEXT_PUBLIC_STRAPI_API_URL),
      }),
    []
  );
  return (
    <TinaProvider cms={cms}>
      <StrapiProvider
        onLogin={() => {
          /* we'll come back to this */
        }}
        onLogout={() => {
          /* we'll come back to this */
        }}
      >
        <Component {...pageProps} />
      </StrapiProvider>
    </TinaProvider>
  );
}
