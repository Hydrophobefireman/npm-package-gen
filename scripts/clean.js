const { rm } = require("./actions");
const { join } = require("path");
const { postpublish, root, packageDir } = require("./util");

async function main() {
  console.log(`Root: ${root}`);
  const core = join(root, "dist");
  await rm(core, { force: true, recursive: true });

  // run just in case
  postpublish();
  const { kitPackages } = await fromPackageJson();
  await Promise.all(
    kitPackages.map(async (package) => {
      const dist = join(packageDir, package, "dist");
      await rm(dist, { force: true, recursive: true });
    })
  );
}

if (require.main === module) {
  main();
}
