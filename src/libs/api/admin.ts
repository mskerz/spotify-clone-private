import { ADMIN_API } from "@/constant/api";
import api from "@/libs/axios";
import { AdminUser } from "@/types/user";

async function getAdmins(): Promise<AdminUser[]> {
  try {
    const res = await api.get(ADMIN_API.ADMIN_USERS);
    return res.data.admins;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}


export { getAdmins };