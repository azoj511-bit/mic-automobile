import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, 
  Building, ShieldCheck 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { addInquiry, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Demande d information générale');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      showToast('Veuillez renseigner tous les champs obligatoires');
      return;
    }

    addInquiry({
      type: 'contact',
      name,
      email,
      phone,
      message: `[Objet : ${subject}] ${message}`
    });

    setIsSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-semibold tracking-wider uppercase">
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <span>Bruxelles · Concession & Atelier</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
          Contactez MIC AUTOMOBILE
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-light">
          Notre équipe commerciale et technique est à votre disposition pour vous conseiller et vous accueillir dans notre showroom d Avenue Louise.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Coordinates - 5 cols */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Coordonnées du Showroom</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Venez essayer nos véhicules et découvrir les aménagements VIP dans notre espace privilégié à Bruxelles.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
              <MapPin className="w-5 h-5 text-neutral-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Adresse</span>
                <span className="text-neutral-400">Avenue Louise 475, 1050 Bruxelles, Belgique</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
              <Phone className="w-5 h-5 text-neutral-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Téléphone direct</span>
                <a href="tel:+3228997450" className="text-neutral-300 hover:text-white transition-colors">
                  +32 2 899 74 50
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
              <Mail className="w-5 h-5 text-neutral-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Courriel officiel</span>
                <a href="mailto:contact@mic-automobile.be" className="text-neutral-300 hover:text-white transition-colors">
                  contact@mic-automobile.be
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
              <Clock className="w-5 h-5 text-neutral-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Horaires d ouverture</span>
                <span className="text-neutral-400">Lundi au Samedi : 09h00 - 19h00 non-stop</span>
                <span className="text-neutral-500 block text-[11px] mt-0.5">Dimanche : Rendez-vous exclusif possible</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/3228997450?text=Bonjour,%20je%20souhaite%20prendre%20contact%20avec%20un%20conseiller%20MIC%20AUTOMOBILE"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Démarrer une conversation WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Contact Form - 7 cols */}
        <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white">Formulaire de Contact Sécurisé</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Transmettez-nous votre demande, nous vous répondons sous 2 heures ouvrées.
            </p>
          </div>

          {isSent ? (
            <div className="p-8 text-center space-y-4 bg-neutral-900/60 rounded-2xl border border-neutral-800">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Envoyé !</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Merci <span className="text-white font-semibold">{name}</span>. Votre message a été assigné à notre conseiller commercial. Vous recevrez une réponse à <span className="text-white">{email}</span>.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-4 px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Nom et Prénom *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Paul Dubois"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+32 4..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Adresse Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="paul.dubois@email.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Objet de votre demande</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-neutral-500"
                >
                  <option value="Demande d information sur un véhicule en stock">Demande d information sur un véhicule en stock</option>
                  <option value="Réservation d un essai sur route">Réservation d un essai sur route</option>
                  <option value="Projet de Van VIP sur mesure">Projet de Van VIP sur mesure</option>
                  <option value="Prestation atelier mécanique ou carrosserie">Prestation atelier mécanique ou carrosserie</option>
                  <option value="Demande B2B / Flotte d entreprise">Demande B2B / Flotte d entreprise</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Votre Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Détaillez votre projet, vos disponibilités pour une visite..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Envoyer mon message</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Map Section */}
      <div className="rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 h-80 relative">
        <iframe
          title="Showroom MIC AUTOMOBILE Bruxelles"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.8) invert(0.9) contrast(1.2)' }}
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?q=Avenue%20Louise%20475,%201050%20Bruxelles&t=&z=15&ie=UTF8&iwloc=&output=embed"
        />
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-neutral-800 text-xs text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-300" />
          <span>Avenue Louise 475, 1050 Bruxelles</span>
        </div>
      </div>
    </div>
  );
};
