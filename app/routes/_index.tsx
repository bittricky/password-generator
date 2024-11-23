import { useState } from "react";
import { json } from "@remix-run/node";
import { useSubmit, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";

import {
  PasswordDisplay,
  PasswordOptions,
  PasswordStrengthIndicator,
} from "../components";

const getCharacterPool = (options: {
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  let chars = "";

  if (options.includeUppercase) chars += uppercase;
  if (options.includeLowercase) chars += lowercase;
  if (options.includeNumbers) chars += numbers;
  if (options.includeSymbols) chars += symbols;

  return chars || lowercase + numbers;
};

const generatePassword = (length: number, characterPool: string): string => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characterPool.charAt(
      Math.floor(Math.random() * characterPool.length)
    );
  }
  return password;
};

const calculateStrength = (options: {
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
}): number => {
  const {
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    length,
  } = options;
  return [
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    length >= 12,
  ].filter(Boolean).length;
};
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const length = Math.max(
    6,
    Math.min(Number(formData.get("length")) || 10, 32)
  );
  const includeUppercase = formData.get("uppercase") === "on";
  const includeLowercase = formData.get("lowercase") === "on";
  const includeNumbers = formData.get("numbers") === "on";
  const includeSymbols = formData.get("symbols") === "on";

  const characterPool = getCharacterPool({
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  });

  const password = generatePassword(length, characterPool);

  const strength = calculateStrength({
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    length,
  });

  return json({ password, strength });
}

export default function Index() {
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const [length, setLength] = useState(10);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set("length", length.toString());

    submit(formData, {
      method: "post",
      action: "/?index",
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 bg-zinc-900 p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center text-zinc-100">
          Password Generator
        </h1>

        {actionData?.password && (
          <PasswordDisplay password={actionData.password} />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordOptions length={length} onLengthChange={setLength} />

          {actionData?.strength !== undefined && (
            <PasswordStrengthIndicator strength={actionData.strength} />
          )}

          <button
            type="submit"
            className="w-full bg-purple-400 hover:bg-purple-500 text-zinc-900 font-semibold py-4 rounded-lg transition-colors"
          >
            GENERATE →
          </button>
        </form>
      </div>
    </main>
  );
}
