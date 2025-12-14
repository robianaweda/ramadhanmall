/**
 * WebP Converter Script untuk Ramadhan Mall
 *
 * Cara menggunakan:
 * 1. Install dependencies: npm install sharp
 * 2. Jalankan script: node convert-to-webp.js
 *
 * Script ini akan:
 * - Scan semua folder images
 * - Konversi PNG/JPG ke WebP
 * - Membuat file WebP di folder yang sama dengan file asli
 * - Tidak menghapus file asli
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Konfigurasi
const CONFIG = {
    quality: 90,  // Kualitas WebP (0-100)
    baseDir: './images',  // Folder yang akan di-scan
    extensions: ['.png', '.jpg', '.jpeg'],  // Format yang akan dikonversi
    skipIfExists: true,  // Skip jika file WebP sudah ada
};

// Warna untuk console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
};

// Statistik konversi
const stats = {
    total: 0,
    converted: 0,
    skipped: 0,
    failed: 0,
    originalSize: 0,
    webpSize: 0,
};

/**
 * Konversi gambar ke WebP
 */
async function convertImageToWebP(inputPath) {
    const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    // Skip jika file WebP sudah ada
    if (CONFIG.skipIfExists && fs.existsSync(outputPath)) {
        console.log(`${colors.yellow}⊘ Skipped${colors.reset} ${path.basename(inputPath)} (already exists)`);
        stats.skipped++;
        return;
    }

    try {
        // Get original file size
        const originalStats = fs.statSync(inputPath);
        stats.originalSize += originalStats.size;

        // Convert to WebP
        await sharp(inputPath)
            .webp({ quality: CONFIG.quality })
            .toFile(outputPath);

        // Get WebP file size
        const webpStats = fs.statSync(outputPath);
        stats.webpSize += webpStats.size;

        // Calculate size reduction
        const reduction = ((1 - (webpStats.size / originalStats.size)) * 100).toFixed(1);
        const originalKB = (originalStats.size / 1024).toFixed(1);
        const webpKB = (webpStats.size / 1024).toFixed(1);

        console.log(
            `${colors.green}✓ Converted${colors.reset} ${path.basename(inputPath)} ` +
            `${colors.cyan}(${originalKB} KB → ${webpKB} KB, -${reduction}%)${colors.reset}`
        );

        stats.converted++;
    } catch (error) {
        console.error(`${colors.red}✗ Failed${colors.reset} ${path.basename(inputPath)}: ${error.message}`);
        stats.failed++;
    }
}

/**
 * Scan folder dan konversi semua gambar
 */
async function scanAndConvert(directory) {
    try {
        const items = fs.readdirSync(directory);

        for (const item of items) {
            const fullPath = path.join(directory, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Recursive untuk subfolder
                await scanAndConvert(fullPath);
            } else {
                // Check jika file adalah gambar yang perlu dikonversi
                const ext = path.extname(item).toLowerCase();
                if (CONFIG.extensions.includes(ext)) {
                    stats.total++;
                    await convertImageToWebP(fullPath);
                }
            }
        }
    } catch (error) {
        console.error(`${colors.red}Error scanning directory ${directory}:${colors.reset}`, error.message);
    }
}

/**
 * Format bytes ke readable format
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main function
 */
async function main() {
    console.log(`\n${colors.blue}╔════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.blue}║${colors.reset}  WebP Converter - Ramadhan Mall           ${colors.blue}║${colors.reset}`);
    console.log(`${colors.blue}╚════════════════════════════════════════════════╝${colors.reset}\n`);

    console.log(`${colors.cyan}Configuration:${colors.reset}`);
    console.log(`  Base Directory: ${CONFIG.baseDir}`);
    console.log(`  Quality: ${CONFIG.quality}%`);
    console.log(`  Extensions: ${CONFIG.extensions.join(', ')}`);
    console.log(`  Skip if exists: ${CONFIG.skipIfExists ? 'Yes' : 'No'}\n`);

    // Check if images directory exists
    if (!fs.existsSync(CONFIG.baseDir)) {
        console.error(`${colors.red}Error: Directory '${CONFIG.baseDir}' not found!${colors.reset}`);
        console.log(`Please make sure you are running this script from the project root directory.\n`);
        process.exit(1);
    }

    console.log(`${colors.cyan}Starting conversion...${colors.reset}\n`);

    const startTime = Date.now();

    // Scan and convert
    await scanAndConvert(CONFIG.baseDir);

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    // Print summary
    console.log(`\n${colors.blue}╔════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.blue}║${colors.reset}  Conversion Summary                        ${colors.blue}║${colors.reset}`);
    console.log(`${colors.blue}╚════════════════════════════════════════════════╝${colors.reset}\n`);

    console.log(`  Total files scanned: ${stats.total}`);
    console.log(`  ${colors.green}✓ Converted: ${stats.converted}${colors.reset}`);
    console.log(`  ${colors.yellow}⊘ Skipped: ${stats.skipped}${colors.reset}`);
    console.log(`  ${colors.red}✗ Failed: ${stats.failed}${colors.reset}`);

    if (stats.converted > 0) {
        const totalReduction = ((1 - (stats.webpSize / stats.originalSize)) * 100).toFixed(1);
        const savedBytes = stats.originalSize - stats.webpSize;

        console.log(`\n${colors.cyan}Size Comparison:${colors.reset}`);
        console.log(`  Original: ${formatBytes(stats.originalSize)}`);
        console.log(`  WebP: ${formatBytes(stats.webpSize)}`);
        console.log(`  ${colors.green}Saved: ${formatBytes(savedBytes)} (${totalReduction}% reduction)${colors.reset}`);
    }

    console.log(`\n  Time taken: ${duration}s`);

    console.log(`\n${colors.green}Done!${colors.reset} 🚀\n`);

    if (stats.converted > 0) {
        console.log(`${colors.cyan}Next steps:${colors.reset}`);
        console.log(`  1. Check the converted .webp files in the images folder`);
        console.log(`  2. Upload all .webp files to your server`);
        console.log(`  3. Test your website to ensure images load correctly`);
        console.log(`  4. DO NOT delete the original PNG/JPG files (used as fallback)\n`);
    }
}

// Run the script
main().catch(error => {
    console.error(`\n${colors.red}Unexpected error:${colors.reset}`, error);
    process.exit(1);
});
