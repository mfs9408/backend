import RatingModel from "../../models/ratingModel";
import PostModel from "../../models/postModel";

interface UsersVoiceInterface {
  _id: string;
  userId: string;
  postId: string;
  rate: number;
  __v: number;
}

export const updateRating = async (
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
        _id: postId,
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
        _id: postId,
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
        _id: postId,
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
      _id: postId,
    },
    {
      $inc: { rating: rating },
    },
    { new: true }
  );
};
