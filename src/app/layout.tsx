import "src/styles/global.css";

export const metadata = {
  title: "Minecraft Skin Finder",
  description: "Find Minecraft skins by username | By UmutKDev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
