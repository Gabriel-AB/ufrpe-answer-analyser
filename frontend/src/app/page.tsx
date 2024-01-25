export default function Home() {
  return (
    <main className="flex flex-col h-dvh gap-8 items-center justify-center">
      <div className="flex flex-wrap gap-8 items-center justify-center w-full">
        <div className="flex flex-col relative w-96 h-64 border-zinc-300 shadow-lg shadow-zinc-400 rounded-lg overflow-y-auto"> 
          <div className="sticky top-0 p-2 w-full backdrop-blur shadow">
            Pergunta:
          </div>
          <span className="p-2">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          </span>
          
        </div>
        <textarea className="flex h-64 w-96 p-2 shadow-lg shadow-zinc-300 rounded-lg after:content-['Resposta'] after:content-start after:bg-red-800"/>
      </div>
      <button className="bg-zinc-200 rounded-lg py-2 px-4 shadow-lg shadow-zinc-400 hover:bg-zinc-300 active:bg-zinc-400 active:translate-y-2">
        Avaiar
      </button>
    </main>
  );
}
