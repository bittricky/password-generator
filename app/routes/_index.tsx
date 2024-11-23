import { useState } from "react";
import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useSubmit, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";

import { PasswordDisplay, PasswordOptions } from "../components";

export const meta: MetaFunction = () => {
  return [
    { title: "Password Generator" },
    { name: "Generate Passwords", content: "Generate Passwords" },
  ];
};

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

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 bg-zinc-900 p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center text-zinc-100">
          Password Generator
        </h1>

        {actionData?.password && (
          <PasswordDisplay password={actionData.password} />
        )}

        <form onChange={(e) => submit(e.currentTarget)} className="space-y-4">
          <PasswordOptions length={length} onLengthChange={setLength} />

          {/* TODO: add password strength indicator */}

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
