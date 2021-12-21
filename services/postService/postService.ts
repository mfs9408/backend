import { ObjectId } from "mongodb";
import PostModel from "../../models/postModel";
import RatingModel from "../../models/ratingModel";
import imageSaver from "./helpers";
import { FindingInterface, PostInterface } from "../../types";
import { updateRating } from "./helper";

class PostService {
  async createNewPost(
    { user, creatingDate, rating, content, title }: PostInterface,
    img?: any
  ) {
    if (img) imageSaver(img, user.author);

    return await PostModel.create({
      user: { author: user.author, userId: new ObjectId(user.userId) },
      title: title,
      content: content,
      creatingDate: creatingDate,
      rating: rating,
    });
  }

  async editPost({ _id, title, content }: PostInterface) {
    return PostModel.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { title: title, content: content },
      { new: true }
    );
  }

  async deletePost(id: string) {
    return PostModel.findByIdAndDelete(
      {
        _id: new ObjectId(id),
      },
      { new: true }
    );
  }

  async getAllPosts(page: string) {
    const skipPosts = parseInt(page) === 1 ? 0 : parseInt(page + "0") - 10;
    return PostModel.find().skip(skipPosts).limit(10);
  }

  async getAllPostsForAuthUser(page: string, userId: string) {
    const skipPosts = parseInt(page) === 1 ? 0 : parseInt(page + "0") - 10;
    const posts = await PostModel.find().skip(skipPosts).limit(10);

    return Promise.all(
      posts.map(
        async ({
          _id,
          title,
          content,
          creatingDate,
          rating,
          user,
        }: PostInterface) => {
          const usersScore = await RatingModel.findOne({
            $and: [{ userId: userId, postId: _id }],
          });

          return {
            _id,
            title,
            content,
            creatingDate,
            rating,
            user,
            usersScore: usersScore?.rate,
          };
        }
      )
    );
  }

  async findPosts({ nickname, keyWords, rating, period }: FindingInterface) {
    return PostModel.find({
      $and: [
        { "user.author": { $regex: nickname, $options: "i" } },
        { title: { $regex: keyWords, $options: "i" } },
        // { content: { $regex: keyWords, $options: "i" } },    Will be added later.
        // { rating: { $regex: rating, $options: "i" } },
        // { creatingDate: period },
      ],
    });
  }

  async getMyPosts(userId: string) {
    return PostModel.find({
      "user.userId": userId,
    });
  }

  async getPost(id: string) {
    return PostModel.find({ _id: new ObjectId(id) });
  }

  async changeRating(rating: number, postId: string, userId: string) {
    const usersVoice = await RatingModel.findOne({
      postId: postId,
    });

    return updateRating(rating, postId, userId, usersVoice.rate);
  }
}

export default new PostService();
