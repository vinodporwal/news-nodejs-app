import { logToConsole } from "@helper";

import createServer from "./createServer";

export default () => {
  const app = createServer({
    routeBase: "/api/v1",
    timeoutSeconds: 60,
    useJwt: true,
    useAppCheck: false,
    extraRoutes: [],
  });
  const PORT = process.env.PORT || 3007;
  app.listen(PORT, () => {
    logToConsole(
      `Hello from Callable! 🚀 The container started successfully and is listening for HTTP requests on http://localhost:${PORT}`
    );
  });
  return app;
};
