

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from '../hooks/useToast';
import { fetchAllOrders, fetchAdminProducts } from '../services/supabaseService';
import { ADMIN_PASSWORD } from '../constants';
import { SpinnerIcon } from './icons';
import { OrderRecord, Product } from '../types';
import * as XLSX from 'xlsx';
import ProductEditModal from './ProductEditModal';
import { getProductImageUrl } from '../utils/helpers';

interface AdminPageProps {
  onExit: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onExit }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const { addToast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      addToast('登录成功', 'success');
    } else {
      addToast('管理员密码错误', 'error');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm relative">
          <h2 className="text-2xl font-bold text-center mb-6 text-text-dark">管理员登录</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password-admin" className="sr-only">Password</label>
              <input
                id="password-admin"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入管理员密码"
                className="w-full px-4 py-3 border border-border-light rounded-lg shadow-sm focus:border-primary focus:ring-primary"
                autoFocus
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors shadow-md active:scale-95">
              登录
            </button>
            <button type="button" onClick={onExit} className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors mt-2">
              返回商店
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-text-dark">管理后台</h1>
                <button onClick={onExit} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    返回商店
                </button>
            </header>

            <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('orders')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        订单管理
                    </button>
                    <button onClick={() => setActiveTab('products')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        商品管理
                    </button>
                </nav>
            </div>

            <div>
                {activeTab === 'orders' && <OrderManagementPanel />}
                {activeTab === 'products' && <ProductManagementPanel />}
            </div>
        </div>
    </div>
  );
};

// --- Orders Panel ---
const OrderManagementPanel = () => {
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const [isLoading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const fetchedOrders = await fetchAllOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            const message = error instanceof Error ? error.message : "未知错误";
            addToast(`加载订单失败: ${message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        // ... (export logic remains the same)
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                 <button onClick={handleExport} disabled={isLoading || orders.length === 0} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2">
                    <i className="fas fa-file-excel"></i>
                    导出 Excel
                </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-20"><SpinnerIcon className="w-12 h-12 text-primary" /></div>
                    ) : orders.length === 0 ? (
                        <p className="text-center p-20 text-text-light">没有找到订单。</p>
                    ) : (
                        <table className="w-full text-sm text-left text-gray-500">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3">订单号</th>
                                <th scope="col" className="px-4 py-3">客户</th>
                                <th scope="col" className="px-4 py-3">订单详情</th>
                                <th scope="col" className="px-4 py-3">总额</th>
                                <th scope="col" className="px-4 py-3">状态</th>
                                <th scope="col" className="px-4 py-3">时间</th>
                                <th scope="col" className="px-4 py-3">凭证</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.order_id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-4 py-4 font-mono text-xs text-gray-900">{order.order_id}</td>
                                    <td className="px-4 py-4">
                                      <div className="font-semibold">{order.name}</div>
                                      <div className="text-xs text-gray-500 font-mono">{order.phone}</div>
                                    </td>
                                    <td className="px-4 py-4 max-w-xs text-xs">
                                      {(order.order_items || []).map(item => `${item.emoji}${item.name} x ${item.quantity}`).join('; ')}
                                    </td>
                                    <td className="px-4 py-4 font-bold text-primary">RM{order.total_amount.toFixed(2)}</td>
                                    <td className="px-4 py-4">
                                      <span className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">{order.status || 'pending'}</span>
                                    </td>
                                    <td className="px-4 py-4 text-xs">{new Date(order.created_at).toLocaleString('en-CA')}</td>
                                    <td className="px-4 py-4">
                                      <a href={order.payment_proof_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">查看</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Products Panel ---
const ProductManagementPanel = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useToast();
    const [isModalOpen, setModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    
    const refreshProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAdminProducts();
            setProducts(data);
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Failed to load products';
            setError(message);
            addToast(message, 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        refreshProducts();
    }, [refreshProducts]);


    const handleAddProduct = () => {
        setProductToEdit(null);
        setModalOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setProductToEdit(product);
        setModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
        setProductToEdit(null);
    }
    
    const handleSaveSuccess = () => {
        handleCloseModal();
        refreshProducts();
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={handleAddProduct} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                    <i className="fas fa-plus"></i>
                    添加商品
                </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-20"><SpinnerIcon className="w-12 h-12 text-primary" /></div>
                    ) : error ? (
                         <p className="text-center p-20 text-danger">{error}</p>
                    ) : (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">商品</th>
                                    <th className="px-4 py-3">分类</th>
                                    <th className="px-4 py-3">价格</th>
                                    <th className="px-4 py-3">库存</th>
                                    <th className="px-4 py-3">状态</th>
                                    <th className="px-4 py-3">类型</th>
                                    <th className="px-4 py-3">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-4 py-4">{p.id}</td>
                                        <td className="px-4 py-4 font-semibold flex items-center gap-3">
                                            <img src={getProductImageUrl(p.image)} alt={p.name} className="w-12 h-12 rounded-md object-cover bg-gray-100"/>
                                            <span>{p.emoji} {p.name}</span>
                                        </td>
                                        <td className="px-4 py-4">{p.category}</td>
                                        <td className="px-4 py-4">RM{p.price.toFixed(2)}</td>
                                        <td className="px-4 py-4">{p.is_unlimited ? 'N/A' : p.stock}</td>
                                        <td className="px-4 py-4">
                                            {p.is_published ? (
                                                <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">上架</span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">下架</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                             {p.is_unlimited ? (
                                                <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">预购</span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">限购</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            <button onClick={() => handleEditProduct(p)} className="font-medium text-blue-600 hover:underline">编辑</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <ProductEditModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSaveSuccess={handleSaveSuccess}
                    product={productToEdit}
                />
            )}
        </div>
    );
};


export default AdminPage;