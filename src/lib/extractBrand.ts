/**
 * Extract brand name from product title
 * Assumes brand is the first word(s) before model name
 */
export function extractBrandFromTitle(title: string): string {
    // Common watch brands to match
    const knownBrands = [
        'Rolex', 'Omega', 'Tag Heuer', 'Cartier', 'Patek Philippe',
        'Audemars Piguet', 'Breitling', 'IWC', 'Jaeger-LeCoultre',
        'Panerai', 'Vacheron Constantin', 'Apple', 'Samsung', 'Garmin',
        'Fitbit', 'Fossil', 'Casio', 'Seiko', 'Citizen', 'Timex',
        'G-Shock', 'Suunto', 'Polar', 'Nike', 'Adidas', 'Amazfit',
        'Huawei', 'Withings', 'TicWatch', 'Xiaomi'
    ];

    // Try to match known brands (case-insensitive)
    for (const brand of knownBrands) {
        if (title.toLowerCase().includes(brand.toLowerCase())) {
            return brand;
        }
    }

    // Fallback: take first word as brand
    const firstWord = title.split(' ')[0];
    return firstWord;
}

/**
 * Get all unique brands from product list
 */
export function getAllBrands(products: Array<{ title: string }>): string[] {
    const brandSet = new Set<string>();

    products.forEach(product => {
        const brand = extractBrandFromTitle(product.title);
        if (brand) {
            brandSet.add(brand);
        }
    });

    return Array.from(brandSet).sort();
}
