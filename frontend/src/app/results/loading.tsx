"use server";
import React from 'react'


export default async function Page({ searchParams }: { searchParams: { question: string, answer: string } }) {
  return (
    <>
      <div className="flex items-center justify-center relative">
        <span className="absolute z-10 size-64 animate-spin rounded-full bg-gradient-to-b from-blue-300 to-blue-700"/>
        <span className="absolute z-20">Carregando</span>
      </div>
    </>
  )
}
