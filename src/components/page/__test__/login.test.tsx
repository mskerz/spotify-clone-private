import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/components/page/login";
import { useLoginForm } from "@/hook/forms";
import { useRedux } from "@/hook/redux";
import { authActions } from "@/providers/redux/slice/action";
import toast from "react-hot-toast";

// Mock hook useLoginForm
jest.mock("@/hooks/useLoginForm");
// Mock hook useRedux
jest.mock("@/hooks/useRedux");
// Mock toast
jest.mock("react-hot-toast");

describe("LoginPage", () => {
  const mockSetField = jest.fn();
  const mockResetLoginForm = jest.fn();

  const mockDispatch = jest.fn();
  const mockUseSelector = jest.fn();

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
});
