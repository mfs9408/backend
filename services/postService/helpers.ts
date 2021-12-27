import path from "path";
const fs = require("fs");

const imageSaver = async (img: any, postId: any, name: string) => {
  const pathFolder = `../../static/postPictures/`;

  if (!fs.existsSync(pathFolder + `${postId}`)) {
    fs.mkdir(
      path.join(__dirname, pathFolder, postId),
      (err: any, stat: any) => {
        if (err) {
          console.log(err, "ошибка");
        }
        console.log(stat, "нет ошибок");
      }
    );
  }

  return img.mv(
    path.resolve(__dirname, pathFolder + postId, name),
    (err: any, stat: any) => {
      if (err) {
        console.log(err, "ошибка2");
      }
      console.log(stat, "нет ошибок2");
    }
  );
};

export default imageSaver;
