const { rename, rRoot, root, readFile } = require("./actions");
const { join } = require("path");

const packageJsonLoc = join(root, "package.json");
const packageDir = join(root, "packages");

/**@returns {Promise<typeof import("../package.json")>} */
async function fromPackageJson() {
  const js = await readFile(packageJsonLoc);
  return JSON.parse(js.toString());
}

async function postpublish() {
  const { kitPackages } = await fromPackageJson();
  return await Promise.all(
    kitPackages.map(async (x) => {
      const loc = join(root, x);
      const dest = join(packageDir, x);
      try {
        await rename(loc, dest);
      } catch (e) {
        console.log("[prebuild] Skip moving", rRoot(loc));
      }
    })
  );
}

function prettyJSON(x) {
  return JSON.stringify(x, null, 3);
}

module.exports = {
  prettyJSON,
  root,
  rRoot,
  packageDir,
  postpublish,
  fromPackageJson,
};
