 import { FormRegisterType } from "@/types/form";
import { useState } from "react";


 function useRegisterForm() {
  const [form, setForm] = useState<FormRegisterType>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: 1,
    phoneNumber: "",
    birthday: "",
  });
  const isFormEmpty =
    !form.email ||
    !form.password ||
    !form.firstName ||
    !form.lastName ||
    !form.age ||
    !form.birthday;

  const setField = <key extends keyof FormRegisterType>(
    field: key,
    value: FormRegisterType[key],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetRegisterForm = () => {
    setForm({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      age: 1,
      phoneNumber: "",
      birthday: "",
    });
  };

  return {
    form,
    setField,
    resetRegisterForm,
    isFormEmpty,
  };
}


export default useRegisterForm