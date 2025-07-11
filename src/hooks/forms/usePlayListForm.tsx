import { useState } from "react";

type PlaylistFormType = {
 
   name : string
   coverImage : string

};
  function usePlayListForm() {
  const [form, setForm] = useState<PlaylistFormType>({
      name: "",
      coverImage: "",
  });
  const isFormEmpty =
    !form.name ||
    !form.coverImage 

  const setField = <key extends keyof PlaylistFormType>(
    field: key,
    value: PlaylistFormType[key],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => {
    setForm({
      name: "",
      coverImage: "",
    });
  };

  return {
    form,
    setField,
    reset,
    isFormEmpty,
  };
}
export default usePlayListForm