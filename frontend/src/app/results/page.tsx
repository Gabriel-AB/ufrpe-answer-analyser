"use server";

import Card from '@/components/card'
import React from 'react'


export default async function Page({searchParams}: {searchParams: {question: string, answer: string}}) {
  // const response = await fetch("https://dummyjson.com/products/1").then(r=>r.json())
  await new Promise(e => setTimeout(e, 8000))

  return (
    <>
      <Card className="items-center justify-center">
        {/* Sua resposta tem nota {JSON.stringify(response)} */}
        Sua resposta tem nota 5
      </Card>
    </>
  )
}
