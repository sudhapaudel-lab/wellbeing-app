import HeroBlobs from './HeroBlobs';
import HeroBadge from './HeroBadge';
import HeroHeadline from './HeroHeadline';
import HeroCTA from './HeroCTA';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-4">
      <HeroBlobs />

      <div className="relative max-w-3xl mx-auto text-center">
        <HeroBadge />
        <HeroHeadline />

        <p
          className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: 'var(--melo-text-muted)' }}
        >
          Track your mood, breathe through the noise, and cultivate moments of calm — one gentle
          step at a time.
        </p>

        <HeroCTA />
      </div>
    </section>
  );
}
