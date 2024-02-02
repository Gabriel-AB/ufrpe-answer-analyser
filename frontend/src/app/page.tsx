import { QA, setCookies } from "@/actions/question-cookies";
import Button from "@/components/button";
import Card from "@/components/card";
import { redirect } from "next/navigation";

import { ComponentProps } from "react";

type Question = {
  id: number
  topic: string
  content: string
  answer: string
};

export default async function Home({searchParams}: {searchParams: {q?: number}}) {
  if (!searchParams.q) {
    const qa = await fetch(`${process.env.BACKEND}/api/qa/select/`, {cache: "no-cache"}).then(r => r.json()) as Question;
    const newSearchParams = new URLSearchParams({q: qa.id} as any)
    redirect("/?" + newSearchParams.toString());
  }

  const q = Number(searchParams.q);

  if (Number.isNaN(q)) {
    return <div className="font-bold text-6xl">URL Inválida</div>;
  }

  const question = await fetch(`${process.env.BACKEND}/api/qa/questions/${q}/`).then(r => r.json()) as Question;

  async function action(formData: FormData) {
    "use server"
    setCookies(Object.fromEntries(formData.entries()) as QA)
    redirect("/results");
  }
  return (
    <>
      <form  action={action} id="answer-form" className="flex flex-wrap gap-8 items-center justify-center w-full justify-items-stretch">
        <Question name="question">
          {question.content}
        </Question>
        <Answer name="answer" />
      </form>
      <Button form="answer-form">Avaliar</Button>
    </>
  );
}



function Answer({ title = "Resposta", ...props }: ComponentProps<"textarea">) {
  return <Card className="resize-y">
    <Card.Header className="bg-teal-600">
      Resposta:
    </Card.Header>
    <textarea title={title} {...props} className="p-2 h-full w-full bg-inherit outline-none shadow-none text-justify"/>
    
  </Card>;
}

function Question({ children, name }: { children: string, name?: string }) {
  return <Card>
    <Card.Header className="bg-lime-600">
      Pergunta:
    </Card.Header>
    <span className="p-2 text-justify overflow-y-auto">
      {children}
    </span>
    <input type="text" name={name} value={children} readOnly className="hidden"/>
  </Card>;
}

