import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "./core";

console.log("✅ /api/uploadthing route is active !");
const handler = createRouteHandler({ router: ourFileRouter });
export { handler as GET, handler as POST };
