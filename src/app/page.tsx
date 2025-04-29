import Hero from "@/components/landing/hero";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Pricing from "@/components/landing/pricing";
import Features from "@/components/landing/features";
import Container from "@/components/container";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/50">
      <Container>
        <Header />
        <main className="flex-1">
          <Hero />
          <Features />
          <Pricing />
        </main>
        <Footer />
      </Container>
    </div>
  );
}
