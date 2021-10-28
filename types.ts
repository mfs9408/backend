type RegistrationProperty = BaseProperty<
  RequestRegistration,
  ResponseRegistration,
  NextProperty
>;

interface BaseProperty<T, V, R> {
  req: T;
  res: V;
  next: R;
}

interface RequestRegistration {
  body: RequestBodyRegistration;
}

interface RequestBodyRegistration {
  email: string;
  nickname: string;
  password: string;
}

interface ResponseRegistration {
  json: (arg0: { token: string }) => string;
  cookie(
    data: string,
    refreshToken: string,
    age: { maxAge: number; httpOnly: boolean }
  ): void;
}

interface NextProperty {
  next: (text: string) => Next;
}

type Next = {
  status: number;
  message: string;
};

type activateAccountProperty = BaseProperty<any, any, NextProperty>;

interface Interface {
  
}

export { RegistrationProperty };
