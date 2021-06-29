const { join, relative } = require("path");
const { readdir, rename, rm } = require("./actions");
const { rRoot } = require("./util");

const root = join(__dirname, "..");
async function move() {
  let folder = process.argv.slice(2)[0];
  if (!folder) throw new Error("Invalid package dir");
  folder = join(root, folder);
  const dist = join(folder, "dist");
  console.log("[Debug] Dist:", rRoot(dist));
  const rel = relative(root, folder);
  const types = join(dist, rel, "src");
  console.log("[Debug] Types:", rRoot(types));
  const ls = await readdir(types);
  await Promise.all(
    ls.map(async (file) => {
      const fullPath = join(types, file);
      const dest = join(dist, file);
      await rename(fullPath, dest);
    })
  );
  const dist_src = join(dist, "src");
  const dist_packages = join(dist, "packages");

  await rm(dist_src, { recursive: true, force: true });
  await rm(dist_packages, { recursive: true, force: true });
}

if (require.main === module) {
  move();
}
