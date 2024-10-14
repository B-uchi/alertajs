import React, { useEffect, useRef, useState } from "react";
import Toast from "./Toast";
import useToast from "../hooks/useToast";

interface ToastBoxProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showTimer?: boolean;
}

const ToastBox: React.FC<ToastBoxProps> = ({ position, showTimer }) => {
  const { toasts, removeToast } = useToast();
  const [isHover, setIsHover] = useState(false);
  const [totalHeight, setTotalHeight] = useState(0);
  const toastRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const setToastRefs = (id: number) => (element: HTMLDivElement | null) => {
    toastRefs.current[id] = element;
  };

  const transform = (index: number) => {
    if (isHover && position.startsWith("top")) return `translateY(${index}px)`;
    if (isHover && position.startsWith("bottom"))
      return `translateY(${index}px)`;
    if (position.startsWith("top")) return `translateY(${index * -65}px)`;
    return `translateY(${index * 65}px)`;
  };

  const containerHeight = () => {
    if (!isHover) {
      if (toasts.length == 1) {
        if (toastRefs.current[0]) return `${toastRefs.current[0].offsetHeight}`;
      } else if (toasts.length > 1) {
        return `${totalHeight}px`;
      } else {
        return "0";
      }
    } else {
      if (toasts.length == 1) {
        if (toastRefs.current[0]) return `${toastRefs.current[0].offsetHeight}`;
      }
      return `auto`;
    }
  };

  useEffect(() => {
    const total = Object.values(toastRefs.current).reduce((acc: number, toastRef: HTMLDivElement | null) => {
      if (toastRef) {
        return acc + toastRef.scrollHeight;
      }
      return acc;
    }, 0);
    setTotalHeight(total);
    if (toasts.length == 0) {
      setIsHover(false);
    }
  }, [toasts, toastRefs]);

  return (
    <div
      className={`toast-container ${position}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        flexDirection: position.startsWith("top") ? "column" : "column-reverse",
        height: containerHeight(),
        maxHeight: "80vh"
      }}
    >
      {toasts.map((toastItem, index) => (
        <div
          key={toastItem.id}
          className="toastWrapper"
          ref={setToastRefs(index)}
          style={{
            zIndex: index,
            transform: transform(index),
          }}
        >
          <Toast
            {...toastItem}
            position={position}
            showTimer={showTimer}
            onClose={() => {
              removeToast(toastItem.id!);
              toastItem.onClose && toastItem.onClose();
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastBox;
