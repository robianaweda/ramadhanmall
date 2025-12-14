# Panduan Konversi Gambar ke WebP

## Mengapa WebP?
- **Ukuran lebih kecil**: 25-35% lebih kecil dari PNG/JPG
- **Kualitas sama**: Tidak ada penurunan kualitas visual
- **Support luas**: Didukung oleh 95%+ browser modern
- **Loading lebih cepat**: Website akan lebih cepat diakses

## Struktur Folder yang Dibutuhkan

Setelah konversi, struktur folder gambar Anda harus seperti ini:

```
images/
├── banners/
│   ├── Slider_1.png          (gambar asli - tetap dipertahankan)
│   ├── Slider_1.webp         (versi WebP - BARU)
│   ├── Slider_2.png
│   ├── Slider_2.webp
│   ├── Slider_3.png
│   ├── Slider_3.webp
│   ├── Slider_5.png
│   └── Slider_5.webp
├── banners/mobile/
│   ├── Slider_Mobile_1.png
│   ├── Slider_Mobile_1.webp  (BARU)
│   ├── Slider_Mobile_2.png
│   ├── Slider_Mobile_2.webp  (BARU)
│   ├── Slider_Mobile_3.png
│   ├── Slider_Mobile_3.webp  (BARU)
│   ├── Slider_Mobile_4.png
│   └── Slider_Mobile_4.webp  (BARU)
└── products/
    ├── Al Quran Tajwid.png
    ├── Al Quran Tajwid.webp  (BARU)
    ├── Al Quran Terjemah.png
    ├── Al Quran Terjemah.webp (BARU)
    └── ... (dan seterusnya untuk semua produk)
```

---

## Metode 1: Online Converter (Termudah)

### CloudConvert (Recommended)
1. Buka: https://cloudconvert.com/png-to-webp
2. Upload gambar PNG/JPG Anda
3. Pilih kualitas: **90%** (sweet spot antara ukuran & kualitas)
4. Klik Convert
5. Download hasil konversi
6. Upload file .webp ke folder yang sesuai di server

### Squoosh (Google)
1. Buka: https://squoosh.app
2. Drag & drop gambar Anda
3. Pilih format WebP di panel kanan
4. Adjust quality: **85-90%**
5. Download hasil konversi

**Kelebihan**: Tidak perlu install software, mudah digunakan
**Kekurangan**: Harus konversi satu per satu, perlu koneksi internet

---

## Metode 2: Batch Converter Desktop (Cepat untuk Banyak File)

### XnConvert (Windows/Mac/Linux) - FREE
1. Download: https://www.xnview.com/en/xnconvert/
2. Install aplikasi
3. Tambahkan semua gambar yang ingin dikonversi
4. Pilih tab "Output"
5. Format: **WebP**
6. Quality: **90**
7. Folder tujuan: Sama dengan folder asli
8. Klik "Convert"

**Kelebihan**: Konversi massal, gratis, mudah
**Kekurangan**: Perlu install software

### Photoshop (Jika Anda punya)
1. Install plugin WebP: https://developers.google.com/speed/webp/docs/webpshop
2. Open gambar di Photoshop
3. File → Save As → WebP
4. Quality: 85-90
5. Save

---

## Metode 3: Command Line (Untuk Developer)

### Windows (menggunakan cwebp)

1. Download WebP tools: https://developers.google.com/speed/webp/download
2. Extract ke folder, misalnya: `C:\webp`
3. Buka Command Prompt di folder gambar Anda
4. Jalankan command:

```bash
# Konversi single file
C:\webp\cwebp.exe -q 90 "Slider_1.png" -o "Slider_1.webp"

# Konversi semua PNG di folder
for %i in (*.png) do C:\webp\cwebp.exe -q 90 "%i" -o "%~ni.webp"

# Konversi semua JPG di folder
for %i in (*.jpg) do C:\webp\cwebp.exe -q 90 "%i" -o "%~ni.webp"
```

### Mac/Linux (menggunakan cwebp)

```bash
# Install via Homebrew (Mac)
brew install webp

# Install via apt (Ubuntu/Debian)
sudo apt install webp

# Konversi single file
cwebp -q 90 Slider_1.png -o Slider_1.webp

# Konversi semua PNG di folder
for file in *.png; do cwebp -q 90 "$file" -o "${file%.png}.webp"; done

# Konversi semua JPG di folder
for file in *.jpg; do cwebp -q 90 "$file" -o "${file%.jpg}.webp"; done
```

### Node.js Script (Automatic Batch)

Jika Anda familiar dengan Node.js, buat file `convert-to-webp.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Install sharp dulu: npm install sharp

async function convertToWebP(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recursive untuk subfolder
            await convertToWebP(filePath);
        } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
            const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

            console.log(`Converting ${file}...`);

            await sharp(filePath)
                .webp({ quality: 90 })
                .toFile(webpPath);

            console.log(`✓ Created ${path.basename(webpPath)}`);
        }
    }
}

// Jalankan konversi
convertToWebP('./images');
```

Jalankan:
```bash
npm install sharp
node convert-to-webp.js
```

---

## Rekomendasi Kualitas WebP

| Jenis Gambar | Quality | Alasan |
|--------------|---------|---------|
| Banner/Hero | 85-90 | Gambar besar, perlu kualitas tinggi |
| Produk | 80-85 | Balance antara kualitas & ukuran |
| Thumbnail | 75-80 | Gambar kecil, tidak perlu terlalu tinggi |
| Icon/Logo | 90-95 | Perlu ketajaman maksimal |

---

## Checklist Konversi

- [ ] Backup semua gambar asli (PNG/JPG) terlebih dahulu
- [ ] Konversi semua gambar banner desktop (4 file)
- [ ] Konversi semua gambar banner mobile (4 file)
- [ ] Konversi semua gambar produk (24 file)
- [ ] Upload semua file .webp ke server
- [ ] **JANGAN HAPUS** file PNG/JPG asli (digunakan sebagai fallback)
- [ ] Test website di berbagai browser
- [ ] Check ukuran file sebelum vs sesudah

---

## Verifikasi

Setelah selesai konversi dan upload, cek:

1. **Browser DevTools (F12)**
   - Network tab
   - Reload halaman
   - Lihat apakah gambar .webp yang di-load (bukan .png)

2. **File Size**
   - Bandingkan ukuran file asli vs WebP
   - Seharusnya 25-35% lebih kecil

3. **Visual Quality**
   - Pastikan tidak ada penurunan kualitas yang signifikan
   - Zoom in untuk cek detail

---

## Troubleshooting

### Gambar tidak muncul setelah upload WebP
- Cek apakah nama file sama persis dengan PNG/JPG (case-sensitive)
- Pastikan struktur folder benar
- Clear browser cache (Ctrl+F5)

### Browser lama tidak support WebP
- Tidak masalah! Code sudah support fallback otomatis ke PNG/JPG
- Browser modern akan load WebP, browser lama akan load PNG/JPG

### File WebP lebih besar dari PNG
- Ini jarang terjadi, biasanya pada gambar dengan banyak warna solid
- Jika ini terjadi, coba turunkan quality ke 80
- Atau tetap gunakan PNG untuk gambar tersebut

---

## Estimasi Penghematan

Berdasarkan website Ramadhan Mall:

| Jenis | Jumlah | Ukuran Rata-rata PNG | Ukuran WebP (90%) | Penghematan |
|-------|--------|---------------------|-------------------|-------------|
| Banner Desktop | 4 | ~500 KB | ~320 KB | ~36% |
| Banner Mobile | 4 | ~200 KB | ~130 KB | ~35% |
| Produk | 24 | ~150 KB | ~95 KB | ~37% |
| **Total** | **32** | **~6.8 MB** | **~4.3 MB** | **~2.5 MB** |

**Hasil**: Website akan load **2.5 MB lebih ringan**! 🚀

---

## Support & Bantuan

Jika ada masalah saat konversi:
1. Cek file format asli (harus PNG/JPG/JPEG)
2. Pastikan file tidak corrupt
3. Coba gunakan metode konversi lain
4. Hubungi developer jika masih bermasalah

**Browser Support WebP**: Chrome, Firefox, Edge, Safari 14+, Opera
**Fallback**: PNG/JPG untuk browser yang tidak support WebP
