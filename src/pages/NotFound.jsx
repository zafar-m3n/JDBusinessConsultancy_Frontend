import EmbossedMark from '@/light/EmbossedMark';
import { Button, Gold, Meta } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[100svh] flex-col items-center justify-center pt-24 text-center">
      <Meta />
      <EmbossedMark className="h-48 w-auto md:h-64" />
      <h1 className="mt-12 text-5xl font-light md:text-7xl">
        This page is <Gold glint className="font-normal">off the books.</Gold>
      </h1>
      <p className="mt-6 max-w-md text-silver-400">The page you're looking for doesn't exist or has moved.</p>
      <Button to="/" className="mt-10" arrow>Back home</Button>
    </section>
  );
}
