type FormRegisterType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  birthday: string;
};

type FormLoginType = {
  email: string;
  password: string;
}


export type { FormRegisterType, FormLoginType };