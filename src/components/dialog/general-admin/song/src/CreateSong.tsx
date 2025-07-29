"use client";

import Image from "next/image";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import ControlledDatePicker from "@/components/datepicker";
import CategoriesDropdown from "@/components/dropdown/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOpenControl } from "@/hooks/control";
import { useGetCategoriesQuery } from "@/libs/rtk/category";
import { useCreateSongMutation } from "@/libs/rtk/song";
import { ChildrenProps } from "@/types/props";
import { FormSongType, validationFormSong } from "@/validation/admin/song";
import { faker } from "@faker-js/faker";
import { random } from "@/utils/random";

function CreateSongDialog({ children }: ChildrenProps) {
  const { data: categories } = useGetCategoriesQuery();
  const [createSong, { isLoading, isSuccess, error }] = useCreateSongMutation();
  const { isOpen, setIsOpen, close } = useOpenControl();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    resetField,
    watch,

    reset,
    formState: { errors },
  } = useForm<FormSongType>({
    resolver: zodResolver(validationFormSong),
    mode: "onChange",
  });
  const coverImage = watch("coverImage");
const selectedCategoryId = watch("categoryId");

  const RandomSong = () => {
    setValue("title", faker.music.songName());
    setValue("artist", faker.music.artist());
    setValue("releaseDate", faker.date.past({years: 50}));
    setValue("categoryId", faker.number.int({ min: 1, max: 7 }));
    setValue("coverImage", random.generateImage());

    
  }

  const onSubmit = async (data: FormSongType) => {
    await createSong(data)
      .unwrap()
      .then(() => {
        toast.success("Song added successfully.");
        reset();
        close();
      }).catch((error) => {
        toast.error(error.message);
      });
  };

  const onError = () => {
    toast.error("Please fill in all required fields.");
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger>{children || "Create"}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={() => reset()}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Insert Song</DialogTitle>
            <div className="flex flex-col">
              <Button
              variant={"link"}
              className="cursor-pointer hover:no-underline hover:opacity-60 transition-all"
              onClick={() => {
                reset();
                close();
              }}
            >
              Cancel
            </Button>
            <Button type="button" variant={"secondary"} onClick={RandomSong}>
              Random
            </Button>
            </div>
          </div>
          <DialogDescription>Please fill in all required fields.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="w-full max-w-2xl shadow-lg border-0 ">
            <div className="p-4">
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="songName"
                      className="text-sm font-medium"
                    >
                      Song Title
                    </Label>
                    <Input
                      id="songName"
                      placeholder="Enter song title"
                      {...register("title")}
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="artist"
                      className="text-sm font-medium"
                    >
                      Artist
                    </Label>
                    <Input
                      id="artist"
                      placeholder="Enter artist name"
                      {...register("artist")}
                    />
                    {errors.artist && <p className="text-red-500">{errors.artist.message}</p>}
                  </div>
                </div>
                {/* Song Title */}

                {/* Artist */}

                {/* Category and Release Date - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium"
                    >
                      Category
                    </Label>
                    <CategoriesDropdown
                      categories={categories || []}
                      selectedId={selectedCategoryId}
                      onChange={(selectedCategoryId) => setValue("categoryId", selectedCategoryId)}
                    />

                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="releaseDate"
                      className="text-sm font-medium"
                    >
                      Release Date
                    </Label>
                    <ControlledDatePicker
                      control={control}
                      name="releaseDate"
                      placeholder="Select release date"
                      onDateChange={(date) => {
                        if (date) {
                          setValue("releaseDate", date);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Cover Image */}
                <div className="space-y-3">
                  <Label
                    htmlFor="coverImage"
                    className="text-sm font-medium"
                  >
                    Cover Image URL
                  </Label>

                  {coverImage && (
                    <div className="flex justify-center">
                      <div className="relative overflow-hidden rounded-lg border-2 shadow-md">
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute top-1 right-1 z-10 rounded-full p-1 cursor-pointer "
                          onClick={() => resetField("coverImage")}
                        >
                          <X size={16} />
                        </Button>
                        <Image
                          src={coverImage}
                          alt="Cover Image Preview"
                          width={200}
                          height={200}
                          className="w-42 h-42 object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  <Input
                    id="coverImage"
                    type="url"
                    placeholder="Paste image URL (e.g., https://example.com/image.jpg)"
                    {...register("coverImage")}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full button-spotify font-semibold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-95"
                  >
                    Complete
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
export default CreateSongDialog;
