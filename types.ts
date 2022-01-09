interface PostInterface {
  id?: string | null;
  user?: UserInterface;
  title?: string;
  creatingDate?: string;
  rating?: number;
  content?: [itemInterface];
  usersScore?: number | undefined;
  removable?: boolean;
}

interface UserInterface {
  nickname: string;
  userId: string;
}

interface itemInterface {
  type: string;
  value: string;
  id: string;
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
  id: string;
  role: [string];
  nickname?: string;
  isActivated: boolean;
}

export {
  PostInterface,
  FindingInterface,
  TokenGeneratorInterface,
  ModelInterface,
};
