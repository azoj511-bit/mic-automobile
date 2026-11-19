import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, Mail, MessageCircle, Send, ShieldCheck, Car } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const InquiryModal: React.FC = () => {
  const { inquiryModalState, closeInquiryModal, addInquiry, showToast } = useStore();
  const { isOpen, vehicle, type } = inquiryModalState;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      if (vehicle) {
        if (type === 'essai') {
          setMessage(`Bonjour, je souhaite réserver un essai sur route pour le véhicule ${vehicle.title} (Réf: ${vehicle.id}). Mes disponibilités sont les suivantes :`);
        } else if (type === 'financement') {
          setMessage(`Bonjour, je souhaite obtenir une proposition de financement / leasing personnalisée pour le véhicule ${vehicle.title} affiché à ${vehicle.priceFormatted}.`);
        } else if (type === 'reprise') {
          setMessage(`Bonjour, je souhaite faire estimer mon véhicule actuel pour une reprise dans le cadre de l achat de : ${vehicle.title}.`);
        } else {
          setMessage(`Bonjour, je souhaite recevoir des informations complémentaires concernant le véhicule ${vehicle.title} (Réf: ${vehicle.id}).`);
        }
      } else {
        setMessage('Bonjour, je souhaite être contacté(e) par un conseiller de MIC AUTOMOBILE pour mon projet.');
      }
    }
  }, [isOpen, vehicle, type]);

  if (!isOpen) return null;

  const getTitle = () => {
    switch (type) {
      case 'essai': return 'Réserver un Essai Privilège';
      case 'financement': return 'Demande de Financement & Leasing';
      case 'reprise': return 'Estimation & Reprise de Véhicule';
      case 'sur-mesure': return 'Projet Van VIP Sur Mesure';
      default: return 'Demande d Information';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Veuillez compléter votre nom, email et numéro de téléphone');
      return;
    }
    if (!consent) {
      showToast('Veuillez accepter d être contacté par notre équipe');
      return;
    }

    addInquiry({
      type,
      vehicleId: vehicle?.id,
      vehicleTitle: vehicle?.title,
      name,
      email,
      phone,
      budget,
      message
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 rounded-lg text-amber-300 border border-neutral-800">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{getTitle()}</h2>
              {vehicle && (
                <p className="text-xs text-neutral-400 line-clamp-1">{vehicle.title}</p>
              )}
            </div>
          </div>

          <button
            onClick={closeInquiryModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Demande Transmise avec Succès !</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Merci <span className="text-white font-semibold">{name}</span>. Un conseiller MIC AUTOMOBILE vous contactera sous 2 heures ouvrées pour convenir des modalités.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={closeInquiryModal}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {vehicle && (
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center gap-3">
                <img 
                  src={vehicle.images[0] || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200'} 
                  alt={vehicle.title}
                  className="w-16 h-12 rounded object-cover"
                />
                <div className="flex-1 truncate">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase">{vehicle.brand}</span>
                  <div className="font-semibold text-white truncate">{vehicle.title}</div>
                  <div className="text-amber-300 font-extrabold">{vehicle.priceFormatted}</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Nom et Prénom *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-medium mb-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+32 4..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 font-medium mb-1">Adresse Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean.dupont@email.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-medium mb-1">Votre Message / Précisions</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
              />
            </div>

            <label className="flex items-start gap-2 text-[11px] text-neutral-500 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded bg-neutral-950 border-neutral-700 text-neutral-200"
              />
              <span>J autorise MIC AUTOMOBILE à me contacter dans le cadre de ma demande. Données confidentielles non cédées à des tiers.</span>
            </label>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-800">
              <a
                href={`https://wa.me/3228997450?text=Bonjour,%20je%20vous%20contacte%20au%20sujet%20de%20:%20${encodeURIComponent(vehicle?.title || 'Véhicules MIC')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 font-medium hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Envoyer ma demande</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
