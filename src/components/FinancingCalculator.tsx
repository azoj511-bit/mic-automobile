import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Vehicle } from '../types/vehicle';

interface FinancingCalculatorProps {
  vehicle?: Vehicle;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({ vehicle }) => {
  const { openInquiryModal } = useStore();

  const basePrice = vehicle?.price && vehicle.price > 0 ? vehicle.price : 45000;
  const [price, setPrice] = useState<number>(basePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15);
  const [durationMonths, setDurationMonths] = useState<number>(48);
  const [interestRate, setInterestRate] = useState<number>(4.9);

  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
  const financedAmount = Math.max(0, price - downPaymentAmount);

  // Monthly payment calculation: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = financedAmount > 0
    ? Math.round(
        (financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, durationMonths))) /
        (Math.pow(1 + monthlyRate, durationMonths) - 1)
      )
    : 0;

  const totalCost = downPaymentAmount + monthlyPayment * durationMonths;

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neutral-800 rounded-xl text-amber-300">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Simulateur de Financement & Leasing</h3>
            <p className="text-xs text-neutral-400">Solutions de crédit classique, LOA & LLD avec nos banques partenaires</p>
          </div>
        </div>
        <span className="text-xs text-neutral-400 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800">
          TAEG indicatif : {interestRate}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-5">
          {/* Prix d'achat */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-400">Prix du véhicule</span>
              <span className="font-bold text-white">{price.toLocaleString()} €</span>
            </div>
            <input
              type="range"
              min="10000"
              max="250000"
              step="1000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-200"
            />
          </div>

          {/* Apport personnel */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-400">Apport initial ({downPaymentPercent}%)</span>
              <span className="font-bold text-white">{downPaymentAmount.toLocaleString()} €</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-200"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
              <span>0% (Sans apport)</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Durée */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-neutral-400">Durée du financement</span>
              <span className="font-bold text-white">{durationMonths} mois ({durationMonths / 12} ans)</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[24, 36, 48, 60, 72].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setDurationMonths(m)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    durationMonths === m
                      ? 'bg-neutral-200 text-black border-white shadow-md'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
              Mensualité estimée
            </span>
            <div className="text-3xl md:text-4xl font-extrabold text-white flex items-baseline gap-2">
              <span>{monthlyPayment.toLocaleString()} €</span>
              <span className="text-xs text-neutral-400 font-normal">/ mois TTC</span>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-400 border-t border-neutral-900 pt-3">
              <div className="flex justify-between">
                <span>Montant emprunté :</span>
                <span className="text-white font-medium">{financedAmount.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between">
                <span>Apport versé :</span>
                <span className="text-white font-medium">{downPaymentAmount.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between">
                <span>Total engagé :</span>
                <span className="text-white font-medium">{totalCost.toLocaleString()} €</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => openInquiryModal('financement', vehicle)}
              className="w-full py-3 bg-gradient-to-r from-neutral-200 to-neutral-300 hover:from-white hover:to-neutral-100 text-black font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Demander un accord de principe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-neutral-500 text-center leading-tight">
              Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
