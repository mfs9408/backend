import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { FileArray } from "express-fileupload";
import PostModel from "../../models/postModel";
import RatingModel from "../../models/ratingModel";
import { imageSaver, folderRemover } from "./helpers";
import { FindingInterface, PostInterface } from "../../types";
import { postDestructor, postsDestructor, updateRating } from "./imageHelpers";

class PostService {
  async createNewPost(
    { user, creatingDate, content, title }: PostInterface,
    img?: FileArray
  ) {
    const postId = uuidv4();

    return await PostModel.create({
      id: postId,
      user: { nickname: user.nickname, userId: new ObjectId(user.userId) },
      title: title,
      content: content.map(({ id, type, value }) => {
        if (type === "img" && img && value) {
          const name = `${uuidv4()}.jpeg`;
          imageSaver(img[value], postId, name);
          return { id, type, value: name };
        }
        if (type === "string" && value) {
          return { id, type, value };
        }
        return { id, type, undefined };
      }),
      creatingDate: creatingDate,
    });
  }

  async editPost({ id, title, content }: PostInterface) {
    return PostModel.findOneAndUpdate(
      { id: id },
      { title: title, content: content },
      { new: true }
    );
  }

  async deletePost(postId: string) {
    await folderRemover(postId);
    await RatingModel.deleteMany({ postId: postId });
    return PostModel.findOneAndDelete(
      {
        id: postId,
      },
      { new: true }
    );
  }

  async getAllPosts(page: string, userId: string, searchValue?: string) {
    const skipPosts = parseInt(page) === 1 ? 0 : parseInt(page + "0") - 10;
    const posts = await PostModel.find({
      $or: [
        { "user.nickname": { $regex: searchValue, $options: "i" } },
        { title: { $regex: searchValue, $options: "i" } },
        // { content: { $regex: keyWords, $options: "i" } },    Will be added later.
      ],
    })
      .sort({ creatingDate: -1 })
      .skip(skipPosts)
      .limit(10);

    const pageQuantity =
      (await PostModel.find({
        $or: [
          { "user.nickname": { $regex: searchValue, $options: "i" } },
          { title: { $regex: searchValue, $options: "i" } },
          // { content: { $regex: keyWords, $options: "i" } },    Will be added later.
        ],
      }).count()) / 10;

    return {
      pageQuantity: Math.ceil(pageQuantity),
      posts: await Promise.all(postsDestructor(posts, userId)),
    };
  }

  async findPosts({ nickname, keyWords, rating, period }: FindingInterface) {
    return PostModel.find({
      $and: [
        { "user.nickname": { $regex: nickname, $options: "i" } },
        { title: { $regex: keyWords, $options: "i" } },
        // { content: { $regex: keyWords, $options: "i" } },    Will be added later.
        // { rating: { $regex: rating, $options: "i" } },
        // { creatingDate: period },
      ],
    });
  }

  async getMyPosts(userId: string) {
    const posts = await PostModel.find({
      "user.userId": userId,
    });

    return Promise.all(postsDestructor(posts, userId, true).reverse());
  }

  async getPost(postId: string, userId: string) {
    const post = await PostModel.findOne({ id: postId });

    return postDestructor(postId, userId, post);
  }

  async changeRating(rating: number, postId: string, userId: string) {
    const usersVoice = await RatingModel.findOne({
      postId: postId,
    });

    return { payload: await updateRating(rating, postId, userId, usersVoice) };
  }
}

export default new PostService();
