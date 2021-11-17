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
      return res.json(allPosts);
    } catch (e) {
      next(e);
    }
  }

  async findPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { payload } = req.body;
      const foundPosts = await PostService.findPosts(payload);
      return res.json(foundPosts);
    } catch (e) {
      next(e);
    }
  }

  async getMyPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body.payload;
      const posts = await PostService.getMyPosts(userId);
      return res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const post = await PostService.getPost(id);
      return res.json(post);
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
