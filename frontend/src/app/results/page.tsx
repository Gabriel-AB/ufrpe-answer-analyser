"use server";

import Card from '@/components/card'
import { cookies } from 'next/headers';
import React from 'react'



export default async function Page() {
  // const response = await fetch("https://dummyjson.com/products/1").then(r=>r.json())
  const c = cookies();
  const question = c.get("question")?.value;
  const answer = c.get("answer")?.value;
  await new Promise(e => setTimeout(e, 3000));

  return (
    <>
      <Card>
        <span className="bg-lime-600 text-center py-2 font-bold">Pergunta:</span>
        <span className="p-4">
          {question}
        </span>
      </Card>
      <Card>
        <span className="bg-teal-600 text-center py-2 font-bold">Resposta:</span>
        <span className="p-4">
          {answer}
        </span>
      </Card>
      <Card tabIndex={0} className="items-center justify-center rounded-full size-64 bg-gradient-to-b from-fuchsia-400 to-indigo-500 font-bold text-lg text-white dark:from-fuchsia-800 dark:to-indigo-800 focus:animate-explode">
        <span className="px-8 text-center">
          Sua resposta tem nota
        </span>
        <span className="text-9xl">
          5
        </span>
      </Card>
    </>
  )
}
