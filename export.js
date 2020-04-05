const path = require("path");
const fs = require("fs");
const ssg = require("solid-ssr/static");

const directoryPath = path.join(__dirname, "src", "pages");

fs.readdir(directoryPath, (err, files) => {
  if (err) return console.log("Unable to scan directory: " + err);
  pages = files
    .filter((f) => f.endsWith(".js"))
    .map((f) => "/" + f.split(".")[0].toLowerCase());

  ssg(path.resolve(__dirname, "public"), {
    source: path.resolve(__dirname, "lib/server.js"),
    pages,
  });
});
