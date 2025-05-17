import PriceTag from "@/components/PriceTag";
import { render, screen } from "@testing-library/react";

describe("price tag component", () => {
  it("returns formated price tag according to currency", () => {
    render(<PriceTag price={400} />);

    const priceTag = screen.getByTestId("price-tag");

    expect(priceTag).toHaveTextContent("$4");
  });
});
