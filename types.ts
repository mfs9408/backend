interface PostInterface {
  _id?: string;
  user?: AuthorInterface;
  title?: string;
  creatingDate?: string;
  rating?: number;
  content?: [itemInterface];
  usersScore?: number | undefined;
}

interface AuthorInterface {
  author: string;
  userId: string;
}

interface itemInterface {
  item: string;
}

interface FindingInterface {
  nickname?: string;
  keyWords?: string;
  rating?: number;
  period?: DateInterface;
}

interface DateInterface {
  from: string;
  to: string;
}

interface TokenGeneratorInterface {
  email: string;
  nickname: string;
  role: [string];
}

interface ModelInterface {
  email: string;
  id?: string;
  role: [string];
  nickname?: string;
}

export {
  PostInterface,
  FindingInterface,
  TokenGeneratorInterface,
  ModelInterface,
};
