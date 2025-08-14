import { v4 as uuidv4 } from "uuid";

export const getSessionId = (req: Request) => {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sessionId=([a-zA-Z0-9\-]+)/);

  return match ? match[1] : uuidv4();
};
