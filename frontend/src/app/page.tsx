import Button from "@/components/button";
import Card from "@/components/card";
import { ComponentProps } from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap gap-8 items-center justify-center w-full justify-items-stretch">
        <Question text="Question Text..."/>
        <Answer/>
      </div>
      <Button>Avaliar</Button>
    </>
  );
}


function Answer({title="Resposta", ...props}: ComponentProps<"textarea">) {
  return <Card className="resize-y">
    <div className="absolute top-0 w-[96%] p-2 backdrop-blur">
      Resposta:
    </div>
    <textarea title={title} {...props} className="pt-12 p-2 min-h-full bg-inherit resize-none overflow-visible outline-none shadow-none"/>
  </Card>;
}

function Question({text}: {text: string}) {
  return <Card>
    <div className="sticky top-0 p-2 w-full backdrop-blur">
      Pergunta:
    </div>
    <span className="p-2">
      {text}
    </span>
  </Card>;
}

