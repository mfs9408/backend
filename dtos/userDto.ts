export {};

interface Model {
  email: string;
  id: number;
  role: string;
  nickname?: string;
}

module.exports = class UserDto {
  email: string;
  id: number;
  role: string;
  nickname: string;

  constructor({ email, id, role, nickname }: Model) {
    this.email = email;
    this.id = id;
    this.role = role;
    this.nickname = nickname;
  }
};
