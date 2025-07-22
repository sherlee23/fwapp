import React from 'react';
import { useToast } from '../hooks/useToast';
import { OrderDataForConfirmation } from '../types';
import { buildWhatsAppMessage } from '../utils/helpers';
import { WHATSAPP_NUMBER } from '../constants';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDataForConfirmation;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose, order }) => {
  const { addToast } = useToast();
  if (!isOpen) return null;

  const whatsappMsg = buildWhatsAppMessage(order);
  // Use api.whatsapp.com for better compatibility
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(whatsappMsg)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMsg);
    addToast('已复制到剪贴板!', 'success');
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md text-center p-8">
        <div className="text-6xl text-success mb-4"><i className="fas fa-check-circle"></i></div>
        <h2 className="text-2xl font-bold text-success mb-2">订单提交成功!</h2>
        <p className="text-text-light mb-4">请点击下方按钮，通过WhatsApp发送订单详情以完成流程。</p>
        
        <div className="bg-bg-light p-4 rounded-md">
            <p className="text-text-dark">您的订单号是:</p>
            <p className="text-xl font-bold text-primary my-2">{order.orderId}</p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
           <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
              <i className="fab fa-whatsapp"></i>
              前往WhatsApp发送
           </a>
           <button onClick={handleCopy} className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
             <i className="fa fa-copy"></i>
             复制订单信息
           </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          关闭
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;