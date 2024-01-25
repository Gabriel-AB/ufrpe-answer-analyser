import { ReactNode } from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap gap-8 items-center justify-center w-full">
        <Question />
        <Answer />
      </div>
      <Button>Avaliar</Button>
    </>
  );
}

function Button({children, ...props}: {children: ReactNode}) {
  return <button children={children} {...props} className="bg-zinc-200 rounded-lg py-2 px-4 shadow-lg shadow-zinc-400 hover:bg-zinc-300 active:bg-zinc-400 active:translate-y-px"/>
}

function Answer() {
  return <div className="flex flex-col relative w-96 border-zinc-300 shadow-lg shadow-zinc-400 rounded-lg overflow-y-auto">
    <div className="sticky top-0 p-2 w-full shadow">
      Resposta:
    </div>
    <textarea className="p-2 min-h-52 outline-none shadow-none resize-none" />
  </div>;
}

function Question() {
  return <div className="flex flex-col relative w-96 h-64 border-zinc-300 shadow-lg shadow-zinc-400 rounded-lg overflow-y-auto">
    <div className="sticky top-0 p-2 w-full backdrop-blur shadow">
      Pergunta:
    </div>
    <span className="p-2">
      Question Text...
    </span>
  </div>;
}

