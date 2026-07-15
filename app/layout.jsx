import "./globals.css";

export const metadata = {
  title: "Kaaryab Afghanistan",
  description: "Find jobs, scholarships, internships and opportunities in Afghanistan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
