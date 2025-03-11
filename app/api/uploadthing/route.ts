import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

console.log("✅ /api/uploadthing route is active !");

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
