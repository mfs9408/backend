import RatingModel from "../../models/ratingModel";
import PostModel from "../../models/postModel";

export const updateRating = async (
  rating: number,
  postId: string,
  userId: string,
  usersVoice: number
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
        _id: postId,
      },
      {
        $inc: { rating: -usersVoice },
      },
      { new: true }
    );
  }

  if (usersVoice && usersVoice === rating) {
    await RatingModel.findOneAndUpdate(
      { postId: postId },
      {
        rate: 0,
      },
      { new: true }
    );

    return PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { rating: -rating },
      },
      { new: true }
    );
  }

  if (usersVoice) {
    await RatingModel.findOneAndUpdate(
      { postId: postId },
      {
        rate: rating,
      },
      { new: true }
    );

    return PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { rating: rating },
      },
      { new: true }
    );
  }

  return await RatingModel.create({
    rate: rating,
    postId: postId,
    userId: userId,
  });
};
