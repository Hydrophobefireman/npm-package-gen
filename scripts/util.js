const { rename, rRoot, root } = require("./actions");
const { kitPackages } = require("../package.json");
const { join } = require("path");

const packageDir = join(root, "packages");

async function postpublish() {
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
};
