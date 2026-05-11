import { Fingerprint } from 'lucide-react';
import { profile } from '../data/portfolio';
import { publicAsset } from '../utils/assets';

const variantClasses = {
  hero: 'mx-auto my-5 w-[min(92%,28rem)] lg:w-72',
  about: 'w-full',
};

export function ProfilePortrait({ variant = 'hero' }) {
  return (
    <figure className={`hologram-panel relative z-20 overflow-hidden rounded-lg p-3 ${variantClasses[variant]}`} data-reveal>
      <div className="relative overflow-hidden rounded-md border border-cyan-200/20 bg-slate-950/70">
        <img
          src={publicAsset(profile.photoLarge)}
          srcSet={`${publicAsset(profile.photoSmall)} 320w, ${publicAsset(profile.photoLarge)} 900w`}
          sizes={variant === 'about' ? '(min-width: 1024px) 330px, 92vw' : '288px'}
          alt={`Portrait of ${profile.name}`}
          className="h-full min-h-72 w-full object-cover object-[62%_42%] saturate-125 contrast-110"
          loading="lazy"
          decoding="async"
          width="900"
          height="900"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(2,6,23,0.82)_100%)]" />
        <div className="absolute inset-0 bg-cyan-300/[0.03] mix-blend-screen" />
        <div className="scanline" />
        <figcaption className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-cyan-200">Identity Verified</p>
              <p className="mt-1 text-lg font-semibold text-white">{profile.name}</p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-200/30 bg-cyan-200/10 text-cyan-100 shadow-neon">
              <Fingerprint size={19} />
            </span>
          </div>
        </figcaption>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">
        <span>DKT Visual Node</span>
        <span className="text-emerald-200">Online</span>
      </div>
    </figure>
  );
}
