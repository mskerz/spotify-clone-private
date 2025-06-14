
import { Prisma } from "@prisma/client";

type UserWithInfo = Prisma.UserGetPayload<{
  include: {
    userInfo: true;
  };
}>;

export type { UserWithInfo };