type User = {
  name: string;
  email: string;
  role: string;
  provider: string;
  firebaseUid: string;
  createdAt: Date;
  updatedAt: Date;
  detail: UserInfo;
};

type UserInfo = {
  firstName: string;
  lastName: string;
  age: number;
  phoneNumnber: string;
  birthday: Date;
  avatarUrl: string;
};

export type { User };
