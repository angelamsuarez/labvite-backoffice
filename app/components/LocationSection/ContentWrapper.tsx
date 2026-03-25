export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-10 px-6 text-center">
      {children}
    </section>
  );
}
