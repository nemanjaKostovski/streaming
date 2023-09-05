import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Streaming Max',
  description: 'Streaming app with movieDB REST API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
