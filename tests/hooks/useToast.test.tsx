import "@testing-library/jest-dom";
import { renderHook, act, waitFor, screen } from "@testing-library/react";
import useToast from "../../src/hooks/useToast";

describe("useToast hook", () => {
  it("should add a toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast({
        id: "1",
        message: "Test toast",
        duration: 3000,
        type: "success",
      });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].message).toBe("Test toast");
  });

  it("should remove a toast by id", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast({
        id: "1",
        message: "Test toast",
        duration: 3000,
        type: "error",
      });
      result.current.removeToast("1");
    });

    expect(result.current.toasts.length).toBe(0);
  });

  it("should handle multiple toasts", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast({
        id: "1",
        message: "First toast",
        duration: 3000,
        type: "success",
      });
      result.current.addToast({
        id: "2",
        message: "Second toast",
        duration: 3000,
        type: "success",
      });
    });

    expect(result.current.toasts.length).toBe(2);
    expect(result.current.toasts[0].message).toBe("First toast");
    expect(result.current.toasts[1].message).toBe("Second toast");
  });

  it("should auto-remove a toast after a certain duration", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast({
        id: "1",
        message: "Auto-remove toast",
        duration: 3000,
        type: "success",
      });
    });

    expect(result.current.toasts.length).toBe(1);

    // Fast-forward time by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Auto-remove message")).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
