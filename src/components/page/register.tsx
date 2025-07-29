"use client";

import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { faker, fakerTH } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components//ui/card";
import { PasswordInput } from "@/components//ui/custom/password-input";
import { withPublic } from "@/components/guard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRegisterForm } from "@/hooks/forms";
import { useRedux } from "@/hooks/redux";
import { authActions } from "@/providers/redux/slice/action";
import { calculateAge } from "@/utils/calculate";
import { FormRegisterType, validationFormRegister } from "@/validation/register";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormRegisterType>({
    resolver: zodResolver(validationFormRegister),
    mode: "onChange",
  });

  const { dispatch } = useRedux();
  const navigate = useRouter();
  const onSubmit = async (data: FormRegisterType) => {
    toast
      .promise(
        dispatch(
          authActions.SignUp({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            phoneNumber: data.phoneNumber,
            birthday: data.birthday.toISOString(),
          }),
        ).unwrap(),
        {
          loading: " Registering...",
          success: " Register successful !",
          error: (err) => err || "Login failed. Please try again.",
        },
      )
      .then(() => {
        // success

        reset();
        navigate.replace("/login");
      })
      .catch(() => {});
  };

  const randomUserData = () => {
    const FirstName = faker.person.firstName();
    const LastName = faker.person.lastName();
    setValue("firstName", FirstName);
    setValue("lastName", LastName);
    setValue(
      "email",
      faker.internet
        .email({
          firstName: FirstName,
          lastName: LastName,
          provider: "gmail.com",
        })
        .toLowerCase(),
    );
    setValue("password", "123456");

    const birthday = faker.date.birthdate({
      min: 18,
      max: 40,
      mode: "age",
    }); // สุ่มวันเกิดก่อน

    setValue("birthday", birthday);
    setValue("age", calculateAge(birthday));
    setValue("phoneNumber", fakerTH.phone.number({ style: "national" }));
  };

  const onError = () => {
    toast.error("Please fill in all required fields.");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <Card className="my-3 flex h-auto max-w-xl flex-col  rounded-xl  p-10 shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Sign up to your account</CardTitle>
            <Button onClick={randomUserData}>Random</Button>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-4 w-full">
                <Label className="mb-1 block ">Email address</Label>
                <Input
                  type="email"
                  className="w-full rounded-md -800 p-2 "
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
              <div className="mb-4 w-full">
                <Label className="mb-1 block ">Password</Label>
                <PasswordInput
                  className="w-full rounded-md -800 p-2 "
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div className="mb-4 flex w-full gap-4">
                <div className="w-1/2">
                  <Label className="mb-1 block ">Firstname</Label>
                  <Input
                    type="text"
                    className="w-full rounded-md  p-2 "
                    placeholder="Enter your firstname"
                    {...register("firstName")}
                  />
                  {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="w-1/2">
                  <Label className="mb-1 block ">Lastname</Label>
                  <Input
                    type="text"
                    className="w-full rounded-md p-2 "
                    placeholder="Enter your lastname"
                    {...register("lastName")}
                  />
                  {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="mb-4 flex w-full gap-4">
                <div className="w-1/2">
                  <Label className="mb-1 block ">Age</Label>
                  <Input
                    type="number"
                    min={1}
                    readOnly
                    className="w-full rounded-md bg-gray-200 dark:bg-accent p-2 cursor-not-allowed "
                    placeholder="Enter your age"
                    {...register("age", { valueAsNumber: true })}
                  />
                </div>
                <div className="w-1/2">
                  <Label className="mb-1 block ">Phone Number</Label>
                  <Input
                    type="text"
                    className="w-full rounded-md  p-2 "
                    placeholder="Enter your phone number"
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                </div>
              </div>
              <div className="mb-4 w-full">
                <Label className="mb-1 block ">Birth Date</Label>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full text-left flex items-center border p-2"
                        >
                          <span className="text-muted-foreground">
                            {field.value ? field.value.toLocaleDateString() : "Select your birth date"}
                          </span>
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 shadow-md rounded-xl"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            if (date) {
                              const age = calculateAge(date);
                              setValue("age", age);
                            }
                          }}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="mt-2 w-full cursor-pointer rounded-3xl bg-[#1ed760] px-4 py-2 text-white shadow transition hover:bg-[#1fdf64]"
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default withPublic(RegisterPage);

/* 

today task 19 07 2025

- refactor react hook form
- refactor zod validation schema : register , login , add admin form 
- format import with prettier sort
- admin add users dialog  fix  ui




*/
