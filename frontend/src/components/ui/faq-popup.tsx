import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface FAQPopupProps {
  faqs: string[];
  onClose: () => void;
  onSelectQuestion: (question: string) => void;
  isLoading: boolean;
}

export const FAQPopup = ({
  faqs,
  onClose,
  onSelectQuestion,
  isLoading,
}: FAQPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Suggested Questions</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Generating questions...</p>
            </div>
          ) : faqs.length > 0 ? (
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => onSelectQuestion(faq)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700 hover:text-gray-900"
                >
                  {faq}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-4">No questions available</p>
          )}
        </div>
      </div>
    </div>
  );
};

