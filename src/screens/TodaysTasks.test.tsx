import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import TodaysTasks from "./TodaysTasks";

const renderScreen = () =>
  render(
    <MemoryRouter>
      <TodaysTasks />
    </MemoryRouter>
  );

describe("TodaysTasks (TRL-004)", () => {
  it("renders the title and all 5 day chips", () => {
    renderScreen();
    expect(screen.getByText(/Today's Tasks/)).toBeInTheDocument();
    ["Fri", "Sat", "Sun", "Mon", "Tue"].forEach((d) =>
      expect(screen.getByText(d)).toBeInTheDocument()
    );
  });

  it("shows all tasks by default", () => {
    renderScreen();
    expect(screen.getByText("Market Research")).toBeInTheDocument();
    expect(screen.getByText("Competitive Analysis")).toBeInTheDocument();
    expect(screen.getByText("Create Low-fidelity Wireframe")).toBeInTheDocument();
  });

  it("filters tasks when a filter pill is selected", async () => {
    renderScreen();
    await userEvent.click(screen.getByRole("button", { name: /^To do$/ }));
    expect(screen.queryByText("Market Research")).not.toBeInTheDocument();
    expect(screen.getByText("Create Low-fidelity Wireframe")).toBeInTheDocument();
  });

  it("changes the active day on chip click", async () => {
    renderScreen();
    const monBtn = screen.getByText("Mon").closest("button");
    expect(monBtn).not.toBeNull();
    await userEvent.click(monBtn as HTMLElement);
    expect(monBtn).toHaveClass("bg-brand");
  });
});
