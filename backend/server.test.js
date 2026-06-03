test("math works correctly", () => {
  expect(2 + 2).toBe(4);
});

test("string contains word", () => {
  expect("cicd pipeline project").toContain("pipeline");
});

test("status is running", () => {
  const status = "running";
  expect(status).toBe("running");
});