import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

describe(App.name, () => {
  it("should render", () => {
    <BrowserRouter>
        <Routes>
            render(<App />);
        </Routes>
    </BrowserRouter>
  });
});