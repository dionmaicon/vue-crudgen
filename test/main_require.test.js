const childProcess = require("child_process");

test("requiring main.js does not execute the CLI", () => {
  const execSpy = jest.spyOn(childProcess, "exec");

  expect(() => {
    require("../main.js");
  }).not.toThrow();

  expect(execSpy).not.toHaveBeenCalled();
  execSpy.mockRestore();
});
