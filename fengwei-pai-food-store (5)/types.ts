

export interface OrderProductInfo {
    id: number;
    name: string;
    quantity: number;
    price: number;
    emoji: string;
    is_unlimited: boolean;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name: string;
          price: number;
          image: string; // Filename, not full URL
          category: string;
          emoji: string;
          stock: number;
          minStock: number;
          is_published: boolean;
          is_unlimited: boolean;
        };
        Insert: {
          id?: number;
          name: string;
          price: number;
          image: string;
          category: string;
          emoji: string;
          stock: number;
          minStock: number;
          is_published?: boolean;
          is_unlimited?: boolean;
        };
        Update: {
          id?: number;
          name?: string;
          price?: number;
          image?: string;
          category?: string;
          emoji?: string;
          stock?: number;
          minStock?: number;
          is_published?: boolean;
          is_unlimited?: boolean;
        };
      };
      orders: {
        Row: {
          order_id: string;
          name: string;
          phone: string;
          delivery_method: string;
          payment_method: string;
          remarks: string | null;
          order_items: OrderProductInfo[];
          total_amount: number;
          payment_proof_url: string;
          status: 'pending' | 'paid' | 'shipped' | 'completed';
          created_at: string;
        };
        Insert: {
          order_id: string;
          name: string;
          phone: string;
          delivery_method: string;
          payment_method: string;
          remarks?: string | null;
          order_items: OrderProductInfo[];
          total_amount: number;
          payment_proof_url: string;
          status?: 'pending' | 'paid' | 'shipped' | 'completed';
          created_at?: string;
        };
        Update: {
          order_id?: string;
          name?: string;
          phone?: string;
          delivery_method?: string;
          payment_method?: string;
          remarks?: string | null;
          order_items?: OrderProductInfo[];
          total_amount?: number;
          payment_proof_url?: string;
          status?: 'pending' | 'paid' | 'shipped' | 'completed';
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // Filename, not full URL
  category: string;
  emoji: string;
  stock: number;
  minStock: number;
  is_published: boolean;
  is_unlimited: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
    product_id: number;
    product_name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

// Data passed from Checkout to Confirmation
export interface OrderDataForConfirmation {
    orderId: string;
    name: string;
    phone: string;
    delivery: string;
    paymentMethod: string;
    remarks: string;
    items: (CartItem & { subtotal: number })[];
    total: number;
    paymentProofFile: File;
}

// Data stored in Supabase
export interface OrderRecord {
  order_id: string;
  name: string;
  phone: string;
  delivery_method: string;
  payment_method: string;
  remarks: string | null;
  order_items: OrderProductInfo[];
  total_amount: number;
  payment_proof_url: string;
  status: 'pending' | 'paid' | 'shipped' | 'completed';
  created_at: string;
}

// Data for product form
export type ProductFormData = {
  id?: number;
  name: string;
  price: number;
  image: string;
  category: string;
  emoji: string;
  stock: number;
  minStock: number;
  is_published: boolean;
  is_unlimited: boolean;
};


export type ToastMessage = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
};