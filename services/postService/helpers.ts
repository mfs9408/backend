import path from "path";
const fs = require("fs");

const imageSaver = (img: [any] | any, user: string) => {
  if (!fs.state(`../../static/postPictures/${user}`)) {
    fs.mkdir(`../../static/postPictures/${user}`);
  }

  if (Array.isArray(img)) {
    return img.map((image: any) => {
      image.mv(
        path.resolve(__dirname, "../../static", "postPictures", image.name)
      );
    });
  }

  return img.mv(
    path.resolve(__dirname, "../../static", "postPictures", img.name)
  );
};
export default imageSaver;
