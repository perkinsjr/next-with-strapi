import {
  StrapiMediaStore,
  StrapiProvider,
  StrapiClient,
} from "react-tinacms-strapi";

import { TinaCMS, TinaProvider } from "tinacms";
import { useCMS } from "@tinacms/react-core";
import { useMemo } from "react";
import "../styles/globals.css";
export default function MyApp({ Component, pageProps }) {
  const cms = useMemo(
    () =>
      new TinaCMS({
        toolbar: pageProps.preview,
        enabled: pageProps.preview,
        apis: {
          strapi: new StrapiClient(process.env.NEXT_PUBLIC_STRAPI_API_URL),
        },
        media: new StrapiMediaStore(process.env.NEXT_PUBLIC_STRAPI_API_URL),
      }),
    []
  );
  return (
    <TinaProvider cms={cms}>
      <StrapiProvider onLogin={enterEditMode} onLogout={exitEditMode}>
        <EditButton />
        <Component {...pageProps} />
      </StrapiProvider>
    </TinaProvider>
  );
}
const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname;
  });
};

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};
export const EditButton = () => {
  const cms = useCMS();
  return (
    <button onClick={() => (cms.enabled ? cms.disable() : cms.enable())}>
      {cms.enabled ? `Stop Editing ` : `Edit this Site `}
    </button>
  );
};
