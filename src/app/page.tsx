import { Hero } from "@/components/hero/Hero";
import { LedgerSection } from "@/components/sections/LedgerSection";
import { MechanismSection } from "@/components/sections/MechanismSection";
import { ContractSimulator } from "@/components/sections/ContractSimulator";
import { SimulatedMetrics } from "@/components/sections/SimulatedMetrics";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <LedgerSection />
      <MechanismSection />
      <ContractSimulator />
      <SimulatedMetrics />
      <SelectedWorkSection />
      <FooterSection />
    </div>
  );
}


