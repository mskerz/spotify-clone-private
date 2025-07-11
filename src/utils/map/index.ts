import { avartar } from "@/constant";
import { UserWithInfo } from "@/types/user/prisma";
import { AuthProvider } from "@prisma/client";

type MappedUserResponse = {
  firebaseUid: string;
  email: string;
  role: string; // หรือถ้าใช้ enum Role จาก Prisma ก็: Role
  provider: string; // หรือถ้าใช้ enum AuthProvider จาก Prisma ก็: AuthProvider
  detail: {
    firstName: string | null;
    lastName: string | null;
    age: number;
    phoneNumnber: string | null;
    birthday: Date | null;
    avatarUrl: string | null;
  };
};
function mapFirebaseProvider(provider: string): AuthProvider {
  switch (provider) {
    case "google.com":
      return AuthProvider.GOOGLE;
    case "password":
    default:
      return AuthProvider.LOCAL;
  }
}

function mapUserResponse(user: UserWithInfo): MappedUserResponse {
  if (!user.userInfo) {
    throw new Error("User info not found");
  }
  return {
    firebaseUid: user.firebaseUid,
    email: user.email,
    role: user.role,
    provider: user.provider,
    detail: {
      firstName: user.userInfo.firstName,
      lastName: user.userInfo.lastName,
      age: user.userInfo.age,
      phoneNumnber: user.userInfo.phoneNumber,
      birthday: user.userInfo.birthday,
      avatarUrl: user.userInfo.avatarUrl,
    },
  };
}


function randomAvatar() {
    return  avartar[Math.floor(Math.random() * avartar.length)];
}




// เอาไว้แค่นี้ก่อน
export { mapFirebaseProvider, mapUserResponse , randomAvatar };
