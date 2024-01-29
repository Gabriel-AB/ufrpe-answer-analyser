import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'


export default function Card({className, ...props}: ComponentProps<"div">) {
  return <div {...props} className={twMerge("flex flex-col relative h-64 w-96 bg-neutral-100 border border-neutral-300 shadow-lg shadow-neutral-400 rounded-lg overflow-y-auto dark:shadow-neutral-950 dark:bg-neutral-800 dark:border-neutral-900", className)}/>;
}

Card.Header = ({className, ...props}: ComponentProps<"div">) => {
  return <div {...props} className={twMerge("sticky top-0 w-full text-center py-2 font-bold", className)} />
}
