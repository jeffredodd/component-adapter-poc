/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { ComponentsProvider } from "component-library";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./src/theme";
import { muiAdapter } from "./src/muiAdapter";
import { baselineAdapter } from "./src/baselineAdapter";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ComponentsProvider value={muiAdapter}>
          <RemixBrowser />
        </ComponentsProvider>
      </ThemeProvider>
    </StrictMode>
  );
});
