import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileUp, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { db } from '../firebaseConfig'; // Import Firebase services
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface UploadFormData {
  title: string;
  abstract: string;
  university: string;
  field: string;
  authors: string;
  keywords: string;
}

const UploadPaperPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UploadFormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      setFileError('Only PDF files are allowed');
      setSelectedFile(null);
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size should not exceed 10MB');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!selectedFile) {
      setFileError('Please select a PDF file to upload');
      return;
    }

    setIsUploading(true);

    try {
      // Upload file to Firebase Storage
      const fileRef = ref(storage, `researchPapers/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(fileRef, selectedFile);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          setIsUploading(false);
          toast.error('Error uploading file: ' + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Save research paper details to Firestore
          await addDoc(collection(db, 'researchPapers'), {
            title: data.title,
            abstract: data.abstract,
            university: data.university,
            field: data.field,
            authors: data.authors.split(',').map(a => a.trim()), // Convert string to array
            keywords: data.keywords.split(',').map(k => k.trim()), // Convert string to array
            pdfUrl: downloadURL,
            uploadedAt: Timestamp.now(),
          });

          setIsUploading(false);
          toast.success('Research paper uploaded successfully!');
        }
      );
    } catch (error) {
      setIsUploading(false);
      console.error('Upload failed:', error);
      toast.error('Failed to upload paper. Try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Upload Research Paper</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Research Paper (PDF only)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF up to 10MB</p>
                {selectedFile && <p className="text-sm text-green-600">Selected: {selectedFile.name}</p>}
                {fileError && <p className="text-sm text-red-600 flex items-center justify-center"><AlertCircle className="h-4 w-4 mr-1" />{fileError}</p>}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Paper Title</label>
            <input id="title" type="text" {...register('title', { required: 'Title is required' })} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
            <textarea id="abstract" rows={4} {...register('abstract', { required: 'Abstract is required' })} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            {errors.abstract && <p className="mt-1 text-sm text-red-600">{errors.abstract.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" disabled={isUploading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isUploading ? 'Uploading...' : 'Submit Paper'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPaperPage;
