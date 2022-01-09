import { ModelInterface } from "../types";

export default class UserDto {
  email: string;
  id: string;
  role: [string];
  nickname: string;
  isActivated: boolean;

  constructor({ email, id, role, nickname, isActivated }: ModelInterface) {
    this.email = email;
    this.id = id;
    this.role = role;
    this.nickname = nickname;
    this.isActivated = isActivated;
  }
}
