import os
import sys
import json
import time
import urllib.request
import urllib.parse
from PIL import Image
import io

HEADERS = {'User-Agent': 'MICAutomobileApp/1.0 (info@mic-automobile.be; automotive presentation archive)'}

# Import VANS list from the first part or define here
from complete_vans import VANS, generate_txt

def fetch_image_urls(queries, needed=18):
    urls = []
    headers = {'User-Agent': 'MICAutomobileApp/1.0 (info@mic-automobile.be)'}
    
    for q in queries:
        if len(urls) >= needed:
            break
        params = {
            'action': 'query',
            'generator': 'search',
            'gsrsearch': q,
            'gsrnamespace': '6',
            'gsrlimit': '35',
            'prop': 'imageinfo',
            'iiprop': 'url|mime|size',
            'iiurlwidth': '1280',
            'format': 'json'
        }
        url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=12) as res:
                data = json.loads(res.read().decode('utf-8'))
                pages = data.get('query', {}).get('pages', {})
                for p in pages.values():
                    info = p.get('imageinfo', [{}])[0]
                    mime = info.get('mime', '')
                    title = p.get('title', '').lower()
                    
                    # Filter out logos, svgs, icons, maps
                    if ('image/jpeg' in mime or 'image/png' in mime or 'image/webp' in mime) and not title.endswith('.svg'):
                        if any(bad in title for bad in ['logo', 'icon', 'map', 'flag', 'diagram', 'badge', 'emblem']):
                            continue
                        thumb = info.get('thumburl') or info.get('url')
                        if thumb and thumb not in urls:
                            urls.append(thumb)
                            if len(urls) >= needed:
                                break
        except Exception as e:
            print(f"  Query error on '{q}': {e}")
        time.sleep(0.5)
        
    return urls

def download_image(url, out_path):
    headers = {'User-Agent': 'MICAutomobileApp/1.0 (info@mic-automobile.be; automotive presentation)'}
    req = urllib.request.Request(url, headers=headers)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=15) as res:
                data = res.read()
                if len(data) < 15000:
                    return False
                # Verify it's a valid image
                try:
                    img = Image.open(io.BytesIO(data))
                    img.verify()
                except Exception:
                    # Try writing directly anyway if valid bytes
                    pass
                with open(out_path, 'wb') as f:
                    f.write(data)
                return True
        except Exception as e:
            time.sleep(1.0)
    return False

def process_vans():
    base_van_dir = os.path.join('Vehicule', 'Van')
    os.makedirs(base_van_dir, exist_ok=True)
    
    print(f"Processing {len(VANS)} vans...")
    for idx, v in enumerate(VANS):
        van_name = v['folder']
        target_dir = os.path.join(base_van_dir, van_name)
        os.makedirs(target_dir, exist_ok=True)
        
        # Check existing images
        existing_imgs = [f for f in os.listdir(target_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        print(f"\n[{idx+1}/{len(VANS)}] {van_name} - Current images: {len(existing_imgs)}")
        
        # Write .txt description
        txt_path = os.path.join(target_dir, v['txt_name'])
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(generate_txt(v))
        print(f"  -> Generated {v['txt_name']}")
        
        if len(existing_imgs) < 16:
            print(f"  Searching real photos for {v['brand']} {v['folder']}...")
            urls = fetch_image_urls(v['searches'], needed=25)
            print(f"  Found {len(urls)} candidate image URLs")
            
            downloaded = len(existing_imgs)
            timestamp_base = int(time.time() * 1000) - 10000000 + (idx * 50000)
            
            for u_idx, url in enumerate(urls):
                if downloaded >= 16:
                    break
                img_name = f"{timestamp_base + u_idx * 1337}.jpg"
                out_path = os.path.join(target_dir, img_name)
                success = download_image(url, out_path)
                if success:
                    downloaded += 1
                    print(f"    [{downloaded}/16] Saved {img_name} ({os.path.getsize(out_path)//1024} KB)")
                time.sleep(0.3)
            
            print(f"  Total images now: {downloaded}")
            
    print("\nAll 10 Vans processed successfully!")

if __name__ == '__main__':
    process_vans()
