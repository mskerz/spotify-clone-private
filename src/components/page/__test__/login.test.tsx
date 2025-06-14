import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/components/page/login";
import { useLoginForm } from "@/hook/forms";
import { useRedux } from "@/hook/redux";
import toast from "react-hot-toast";

// Mock toast
jest.mock("react-hot-toast");

// Mock hook useLoginForm
jest.mock("@/hook/forms");

// Mock hook useRedux
jest.mock("@/hook/redux");

// Mock authActions.SignIn เป็น jest.fn()
jest.mock("@/providers/redux/slice/action", () => ({
  authActions: {
    SignIn: jest.fn((payload) => ({ type: "auth/signin", payload })),
  },
}));

// Import authActions mock หลังจาก mock
import { authActions } from "@/providers/redux/slice/action";

describe("LoginPage", () => {
  const mockSetField = jest.fn();
  const mockResetLoginForm = jest.fn();
  const mockUnwrap = jest.fn().mockResolvedValue({}); // mock unwrap ของ thunk
  const mockDispatch = jest.fn(() => ({
    unwrap: mockUnwrap,
  }));

  beforeEach(() => {
    jest.clearAllMocks();

    (useLoginForm as jest.Mock).mockReturnValue({
      form: { email: "", password: "" },
      setField: mockSetField,
      isFormEmpty: true,
      resetLoginForm: mockResetLoginForm,
    });

    (useRedux as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
      useSelector: () => ({ user: null }),
    });

    (toast.promise as jest.Mock).mockImplementation(
      (promise: Promise<unknown>) => promise,
    );

    (toast as unknown as jest.Mock).mockImplementation(() => null);
  });

  test("shows error toast if form is empty", () => {
    render(<LoginPage />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(toast).toHaveBeenCalledWith(
      "Please fill in all required fields.",
      expect.objectContaining({
        icon: "⚠️",
      }),
    );
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test("calls dispatch and toast.promise on valid submit", async () => {
    const email = "test2@example.com";
    const password = "123456";

    // mock useLoginForm ให้ form ไม่ว่าง
    (useLoginForm as jest.Mock).mockReturnValue({
      form: { email, password },
      setField: mockSetField,
      isFormEmpty: false,
      resetLoginForm: mockResetLoginForm,
    });

    render(<LoginPage />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      // เช็คว่า authActions.SignIn ถูกเรียกด้วย payload ถูกต้อง
      expect(authActions.SignIn).toHaveBeenCalledWith({ email, password });

      // เช็คว่า dispatch ถูกเรียกด้วย action ที่ SignIn return (object with type and payload)
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "auth/signin",
          payload: { email, password },
        }),
      );

      expect(toast.promise).toHaveBeenCalled();

      expect(mockResetLoginForm).toHaveBeenCalled();
    });
  });
});
