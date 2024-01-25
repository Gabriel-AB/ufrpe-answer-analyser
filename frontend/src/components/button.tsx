import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"


export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={twMerge("bg-zinc-200 rounded-lg py-2 px-4 shadow-lg shadow-zinc-400 hover:bg-zinc-300 active:bg-zinc-400 active:translate-y-px", props.className)}/>
}