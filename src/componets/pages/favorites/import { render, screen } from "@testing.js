import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import Favorites from "./Favorites";

test("renders favorites title", () => {
  render(
    <Provider store={store}>
      <Favorites />
    </Provider>
  );
  const titleElement = screen.getByText(/Your Favorite Recipes/i);
  expect(titleElement).toBeInTheDocument();
});
