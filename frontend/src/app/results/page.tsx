"use server";

import { QA, getCookies } from '@/actions/question-cookies';
import Card from '@/components/card'
import Link from 'next/link';
import React from 'react'

type Analysis = {
  score: number
}

async function getScore(data: QA): Promise<Analysis> {
  return await fetch(`${process.env.BACKEND}/api/qa/score/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  }).then(r=>r.json())
}

export default async function Page() {
  // await new Promise(e => setTimeout(e, 3000)); 
  const qa = await getCookies();
  const {score} = await getScore(qa);
  return (
    <>
      <Card>
        <Card.Header className="bg-lime-600">Pergunta:</Card.Header>
        <span className="p-4 text-justify overflow-y-auto">
          {qa.question}
        </span>
      </Card>
      <Card>
        <Card.Header className="bg-teal-600">Resposta:</Card.Header>
        <span className="p-4 text-justify overflow-y-auto">
          {qa.answer}
        </span>
      </Card>
      <div tabIndex={0} className="flex flex-col items-center justify-center rounded-full size-64 bg-gradient-to-b from-fuchsia-400 to-indigo-800 font-bold text-lg text-white dark:from-fuchsia-800 dark:to-indigo-800 focus:animate-explode">
        <span className="px-8 text-center">
          Sua resposta tem nota
        </span>
        <span className="text-9xl">
          {score}
        </span>
      </div>
      <Link href='/' className='bg-neutral-100 rounded-lg py-2 px-4 border border-neutral-300 shadow-lg shadow-neutral-400 hover:bg-neutral-200 active:bg-neutral-300 active:translate-y-px dark:shadow-neutral-950 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 dark:border-neutral-900'>
        Voltar
      </Link>
    </>
  )
}
