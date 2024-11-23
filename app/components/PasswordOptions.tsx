import { FC } from "react";

interface Props {
  length: number;
  onLengthChange: (length: number) => void;
}

const PasswordOptions: FC<Props> = ({ length, onLengthChange }) => {
  return (
    <>
      <div className="space-y-2">
        <label className="flex justify-between text-sm">
          <span>Character Length</span>
          <span className="text-purple-400">{length}</span>
        </label>
        <input
          type="range"
          name="length"
          min="6"
          max="32"
          value={length}
          onChange={(e) => onLengthChange(Number(e.target.value))}
          className="w-full accent-purple-400"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="uppercase"
            className="accent-purple-400"
            defaultChecked
          />
          <span>Include Uppercase Letters</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="lowercase"
            className="accent-purple-400"
            defaultChecked
          />
          <span>Include Lowercase Letters</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="numbers"
            className="accent-purple-400"
            defaultChecked
          />
          <span>Include Numbers</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="symbols" className="accent-purple-400" />
          <span>Include Symbols</span>
        </label>
      </div>
    </>
  );
};

PasswordOptions.displayName = "PasswordOptions";
export default PasswordOptions;
