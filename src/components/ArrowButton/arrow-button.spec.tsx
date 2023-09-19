import * as React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import { ArrowButton } from "./index";

jest.mock("native-base", () => ({
  ...jest.requireActual("native-base"),
}));

describe("ArrowButton", () => {
  it("Should call the onPress function when pressed", () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(<ArrowButton onPress={onPressMock} />);

    const arrowButton = getByTestId("arrow-button");

    fireEvent.press(arrowButton);

    expect(onPressMock).toHaveBeenCalled();
  });
});
