import React, { useEffect, useRef, useState } from "react";
import { ToastOptions } from "../types/toastTypes";
import TimerBar from "./TimerBar";

const Toast: React.FC<ToastOptions> = ({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  position,
  showTimer,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [expandToast, setExpandToast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const toastContainerRef = useRef<HTMLDivElement | null>(null);
  showTimer = showTimer || false;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  useEffect(() => {
    if (descriptionRef.current && toastContainerRef.current) {
      const hasOverflow =
        descriptionRef.current.scrollHeight >
        toastContainerRef.current.clientHeight;
      if (hasOverflow) {
        setExpandToast(true);
      } else {
        setExpandToast(false);
      }
    }
  }, [message]);

  const triggerExpand = () => {
    if (toastContainerRef.current) {
      toastContainerRef.current.classList.toggle("toast-expanded");
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`toast ${type} ${
        isVisible
          ? `${position?.split("-")[1]} toast-enter toast-enter-active`
          : ` ${position?.split("-")[1]} toast-exit toast-exit-active`
      }`}
      ref={toastContainerRef}
    >
      <div className="toast-content flex-grow">
        {title && <strong className="toast-title">{title}</strong>}
        <p className="" ref={descriptionRef}>
          {message}
        </p>
      </div>

      {/* Render progress bar if showProgressBar is true */}

      <div className="timer">
        {showTimer && <TimerBar duration={duration} />}
        {/* Show expand button only if toast overflows */}
        {expandToast && !isExpanded && (
          <button
            onClick={triggerExpand}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#696969"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
        {/* Optionally, show a collapse button when expanded */}
        {expandToast && isExpanded && (
          <button
            onClick={triggerExpand}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#696969"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
