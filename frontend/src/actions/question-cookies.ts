"use server";

import { cookies } from "next/headers";

export type QA = {
  question: string
  answer: string
};

export async function setCookies(data: QA) {
  const c = cookies();
  c.set("question", data.question);
  c.set("answer", data.answer);
}

export async function getCookies(): Promise<QA> {
  const c = cookies();
  const question = c.get("question")!.value;
  const answer = c.get("answer")!.value;
  return {question, answer};
}