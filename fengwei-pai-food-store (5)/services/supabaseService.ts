
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';
import { Database, OrderDataForConfirmation, OrderRecord, Product, ProductFormData } from '../types';

let supabase: SupabaseClient<Database> | null = null;

if (typeof window !== 'undefined') {
  try {
    supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (error) {
    console.error("Error initializing Supabase client:", error);
  }
}

// --- Product Functions ---

// Fetches only published products for the customer view
export const fetchProducts = async (): Promise<Product[]> => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('id', { ascending: true });
    
    // Fallback for when the 'is_published' column doesn't exist yet
    if (error && error.message.includes('column "is_published" does not exist')) {
        console.warn("Fallback: 'is_published' column not found. Fetching all products and assuming they are published. Please update your database schema.");
        const { data: fallbackData, error: fallbackError } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: true });
        
        if (fallbackError) throw new Error(`Fallback failed to fetch products: ${fallbackError.message}`);

        // Patch the data with default values for the missing properties
        return (fallbackData || []).map(p => ({
            ...p,
            is_published: p.is_published ?? true,
            is_unlimited: p.is_unlimited ?? false,
        } as Product));
    } else if (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
    return data || [];
};

// Fetches all products for the admin view
export const fetchAdminProducts = async (): Promise<Product[]> => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
    if (error) throw new Error(`Failed to fetch admin products: ${error.message}`);
    
    // Patch data to ensure new properties exist, even if columns are missing in DB
    // This prevents the admin panel from crashing when reading properties.
    return (data || []).map(p => ({
        ...p,
        is_published: p.is_published ?? true,
        is_unlimited: p.is_unlimited ?? false,
    } as Product));
};

export const addProduct = async (productData: ProductFormData): Promise<Product> => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    
    const { data: newProduct, error: insertError } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

    if (insertError) throw new Error(`Failed to add product: ${insertError.message}`);
    if (!newProduct) throw new Error("Failed to get new product data after insert.");

    return newProduct;
};

export const updateProduct = async (productId: number, productData: Partial<ProductFormData>): Promise<Product> => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    
    const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', productId)
        .select()
        .single();
    
    if (error) throw new Error(`Failed to update product: ${error.message}`);
    return data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) throw new Error(`Failed to delete product: ${error.message}`);
};


// --- Order Functions ---

export const generateOrderId = async (): Promise<string> => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    const today = new Date();
    const datePrefix = `FW${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    try {
        const { count, error } = await supabase.from('orders').select('order_id', { count: 'exact' }).like('order_id', `${datePrefix}%`);
        if (error) { throw error; }
        return `${datePrefix}${String((count || 0) + 1).padStart(3, '0')}`;
    } catch(error) {
        console.warn('Error fetching order count, falling back to timestamp ID.', error);
        return `FW${Date.now().toString().slice(-8)}`;
    }
}

const uploadPaymentProof = async (file: File, orderNumber: string): Promise<string> => {
  if (!supabase) throw new Error("Supabase client not initialized.");
  if (!file) throw new Error("No file provided for upload.");

  const fileExt = file.name.split('.').pop();
  const fileName = `${orderNumber}.${fileExt}`;
  const filePath = `payment-proofs/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('payment-proofs')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Failed to upload payment proof: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from('payment-proofs').getPublicUrl(filePath);

  if (!data.publicUrl) {
    throw new Error("Failed to get public URL for the uploaded file.");
  }
  
  return data.publicUrl;
};

export const submitOrder = async (orderData: OrderDataForConfirmation): Promise<string> => {
  if (!supabase) throw new Error("Supabase client not initialized.");

  const paymentProofUrl = await uploadPaymentProof(orderData.paymentProofFile, orderData.orderId);

  const finalOrder: Database['public']['Tables']['orders']['Insert'] = {
    order_id: orderData.orderId,
    name: orderData.name,
    phone: orderData.phone,
    delivery_method: orderData.delivery,
    payment_method: orderData.paymentMethod,
    remarks: orderData.remarks,
    order_items: orderData.items.map(item => ({ 
        id: item.id, 
        name: item.name, 
        quantity: item.quantity, 
        price: item.price, 
        emoji: item.emoji,
        is_unlimited: item.is_unlimited,
    })),
    total_amount: orderData.total,
    payment_proof_url: paymentProofUrl,
    status: 'pending',
  };

  const { error } = await supabase.from('orders').insert(finalOrder);

  if (error) {
    throw new Error(`Failed to submit order: ${error.message}`);
  }

  return orderData.orderId;
};


export const fetchAllOrders = async (): Promise<OrderRecord[]> => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};
