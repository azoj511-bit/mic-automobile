import React from 'react';
import { Shield, FileText, Lock, Globe } from 'lucide-react';

export const LegalPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-12 text-neutral-300 text-xs sm:text-sm leading-relaxed">
      <div className="space-y-3 border-b border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
          <Shield className="w-3.5 h-3.5 text-amber-300" />
          <span>Informations Juridiques & RGPD</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          Mentions Légales & Politique de Confidentialité
        </h1>
        <p className="text-neutral-400 text-xs">
          Dernière mise à jour : 19 Novembre 2026 · Conforme aux directives européennes et belges.
        </p>
      </div>

      {/* 1. Mentions Légales */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
          1. Présentation du Site et Mentions Légales
        </h2>
        <p>
          En vertu des dispositions légales applicables, il est précisé aux utilisateurs du site l identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
        </p>
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2 text-xs">
          <div><strong className="text-white">Propriétaire :</strong> MIC AUTOMOBILE – Société anonyme</div>
          <div><strong className="text-white">Numéro d entreprise (KRS / BCE) :</strong> 00323819 – Numéro de TVA : BE 0032.381.900</div>
          <div><strong className="text-white">Siège social :</strong> Avenue Louise 475, 1050 Bruxelles, Belgique</div>
          <div><strong className="text-white">Téléphone :</strong> +32 2 899 74 50 · <strong className="text-white">Courriel :</strong> contact@mic-automobile.be</div>
          <div><strong className="text-white">Directeur de la publication :</strong> Direction Générale MIC AUTOMOBILE</div>
          <div><strong className="text-white">Hébergeur :</strong> Vercel Inc., 340 S Lemon Ave #1142 Walnut, CA 91789, USA · https://vercel.com</div>
        </div>
      </section>

      {/* 2. Propriété Intellectuelle */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
          2. Propriété Intellectuelle et Contrefaçons
        </h2>
        <p>
          MIC AUTOMOBILE est propriétaire des droits de propriété intellectuelle ou détient les droits d usage sur tous les éléments accessibles sur le site, notamment les textes, graphismes, logos, icônes, configurations et architecture logicielle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de MIC AUTOMOBILE.
        </p>
      </section>

      {/* 3. Données Personnelles et RGPD */}
      <section id="privacy" className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
          3. Gestion des Données Personnelles (RGPD)
        </h2>
        <p>
          Le client est informé des réglementations concernant la communication marketing, le Règlement Général sur la Protection des Données (RGPD : n° 2016-679) et la Loi Informatique et Libertés du 6 janvier 1978 modifiée.
        </p>
        <p>
          Pour les données personnelles collectées dans le cadre de la création d une demande d essai, d information, de devis van ou de rendez-vous atelier, le responsable du traitement est MIC AUTOMOBILE.
        </p>
        <p>
          Conformément à la réglementation européenne en vigueur, les utilisateurs disposent d un droit d accès, de rectification et d opposition aux données les concernant en adressant leur demande écrite et signée, accompagnée d une copie du titre d identité, à : <strong className="text-white">privacy@mic-automobile.be</strong> ou par courrier postal au siège de la société.
        </p>
      </section>

      {/* 4. Cookies */}
      <section id="cookies" className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
          4. Liens Hypertextes et Cookies
        </h2>
        <p>
          La navigation sur le site est susceptible de provoquer l installation de cookie(s) sur l ordinateur de l utilisateur. Un cookie est un fichier de petite taille qui enregistre des informations relatives à la navigation d un ordinateur sur un site (ex: véhicules favoris, liste de comparaison, langue d affichage).
        </p>
        <p>
          Le refus d installation d un cookie peut entraîner l impossibilité d accéder à certains services de personnalisation. L utilisateur peut toutefois configurer son navigateur ou utiliser le panneau interactif de gestion des cookies accessible en pied de page.
        </p>
      </section>

      {/* 5. Droit applicable */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
          5. Droit Applicable et Attribution de Juridiction
        </h2>
        <p>
          Tout litige en relation avec l utilisation du site MIC AUTOMOBILE est soumis au droit belge et européen. Il est fait attribution exclusive de juridiction aux tribunaux compétents de l arrondissement judiciaire de Bruxelles.
        </p>
      </section>
    </div>
  );
};
