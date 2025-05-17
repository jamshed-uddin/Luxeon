import AddToCartOrBuy from "@/components/products/AddToCartOrBuy";
import { render, screen } from "@testing-library/react";

describe("add to cart button component", () => {
  beforeEach(() => {
    render(<AddToCartOrBuy id="1" inStock={true} />);
  });

  it("renders the add to cart button", () => {
    const addToCartBtn = screen.getByRole("button", { name: "Add to cart" });

    expect(addToCartBtn).toBeInTheDocument();
  });
});
