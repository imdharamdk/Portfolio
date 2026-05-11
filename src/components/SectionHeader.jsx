import { Cpu } from 'lucide-react';

export function SectionHeader({ kicker, title, copy }) {
  return (
    <div className="mb-10 max-w-3xl" data-reveal>
      <div className="section-kicker rounded-full px-4 py-2 text-[0.68rem] font-semibold">
        <Cpu size={14} />
        {kicker}
      </div>
      <h2 className="mt-5 text-3xl font-semibold tracking-normal text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{copy}</p> : null}
    </div>
  );
}
