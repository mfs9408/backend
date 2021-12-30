import RatingModel from "../../models/ratingModel";
import PostModel from "../../models/postModel";
import { PostInterface } from "../../types";

interface UsersVoiceInterface {
  _id: string;
  userId: string;
  postId: string;
  rate: number;
  __v: number;
}

const updateRating = async (
  rating: number,
  postId: string,
  userId: string,
  usersVoice: UsersVoiceInterface
) => {
  if (rating === 0) {
    await RatingModel.findOneAndUpdate(
      { postId: postId },
      {
        rate: 0,
      },
      { new: true }
    );

    return PostModel.findOneAndUpdate(
      {
        id: postId,
      },
      {
        $inc: { rating: -usersVoice.rate },
      },
      { new: true }
    );
  } else if (usersVoice && usersVoice.rate === rating) {
    await RatingModel.findOneAndUpdate(
      { postId: postId },
      {
        rate: 0,
      },
      { new: true }
    );

    return PostModel.findOneAndUpdate(
      {
        id: postId,
      },
      {
        $inc: { rating: -rating },
      },
      { new: true }
    );
  } else if (usersVoice) {
    await RatingModel.findOneAndUpdate(
      { postId: postId },
      {
        rate: rating,
      },
      { new: true }
    );

    return PostModel.findOneAndUpdate(
      {
        id: postId,
      },
      {
        $inc: { rating: rating },
      },
      { new: true }
    );
  }

  await RatingModel.create({
    rate: rating,
    postId: postId,
    userId: userId,
  });

  return PostModel.findOneAndUpdate(
    {
      id: postId,
    },
    {
      $inc: { rating: rating },
    },
    { new: true }
  );
};

const postsDestructor = (
  posts: PostInterface[],
  userId: string,
  removable?: boolean
) =>
  posts.map(
    async ({
      id,
      title,
      content,
      creatingDate,
      rating,
      user,
    }: PostInterface) => {
      const usersScore = await RatingModel.findOne({
        $and: [{ userId: userId, postId: id }],
      });

      return {
        id,
        title,
        content,
        creatingDate,
        rating,
        user,
        usersScore: usersScore?.rate | 0,
        removable: removable,
      };
    }
  );

const postDestructor = async (
  postId: string,
  userId: string,
  post: PostInterface
) => {
  const { id, title, content, creatingDate, rating, user } = post;
  const usersScore = await RatingModel.findOne({
    $and: [{ userId: userId, postId: postId }],
  });

  return {
    id,
    title,
    content,
    creatingDate,
    rating,
    user,
    usersScore: usersScore?.rate | 0,
  };
};

export { updateRating, postsDestructor, postDestructor };
