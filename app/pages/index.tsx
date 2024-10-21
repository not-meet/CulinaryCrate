import { Vortex } from "@/components/ui/vortex";

export default function Home() {
  return (
    <main>
      <Vortex className="overflow-hidden h-[100vh] z-0" rangeY={250} rangeRadius={3} baseHue={30} particleCount={600}>
        <div className="justify-center items-center flex flex-col gap-10 pt-20">
          <h1 className="text-zinc-200 pt-36 shadow-black font-serif font-bold text-[8rem]" >Culinary Crate</h1>
          <button className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-zinc-200 hover:bg-gray-200 text-lg transition duration-200">
            Lets get started
          </button>
        </div>
      </Vortex>
    </main>
  );
}
