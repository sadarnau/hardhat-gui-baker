import { Dispatch, SetStateAction } from "react";

interface ToggleButtonProps {
  on: boolean;
  setOn: Dispatch<SetStateAction<boolean>>;
  message: string;
  style: string;
}

export default function ToggleButton({
  on,
  setOn,
  message,
  style,
}: ToggleButtonProps) {
  return (
    <button
      onClick={() => setOn(!on)}
      className={`mt-5 min-h-8 btn btn-outline input-xs border-2 h-6 ${
        on ? style : "input-secondary"
      }`}
    >
      {message}
    </button>
  );
}
