import React, { useState } from 'react';
import { 
  BookOpen, ChevronDown, ChevronUp, FileText, HelpCircle, 
  ShieldCheck, Sparkles, CheckCircle2 
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Comment se déroule l importation et l immatriculation d un véhicule en Belgique ?',
      a: 'MIC AUTOMOBILE s occupe de 100% des démarches administratives : dédouanement (vignette 705), passage au contrôle technique d importation, obtention du certificat Car-Pass officiel et livraison de la demande d immatriculation avec votre certificat de conformité européen (COC).'
    },
    {
      q: 'Quelle est la couverture exacte de la garantie 24 mois ?',
      a: 'Tous nos véhicules bénéficient d une garantie contractuelle européenne de 24 mois couvrant les pièces mécaniques maîtresses, le bloc moteur, la boîte de vitesses (manuelle ou automatique), le pont, les calculateurs électroniques et le système de climatisation. Vous pouvez vous faire dépanner dans n importe quel garage agréé de votre marque partout en Europe.'
    },
    {
      q: 'Peut-on personnaliser un van existant du stock ou partir d une feuille blanche ?',
      a: 'Les deux approches sont possibles. Vous pouvez soit choisir un van disponible dans notre stock (ex: Mercedes Classe V ou VW Multivan) et lui adjoindre des équipements spécifiques (TV 4K, convertisseur 230V, jantes, etc.) dans notre atelier, soit commander une réalisation 100% sur mesure via notre configurateur.'
    },
    {
      q: 'Quels sont les avantages fiscaux d un van utilitaire en Belgique ?',
      a: 'En Belgique, les véhicules utilitaires légers (N1) bénéficient d une exonération totale de la Taxe de Mise en Circulation (TMC) et d une taxe de circulation annuelle très réduite calculée sur la masse maximale autorisée (MTM). Pour les sociétés et indépendants, la TVA est 100% déductible et les frais sont déductibles à 100%.'
    },
    {
      q: 'Proposez-vous la reprise de mon véhicule actuel ?',
      a: 'Oui, nous proposons une reprise ferme de votre véhicule toutes marques. Une pré-estimation gratuite est possible en 2 minutes sur notre site ou directement en concession lors de votre visite showroom.'
    }
  ];

  const articles = [
    {
      title: 'Guide complet 2026 : Acheter un Van Aménagé de Prestige en Belgique',
      category: 'Conseil d Achat',
      date: 'Novembre 2026',
      readTime: '6 min',
      excerpt: 'Tout savoir sur le choix entre un van à toit relevable (California, Marco Polo) et une navette de direction VIP type Classe V Extra-Long.'
    },
    {
      title: 'Fiscalité Utilitaires en Wallonie, Flandre et Bruxelles : Ce qui change',
      category: 'Fiscalité & Entreprise',
      date: 'Octobre 2026',
      readTime: '8 min',
      excerpt: 'Analyse détaillée des déductions fiscales, de la récupération de TVA et des règles d amortissement pour indépendants et flottes de direction.'
    },
    {
      title: 'Entretien des Boîtes Automatiques (DSG, 9G-Tronic, Tiptronic) : Les bons réflexes',
      category: 'Atelier & Mécanique',
      date: 'Septembre 2026',
      readTime: '5 min',
      excerpt: 'Pourquoi la vidange par rinçage de boîte de vitesses à 60 000 km est indispensable pour préserver la longévité de votre transmission haut de gamme.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>Documentation & Guides Pratiques</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
          Ressources, Conseils & FAQ
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-light">
          Retrouvez nos analyses d experts automobiles, nos fiches conseils sur l homologation et les réponses aux questions les plus fréquentes de nos clients.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-300" />
          <span>Derniers Articles & Dossiers Techniques</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="text-amber-300 font-semibold">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-bold text-white text-base hover:text-neutral-200 cursor-pointer">
                  {art.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 text-[11px] text-neutral-500">
                Publié en {art.date} par la rédaction MIC
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-300" />
            <span>Foire Aux Questions Fréquentes</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Les questions essentielles sur l achat, l importation et le service après-vente.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-white text-xs sm:text-sm hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-amber-300" /> : <ChevronDown className="w-4 h-4 shrink-0 text-neutral-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
