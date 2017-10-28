import React from "react";
import App from "./App";
import { View } from "react-native";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<App />).toJSON();

  expect(rendered).toMatchSnapshot();
});

it("renders the correct number of children", () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered.children.length).toBe(3);
});

it("renders 5 colors", () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(
    rendered.children[1].children[0].children[3].children[1].children[1]
      .children.length
  ).toBe(5);
});
