import '@/styles/globals.css';
import { SharedMetadata } from '@/utils/metadata';

export const metadata = SharedMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
