import os
import sys
import json
import time
import urllib.request
import urllib.parse

HEADERS = {'User-Agent': 'MICAutomobileApp/1.0 (info@mic-automobile.be; presentation archive)'}

VANS = [
    {
        'brand': 'Mercedes-Benz',
        'folder': 'Mercedes-Benz Classe V 300 d AMG Line Extra-Long',
        'title': 'MERCEDES-BENZ CLASSE V 300 d AMG LINE EXTRA-LONG (W447)',
        'txt_name': 'Mercedes_Classe_V_300d_AMG_Line_Extra_Long.txt',
        'searches': ['Mercedes-Benz W447', 'Mercedes-Benz V-Class', 'Mercedes V 300', 'Mercedes V-Class interior'],
        'price': '68.900 Euros',
        'garantie': '24 MOIS',
        'origine': 'Importation Allemande',
        'annee': '06/2023',
        'km': '34.500 km',
        'carburant': 'Diesel',
        'boite': 'Automatique (9G-Tronic)',
        'puissance': '237 CH',
        'transmission': 'Propulsion arrière (RWD) / 4MATIC disponible',
        'places': '7',
        'moteur_code': 'OM 654 (2.0L 4 cylindres Turbo Diesel)',
        'cylindree': '1.950 cm3',
        'puissance_max': '237 ch (174 kW) à 4.200 tr/min',
        'couple_max': '500 Nm (overtorque 530 Nm) à 1.600-2.400 tr/min',
        'vitesse_max': '220 km/h',
        'conso': '7.4 - 7.8 L/100km',
        'dimensions': 'Longueur 5.370 mm (Extra-Long) · Largeur 1.928 mm · Hauteur 1.880 mm · Empattement 3.430 mm',
        'equipements': [
            'Pack extérieur AMG Line avec boucliers sport et calandre diamant',
            'Double toit ouvrant panoramique vitré électrique',
            'Système audio Surround Burmester 15 haut-parleurs (640 W)',
            'Suspension pneumatique AIRMATIC avec réglage en hauteur automatique',
            'Système multimédia MBUX 10.25 pouces avec navigation tactile et commande vocale',
            'Caméras panoramiques 360° et aide active au stationnement PARKTRONIC',
            'Sellerie cuir Nappa beige soie avec sièges avant chauffants et ventilés',
            'Salon VIP arrière 4 fauteuils individuels avec table centrale coulissante pliable',
            'Portes latérales coulissantes gauche et droite à commande électrique',
            'Hayon arrière EASY-PACK électrique avec lunette ouvrante indépendante',
            'Projecteurs LED intelligents Multibeam avec feux de route automatiques',
            'Régulateur de vitesse adaptatif DISTRONIC PLUS et Pack d assistance à la conduite',
            'Climatisation automatique THERMOTRONIC avant et climatiseur TEMPMATIC arrière'
        ],
        'amenagement': 'Configuration VIP Executive 7 places modulables en vis-à-vis. Prises USB-C pour chaque passager, convertisseur 230V, vitrage teinté athermique 90%, éclairage d ambiance 64 couleurs, insonorisation acoustique renforcée.',
        'marche_min': '74.000 EUR',
        'marche_max': '89.000 EUR'
    },
    {
        'brand': 'Mercedes-Benz',
        'folder': 'Mercedes-Benz Sprinter 319 CDI V6 VIP Luxury Jet-Van',
        'title': 'MERCEDES-BENZ SPRINTER 319 CDI V6 VIP LUXURY JET-VAN',
        'txt_name': 'Mercedes_Sprinter_319_CDI_V6_VIP_Luxury_Jet_Van.txt',
        'searches': ['Mercedes-Benz Sprinter W907', 'Mercedes-Benz Sprinter VIP', 'Sprinter van interior', 'Mercedes Sprinter luxury'],
        'price': '114.900 Euros',
        'garantie': '24 MOIS',
        'origine': 'Importation Allemande (Préparation VIP Atelier)',
        'annee': '11/2022',
        'km': '41.200 km',
        'carburant': 'Diesel',
        'boite': 'Automatique (7G-Tronic Plus)',
        'puissance': '190 CH',
        'transmission': 'Propulsion arrière (RWD)',
        'places': '6 VIP',
        'moteur_code': 'OM 642 (3.0L V6 Turbo Diesel)',
        'cylindree': '2.987 cm3 (V6)',
        'puissance_max': '190 ch (140 kW) à 3.800 tr/min',
        'couple_max': '440 Nm à 1.400-2.400 tr/min',
        'vitesse_max': '160 km/h',
        'conso': '9.1 - 9.8 L/100km',
        'dimensions': 'Longueur 5.932 mm (L2H2) · Largeur 2.020 mm · Hauteur 2.620 mm · Empattement 3.665 mm',
        'equipements': [
            '4 fauteuils Captain Chairs Maybach massants, chauffants, ventilés avec repose-jambes électrique',
            'Cloison de séparation intégrale motorisée avec Smart TV LED 43 pouces 4K escamotable',
            'Ciel de toit étoilé en fibre optique Starlight RGB (plus de 1.000 points lumineux)',
            'Système domotique tactile de contrôle : éclairage, climatisation, stores, audio',
            'Minibar réfrigéré à compresseur avec compartiment champagne et verres en cristal',
            'Machine à café Nespresso intégrée dans meuble boiserie laqué',
            'Routeur Wi-Fi 5G haute vitesse professionnel et passerelle Apple TV 4K',
            'Système audio haute fidélité Focal surround 10 canaux avec caisson de basses actif',
            'Stores électriques d occultation totale sur l ensemble des baies vitrées',
            'Marchepied latéral électrique rétractable automatique avec éclairage LED',
            'Batterie auxiliaire Lithium LiFePO4 200Ah avec onduleur pur sinus 2.000W 230V',
            'Interphone de communication confidentielle avec le poste de conduite avant'
        ],
        'amenagement': 'Salon VIP de type Jet Privé. Isolation thermique et phonique multicouche haute densité. Finitions boiserie ronce de noyer véritable et cuir pleine fleur surpiqué losanges.',
        'marche_min': '135.000 EUR',
        'marche_max': '170.000 EUR'
    },
    {
        'brand': 'Volkswagen',
        'folder': 'Volkswagen California 6.1 Ocean 2.0 TDI 204ch 4Motion DSG',
        'title': 'VOLKSWAGEN CALIFORNIA 6.1 OCEAN 2.0 TDI 204ch 4MOTION DSG7',
        'txt_name': 'VW_California_6.1_Ocean_2.0_TDI_204_4Motion.txt',
        'searches': ['Volkswagen California', 'VW T6.1 California', 'Volkswagen T6 camper', 'VW California interior'],
        'price': '79.500 Euros',
        'garantie': '24 MOIS',
        'origine': 'Importation Allemande',
        'annee': '04/2023',
        'km': '28.900 km',
        'carburant': 'Diesel',
        'boite': 'Automatique DSG7 (Double embrayage 7 rapports)',
        'puissance': '204 CH',
        'transmission': 'Transmission intégrale 4MOTION avec blocage de différentiel',
        'places': '4 route / 4 couchages',
        'moteur_code': 'EA288 BiTDI (2.0L 4 cylindres Bi-Turbo Diesel)',
        'cylindree': '1.968 cm3',
        'puissance_max': '204 ch (150 kW) à 4.000 tr/min',
        'couple_max': '450 Nm à 1.400-2.250 tr/min',
        'vitesse_max': '203 km/h',
        'conso': '8.2 - 8.9 L/100km',
        'dimensions': 'Longueur 4.904 mm · Largeur 1.904 mm · Hauteur 1.990 mm (accès parkings < 2m)',
        'equipements': [
            'Toit relevable électro-hydraulique avec lit supérieur grand confort et sommier à coupelles',
            'Bloc cuisine intégrée avec 2 feux gaz, évier inox et réfrigérateur à compression Waeco 42L',
            'Chauffage stationnaire programmable à air et à eau avec télécommande et unité centrale tactile',
            'Douchette extérieure raccordée sur réservoir d eau propre 35 litres',
            'Banquette arrière 2 places sur rails convertible en couchage inférieur 2 personnes avec surmatelas',
            'Store banne latéral extérieur rétractable avec manivelle et boîtier aluminium noir',
            'Table et 2 chaises de camping intégrées astucieusement dans le hayon et la porte latérale',
            'Digital Cockpit VW avec navigation Discover Pro 9.2 pouces et commande vocale',
            'Phares Full LED avant et feux arrière LED avec régulation automatique des feux',
            'Régulateur de vitesse adaptatif ACC avec Front Assist et Lane Assist',
            'Attelage amovible d origine avec contrôle électronique de stabilité remorque',
            'Réservoir d eaux usées 30 litres avec vidange sécurisée sous plancher'
        ],
        'amenagement': 'Aménagement d usine complet California Ocean. Unité de commande centrale couleur tactile dans le pavillon. Deux batteries auxiliaires AGM pour autonomie complète de 4 jours.',
        'marche_min': '85.000 EUR',
        'marche_max': '98.000 EUR'
    },
    {
        'brand': 'Volkswagen',
        'folder': 'Volkswagen Multivan T7 2.0 TDI 150ch DSG7 Life Long',
        'title': 'VOLKSWAGEN MULTIVAN T7 2.0 TDI 150ch DSG7 LIFE LONG',
        'txt_name': 'VW_Multivan_T7_2.0_TDI_150_DSG7_Life.txt',
        'searches': ['Volkswagen Multivan T7', 'VW T7 Multivan', 'VW Multivan 2022', 'Volkswagen T7 interior'],
        'price': '54.900 Euros',
        'garantie': '24 MOIS',
        'origine': 'Importation Allemande',
        'annee': '05/2023',
        'km': '24.000 km',
        'carburant': 'Diesel',
        'boite': 'Automatique DSG7',
        'puissance': '150 CH',
        'transmission': 'Traction avant (FWD)',
        'places': '7 places modulables',
        'moteur_code': 'EA288 Evo (2.0L TDI Turbo Diesel Twindosing)',
        'cylindree': '1.968 cm3',
        'puissance_max': '150 ch (110 kW) à 3.250-3.750 tr/min',
        'couple_max': '360 Nm à 1.600-2.750 tr/min',
        'vitesse_max': '190 km/h',
        'conso': '6.4 - 6.8 L/100km',
        'dimensions': 'Longueur 5.173 mm (Version Longue) · Largeur 1.941 mm · Hauteur 1.907 mm',
        'equipements': [
            'Toit panoramique en verre intégral avec protection thermique UV',
            'Console centrale multifonction coulissante avec table rabattable et porte-gobelets',
            'Digital Cockpit Pro 10.25 pouces configurable et écran d infodivertissement Ready 2 Discover 10 pouces',
            'Phares Matrix LED IQ.LIGHT avec feux de virage dynamiques et bandeau lumineux de calandre',
            '7 sièges individuels légers sur rails électrifiés, démontables et réversibles',
            'Double porte coulissante électrique avec fonction Easy Open mains libres',
            'Hayon arrière motorisé avec ouverture au pied',
            'Système Travel Assist combinant régulateur adaptatif ACC et maintien de voie actif',
            'Climatisation automatique Air Care Climatronic 3 zones avec filtre allergène',
            'Park Assist avec caméras de recul et capteurs d aide 360°'
        ],
        'amenagement': 'Nouveau châssis modulaire MQB offrant un comportement routier de berline. Modulabilité totale de l habitacle avec sièges chauffants même au deuxième rang.',
        'marche_min': '59.000 EUR',
        'marche_max': '68.000 EUR'
    },
    {
        'brand': 'Ford',
        'folder': 'Ford Transit Custom Nugget Plus 2.0 EcoBlue 185ch Westfalia',
        'title': 'FORD TRANSIT CUSTOM NUGGET PLUS 2.0 ECOBLUE 185ch WESTFALIA',
        'txt_name': 'Ford_Transit_Custom_Nugget_Plus_185_Westfalia.txt',
        'searches': ['Ford Transit Custom', 'Ford Nugget', 'Ford Tourneo Custom', 'Ford Transit Custom interior'],
        'price': '62.800 Euros',
        'garantie': '18 MOIS',
        'origine': 'Importation Allemande',
        'annee': '07/2022',
        'km': '38.700 km',
        'carburant': 'Diesel',
        'boite': 'Automatique SelectShift 6 rapports',
        'puissance': '185 CH',
        'transmission': 'Traction avant (FWD)',
        'places': '5 assises / 4 couchages',
        'moteur_code': '2.0 EcoBlue TDCi Turbo Diesel',
        'cylindree': '1.995 cm3',
        'puissance_max': '185 ch (136 kW) à 3.500 tr/min',
        'couple_max': '415 Nm à 1.750-2.750 tr/min',
        'vitesse_max': '180 km/h',
        'conso': '7.8 - 8.4 L/100km',
        'dimensions': 'Longueur 5.340 mm (L2 Plus) · Largeur 2.032 mm · Hauteur 2.080 mm',
        'equipements': [
            'Cabinet de toilette arrière séparé avec WC fixe à cassette et lavabo escamotable',
            'Aménagement exclusif Westfalia à deux pièces distinctes (salon / cuisine-sanitaire)',
            'Cuisine arrière en L avec évier inox, deux feux gaz et réfrigérateur 40L',
            'Toit relevable avec lit grand confort (2.000 x 1.380 mm) avec sommier Froli',
            'Chauffage stationnaire au gazole 3.0 kW avec thermostat et programmation digitale',
            'Système multimédia Ford SYNC 3 avec écran tactile 8 pouces, Apple CarPlay et Android Auto',
            'Régulateur de vitesse adaptatif avec alerte de franchissement de ligne et reconnaissance des panneaux',
            'Store latéral banne Fiamma F45 avec toile haute résistance',
            'Prise extérieure 230V avec chargeur intégré et deux batteries de cellule auxiliaires'
        ],
        'amenagement': 'Version Plus à empattement long permettant l intégration d un véritable espace sanitaire arrière sans empiéter sur la cuisine ni l espace de vie.',
        'marche_min': '68.000 EUR',
        'marche_max': '78.000 EUR'
    },
    {
        'brand': 'Peugeot',
        'folder': 'Peugeot Traveller 2.0 BlueHDi 180ch EAT8 Business VIP',
        'title': 'PEUGEOT TRAVELLER 2.0 BLUEHDI 180ch EAT8 BUSINESS VIP (LONG)',
        'txt_name': 'Peugeot_Traveller_2.0_BlueHDi_180_Business_VIP.txt',
        'searches': ['Peugeot Traveller', 'Peugeot Expert Tepee', 'Peugeot Traveller interior', 'Peugeot Traveller VIP'],
        'price': '42.900 Euros',
        'garantie': '18 MOIS',
        'origine': 'Importation Allemande',
        'annee': '03/2023',
        'km': '31.500 km',
        'carburant': 'Diesel',
        'boite': 'Automatique EAT8 (8 rapports)',
        'puissance': '180 CH',
        'transmission': 'Traction avant avec système antipatinage Grip Control',
        'places': '7 VIP',
        'moteur_code': 'DW10FC (2.0L BlueHDi Turbo Diesel)',
        'cylindree': '1.997 cm3',
        'puissance_max': '180 ch (132 kW) à 3.750 tr/min',
        'couple_max': '400 Nm à 2.000 tr/min',
        'vitesse_max': '185 km/h',
        'conso': '6.9 - 7.3 L/100km',
        'dimensions': 'Longueur 5.308 mm (Taille Long) · Largeur 1.920 mm · Hauteur 1.890 mm (accès parkings 1m90)',
        'equipements': [
            'Sellerie cuir Claudia noir avec sièges conducteur et passager massants et chauffants',
            '4 fauteuils arrière individuels VIP réversibles sur rails avec table de réunion escamotable',
            'Affichage tête haute couleur HUD rétractable au-dessus du combiné d instruments',
            'Portes latérales coulissantes motorisées mains libres (ouverture au geste du pied)',
            'Toit vitré en deux parties avec stores d occultation individuels et éclairage d ambiance LED',
            'Navigation connectée 3D Peugeot Connect avec reconnaissance vocale et info trafic TomTom',
            'Système audio Hi-Fi haut de gamme avec caisson de basses et 9 haut-parleurs',
            'Caméra de recul Visiopark 1 180° avec aide au stationnement avant et arrière',
            'Lunette arrière ouvrante indépendante pour accès rapide au coffre sans ouvrir le hayon'
        ],
        'amenagement': 'Aménagement salon mobile grand luxe destiné aux transferts de personnalités, cadres dirigeants ou familles exigeantes. Hauteur inférieure à 1m90.',
        'marche_min': '47.000 EUR',
        'marche_max': '55.000 EUR'
    },
    {
        'brand': 'Renault',
        'folder': 'Renault Trafic SpaceClass 2.0 dCi 170ch EDC Grand Escapade',
        'title': 'RENAULT TRAFIC SPACECLASS 2.0 BLUE dCi 170ch EDC GRAND ESCAPADE',
        'txt_name': 'Renault_Trafic_SpaceClass_2.0_dCi_170_EDC.txt',
        'searches': ['Renault Trafic III', 'Renault Trafic SpaceClass', 'Renault Trafic passenger', 'Renault Trafic interior'],
        'price': '44.500 Euros',
        'garantie': '18 MOIS',
        'origine': 'Importation Allemande',
        'annee': '06/2023',
        'km': '29.800 km',
        'carburant': 'Diesel',
        'boite': 'Automatique EDC à double embrayage 6 rapports',
        'puissance': '170 CH',
        'transmission': 'Traction avant (FWD)',
        'places': '7 grand confort',
        'moteur_code': 'M9R (2.0L Blue dCi Turbo Diesel)',
        'cylindree': '1.997 cm3',
        'puissance_max': '170 ch (125 kW) à 3.500 tr/min',
        'couple_max': '380 Nm à 1.500 tr/min',
        'vitesse_max': '186 km/h',
        'conso': '7.1 - 7.6 L/100km',
        'dimensions': 'Longueur 5.480 mm (L2 Grand) · Largeur 1.956 mm · Hauteur 1.970 mm',
        'equipements': [
            'Finition haut de gamme Signature SpaceClass avec sellerie cuir carbone foncé',
            'Pack Escapade : banquette de troisième rangée convertible en véritable couchage 2 personnes',
            'Table centrale mobile, coulissante sur rails, pivotante et rabattable',
            'Deux sièges individuels de rang 2 pivotants à 360° pour configuration salon en face-à-face',
            'Système multimédia Easy Link 8 pouces avec réplication smartphone Apple CarPlay et Android Auto sans fil',
            'Chargeur de smartphone par induction intégré dans la console de bord',
            'Vitres latérales et arrière surteintées foncées à 90% pour une intimité préservée',
            'Climatisation automatique régulée avant et arrière avec commandes passagers dédiées au pavillon',
            'Phares avant 100% LED Full LED Pure Vision avec signature lumineuse en C',
            'Jantes alliage 17 pouces diamantées spécifiques SpaceClass'
        ],
        'amenagement': 'Le parfait compromis entre le van d affaires pour la semaine et le véhicule de loisirs pour les week-ends d évasion avec couchage intégré.',
        'marche_min': '49.000 EUR',
        'marche_max': '57.000 EUR'
    },
    {
        'brand': 'Toyota',
        'folder': 'Toyota Proace Verso 2.0 D-4D 180ch VIP Lounge Long',
        'title': 'TOYOTA PROACE VERSO 2.0 D-4D 180ch VIP LOUNGE LONG',
        'txt_name': 'Toyota_Proace_Verso_2.0_D4D_180_VIP_Lounge.txt',
        'searches': ['Toyota ProAce Verso', 'Toyota ProAce', 'Toyota ProAce interior', 'Toyota Proace VIP'],
        'price': '46.900 Euros',
        'garantie': '24 MOIS (Éligible Toyota Relax jusqu à 10 ans)',
        'origine': 'Importation Allemande',
        'annee': '02/2023',
        'km': '26.400 km',
        'carburant': 'Diesel',
        'boite': 'Automatique 8 rapports',
        'puissance': '180 CH',
        'transmission': 'Traction avant (FWD)',
        'places': '7 VIP',
        'moteur_code': '2.0 D-4D Turbo Diesel Euro 6d-ISC',
        'cylindree': '1.997 cm3',
        'puissance_max': '177 ch / 180 ch (130 kW) à 3.750 tr/min',
        'couple_max': '400 Nm à 2.000 tr/min',
        'vitesse_max': '185 km/h',
        'conso': '6.8 - 7.4 L/100km',
        'dimensions': 'Longueur 5.309 mm (Version Longue) · Largeur 1.920 mm · Hauteur 1.899 mm',
        'equipements': [
            'Sièges individuels Captain Chairs en cuir noir de première qualité, réglables et pivotants',
            'Sièges avant conducteur et passager chauffants et dotés de programmes de massage lombaires',
            'Table escamotable centrale multifonctions montée sur glissières au sol',
            'Double toit vitré panoramique Skyview avec stores occultants indépendants',
            'Système audio premium surround JBL à 9 haut-parleurs avec amplificateur numérique',
            'Portes latérales électriques coulissantes à commande par capteur de pied mains libres',
            'Affichage tête haute couleur HUD projetant les informations essentielles de vitesse et guidage',
            'Toyota Safety Sense complet : freinage d urgence, régulateur adaptatif, maintien dans la voie',
            'Garantie constructeur Toyota Relax renouvelable jusqu aux 10 ans du véhicule'
        ],
        'amenagement': 'Finition VIP Lounge ultra-soignée conçue pour les services d hôtel de luxe, chauffeurs de maître et navettes aéroport haut de gamme.',
        'marche_min': '51.000 EUR',
        'marche_max': '60.000 EUR'
    },
    {
        'brand': 'Citroen',
        'folder': 'Citroen SpaceTourer 2.0 BlueHDi 180ch EAT8 Business Lounge',
        'title': 'CITROEN SPACETOURER 2.0 BLUEHDI 180ch EAT8 BUSINESS LOUNGE',
        'txt_name': 'Citroen_SpaceTourer_2.0_BlueHDi_180_Business_Lounge.txt',
        'searches': ['Citroen SpaceTourer', 'Citroën SpaceTourer', 'Citroen Dispatch passenger', 'Citroen SpaceTourer interior'],
        'price': '39.900 Euros',
        'garantie': '18 MOIS',
        'origine': 'Importation Allemande',
        'annee': '09/2022',
        'km': '36.200 km',
        'carburant': 'Diesel',
        'boite': 'Automatique EAT8 (8 rapports)',
        'puissance': '180 CH',
        'transmission': 'Traction avant (FWD)',
        'places': '7 Business',
        'moteur_code': 'BlueHDi 180 S&S',
        'cylindree': '1.997 cm3',
        'puissance_max': '180 ch (132 kW) à 3.750 tr/min',
        'couple_max': '400 Nm à 2.000 tr/min',
        'vitesse_max': '185 km/h',
        'conso': '6.9 - 7.3 L/100km',
        'dimensions': 'Longueur 4.959 mm (Taille M) · Largeur 1.920 mm · Hauteur 1.900 mm',
        'equipements': [
            'Suspensions et sièges Citroën Advanced Comfort avec mousse haute densité à mémoire de forme',
            '4 fauteuils individuels en cuir pleine fleur Claudia disposés en salon de conférence face-à-face',
            'Table d affaires escamotable avec sous-main et rangements intégrés',
            'Toit vitré zénithal avec éclairage d ambiance doux à LED et diffuseurs d aération individuels',
            'Portes latérales électriques à commande mains libres au pied',
            'Affichage tête haute couleur HUD et navigation 3D Citroën Connect Nav',
            'Système de surveillance des angles morts et caméra de recul Top Rear Vision 180°',
            'Vitres arrière extra-teintées et rideaux pare-soleil intégrés dans les contre-portes'
        ],
        'amenagement': 'Un véritable salon roulant alliant le confort légendaire de suspension Citroën aux fonctionnalités d un bureau mobile d entreprise.',
        'marche_min': '44.000 EUR',
        'marche_max': '52.000 EUR'
    },
    {
        'brand': 'Mercedes-Benz',
        'folder': 'Mercedes-Benz Marco Polo 300 d 4MATIC Westfalia Horizon',
        'title': 'MERCEDES-BENZ MARCO POLO 300 d 4MATIC WESTFALIA HORIZON (W447)',
        'txt_name': 'Mercedes_Marco_Polo_300d_4MATIC_Westfalia.txt',
        'searches': ['Mercedes-Benz Marco Polo', 'Marco Polo W447', 'Mercedes camper van', 'Mercedes-Benz Marco Polo interior'],
        'price': '88.500 Euros',
        'garantie': '24 MOIS',
        'origine': 'Importation Allemande',
        'annee': '05/2023',
        'km': '21.800 km',
        'carburant': 'Diesel',
        'boite': 'Automatique (9G-Tronic)',
        'puissance': '237 CH',
        'transmission': 'Transmission intégrale permanente 4MATIC',
        'places': '5 assises / 4 couchages',
        'moteur_code': 'OM 654 (2.0L Turbo Diesel)',
        'cylindree': '1.950 cm3',
        'puissance_max': '237 ch (174 kW) à 4.200 tr/min',
        'couple_max': '500 Nm (overtorque 530 Nm) à 1.600-2.400 tr/min',
        'vitesse_max': '215 km/h',
        'conso': '7.9 - 8.5 L/100km',
        'dimensions': 'Longueur 5.140 mm · Largeur 1.928 mm · Hauteur 1.980 mm (accès sous 2m)',
        'equipements': [
            'Toit relevable électro-hydraulique Easy Up avec sommier à ressorts et matelas confort 2 personnes',
            'Banquette arrière 3 places coulissante électriquement convertible en lit double plat avec coussins d appoint pneumatiques',
            'Module Mercedes-Benz Advanced Control (MBAC) permettant le contrôle du van depuis l écran tactile MBUX ou smartphone',
            'Chauffage d appoint à air chaud avec programmateur horaire et thermostat numérique',
            'Store latéral extérieur noir anodisé pour création d un auvent de terrasse ombragé',
            'Pack extérieur sportif AMG Line avec boucliers avant/arrière et jantes alliage AMG 19 pouces',
            'Système multimédia MBUX 10.25 pouces avec navigation réalité augmentée et commande vocale Hey Mercedes',
            'Projecteurs LED intelligents Multibeam avec feux adaptatifs anti-éblouissement',
            'Transmission intégrale 4MATIC pour une motricité parfaite en montagne, neige et chemins côtiers'
        ],
        'amenagement': 'Le sommet du van de loisir et d aventure raffiné. Confort de conduite de Classe V couplé au savoir-faire d aménagement historique Westfalia.',
        'marche_min': '96.000 EUR',
        'marche_max': '110.000 EUR'
    }
]

def generate_txt(v):
    eq_str = '\n'.join([f'- {e}' for e in v['equipements']])
    content = f"""================================================================================
                    FICHE TECHNIQUE COMPLETE
                    {v['title']}
================================================================================

PRIX DE VENTE : {v['price']}
GARANTIE : {v['garantie']}
ORIGINE : {v['origine']}
JAMAIS ACCIDENTE

================================================================================
                    IDENTIFICATION DU VEHICULE
================================================================================

Marque                  : {v['brand']}
Modele                  : {v['folder']}
Annee                   : {v['annee']}
Kilometrage             : {v['km']} (Certifie)
Carburant               : {v['carburant']}
Boite de vitesses       : {v['boite']}
Puissance               : {v['puissance']}
Transmission            : {v['transmission']}
Nombre de places        : {v['places']}

================================================================================
                    MOTORISATION
================================================================================

Code moteur             : {v['moteur_code']}
Cylindree               : {v['cylindree']}
Puissance max           : {v['puissance_max']}
Couple max              : {v['couple_max']}
Alimentation            : Injection directe common rail
Suralimentation         : Turbocompresseur à géométrie variable
Norme antipollution     : Euro 6d-TEMP / Euro 6d
Technologie             : Stop & Start, AdBlue SCR

================================================================================
                    TRANSMISSION
================================================================================

Boite de vitesses       : {v['boite']}
Transmission            : {v['transmission']}

================================================================================
                    PERFORMANCES
================================================================================

Vitesse max             : {v['vitesse_max']}
Consommation mixte      : {v['conso']}
Capacite reservoir      : 70-75 litres
Autonomie estimee       : ~950-1.150 km

================================================================================
                    DIMENSIONS ET POIDS
================================================================================

Dimensions              : {v['dimensions']}
Nombre de places        : {v['places']}
Poids a vide            : ~2.150 - 2.450 kg
PTAC                    : 3.100 - 3.500 kg

================================================================================
                    EQUIPEMENTS DE SERIE ET OPTIONS
================================================================================

{eq_str}

================================================================================
                    AMENAGEMENT SPECIFIQUE VAN / SUR MESURE
================================================================================

{v['amenagement']}

================================================================================
                    ANALYSE DU MARCHE EUROPEEN
================================================================================

Prix du marche europeen ({v['folder']} {v['annee']}, ~{v['km']}) :
- Fourchette constatee     : {v['marche_min']} - {v['marche_max']}
- Prix propose par MIC     : {v['price']}

Le prix propose reflete la politique de transparence et d importation
directe de MIC AUTOMOBILE, inferieur au prix moyen constate en concession.

================================================================================
                    CONDITIONS DE VENTE & GARANTIE
================================================================================

- Garantie : {v['garantie']} pieces et main-d oeuvre dans tout le reseau europeen
- Jamais accidente · Kilometrage certifie Car-Pass / historique constructeur
- Controle technique vierge et revision complete realisee dans notre atelier
- Documents fournis : Certificat d Immatriculation + Certificat de Conformite Europeen (COC)
- Possibilite de reprise de votre ancien vehicule et financement personnalise
- Livraison possible partout en Belgique, France, Luxembourg et Union Europeenne

================================================================================
"""
    return content

print("Helper ready.")
