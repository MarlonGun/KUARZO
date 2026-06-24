import { create } from 'zustand';
import api from '@/src/services/api';
import { resolveProductImage } from '@/src/utils/imageHelper';

export interface ProductData {
    id: string;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    imagen: string;
    stock: number;
    [key: string]: any;
}

interface ProductState {
    products: ProductData[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    isLoading: false,
    error: null,

    fetchProducts: async () => {
        // Evitar múltiples llamadas si ya hay productos cargados
        if (get().products.length > 0) return;

        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/productos');
            if (response.data && Array.isArray(response.data)) {
                const mappedProducts = response.data.map((p: any) => ({
                    id: String(p.id),
                    nombre: p.nombre,
                    descripcion: p.descripcion || "",
                    categoria: p.categoriaNombre || (p.categoria && typeof p.categoria === "object" ? p.categoria.nombre : (p.categoria || "General")),
                    precio: Number(p.precio),
                    imagen: resolveProductImage(p),
                    stock: p.stock ?? p.cantidad ?? 0,
                }));
                set({ products: mappedProducts, isLoading: false });
            } else {
                set({ products: [], isLoading: false });
            }
        } catch (error: any) {
            console.error("Error al cargar productos en ProductStore:", error);
            set({ error: error.message, isLoading: false });
        }
    }
}));
