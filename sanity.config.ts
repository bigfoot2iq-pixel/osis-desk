import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "OASIS Desk",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
