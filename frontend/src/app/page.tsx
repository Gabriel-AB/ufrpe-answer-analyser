import Button from "@/components/button";

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap gap-8 items-center justify-center w-full bg-lime-200 justify-items-stretch">
        <Question />
        <Answer />
      </div>
      <Button>Avaliar</Button>
    </>
  );
}


function Answer() {
  return <div className="flex flex-col relative h-64 w-96 border-zinc-300 shadow-lg shadow-zinc-400 rounded-lg overflow-y-auto resize-y">
    <div className="absolute top-0 w-[96%] p-2 backdrop-blur">
      Resposta:
    </div>
    <textarea title="Resposta" className="pt-12 p-2 min-h-full bg-inherit resize-none overflow-visible outline-none shadow-none"/>
  </div>;
}

function Question() {
  return <div className="flex flex-col relative w-96 h-64 border-zinc-300 shadow-lg shadow-zinc-400 rounded-lg overflow-y-auto">
    <div className="sticky top-0 p-2 w-full backdrop-blur">
      Pergunta:
    </div>
    <span className="p-2">
      Question Text...
    </span>
  </div>;
}

