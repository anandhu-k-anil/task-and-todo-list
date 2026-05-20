import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import AddProject from "./AddProject";
import { useStore } from "../store";

const renderScreen = () =>
  render(
    <MemoryRouter initialEntries={["/projects/new"]}>
      <Routes>
        <Route path="/projects/new" element={<AddProject />} />
        <Route path="/home" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>
  );

describe("AddProject (TRL-005)", () => {
  beforeEach(() => {
    useStore.persist.clearStorage();
    useStore.setState({ projects: [], tasks: [] });
  });

  it("renders all the required form fields", () => {
    renderScreen();
    expect(screen.getByText(/Task Group/)).toBeInTheDocument();
    expect(screen.getByText(/Project Name/)).toBeInTheDocument();
    expect(screen.getByText(/Description/)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/)).toBeInTheDocument();
    expect(screen.getByText(/End Date/)).toBeInTheDocument();
  });

  it("shows a validation error when name is empty", async () => {
    renderScreen();
    await userEvent.click(screen.getByRole("button", { name: /Add Project/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/name is required/i);
    expect(useStore.getState().projects).toHaveLength(0);
  });

  it("adds the project to the store and navigates home", async () => {
    renderScreen();
    await userEvent.type(screen.getByPlaceholderText(/Grocery Shopping App/i), "My New Project");
    await userEvent.type(screen.getByPlaceholderText(/What is this project about/i), "Some description");
    await userEvent.click(screen.getByRole("button", { name: /Add Project/i }));

    const projects = useStore.getState().projects;
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe("My New Project");
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
