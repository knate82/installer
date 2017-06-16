describe("Installer", function(){
  //Happy Path if installController is given an Array of strings it sorts dependents and installs in order of importance.
  it("It should take an array of strings as packages and return them in order of install, installing dependencies first", function(){
    expect(dependencies(['A: B', 'B: C', 'C: '])).toBe(['C', 'B', 'A']);
    expect(dependencies(['E: F', 'F: G', 'G: ', 'A: B', 'B: C', 'C: D', 'D: '])).toBe(['G', 'D', 'F', 'C', 'E', 'B', 'A']);
    expect(dependencies(['CamelCaser: ', 'SuperMan: Kryptonite', 'Kryptonite: CamelCaser'])).toBe(['CamelCaser', 'Kryptonite', 'SuperMan']);
  });
});
