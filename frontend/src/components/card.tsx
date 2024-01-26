import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'


export default function Card({className, ...props}: ComponentProps<"div">) {
  return <div {...props} className={twMerge("flex flex-col relative h-64 w-96 border-zinc-300 shadow-lg shadow-zinc-400 rounded-lg overflow-y-auto", className)}/>;
}