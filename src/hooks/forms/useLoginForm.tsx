import { useState } from "react";

type FormType = {
  email: string;
  password: string;

};
  function useLoginForm() {
  const [form, setForm] = useState<FormType>({
    email: "test2@gmail.com",
    password: "123456",
  });
  const isFormEmpty =
    !form.email ||
    !form.password 

  const setField = <key extends keyof FormType>(
    field: key,
    value: FormType[key],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetLoginForm = () => {
    setForm({
      email: "",
      password: "",
 
    });
  };

  return {
    form,
    setField,
    resetLoginForm,
    isFormEmpty,
  };
}
export default useLoginForm