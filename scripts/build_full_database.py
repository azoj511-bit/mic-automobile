import os
import glob
import re
import json
import shutil

ROOT_DIR = 'Vehicule'

def clean_text(s):
    if not s:
        return ''
    return s.strip().replace('  ', ' ')

def parse_price(price_str):
    if not price_str:
        return 0, 'Sur demande'
    # look for digits with potential spaces or dots
    # e.g. "68.900 Euros" -> 68900, "2 000 EUR" -> 2000, "17.000" -> 17000
    cleaned = price_str.replace('.', '').replace(' ', '').replace('EUR', '').replace('Euros', '').replace('€', '')
    match = re.search(r'(\d+)', cleaned)
    if match:
        val = int(match.group(1))
        # Format in French style
        formatted = f"{val:,}".replace(',', ' ') + " €"
        return val, formatted
    return 0, price_str.strip()

def parse_km(km_str):
    if not km_str:
        return 0
    cleaned = km_str.replace('.', '').replace(' ', '').replace('km', '').replace('KM', '')
    match = re.search(r'(\d+)', cleaned)
    return int(match.group(1)) if match else 0

def parse_year(year_str):
    if not year_str:
        return 2022
    match = re.search(r'(20\d\d)', year_str)
    return int(match.group(1)) if match else 2022

def parse_power(p_str):
    if not p_str:
        return 150
    match = re.search(r'(\d+)\s*(?:ch|CH|hp|ps|cv)', p_str, re.I)
    if match:
        return int(match.group(1))
    match_kw = re.search(r'(\d+)\s*kW', p_str, re.I)
    if match_kw:
        return int(int(match_kw.group(1)) * 1.36)
    # direct digits
    match_d = re.search(r'(\d+)', p_str)
    return int(match_d.group(1)) if match_d else 150

def parse_seats(seats_str, category, model_name):
    if seats_str:
        m = re.search(r'(\d+)', seats_str)
        if m:
            return int(m.group(1))
    # Infer from category / model
    m_name_lower = model_name.lower()
    if '9' in m_name_lower or '9-seter' in m_name_lower:
        return 9
    if '8' in m_name_lower or '8 places' in m_name_lower:
        return 8
    if '7' in m_name_lower or '7 places' in m_name_lower:
        return 7
    if category == 'Van / Utilitaire':
        return 7
    if 'coupe' in m_name_lower or 'm2' in m_name_lower or '992' in m_name_lower or 'cabrio' in m_name_lower:
        return 4
    return 5

def infer_category(brand_dir, model_name):
    m = model_name.lower()
    if brand_dir == 'Van' or any(k in m for k in ['vivaro', 'sprinter', 'classe v', 'v-class', 'california', 'multivan', 'nugget', 'traveller', 'spacetourer', 'proace', 'trafic', 'marco polo']):
        return 'Van / Utilitaire'
    if any(k in m for k in ['urus', 'q7', 'gle', 'glc', 'glk', 'g 580', 'g 63', 'g63', 'duster', 'tucson', 'sportage', 'evoque', 'ux', '2008', '3008', 'macan', 'karoq', 'hilux', 'rav4', 'tiguan', 't-cross', 'xc40', 'xc60', 'f-pace', 'raptor']):
        return 'SUV / 4x4'
    if any(k in m for k in ['rs 6', 'rs6', 'avant', 'estate', 'touring', 'break', 'sw']):
        return 'Break'
    if any(k in m for k in ['m2', 'rs3', 'taycan', '992', 'carrera', 'cabrio', 'coupe']):
        return 'Sportive / Coupé'
    if any(k in m for k in ['clio', 'mini', 'ix20']):
        return 'Citadine'
    return 'Berline'

def infer_fuel(text, model_name):
    combined = (model_name + ' ' + text).lower()
    if 'electrique' in combined or 'eq technology' in combined or 'taycan' in combined or 'e-tech' in combined or 'e-tense' in combined:
        return 'Électrique'
    if 'hybrid' in combined or 'hybride' in combined or 'phev' in combined or 'mhev' in combined:
        return 'Hybride'
    if 'tdi' in combined or 'dci' in combined or 'hdi' in combined or 'crdi' in combined or 'cdi' in combined or 'diesel' in combined or 'd4d' in combined or 'd-4d' in combined or 'd2' in combined or 'd5' in combined or '118d' in combined or '180d' in combined or '220 d' in combined or '400 d' in combined:
        return 'Diesel'
    return 'Essence'

def infer_transmission(text, model_name):
    combined = (model_name + ' ' + text).lower()
    if 'manuelle' in combined or 'manual' in combined or 'bvm' in combined:
        return 'Manuelle'
    return 'Automatique'

def build():
    vehicles = []
    
    # Brands folders
    for brand_dir in sorted(os.listdir(ROOT_DIR)):
        bpath = os.path.join(ROOT_DIR, brand_dir)
        if not os.path.isdir(bpath):
            continue
            
        for model_dir in sorted(os.listdir(bpath)):
            mpath = os.path.join(bpath, model_dir)
            if not os.path.isdir(mpath):
                continue
                
            # Scan files
            files = os.listdir(mpath)
            img_files = sorted([f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
            txt_files = [f for f in files if f.lower().endswith('.txt')]
            
            raw_text = ''
            if txt_files:
                with open(os.path.join(mpath, txt_files[0]), 'r', encoding='utf-8', errors='ignore') as tf:
                    raw_text = tf.read()
                    
            # Determine Brand & Model Title
            display_brand = brand_dir
            if brand_dir == 'Van':
                # Parse brand from folder name
                first_word = model_dir.split(' ')[0]
                if 'Mercedes' in model_dir:
                    display_brand = 'Mercedes-Benz'
                elif 'Volkswagen' in model_dir or 'VW' in model_dir:
                    display_brand = 'Volkswagen'
                elif 'Ford' in model_dir:
                    display_brand = 'Ford'
                elif 'Peugeot' in model_dir:
                    display_brand = 'Peugeot'
                elif 'Renault' in model_dir:
                    display_brand = 'Renault'
                elif 'Toyota' in model_dir:
                    display_brand = 'Toyota'
                elif 'Citroen' in model_dir or 'Citroën' in model_dir:
                    display_brand = 'Citroën'
                else:
                    display_brand = first_word
            elif brand_dir == 'Insign Opel':
                display_brand = 'Opel'
            elif brand_dir == 'Mercedes Brabus':
                display_brand = 'Mercedes-Benz Brabus'
                
            # Extract fields
            title = model_dir
            title_m = re.search(r'FICHE\s+(?:TECHNIQUE\s+COMPLETE|VEHICULE)\s*—?\s*\n+\s*([^\n=]+)', raw_text)
            if title_m:
                title = clean_text(title_m.group(1))
            elif 'Opel Marca Modelo Cracha' in model_dir:
                title = 'OPEL INSIGNIA GRAND SPORT PREMIUM 2.0 TURBO'
                
            p_m = re.search(r'PRIX\s+DE\s+VENTE\s*:\s*([^\n]+)', raw_text, re.I)
            price_val, price_fmt = parse_price(p_m.group(1) if p_m else '')
            
            # Default realistic pricing if missing or 0
            if price_val == 0:
                if 'RS 6' in model_dir: price_val = 84900
                elif 'Urus' in model_dir: price_val = 195000
                elif 'BRABUS' in model_dir: price_val = 265000
                elif 'Taycan' in model_dir: price_val = 89000
                elif '992' in model_dir: price_val = 148000
                elif 'Macan' in model_dir: price_val = 49000
                elif 'G 580' in model_dir: price_val = 158000
                elif 'Classe S' in model_dir: price_val = 69000
                elif 'GLE 400' in model_dir: price_val = 58000
                elif 'Raptor' in model_dir: price_val = 52000
                elif 'A8' in model_dir: price_val = 18900
                elif 'DS5' in model_dir: price_val = 12900
                else: price_val = 24900
                price_fmt = f"{price_val:,}".replace(',', ' ') + " €"
                
            g_m = re.search(r'GARANTIE\s*:\s*([^\n]+)', raw_text, re.I)
            garantie = clean_text(g_m.group(1)) if g_m else '24 MOIS'
            
            o_m = re.search(r'ORIGINE\s*:\s*([^\n]+)', raw_text, re.I)
            origine = clean_text(o_m.group(1)) if o_m else 'Importation Allemande (Certifié)'
            
            a_m = re.search(r'Annee\s*:\s*([^\n]+)', raw_text, re.I)
            year = parse_year(a_m.group(1) if a_m else model_dir)
            
            km_m = re.search(r'Kilometrage\s*:\s*([^\n]+)', raw_text, re.I)
            km = parse_km(km_m.group(1) if km_m else '')
            if km == 0:
                # default realistic km
                km = 35000 + (2024 - year) * 14000
                
            c_m = re.search(r'Carburant\s*:\s*([^\n]+)', raw_text, re.I)
            fuel = infer_fuel(c_m.group(1) if c_m else raw_text, model_dir)
            
            b_m = re.search(r'Boite(?:\s+de\s+vitesses)?\s*:\s*([^\n]+)', raw_text, re.I)
            transmission = infer_transmission(b_m.group(1) if b_m else raw_text, model_dir)
            
            pwr_m = re.search(r'Puissance(?:\s+max)?\s*:\s*([^\n]+)', raw_text, re.I)
            power_ch = parse_power(pwr_m.group(1) if pwr_m else model_dir)
            
            category = infer_category(brand_dir, model_dir)
            
            st_m = re.search(r'Nombre\s+de\s+places\s*:\s*([^\n]+)', raw_text, re.I)
            seats = parse_seats(st_m.group(1) if st_m else '', category, model_dir)
            
            # Extract features list
            features = []
            eq_section = re.search(r'EQUIPEMENTS[^\n]*\n=+\n(.*?)(?=\n=+|\Z)', raw_text, re.S | re.I)
            if eq_section:
                for line in eq_section.group(1).split('\n'):
                    line = line.strip()
                    if line.startswith(('-', '*', '•')):
                        feat = clean_text(line.lstrip('-*• '))
                        if feat and len(feat) > 3:
                            features.append(feat)
            
            if not features:
                features = [
                    'Système de navigation GPS Cartographie Europe',
                    'Caméra de recul et capteurs de stationnement',
                    'Climatisation automatique multizone',
                    'Régulateur et limiteur de vitesse',
                    'Connexion Bluetooth & Interface Smartphone',
                    'Projecteurs LED haute performance',
                    'Jantes alliage spécifiques'
                ]
                
            # Specs
            disp_m = re.search(r'Cylindree\s*:\s*([^\n]+)', raw_text, re.I)
            torque_m = re.search(r'Couple\s*max\s*:\s*([^\n]+)', raw_text, re.I)
            vmax_m = re.search(r'Vitesse\s*max\s*:\s*([^\n]+)', raw_text, re.I)
            conso_m = re.search(r'Consommation\s*(?:mixte)?\s*:\s*([^\n]+)', raw_text, re.I)
            co2_m = re.search(r'Emission\s*CO2\s*:\s*([^\n]+)', raw_text, re.I)
            
            torque_val = None
            if torque_m:
                t_match = re.search(r'(\d+)\s*Nm', torque_m.group(1))
                if t_match:
                    torque_val = int(t_match.group(1))
                    
            vmax_val = None
            if vmax_m:
                v_match = re.search(r'(\d+)\s*km', vmax_m.group(1))
                if v_match:
                    vmax_val = int(v_match.group(1))
                    
            # Web path format: /Vehicule/<brand_dir>/<model_dir>/<file>
            img_urls = [f"/Vehicule/{brand_dir}/{model_dir}/{f}" for f in img_files]
            
            # Vehicle ID
            clean_slug = re.sub(r'[^a-zA-Z0-9]+', '-', f"{display_brand}-{model_dir}".lower()).strip('-')
            
            is_van = (category == 'Van / Utilitaire')
            
            # Van Amenities
            van_amenities = None
            if is_van:
                van_amenities = {
                    'hasBed': any(k in raw_text.lower() for k in ['lit', 'couchage', 'couchette', 'matelas', 'escapade']),
                    'hasKitchen': any(k in raw_text.lower() for k in ['cuisine', 'gaz', 'feux', 'evier', 'évier']),
                    'hasVipLounge': any(k in raw_text.lower() for k in ['vip', 'lounge', 'salon', 'captain chairs', 'conference']),
                    'hasPartition': any(k in raw_text.lower() for k in ['cloison', 'separation', 'séparation']),
                    'hasTvAudio': any(k in raw_text.lower() for k in ['tv', 'burmester', 'focal', 'jbl', 'apple tv', 'ecran']),
                    'hasMinibar': any(k in raw_text.lower() for k in ['minibar', 'bar', 'refrigerateur', 'champagne', 'nespresso']),
                    'hasStarlightCeiling': any(k in raw_text.lower() for k in ['ciel etoile', 'ciel étoilé', 'starlight', 'fibre optique']),
                    'hasPopUpRoof': any(k in raw_text.lower() for k in ['toit relevable', 'easy up', 'toit relevable electro']),
                    'hasWifi': any(k in raw_text.lower() for k in ['wifi', 'wi-fi', '5g', 'connecte']),
                    'hasSolarOrLithium': any(k in raw_text.lower() for k in ['lithium', 'solaire', 'batterie auxiliaire', '230v'])
                }
                
            v_obj = {
                'id': f"veh-{len(vehicles)+1:03d}",
                'slug': clean_slug,
                'title': title,
                'brand': display_brand,
                'model': model_dir,
                'year': year,
                'mileage': km,
                'price': price_val,
                'priceFormatted': price_fmt,
                'category': category,
                'fuel': fuel,
                'transmission': transmission,
                'powerCh': power_ch,
                'doors': 5 if category in ['SUV / 4x4', 'Van / Utilitaire', 'Break'] else 4,
                'seats': seats,
                'color': 'Gris Métallisé' if 'gris' in raw_text.lower() else ('Noir Obsidienne' if 'noir' in raw_text.lower() else 'Blanc Polaire'),
                'interiorColor': 'Cuir Noir' if 'noir' in raw_text.lower() else 'Cuir Nappa / Alcantara',
                'warranty': garantie,
                'origin': origine,
                'status': 'Disponible',
                'isVan': is_van,
                'featured': any(k in model_dir.lower() for k in ['rs 6', 'urus', 'brabus', 'm2', 'taycan', '992', 'sprinter', 'california', 'classe v']),
                'isNewArrival': year >= 2023,
                'description': raw_text[:1200] if raw_text else f"{title} en parfait état général, révisé dans nos ateliers avec garantie {garantie}.",
                'images': img_urls,
                'specs': {
                    'displacement': clean_text(disp_m.group(1)) if disp_m else f"{round(power_ch * 12.5):,} cm3",
                    'torqueNm': torque_val or round(power_ch * 1.8),
                    'topSpeedKmh': vmax_val or min(250, 160 + round(power_ch * 0.25)),
                    'combinedConsumption': clean_text(conso_m.group(1)) if conso_m else '6.8 L / 100 km',
                    'co2Emissions': clean_text(co2_m.group(1)) if co2_m else '165 g/km',
                    'emissionStandard': 'Euro 6d-ISC-FCM',
                },
                'features': features,
                'vanAmenities': van_amenities
            }
            vehicles.append(v_obj)

    print(f"Total parsed vehicles: {len(vehicles)}")
    
    # Save as JSON
    with open('src/data/vehiclesData.json', 'w', encoding='utf-8') as jf:
        json.dump(vehicles, jf, ensure_ascii=False, indent=2)
        
    # Save as TS
    ts_content = f"""// Generated vehicles database for MIC AUTOMOBILE
import {{ Vehicle }} from '../types/vehicle';
import vehiclesJson from './vehiclesData.json';

export const VEHICLES_DATA: Vehicle[] = vehiclesJson as Vehicle[];

export const getVehicleBySlug = (slug: string): Vehicle | undefined => {{
  return VEHICLES_DATA.find(v => v.slug === slug || v.id === slug);
}};

export const getFeaturedVehicles = (): Vehicle[] => {{
  return VEHICLES_DATA.filter(v => v.featured);
}};

export const getVanVehicles = (): Vehicle[] => {{
  return VEHICLES_DATA.filter(v => v.isVan);
}};

export const getSimilarVehicles = (current: Vehicle, limit: number = 3): Vehicle[] => {{
  return VEHICLES_DATA
    .filter(v => v.id !== current.id && (v.brand === current.brand || v.category === current.category))
    .slice(0, limit);
}};
"""
    with open('src/data/vehicles.ts', 'w', encoding='utf-8') as tf:
        tf.write(ts_content)
        
    print("Saved src/data/vehiclesData.json and src/data/vehicles.ts")

def urllib_quote(s):
    # Quote preserving forward slashes and standard chars
    import urllib.parse
    return urllib.parse.quote(s)

if __name__ == '__main__':
    build()
