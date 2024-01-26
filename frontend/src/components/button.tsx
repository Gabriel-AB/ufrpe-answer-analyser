import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"


export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={twMerge("bg-neutral-100 rounded-lg py-2 px-4 border border-neutral-300 shadow-lg shadow-neutral-400 hover:bg-neutral-200 active:bg-neutral-300 active:translate-y-px dark:shadow-neutral-950 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 dark:border-neutral-900", props.className)}/>
}