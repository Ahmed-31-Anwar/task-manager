import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(currentDirectory, "./src"),
    },
  },
  test: {
    environment: "node",
  },
});