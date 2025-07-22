import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';
import { useCart } from '../contexts/CartContext';
import { OrderDataForConfirmation } from '../types';
import { submitOrder } from '../services/supabaseService';
import { SELF_PICKUP_ADDRESS } from '../constants';
import { SpinnerIcon } from './icons';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    order: OrderDataForConfirmation;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, order }) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const { addToast } = useToast();
    const { clearCart } = useCart();
    
    if (!isOpen) return null;

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            await submitOrder(order);
            clearCart();
            onConfirm();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "发生未知错误";
            addToast(`订单提交失败: ${errorMessage}`, 'error');
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <header className="p-5 border-b">
                    <h2 className="text-xl font-bold text-text-dark flex items-center gap-2"><i className="fas fa-clipboard-check"></i> 订单确认</h2>
                </header>
                <div className="p-6 overflow-y-auto space-y-4 text-sm">
                    <p><strong>订单号:</strong> {order.orderId}</p>
                    <p><strong>姓名:</strong> {order.name}</p>
                    <p><strong>电话:</strong> {order.phone}</p>
                    <p><strong>配送:</strong> {order.delivery === 'self-pickup' ? '自取' : 'Lalamove'}</p>
                    <p><strong>付款方式:</strong> {order.paymentMethod}</p>
                    {order.delivery === 'self-pickup' && <p><strong>自取地址:</strong> {SELF_PICKUP_ADDRESS}</p>}
                    <hr/>
                    <h4 className="font-bold">订单明细:</h4>
                    <ul className="list-disc list-inside bg-gray-50 p-3 rounded-md">
                        {order.items.map(i => <li key={i.id}>{i.emoji} {i.name} × {i.quantity} = RM{i.subtotal.toFixed(2)}</li>)}
                    </ul>
                    <p className="font-bold text-lg text-right">总金额: <span className="text-primary">RM{order.total.toFixed(2)}</span></p>
                </div>
                <footer className="p-5 border-t flex justify-end gap-3">
                    <button onClick={onClose} disabled={isSubmitting} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                        取消
                    </button>
                    <button onClick={handleConfirm} disabled={isSubmitting} className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors disabled:bg-gray-400 flex items-center gap-2">
                         {isSubmitting ? <SpinnerIcon className="w-5 h-5"/> : <i className="fa fa-paper-plane"></i>}
                         {isSubmitting ? '提交中...' : '确认并提交'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ConfirmationDialog;