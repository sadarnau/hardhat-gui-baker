import { Dispatch, SetStateAction } from "react";

interface ToggleButtonProps {
  on: boolean;
  setOn: Dispatch<SetStateAction<boolean>>;
  message: string;
  color: string;
}

export default function ToggleButton({
  on,
  setOn,
  message,
  color,
}: ToggleButtonProps) {
  return (
    <button
      onClick={() => setOn(!on)}
      className={`m-2 min-h-8 btn btn-outline input-xs border-2 h-6 ${
        on ? color : "input-secondary"
      }`}
    >
      {message}
    </button>
  );
}
