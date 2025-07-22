import { Product, Category } from './types';

export const SUPABASE_URL = 'https://edfnhhthztskuuosuasw.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZm5oaHRoenRza3V1b3N1YXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTYxMTYsImV4cCI6MjA2NTU3MjExNn0.O3g2gjvsWagmWgmzoeJA8mPampvLYJr-KgqVwXsKoAo';
export const PRODUCT_IMAGE_BASE_URL = 'https://edfnhhthztskuuosuasw.supabase.co/storage/v1/object/public/product-photos/';
export const WHATSAPP_NUMBER = '60162327792';
export const ADMIN_PASSWORD = 'fengweipaiadmin';
export const SELF_PICKUP_ADDRESS = '667, Jalan 24, Taman Perindustrian Ehsan Jaya, Kepong, 52100, Kuala Lumpur.';

// Update QR code paths to be full URLs pointing to Supabase storage
export const MAYBANK_QR_IMAGE = PRODUCT_IMAGE_BASE_URL + 'IMG_4043.jpeg';
export const TNG_QR_IMAGE = PRODUCT_IMAGE_BASE_URL + 'IMG_4042.png';

// Products are now fetched from Supabase, so this hardcoded list is no longer used.
export const products: Product[] = [];

// This function can be used to dynamically generate categories from a list of products.
export const generateCategoriesFromProducts = (products: Product[]): Category[] => {
    const categoryData = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = {
                name: product.category,
                emoji: product.emoji,
                id: `cat_${product.category.replace(/\s/g, '')}`
            };
        }
        return acc;
    }, {} as Record<string, Category>);
    return Object.values(categoryData);
}