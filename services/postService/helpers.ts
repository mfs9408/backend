import path from "path";
const fs = require("fs");

const imageSaver = async (img: any, postId: string, name: string) => {
  const pathFolder = `../../static/postPictures/`;

  if (!fs.existsSync(pathFolder + `${postId}`)) {
    fs.mkdir(
      path.resolve(__dirname, pathFolder, postId),
      (err: any, stat: any) => {
        if (err) {
          console.log(err, `There is an ${err}`);
        }
        console.log(stat, "The folder was created successfully");
      }
    );
  }

  return img.mv(
    path.resolve(__dirname, pathFolder + postId, name),
    (err: any, stat: any) => {
      if (err) {
        console.log(err, `There is an ${err}`);
      }
      console.log(stat, "File saved successfully");
    }
  );
};

const folderRemover = (postId: string) => {
  const pathFolder = `../../static/postPictures/`;

  if (fs.existsSync(path.resolve(__dirname, pathFolder + postId))) {
    return fs.rm(
      path.resolve(__dirname, pathFolder + postId),
      { recursive: true },
      (err: any, stat: any) => {
        if (err) {
          console.log(err.code, `There is an ${err}`);
        }
        console.log(stat, `${pathFolder + postId} was deleted successfully`);
      }
    );
  }
  return console.log("Not deleted");
};

export { imageSaver, folderRemover };
