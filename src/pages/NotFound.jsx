import EmbossedMark from '@/light/EmbossedMark';
import Diamonds from '@/light/Diamonds';
import { Button, Strong, Meta } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center">
      <Meta />
      <Diamonds preset="center" />
      <EmbossedMark className="relative h-48 w-auto drop-shadow-[0_22px_26px_rgba(18,18,18,0.28)] md:h-64" />
      <h1 className="relative mt-12 text-5xl font-light tracking-[-0.02em] md:text-7xl">
        This page is <Strong glint>off the books.</Strong>
      </h1>
      <p className="relative mt-6 max-w-md text-silver-400">The page you're looking for doesn't exist or has moved.</p>
      <Button to="/" className="mt-10" arrow>Back home</Button>
    </section>
  );
}
