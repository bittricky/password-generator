import { useState } from "react";
import { json } from "@remix-run/node";
import { useSubmit, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";

import {
  PasswordDisplay,
  PasswordOptions,
  PasswordStrengthIndicator,
} from "../components";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const length = Number(formData.get("length"));
  const includeUppercase = formData.get("uppercase") === "on";
  const includeLowercase = formData.get("lowercase") === "on";
  const includeNumbers = formData.get("numbers") === "on";
  const includeSymbols = formData.get("symbols") === "on";

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (includeUppercase) chars += uppercase;
  if (includeLowercase) chars += lowercase;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (!chars) chars = lowercase + numbers;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  let strength = 0;
  if (includeUppercase) strength++;
  if (includeLowercase) strength++;
  if (includeNumbers) strength++;
  if (includeSymbols) strength++;
  if (length >= 12) strength++;

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
