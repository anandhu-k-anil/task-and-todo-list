import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import LetsStart from "./LetsStart";

const renderApp = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<LetsStart />} />
        <Route path="/home" element={<div>Home Screen</div>} />
      </Routes>
    </MemoryRouter>
  );

describe("LetsStart (TRL-001)", () => {
  it("renders the brand title", () => {
    renderApp();
    expect(screen.getByText(/Task Management/)).toBeInTheDocument();
    expect(screen.getByText(/To-Do List/)).toBeInTheDocument();
  });

  it("renders the descriptive sub-copy", () => {
    renderApp();
    expect(
      screen.getByText(/productive tool is designed to help/i)
    ).toBeInTheDocument();
  });

  it("navigates to /home when CTA pressed", async () => {
    renderApp();
    const cta = screen.getByRole("button", { name: /let's start/i });
    await userEvent.click(cta);
    expect(screen.getByText("Home Screen")).toBeInTheDocument();
  });
});
