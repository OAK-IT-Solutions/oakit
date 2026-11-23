'use client';

import { Download, ShoppingCart } from 'lucide-react';
import Reveal from '@/components/Reveal';

/**
 * ClassicPOS Desktop is a PAID, licensed product — the GitHub repo is
 * private and installers stream only to licensed accounts from the
 * in-app Downloads page. Marketing CTA points at purchase, not binaries.
 */
export default function DesktopDownload() {
  return (
    <section className="w-full py-20 section-dark" id="download">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <Reveal>
          <h2 className="text-3xl font-bold">Get ClassicPOS Desktop</h2>
          <p className="mt-2 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            The full offline desktop POS — sold as a one-time $150 license.
            After purchase, sign in to your ClassicPOS account and download the
            installer from Settings → Downloads.
          </p>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://pos.oakitsolutionsandsupplies.com/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              <ShoppingCart className="h-5 w-5" />
              Buy license — $150
            </a>
            <a
              href="https://pos.oakitsolutionsandsupplies.com/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-600/10 dark:text-blue-400 dark:border-blue-400"
            >
              <Download className="h-5 w-5" />
              What&apos;s included
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Installers are delivered to licensed accounts only — no free binary downloads.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
