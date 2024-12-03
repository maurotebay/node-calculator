import calculate from "./calculate.js";

describe("Calculator Function", () => {
  test("should handle simple addition", () => {
    expect(calculate("2 + 3")).toBe(5);
  });

  test("should handle multiplication and parentheses", () => {
    expect(calculate("10 * (2 + 5)")).toBe(70);
  });

  test("should handle multiple terms division", () => {
    expect(calculate("100 / 5 / 2")).toBe(10);
  });

  test("should throw an error for invalid input", () => {
    expect(() => calculate("10 * (2 + )")).toThrow(
      "Syntax Error: Double operator detected"
    );
  });

  test("should handle negative numbers and subtraction", () => {
    expect(calculate("-5 + 10 - (-15)")).toBe(20);
  });

  test("should throw an error for division by zero", () => {
    expect(() => calculate("10 / 0")).toThrow("Can not divide by 0");
  });
});
