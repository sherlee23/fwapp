import React, { useState, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/useToast';
import { generateOrderId } from '../services/supabaseService';
import { OrderDataForConfirmation } from '../types';
import { CloseIcon, SpinnerIcon } from './icons';
import { SELF_PICKUP_ADDRESS, MAYBANK_QR_IMAGE, TNG_QR_IMAGE } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (orderData: OrderDataForConfirmation) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const { cart, totalPrice } = useCart();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    delivery: '',
    paymentMethod: '',
    remarks: '',
  });
  const [agree, setAgree] = useState(false);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!agree) newErrors.agree = '请勾选此项以继续';
    if (!formData.name.trim()) newErrors.name = '请输入姓名';
    const phoneRegex = /^(\+?6?01)[0-46-9]-?[0-9]{7,8}$/;
    if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) newErrors.phone = '请输入有效的马来西亚电话号码';
    if (!formData.delivery) newErrors.delivery = '请选择取货方式';
    if (!formData.paymentMethod) newErrors.paymentMethod = '请选择付款方式';
    if (!paymentProofFile) newErrors.paymentProofFile = '请上传支付凭证';
    if (cart.length === 0) addToast('购物车是空的!', 'warning');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && cart.length > 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if(errors[name]) setErrors(prev => ({...prev, [name]: ''}));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
       if (file.size > 5 * 1024 * 1024) { // 5MB
        addToast('文件大小不能超过5MB', 'error');
        return;
      }
      setPaymentProofFile(file);
      if(errors.paymentProofFile) setErrors(prev => ({...prev, paymentProofFile: ''}));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
        addToast('请检查并填写所有必填项', 'error');
        return;
    }

    setSubmitting(true);
    try {
        const orderId = await generateOrderId();
        const orderData: OrderDataForConfirmation = {
            orderId,
            ...formData,
            items: cart.map(item => ({...item, subtotal: item.price * item.quantity})),
            total: totalPrice,
            paymentProofFile: paymentProofFile!,
        };
        onConfirm(orderData);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '无法生成订单号';
        addToast(`订单准备失败: ${errorMessage}`, 'error');
    } finally {
        setSubmitting(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-5 border-b border-border-light sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-text-dark">填写订单信息</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><CloseIcon className="w-6 h-6" /></button>
        </header>
        <form onSubmit={handleSubmit} className="overflow-y-auto" noValidate>
          <div className="p-6 space-y-6">
            {/* Disclaimer */}
            <div className={`p-4 rounded-lg border ${errors.agree ? 'border-danger' : 'border-yellow-300'} bg-yellow-50`}>
                <h3 className="font-bold text-yellow-800 flex items-center gap-2"><i className="fas fa-exclamation-triangle"></i> 重要声明 / Important Notice</h3>
                <ol className="list-decimal list-inside text-sm text-yellow-700 mt-2 space-y-1">
                    <li>此为预购商品，订单汇总后统一向供应商订购。</li>
                    <li>预计等待时间：30-60天（从下单日起计算）。</li>
                    <li>当前价格<strong>不包含</strong>国际运费，运费将根据实际物流成本后续通知收取。</li>
                </ol>
                <label className="flex items-center mt-3 text-sm">
                    <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); if (errors.agree) setErrors(p => ({...p, agree: ''})) }} className="h-4 w-4 rounded text-primary focus:ring-primary-light" />
                    <span className="ml-2 text-yellow-800">我已阅读并同意上述条款 / I have read and agree</span>
                </label>
                {errors.agree && <p className="text-danger text-xs mt-1">{errors.agree}</p>}
            </div>

            {/* Customer Info */}
             <div className="border p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">姓名 Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary ${errors.name ? 'border-danger' : 'border-gray-300'}`} required />
                    {errors.name && <p className="text-danger text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">电话 Phone *</label>
                    <input type="tel" name="phone" placeholder="e.g. 0123456789" value={formData.phone} onChange={handleInputChange} className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary ${errors.phone ? 'border-danger' : 'border-gray-300'}`} required />
                    {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
             </div>
            
            {/* Delivery */}
             <div className="border p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">取货方式 Delivery Method *</label>
                 <select name="delivery" value={formData.delivery} onChange={handleInputChange} className={`block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary ${errors.delivery ? 'border-danger' : 'border-gray-300'}`}>
                    <option value="">请选择 / Please select</option>
                    <option value="self-pickup">自取 Self pickup</option>
                    <option value="lalamove">Lalamove 送货</option>
                </select>
                {formData.delivery === 'self-pickup' && (
                    <div className="mt-2 text-sm bg-blue-50 text-blue-800 p-3 rounded-md border border-blue-200">
                        <p><strong>自取地址：</strong>{SELF_PICKUP_ADDRESS}</p>
                        <p><strong>取货时间：</strong>另行通知</p>
                    </div>
                )}
                {errors.delivery && <p className="text-danger text-xs mt-1">{errors.delivery}</p>}
             </div>
             
             {/* Payment */}
             <div className="border p-4 rounded-lg space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">付款方式 Payment Method *</label>
                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className={`block w-full rounded-md shadow-sm focus:border-primary focus:ring-primary ${errors.paymentMethod ? 'border-danger' : 'border-gray-300'}`}>
                        <option value="">请选择 / Please select</option>
                        <option value="Maybank QR">Maybank (DuitNow QR)</option>
                        <option value="TNG eWallet">TNG eWallet (DuitNow QR)</option>
                    </select>
                     {errors.paymentMethod && <p className="text-danger text-xs mt-1">{errors.paymentMethod}</p>}
                </div>
                {formData.paymentMethod && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                        {formData.paymentMethod === 'Maybank QR' && (
                            <div>
                                <h4 className="font-semibold text-text-dark">Maybank QR 付款</h4>
                                <p className="text-xs">户口: Choong Sher Lee (114209540438)</p>
                                <img src={MAYBANK_QR_IMAGE} alt="Maybank QR Code" className="w-40 h-40 mx-auto mt-2 rounded-md" />
                            </div>
                        )}
                        {formData.paymentMethod === 'TNG eWallet' && (
                            <div>
                                <h4 className="font-semibold text-text-dark">TNG eWallet 付款</h4>
                                <p className="text-xs">请使用 TNG App 扫描下方 DuitNow QR 码</p>
                                <img src={TNG_QR_IMAGE} alt="TNG eWallet DuitNow QR Code" className="w-40 h-40 mx-auto mt-2 rounded-md" />
                            </div>
                        )}
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700">上传转账凭证 Upload Receipt *</label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.paymentProofFile ? 'border-danger' : 'border-gray-300'} border-dashed rounded-md`}>
                        <div className="space-y-1 text-center">
                            <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                            <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                <span>点击上传文件</span>
                                <input id="file-upload" name="paymentProofFile" type="file" ref={fileInputRef} onChange={handleFileChange} className="sr-only" accept="image/*,.pdf" />
                            </label>
                            </div>
                            {paymentProofFile ? <p className="text-xs text-green-600">已选择: {paymentProofFile.name}</p> : <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>}
                        </div>
                    </div>
                    {errors.paymentProofFile && <p className="text-danger text-xs mt-1">{errors.paymentProofFile}</p>}
                </div>
             </div>

             {/* Remarks */}
             <div className="border p-4 rounded-lg">
                 <label className="block text-sm font-medium text-gray-700">备注（如有）Remarks</label>
                <textarea name="remarks" rows={3} value={formData.remarks} onChange={handleInputChange} placeholder="可填写特殊需求、配送说明等..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
             </div>
          </div>
          <footer className="p-5 border-t border-border-light flex justify-between items-center sticky bottom-0 bg-white z-10">
            <div className="font-bold text-lg">
                Total: <span className="text-primary">RM{totalPrice.toFixed(2)}</span>
            </div>
            <button type="submit" disabled={isSubmitting || !agree} className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2">
              {isSubmitting ? <SpinnerIcon className="w-5 h-5"/> : <i className="fa fa-clipboard-check"></i>}
              {isSubmitting ? '处理中...' : '确认订单'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;