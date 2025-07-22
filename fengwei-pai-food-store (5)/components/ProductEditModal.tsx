

import React, { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../types';
import { useToast } from '../hooks/useToast';
import { addProduct, updateProduct, deleteProduct } from '../services/supabaseService';
import { CloseIcon, SpinnerIcon } from './icons';
import { getProductImageUrl } from '../utils/helpers';

interface ProductEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
    product: Product | null;
}

const Switch = ({ checked, onChange, label }: { checked: boolean, onChange: (checked: boolean) => void, label: string }) => (
  <label className="flex items-center cursor-pointer">
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className={`block w-14 h-8 rounded-full transition ${checked ? 'bg-primary' : 'bg-gray-300'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
    <div className="ml-3 text-gray-700 font-medium">{label}</div>
  </label>
);


const ProductEditModal: React.FC<ProductEditModalProps> = ({ isOpen, onClose, onSaveSuccess, product }) => {
    const { addToast } = useToast();
    const isEditing = product !== null;
    
    const [formData, setFormData] = useState<ProductFormData>({
        name: '', price: 0, stock: 0, minStock: 5, category: '', emoji: '', image: '', is_published: true, is_unlimited: false
    });
    
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    
    useEffect(() => {
        if (product) {
            setFormData(product);
            setImagePreview(getProductImageUrl(product.image));
        } else {
             setFormData({ name: '', price: 0, stock: 0, minStock: 5, category: '', emoji: '', image: '', is_published: true, is_unlimited: false });
             setImagePreview(getProductImageUrl(''));
        }
    }, [product]);

    useEffect(() => {
        setImagePreview(getProductImageUrl(formData.image));
    }, [formData.image]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
    };
    
    const handleSwitchChange = (name: 'is_published' | 'is_unlimited', value: boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isEditing) {
                await updateProduct(product.id, formData);
                addToast('商品更新成功!', 'success');
            } else {
                await addProduct(formData);
                addToast('商品添加成功!', 'success');
            }
            onSaveSuccess();
        } catch (error) {
            const message = error instanceof Error ? error.message : '操作失败';
            addToast(message, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!isEditing || !window.confirm(`确定要删除商品 "${product.name}" 吗?`)) return;
        
        setDeleting(true);
        try {
            await deleteProduct(product.id);
            addToast('商品删除成功!', 'success');
            onSaveSuccess();
        } catch (error) {
            const message = error instanceof Error ? error.message : '删除失败';
            addToast(message, 'error');
        } finally {
            setDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-5 border-b">
                    <h2 className="text-xl font-bold">{isEditing ? '编辑商品' : '添加商品'}</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </header>
                <form onSubmit={handleSubmit} className="overflow-y-auto">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Image Section */}
                        <div className="md:col-span-1 space-y-2">
                             <label className="block text-sm font-medium text-gray-700">图片预览</label>
                             <img src={imagePreview || undefined} alt="Preview" className="w-full h-auto aspect-square rounded-lg object-cover border bg-gray-100"/>
                             <label className="block text-sm font-medium text-gray-700">图片文件名</label>
                            <input type="text" name="image" placeholder="e.g. IMG_1234.jpeg" value={formData.image} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm"/>
                        </div>

                        {/* Fields Section */}
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium">名称</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">价格 (RM)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" step="0.01" required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Emoji</label>
                                <input type="text" name="emoji" value={formData.emoji} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium">分类</label>
                                <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">库存</label>
                                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required disabled={formData.is_unlimited}/>
                            </div>
                             <div className="sm:col-span-2">
                                <label className="block text-sm font-medium">最低库存警告</label>
                                <input type="number" name="minStock" value={formData.minStock} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" required disabled={formData.is_unlimited}/>
                            </div>
                             <div className="sm:col-span-2 border-t pt-4 space-y-4">
                               <Switch checked={formData.is_published} onChange={(val) => handleSwitchChange('is_published', val)} label={formData.is_published ? "状态：上架" : "状态：下架"} />
                               <Switch checked={formData.is_unlimited} onChange={(val) => handleSwitchChange('is_unlimited', val)} label={formData.is_unlimited ? "类型：无限预购" : "类型：库存限购"} />
                            </div>
                        </div>
                    </div>
                    <footer className="p-5 border-t flex justify-between items-center bg-gray-50">
                        <div>
                        {isEditing && (
                            <button type="button" onClick={handleDelete} disabled={isDeleting} className="bg-danger text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400">
                                {isDeleting ? <SpinnerIcon className="w-5 h-5"/> : '删除商品'}
                            </button>
                        )}
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
                                取消
                            </button>
                            <button type="submit" disabled={isSubmitting} className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover disabled:bg-gray-400 flex items-center gap-2">
                                {isSubmitting ? <SpinnerIcon className="w-5 h-5"/> : '保存'}
                            </button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default ProductEditModal;