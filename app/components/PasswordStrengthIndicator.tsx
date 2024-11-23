import { FC } from "react";

interface Props {
  strength: number;
}

const PasswordStrengthIndicator: FC<Props> = ({ strength }) => {
  const getStrengthLabel = (strength: number) => {
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Medium";
    if (strength <= 4) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-zinc-400">STRENGTH</span>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400">{getStrengthLabel(strength)}</span>
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-6 ${
                  i < strength ? "bg-yellow-400" : "bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

PasswordStrengthIndicator.displayName = "PasswordStrengthIndicator";
export default PasswordStrengthIndicator;
