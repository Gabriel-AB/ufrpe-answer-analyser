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
        <Card.Header className="bg-lime-600">Pergunta:</Card.Header>
        <span className="p-4 text-justify overflow-y-auto">
          {question}
        </span>
      </Card>
      <Card>
        <Card.Header className="bg-teal-600">Resposta:</Card.Header>
        <span className="p-4 text-justify overflow-y-auto">
          {answer}
        </span>
      </Card>
      <div tabIndex={0} className="flex flex-col items-center justify-center rounded-full size-64 bg-gradient-to-b from-fuchsia-400 to-indigo-800 font-bold text-lg text-white dark:from-fuchsia-800 dark:to-indigo-800 focus:animate-explode">
        <span className="px-8 text-center">
          Sua resposta tem nota
        </span>
        <span className="text-9xl">
          5
        </span>
      </div>
    </>
  )
}
