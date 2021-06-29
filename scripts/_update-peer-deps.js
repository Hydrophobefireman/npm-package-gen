const {
  postpublish,
  packageDir,
  prettyJSON,
  fromPackageJson,
} = require("./util");
const { readFile, writeFile } = require("./actions");
const { join } = require("path");

async function updatePackages() {
  await postpublish();
  const { kitPackages, version, name, peerDependencies } =
    await fromPackageJson();
  await Promise.all(
    kitPackages.map(async (x) => {
      const folder = join(packageDir, x);
      const otherPackages = kitPackages.filter((package) => package !== x);
      const packageJson = join(folder, "package.json");
      const js = JSON.parse((await readFile(packageJson)).toString());
      js.version = version;
      js.peerDependencies = Object.assign({}, peerDependencies);
      js.peerDependencies[name] = version;
      otherPackages.forEach((packageName) => {
        js.peerDependencies[`${name}/${packageName}`] = version;
      });
      await writeFile(packageJson, prettyJSON(js));
    })
  );
}
module.exports.updatePackages = updatePackages;

if (require.main === module) {
  updatePackages();
}
