# MIC AUTOMOBILE — Plateforme Web Complète & Gestion de Parc

> **Mécanique · Innovation · Confiance**  
> Site web officiel et catalogue multimarque haut de gamme, atelier mécanique et division vans VIP sur mesure pour **MIC AUTOMOBILE** (Bruxelles, Belgique).

---

## 🌟 Points Clés & Livrables Réalisés

1. **Parc Automobile Complet (73 Véhicules)** :
   - Intégration de l'ensemble des 63 modèles d'origine (Audi, BMW, Porsche, Mercedes-Benz, Land Rover, Lamborghini, etc.).
   - **Ajout et complétion de 10 Vans VIP d'exception**, chacun doté de **16 photos réelles haute résolution** et d'une **fiche technique détaillée (`.txt`)** strictement conforme au format de la concession.
   - Galerie photos interactive avec mode plein écran (Lightbox), carrousel sur cartes et fiches complètes.

2. **Les 10 Vans VIP & Aménagés Complétés** :
   - `Mercedes-Benz Classe V 300 d AMG Line Extra-Long` (16 photos réelles + fiche technique)
   - `Mercedes-Benz Sprinter 319 CDI V6 VIP Luxury Jet-Van` (16 photos réelles + fiche technique)
   - `Volkswagen California 6.1 Ocean 2.0 TDI 204ch 4Motion DSG` (16 photos réelles + fiche technique)
   - `Volkswagen Multivan T7 2.0 TDI 150ch DSG7 Life Long` (16 photos réelles + fiche technique)
   - `Ford Transit Custom Nugget Plus 2.0 EcoBlue 185ch Westfalia` (16 photos réelles + fiche technique)
   - `Peugeot Traveller 2.0 BlueHDi 180ch EAT8 Business VIP` (16 photos réelles + fiche technique)
   - `Renault Trafic SpaceClass 2.0 dCi 170ch EDC Grand Escapade` (16 photos réelles + fiche technique)
   - `Toyota Proace Verso 2.0 D-4D 180ch VIP Lounge Long` (16 photos réelles + fiche technique)
   - `Citroën SpaceTourer 2.0 BlueHDi 180ch EAT8 Business Lounge` (16 photos réelles + fiche technique)
   - `Mercedes-Benz Marco Polo 300 d 4MATIC Westfalia Horizon` (16 photos réelles + fiche technique)

3. **Fonctionnalités Métier Implémentées** :
   - 🔍 **Catalogue & Moteur de Recherche Multi-Critères** : Recherche texte libre, filtres marque, carrosserie, carburant, boîte, budget min/max, kilométrage max, places, et options vans (lit, cuisine, salon VIP, toit relevable).
   - ⚖️ **Comparateur de Véhicules** : Comparaison côte à côte jusqu'à 4 véhicules simultanément.
   - ❤️ **Système de Favoris (Wishlist)** : Sauvegarde locale dans le navigateur.
   - 🛠️ **Configurateur Van Sur Mesure ("Build Your Van")** : Configuration en 5 étapes (châssis, salon VIP, cuirs Nappa, boiseries, multimédia 4K, domotique) avec calcul de devis en direct.
   - 🧭 **Questionnaire de Recommandation (7 étapes)** : Algorithme de scoring croisant les besoins clients avec le stock réel.
   - 🔧 **Module Atelier & Réservation de Créneau** : Sélection de prestation, saisie du véhicule, choix date/heure et génération automatique de référence de rendez-vous (`RDV-XXXXXX`).
   - 💳 **Simulateur de Financement & Formulaire de Reprise** : Calculateur de mensualité personnalisable (apport, durée 24-84 mois) et demande de reprise en 2 minutes.
   - 🌍 **Multilinguisme Intégré (6 langues)** : Sélecteur instantané (Français, Anglais, Néerlandais, Allemand, Espagnol, Italien).
   - 🔒 **Conformité RGPD & Mentions Légales** : Panneau interactif de gestion des cookies avec consentement différencié, mentions de la SA (Bruxelles, KRS 00323819).
   - 📊 **Tableau de Bord Équipe / Back-Office (`/admin`)** : Vue d'ensemble du stock, métriques de valorisation, gestion des demandes d'essais et des rendez-vous atelier.

---

## 🚀 Déploiement sur Vercel

Le projet est configuré avec un fichier `vercel.json` optimisé pour le routage SPA et la mise en cache CDN des photos de véhicules.

### Méthode 1 : Via l'interface web Vercel (Recommandé)
1. Poussez votre code sur GitHub (voir instructions ci-dessous).
2. Connectez-vous sur [vercel.com](https://vercel.com).
3. Cliquez sur **"Add New..."** > **"Project"**.
4. Importez votre dépôt GitHub **`MIC-Automobile`**.
5. Vercel détecte automatiquement la configuration Vite :
   - **Framework Preset** : `Vite`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
6. Cliquez sur **"Deploy"**. Votre site sera en ligne en quelques secondes avec certificat SSL automatique !

### Méthode 2 : Via le CLI Vercel
```bash
# Installer le CLI Vercel si besoin
npm i -g vercel

# Lancer le déploiement
vercel

# Pour déployer directement en production :
vercel --prod
```

---

## 🐙 Exportation vers GitHub

Pour publier le projet sur votre compte GitHub :

```bash
# 1. Ajouter tous les fichiers au suivi Git
git add .

# 2. Créer le commit initial
git commit -m "feat: initialisation du site complet MIC AUTOMOBILE avec 73 vehicules et 10 vans VIP"

# 3. Renommer la branche principale en main
git branch -M main

# 4. Lier votre dépôt distant GitHub (remplacez avec l'URL de votre dépôt GitHub)
git remote add origin https://github.com/VOTRE_UTILISATEUR/mic-automobile.git

# 5. Pousser vers GitHub
git push -u origin main
```

---

## 💻 Développement Local

Pour lancer le projet sur votre machine :

```bash
# Installation des dépendances (déjà effectuée)
npm install

# Lancer le serveur de développement local
npm run dev

# Tester la compilation de production
npm run build
```

---

## 📁 Structure du Projet

```
MIC Automobile/
├── Vehicule/                          # Dossier source des véhicules
│   ├── Audi/                          # Modèles existants
│   ├── BMW/
│   ├── Mercedes/
│   ├── Van/                           # 10 Nouveaux Vans VIP complétés
│   │   ├── Mercedes-Benz Classe V 300 d AMG Line Extra-Long/ (16 photos + txt)
│   │   ├── Mercedes-Benz Sprinter 319 CDI V6 VIP Luxury Jet-Van/ (16 photos + txt)
│   │   ├── Volkswagen California 6.1 Ocean 2.0 TDI 204ch 4Motion DSG/ (16 photos + txt)
│   │   ├── Volkswagen Multivan T7 2.0 TDI 150ch DSG7 Life Long/ (16 photos + txt)
│   │   ├── Ford Transit Custom Nugget Plus 2.0 EcoBlue Westfalia/ (16 photos + txt)
│   │   ├── Peugeot Traveller 2.0 BlueHDi 180ch EAT8 Business VIP/ (16 photos + txt)
│   │   ├── Renault Trafic SpaceClass 2.0 dCi 170ch EDC Grand Escapade/ (16 photos + txt)
│   │   ├── Toyota Proace Verso 2.0 D-4D 180ch VIP Lounge Long/ (16 photos + txt)
│   │   ├── Citroen SpaceTourer 2.0 BlueHDi 180ch EAT8 Business Lounge/ (16 photos + txt)
│   │   └── Mercedes-Benz Marco Polo 300 d 4MATIC Westfalia Horizon/ (16 photos + txt)
│   └── ...                            # Autres marques
├── public/
│   └── Vehicule/                      # Assets médias optimisés servis sur le CDN
├── src/
│   ├── components/                    # Header, Footer, VehicleCard, Modales, etc.
│   ├── context/                       # StoreContext (favoris, panier, RDV) & LanguageContext
│   ├── data/                          # Base de données structurée (73 véhicules)
│   ├── pages/                         # Accueil, Stock, Fiche, Configurateur, Quiz, Atelier, etc.
│   └── types/                         # Types TypeScript
├── scripts/                           # Scripts de téléchargement des photos & génération du catalogue
├── vercel.json                        # Configuration Vercel (rewrites SPA & cache)
└── package.json
```
