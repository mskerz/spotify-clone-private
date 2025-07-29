"use client";

import Image from "next/image";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, X } from "lucide-react";

import ControlledDatePicker from "@/components/datepicker";
import CategoriesDropdown from "@/components/dropdown/categories";
import { Button } from "@/components/ui/button";
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
import { useUpdateSongMutation } from "@/libs/rtk/song";
import { Song } from "@/types/song";
import { random } from "@/utils/random";
import { FormSongType, validationFormSong } from "@/validation/admin/song";

type Props = {
  selectedSong: Song;
  onClose: () => void;
};

function UpdateSongDialog({ selectedSong, onClose }: Props) {
  const { isOpen, close, setIsOpen } = useOpenControl();
  const { data: categories } = useGetCategoriesQuery();
  const [updateSong] = useUpdateSongMutation();

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
    defaultValues: {
      title: selectedSong.title,
      artist: selectedSong.artist,
      categoryId: selectedSong.category.id,
      releaseDate: new Date(selectedSong.releaseDate),
      coverImage: selectedSong.coverImage,
    },
  });
  const coverImage = watch("coverImage");
  const selectedCategoryId = watch("categoryId");
  const onSubmit = async (data: FormSongType) => {
    await updateSong({ id: selectedSong.id, data })
      .unwrap()
      .then(() => {
        toast.success("Song updated successfully.");
        reset();
        close();
        onClose?.();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

 

  const onError = () => {
    toast.error("Please fill in all required fields.");
  };
  const handleClose = () => {
    reset();
    close();

    onClose?.();  
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <div
          className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm
      hover:bg-neutral-200 dark:hover:bg-neutral-600
      select-none"
        >
          <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>Update</span>
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={handleClose}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Song</DialogTitle>
               <Button
                variant={"link"}
                className="cursor-pointer hover:no-underline hover:opacity-60 transition-all"
                onClick={handleClose}
              >
                Cancel
              </Button>
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

                    {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="releaseDate"
                      className="text-sm font-medium"
                    >
                      Release Date
                    </Label>
                    <div className="flex items-center gap-2">
                      <ControlledDatePicker
                        control={control}
                        name="releaseDate"
                        placeholder="Select release date"
                        onDateChange={(date) => {
                          setValue("releaseDate", date!);
                        }}
                      />
                    </div>
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
export default UpdateSongDialog;
