import { ModelInterface } from "../types";

export default class UserDto {
  email: string;
  id: string;
  role: [string];
  nickname: string;

  constructor({ email, id, role, nickname }: ModelInterface) {
    this.email = email;
    this.id = id;
    this.role = role;
    this.nickname = nickname;
  }
}
