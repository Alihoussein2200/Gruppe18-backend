import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

describe(App.name, () => {
  it("should render", () => {
    render(
      <BrowserRouter>
          <App />
      </BrowserRouter>
    );
    expect(screen.getByText("Super Bazar Lyngby")).toBeInTheDocument();
  });
});