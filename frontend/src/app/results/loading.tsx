"use server";
import React from 'react'


export default async function Page({ searchParams }: { searchParams: { question: string, answer: string } }) {
  return (
    <>
      <div className="flex items-center justify-center relative">
        <span className="absolute size-64 animate-spin bg-gradient-to-b from-blue-400 dark:from-blue-950 rounded-full"></span>
        {/* <div className="flex items-center justify-center rounded-full bg-gray-400 size-64 outline-8 outline-dashed outline-red-700 animate-spin"> */}
          Carregando
      </div>
    </>
  )
}
