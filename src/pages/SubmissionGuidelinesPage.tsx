import React from 'react';

const SubmissionGuidelinesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">
        Submission Guidelines
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Follow these guidelines to ensure your research paper meets our standards and receives proper consideration.
      </p>
      
      <div className="grid gap-8">
        <section className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-primary">Paper Requirements</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Papers must be submitted in PDF format</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Maximum file size: 10MB</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Must include an abstract</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Must include author information and affiliations</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-primary">Formatting Guidelines</h2>
          </div>
          <ul className="space-y-4 ml-4">
            {[
              'Use clear, legible fonts (recommended: Times New Roman, Arial)',
              'Font size: 11-12 points',
              'Include page numbers',
              'Proper citation format (APA, MLA, or Chicago)'
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-primary">Review Process</h2>
          </div>
          <p className="text-gray-600 mb-4">
            All submissions undergo a thorough peer review process. Papers are evaluated based on:
          </p>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Originality and innovation</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Research methodology</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Quality of writing and presentation</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Significance to the field</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SubmissionGuidelinesPage;
