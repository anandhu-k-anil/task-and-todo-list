import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import Home from "./Home";
import { useStore } from "../store";

describe("Home (TRL-002 + TRL-003)", () => {
  beforeEach(() => {
    useStore.persist.clearStorage();
  });

  it("renders greeting and user name", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText(/Hello!/)).toBeInTheDocument();
    expect(screen.getByText(/Livia Vaccaro/)).toBeInTheDocument();
  });

  it("displays overall progress ring with computed percentage", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    // 1 of 4 seeded tasks is done => 25%
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("renders 'In Progress' carousel with project cards (TRL-003)", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText(/In Progress/)).toBeInTheDocument();
    expect(screen.getAllByText("Office Project").length).toBeGreaterThan(0);
  });

  it("renders 'Task Groups' list with progress (TRL-003)", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText(/Task Groups/)).toBeInTheDocument();
    expect(screen.getByText("23 Tasks")).toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
  });
});
