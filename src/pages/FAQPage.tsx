import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I submit a research paper?",
    answer: "To submit a research paper, navigate to the Upload page and follow the submission guidelines. Make sure your paper meets all the required criteria before submission."
  },
  {
    question: "What file formats are accepted?",
    answer: "We accept papers in PDF format only. The file size should not exceed 20MB."
  },
  {
    question: "How long does the review process take?",
    answer: "The review process typically takes 2-4 weeks. You will be notified via email about the status of your submission."
  },
  {
    question: "Can I update my submitted paper?",
    answer: "Yes, you can update your paper before it is approved. Once approved, you'll need to contact the administrators for any changes."
  },
  {
    question: "What citation formats are supported?",
    answer: "We support all major citation formats including APA, MLA, Chicago, and IEEE. You can specify your preferred citation format during submission."
  },
  {
    question: "Is there a word limit for research papers?",
    answer: "Research papers should typically be between 3,000 and 10,000 words. For papers outside this range, please contact our editorial team for approval."
  },
  {
    question: "Can I submit multiple papers simultaneously?",
    answer: "Yes, you can submit multiple papers simultaneously. Each submission will be reviewed independently and must follow our standard submission guidelines."
  },
  {
    question: "How do I track my submission status?",
    answer: "You can track your submission status by logging into your account and visiting the 'My Submissions' dashboard where all your papers and their current status will be displayed."
  }
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Find answers to common questions about our research paper submission platform
          </p>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  <FiChevronDown
                    className={`transform transition-transform duration-200 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    activeIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 py-4 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
