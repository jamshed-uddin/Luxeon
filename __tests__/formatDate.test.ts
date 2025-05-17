import { formatDate } from "@/lib/formatDate";

describe("date format", () => {
  it("returns formatted date", () => {
    expect(formatDate(new Date("05-17-2025"))).toBe("17 May 2025");
  });
});
