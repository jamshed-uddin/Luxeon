import { signInWithEmailAndPassword } from "@/actions";
import SigninForm from "@/components/SigninForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("../../src/actions.ts", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => null),
  }),
  usePathname: () => "/signin",
}));

describe("Signin form", () => {
  //   const mockSubmitFunc = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Singin form", () => {
    render(<SigninForm />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });
  it("calls the submit func when form submitted", () => {
    render(<SigninForm />);
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      success: true,
    });
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const form = screen.getByTestId("signin-form");

    fireEvent.change(email, {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(password, {
      target: { value: "helloworld" },
    });

    fireEvent.submit(form);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(FormData)
    );
  });

  it("disables the singin button", async () => {
    render(<SigninForm />);
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      success: true,
    });

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    fireEvent.change(email, {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(password, {
      target: { value: "helloworld" },
    });
    const button = screen.getByRole("button", { name: "Sign in" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(button).toBeDisabled();
    });
  });
});
