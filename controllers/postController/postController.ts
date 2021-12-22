import { Request, Response, NextFunction } from "express";
import PostService from "../../services/postService";

class PostController {
  async createNewPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { payload } = req.body;
      const { img } = req.files;

      const newPost = await PostService.createNewPost(payload, img);
      return res.json(newPost);
    } catch (e) {
      next(e);
    }
  }

  async editPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { payload } = req.body;
      const editedPost = await PostService.editPost(payload);
      return res.json(editedPost);
    } catch (e) {
      next(e);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.payload;
      const deletedPost = await PostService.deletePost(id);
      return res.json(deletedPost);
    } catch (e) {
      next(e);
    }
  }

  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.params.page;
      const allPosts = await PostService.getAllPosts(page);
      return res.json({ payload: allPosts });
    } catch (e) {
      next(e);
    }
  }

  async getAllPostsForAuthUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = req.params.page;
      const userId = req.body.userId;
      const allPosts = await PostService.getAllPostsForAuthUser(page, userId);
      return res.json({ payload: allPosts });
    } catch (e) {
      next(e);
    }
  }

  async findPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { payload } = req.body;
      const foundPosts = await PostService.findPosts(payload);
      return res.json({ payload: foundPosts });
    } catch (e) {
      next(e);
    }
  }

  async getMyPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const posts = await PostService.getMyPosts(userId);
      return res.json({ payload: posts });
    } catch (e) {
      next(e);
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.id;
      const { userId } = req.body;
      const post = await PostService.getPost(postId, userId);
      return res.json({ payload: post });
    } catch (e) {
      next(e);
    }
  }

  async changeRating(req: Request, res: Response, next: NextFunction) {
    try {
      const { rating, postId, userId } = req.body;
      const rateNumber = await PostService.changeRating(rating, postId, userId);
      return res.json(rateNumber);
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
