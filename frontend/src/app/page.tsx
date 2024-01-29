import Button from "@/components/button";
import Card from "@/components/card";
import { ComponentProps } from "react";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";



export default function Home() {
  async function action(formData: FormData) {
    "use server";
    const c = cookies();
    c.set("question", formData.get("question") as string);
    c.set("answer", formData.get("answer") as string);
    return redirect("/results");
  }
  return (
    <>
      <form  action={action} id="answer-form" className="flex flex-wrap gap-8 items-center justify-center w-full justify-items-stretch">
        <Question name="question">Lorem ipsum dLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tincidunt ipsum. Maecenas mattis vestibulum condimentum. Curabitur vitae tortor molestie, varius turpis pellentesque, efficitur nibh. Praesent euismod ullamcorper finibus. Etiam in nulla euismod, sodales lectus quis, hendrerit lacus.
olor sit amet, consectetur adipiscing elit. Nullam at tincidunt ipsum. Maecenas mattis vestibulum condimentum. Curabitur vitae tortor molestie, varius turpis pellentesque, efficitur nibh. Praesent euismod ullamcorper finibus. Etiam in nulla euismod, sodales lectus quis, hendrerit lacus.</Question>
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

