import '@testing-library/jest-dom';
import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { ToastBox, alerta } from "../../src/index";

describe("ToastBox Component", () => {
  beforeEach(() => {
    alerta.dismissAll();
  });

  it("renders a success toast when alerta.success() is called", () => {
    render(<ToastBox position="top-right" />);

    act(() => {
      alerta.success("Success message");
    });

    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  it("renders an error toast when alerta.error() is called", () => {
    render(<ToastBox position="top-right" />);

    act(() => {
      alerta.error("Error message");
    });

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders a warning toast when alerta.info() is called", () => {
    render(<ToastBox position="top-right" />);

    act(() => {
      alerta.info("Info message");
    });

    expect(screen.getByText("Info message")).toBeInTheDocument();
  });

  it("renders a warning toast when alerta.warning() is called", () => {
    render(<ToastBox position="top-right" />);

    act(() => {
      alerta.warning("Warning message");
    });
    
    expect(screen.getByText("Warning message")).toBeInTheDocument();
  });

  it("automatically removes a toast after a set duration", async () => {
    jest.useFakeTimers(); 
  
    // Render the ToastBox component where toasts will appear
    render(<ToastBox position="top-right" />);
  
    // Trigger a success toast
    act(() => {
      alerta.success("Auto-remove message", { duration: 3000 });
    });
  
    // Ensure the toast is initially visible
    expect(screen.getByText("Auto-remove message")).toBeInTheDocument();
  
    // Fast-forward time by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });
  
    // Wait for the toast to be removed after the duration
    await waitFor(() => {
      expect(screen.queryByText("Auto-remove message")).not.toBeInTheDocument();
    });
  
    jest.useRealTimers();
  });

  it("respects the position prop", () => {
    const { container } = render(<ToastBox position="bottom-left" />);

    // Trigger a toast
    act(() => {
      alerta.success("Position test toast");
    });

    // Check the container's class to confirm the correct position
    expect(container.firstChild).toHaveClass("bottom-left");
  });

  it("renders a toast with a timer if showTimer is true", () => {
    render(<ToastBox position="top-right" showTimer={true} />);

    // Trigger a toast
    act(() => {
      alerta.success("Timer toast");
    });

    // Ensure the toast is visible
    expect(screen.getByText("Timer toast")).toBeInTheDocument();

    const timerElement = screen.getByTestId("toast-timer");
    expect(timerElement).toBeInTheDocument();
  });
});
