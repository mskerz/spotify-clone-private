"use client";

import { toast } from "react-hot-toast";
import { auth, app } from "@/libs/firebase/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useRegisterForm } from "@/hook/forms";

function RegisterPage() {
  const { form, setField, resetRegisterForm, isFormEmpty } = useRegisterForm();
  const navigate = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isFormEmpty) {
        toast("Please fill in all required fields.", {
          icon: "⚠️",
          style: {
            borderRadius: "15px",
            background: "#212121",
            color: "#fff",
          },
        });
        return;
      }

      const {
        email,
        password,
        firstName,
        lastName,
        age,
        phoneNumber,
        birthday,
      } = form;
      const createNewUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebase_uid: createNewUser.user.uid,
          email: createNewUser.user.email,
          firstName: firstName,
          lastName: lastName,
          age: age,
          phoneNumber: phoneNumber,
          birthday: birthday,
        }),
      });

      if (response.ok) {
        toast.success("User registered successfully.");
        resetRegisterForm();
        navigate.replace("/login");
      }
    } catch (error) {
      toast.error("Error registering user.");
      console.error("❌ Error registering user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <div className="flex my-3  h-auto max-w-xl flex-col items-center rounded-xl bg-black p-10 shadow-lg">
          <div className="flex flex-col items-center">
            <h2 className="mb-2 text-xl font-semibold text-gray-200">
              Sign up to your account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center"
          >
            <div className="mb-4 w-full">
              <label className="mb-1 block text-white">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className="w-full rounded-md bg-gray-800 p-2 text-white"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="mb-1 block text-white">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                className="w-full rounded-md bg-gray-800 p-2 text-white"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4 flex w-full gap-4">
              <div className="w-1/2">
                <label className="mb-1 block text-white">Firstname</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className="w-full rounded-md bg-gray-800 p-2 text-white"
                  placeholder="Enter your firstname"
                />
              </div>
              <div className="w-1/2">
                <label className="mb-1 block text-white">Lastname</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className="w-full rounded-md bg-gray-800 p-2 text-white"
                  placeholder="Enter your lastname"
                />
              </div>
            </div>
            <div className="mb-4 flex w-full gap-4">
              <div className="w-1/2">
                <label className="mb-1 block text-white">Age</label>
                <input
                  type="number"
                  min={0}
                  value={form.age}
                  onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value) || 1);
                    setField("age", value);
                  }}
                  className="w-full rounded-md bg-gray-800 p-2 text-white"
                  placeholder="Enter your age"
                />
              </div>
              <div className="w-1/2">
                <label className="mb-1 block text-white">Phone Number</label>
                <input
                  type="text"
                  value={form.phoneNumber}
                  onChange={(e) => setField("phoneNumber", e.target.value)}
                  className="w-full rounded-md bg-gray-800 p-2 text-white"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="mb-4 w-full">
              <label className="mb-1 block text-white">Birth Date</label>
              <input
                type="date"
                value={form.birthday}
                onChange={(e) => setField("birthday", e.target.value)}
                className="w-full rounded-md bg-gray-800 p-2 text-white"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full cursor-pointer rounded-3xl bg-[#1ed760] px-4 py-2 text-white shadow transition hover:bg-[#1fdf64]"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
