import * as path from "path";

const DB = process.env.NODE_ENV === "production"
  ? path.resolve(__dirname, "output-es/Main/")
  : path.resolve(__dirname, "output/Main/");

const ASSETS = process.env.NODE_ENV === "production" || !(require("fs").existsSync("./samples"))
  ? path.resolve(__dirname, "assets/")
  : path.resolve(__dirname, "./");

export default {
  resolve: {
    alias: {
      PureScript: DB,
      assets: ASSETS,
    },
  },
  build: {
    outDir: "docs",
  },
  base: ''
};
