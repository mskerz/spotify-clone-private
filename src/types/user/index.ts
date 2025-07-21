type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

type User = {
  name: string;
  email: string;
  role: UserRole;
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

 
 

type AdminUser = {
  index: number;
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  detail: UserInfo;
};

export type { User, AdminUser };
