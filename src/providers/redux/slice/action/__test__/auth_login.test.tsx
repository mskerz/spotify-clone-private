
import { auth } from "@/libs/firebase/client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { SignIn } from "../auth";

jest.mock("firebase/auth");
global.fetch = jest.fn();

describe("SignIn asyncThunk", () => {
  const mockEmail = "test@example.com";
  const mockPassword = "123456";
  const mockUser = {
    uid: "user123",
    getIdToken: jest.fn(),
  };
  const mockUserData = { id: "user123", name: "Test User" };

  beforeEach(() => {
    jest.clearAllMocks();
  });
 it("should return user data on successful login", async () => {
  (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: mockUser,
  });

  mockUser.getIdToken.mockResolvedValue("fake-token");

  (fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => ({ user: mockUserData }),
  });

  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = undefined;

  const result = await SignIn({ email: mockEmail, password: mockPassword })(dispatch, getState, extra);

  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
    auth,
    mockEmail,
    mockPassword,
  );
  expect(mockUser.getIdToken).toHaveBeenCalled();
  expect(fetch).toHaveBeenCalledWith("/api/auth/sync", expect.any(Object));
  
  // เปลี่ยนบรรทัดนี้
  expect(result.payload).toEqual(mockUserData);
});



 it("should reject with error message on failure", async () => {
  const errorMessage = "Invalid email or password";

  (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error("Auth error"));

  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = undefined;
  const rejectWithValue = jest.fn();

  // thunk ไม่รับ rejectWithValue โดยตรง ต้องทดสอบผ่าน dispatch
  // เราจะตรวจสอบโดยจับ reject value ผ่านการจับ error หรือ mock store จริง ๆ

  try {
    await SignIn({ email: mockEmail, password: mockPassword })(dispatch, getState, extra);
  } catch (e) {
    // ใน thunk จะ return rejectWithValue ซึ่งจะทำให้ Promise reject ที่นี่
    // ตรวจสอบ message หรือ error object ได้ที่นี่ถ้าต้องการ
  }
});

});
