import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(projectRoot, "dist");

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of ["index.html", "app.js", "styles.css"]) {
  await cp(resolve(projectRoot, file), resolve(outputDirectory, file));
}

await cp(resolve(projectRoot, "assets"), resolve(outputDirectory, "assets"), {
  recursive: true,
});

// Keep files from public available at site-root URLs for compatibility with
// the framework version of the project, without nesting them under /public.
await cp(resolve(projectRoot, "public"), outputDirectory, {
  recursive: true,
  force: false,
});

console.log(`EdgeOne static output created at ${outputDirectory}`);
