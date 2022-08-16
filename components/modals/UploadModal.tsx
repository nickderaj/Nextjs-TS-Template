import { useUpload } from '@/hooks/useUpload';
import { setFilename } from '@/redux/slices/fileSlice';
import { setLoading, setUploadModalOpen } from '@/redux/slices/modalSlice';
import { RootState } from '@/redux/store';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../buttons/Button';
import Modal from './Modal';

export default function UploadModal() {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { uploadSuccess, setUploadSuccess, uploadForm, progress } = useUpload('/api/v1/upload');
  const { uploadModalOpen, loading } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setErrorMessage('');
    setUploadedFile(undefined);
    setUploadSuccess(false);
    dispatch(setUploadModalOpen(false));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    if (files.length > 1) return setErrorMessage('Only one file allowed');
    if (!files[0].name.endsWith('.csv')) return setErrorMessage('Only .csv files allowed');
    setUploadedFile(files[0]);
    setErrorMessage('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!uploadedFile) return setErrorMessage('No file uploaded');
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append('file', uploadedFile);
    const res = await uploadForm(formData);

    setErrorMessage('');
    dispatch(setLoading(false));
    dispatch(setFilename(res.data.filename));
    dispatch(setUploadModalOpen(false));
  };

  return (
    <>
      {uploadModalOpen && (
        <Modal>
          <div className="bg-neutral-50 z-50 rounded-md p-12 flex flex-col px-16 duration-300 transition-all justify-center items-center  relative">
            <h4 className="text-lg text-center pb-2 px-12">Read CSV</h4>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <input id="uploadFile" type="file" onChange={handleFileUpload} className="hidden" />
              {!uploadedFile && (
                <label
                  htmlFor="uploadFile"
                  className="py-1 bg-purple-400 hover:bg-purple-500 transition-all duration-300 text-white w-full rounded-xl text-center cursor-pointer"
                >
                  Upload File
                </label>
              )}
              {uploadedFile && (
                <div
                  className={`my-1 border text-purple-400 ${
                    uploadSuccess ? 'border-pink-400' : 'border-purple-400'
                  } w-full rounded-xl`}
                >
                  {!uploadSuccess && (
                    <div className="py-1 text-black rounded-lg dark:bg-purple-400 text-center" style={{ width: `${progress}%` }}>
                      {progress > 0 ? (progress == 100 ? 'Processing...' : 'Uploading...') : 'Ready'}
                    </div>
                  )}
                  {uploadSuccess && <div className="py-1 bg-pink-400 rounded-lg text-center text-white w-full">Uploaded!</div>}
                </div>
              )}

              <div className="flex gap-2 mt-4 justify-center items-center">
                {!uploadSuccess && (
                  <>
                    <Button disabled={loading} onClick={handleCloseModal} secondary title="Cancel" />
                    <Button disabled={loading || !uploadedFile} type="submit" title="Submit" />
                  </>
                )}
                {uploadSuccess && (
                  <Button disabled={loading} onClick={() => dispatch(setUploadModalOpen(false))} title="Continue" />
                )}
              </div>
              <div className="absolute bottom-2 text-rose-600">{errorMessage}</div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
