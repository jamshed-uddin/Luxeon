import AddToCartOrBuy from "@/components/products/AddToCartOrBuy";
import { useCart } from "@/providers/CartProvider";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

jest.mock("../src/providers/CartProvider.tsx", () => ({
  useCart: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockAddToCart = jest.fn();

beforeEach(() => {
  (useCart as jest.Mock).mockReturnValue({
    addToCart: mockAddToCart,
  });

  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: { _id: "userId123" },
    },
  });
});

describe("add to cart button component", () => {
  it("renders the add to cart button", () => {
    render(<AddToCartOrBuy id="1" inStock={true} />);

    const addToCartBtn = screen.getByRole("button", { name: "Add to cart" });

    expect(addToCartBtn).toBeInTheDocument();
  });

  it("render initial quantity", () => {
    render(<AddToCartOrBuy id="1" inStock={true} />);

    const quantity = screen.getByTestId("quantity");

    expect(quantity).toHaveTextContent("1");
  });

  it("increment and decrement quantity", () => {
    render(<AddToCartOrBuy id="1" inStock={true} />);

    const quantity = screen.getByTestId("quantity");

    const increment = screen.getByTestId("increment-btn");
    const decrement = screen.getByTestId("decrement-btn");

    fireEvent.click(increment);
    expect(quantity).toHaveTextContent("2");

    fireEvent.click(decrement);
    expect(quantity).toHaveTextContent("1");
  });

  it("disables decrement button at quantity 1", () => {
    render(<AddToCartOrBuy id="1" inStock={true} />);

    const decrement = screen.getByTestId("decrement-btn");

    expect(decrement).toBeDisabled();
  });

  it("calls addToCart function on button click", async () => {
    render(<AddToCartOrBuy id="1" inStock={true} />);

    const addToCartBtn = screen.getByRole("button", { name: "Add to cart" });

    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith({
        productId: "1",
        quantity: 1,
        userId: "userId123",
      });

      expect(toast.success).toHaveBeenCalledWith("Product added to cart");
    });
  });

  it("disables add to cart button at inStock false", () => {
    render(<AddToCartOrBuy id="1" inStock={false} />);

    const button = screen.getByRole("button", { name: "Add to cart" });

    expect(button).toBeDisabled();
  });
});
