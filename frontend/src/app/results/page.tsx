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
      <div className="">
        <span className="bg-lime-600">Pergunta:</span>
        {question}
      </div>
      <div>
        <span className="bg-teal-600">Resposta:</span>
        {answer}
      </div>
      <Card className="items-center justify-center">
        {/* Sua resposta tem nota {JSON.stringify(response)} */}
        Sua resposta tem nota 5
      </Card>
    </>
  )
}
