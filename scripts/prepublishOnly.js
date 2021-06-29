const { join } = require("path");
const { rename } = require("./actions");
const { kitPackages } = require("../package.json");
const root = join(__dirname, "..");
const packages = join(root, "packages");
const { updatePackages } = require("./_update-peer-deps");

async function movePackage(name) {
  const src = join(packages, name);
  const dest = join(root, name);
  return await rename(src, dest);
}

async function main() {
  await updatePackages();
  await Promise.all(kitPackages.map((x) => movePackage(x)));
}

if (require.main === module) {
  main();
}
