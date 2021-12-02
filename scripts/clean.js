const {join} = require("path");
const {mkdir} = require("./actions");
const {postpublish, root} = require("./util.js");

async function main() {
  console.log(`Root: ${root}`);
  const core = join(root, "dist");
  await postpublish();
  await mkdir(core);
}

if (require.main === module) {
  main();
}
