import Hero from "@/components/homepage/Hero";

import { render, screen } from "@testing-library/react";

describe("hero section", () => {
  it("contains hero section text", () => {
    render(<Hero />);

    const heroText = screen.getByRole("heading", { level: 1 });

    expect(heroText).toBeInTheDocument();
  });
});
