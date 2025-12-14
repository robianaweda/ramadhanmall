# Quick Start - Konversi WebP

## Cara Tercepat (Menggunakan Script Otomatis)

### 1. Install Node.js
Pastikan Node.js sudah terinstall di komputer Anda.
Download di: https://nodejs.org/ (pilih versi LTS)

### 2. Install Dependencies
Buka terminal/command prompt di folder project, lalu jalankan:

```bash
npm install
```

### 3. Jalankan Konversi
```bash
npm run convert-webp
```

atau

```bash
node convert-to-webp.js
```

### 4. Selesai!
Script akan otomatis:
- ✅ Scan semua folder `images/`
- ✅ Konversi PNG/JPG ke WebP dengan kualitas 90%
- ✅ Simpan file .webp di folder yang sama dengan file asli
- ✅ Tampilkan statistik penghematan ukuran file
- ✅ **TIDAK** menghapus file asli

---

## Output Contoh

```
╔════════════════════════════════════════════════╗
║  WebP Converter - Ramadhan Mall           ║
╚════════════════════════════════════════════════╝

Configuration:
  Base Directory: ./images
  Quality: 90%
  Extensions: .png, .jpg, .jpeg
  Skip if exists: Yes

Starting conversion...

✓ Converted Slider_1.png (523.4 KB → 312.8 KB, -40.2%)
✓ Converted Slider_2.png (498.2 KB → 301.5 KB, -39.5%)
✓ Converted Al Quran Tajwid.png (145.3 KB → 89.7 KB, -38.3%)
...

╔════════════════════════════════════════════════╗
║  Conversion Summary                        ║
╚════════════════════════════════════════════════╝

  Total files scanned: 32
  ✓ Converted: 32
  ⊘ Skipped: 0
  ✗ Failed: 0

Size Comparison:
  Original: 6.82 MB
  WebP: 4.31 MB
  Saved: 2.51 MB (36.8% reduction)

  Time taken: 3.45s

Done! 🚀
```

---

## Konfigurasi (Opsional)

Edit file `convert-to-webp.js` bagian CONFIG jika perlu:

```javascript
const CONFIG = {
    quality: 90,              // Ubah ke 80-95 sesuai kebutuhan
    baseDir: './images',      // Folder yang akan di-scan
    extensions: ['.png', '.jpg', '.jpeg'],
    skipIfExists: true,       // Set false untuk overwrite file yang sudah ada
};
```

---

## Troubleshooting

### Error: Cannot find module 'sharp'
**Solusi**: Jalankan `npm install` terlebih dahulu

### Error: Directory 'images' not found
**Solusi**: Pastikan Anda menjalankan script dari folder project (folder yang berisi index.html)

### Script berjalan tapi tidak ada file yang dikonversi
**Solusi**:
- Cek apakah folder `images/` ada
- Cek apakah ada file PNG/JPG di dalam folder tersebut
- Cek apakah file .webp sudah ada (akan di-skip jika `skipIfExists: true`)

---

## Manual Conversion (Tanpa Node.js)

Jika tidak ingin menggunakan Node.js, silakan lihat panduan lengkap di:
📄 **[WEBP_CONVERSION_GUIDE.md](WEBP_CONVERSION_GUIDE.md)**

Panduan tersebut berisi:
- Online converter tools
- Desktop aplikasi (XnConvert, Photoshop)
- Command line tools
- Dan masih banyak lagi

---

## Support

Jika ada pertanyaan atau masalah, silakan hubungi developer.

**Happy optimizing! 🚀**
