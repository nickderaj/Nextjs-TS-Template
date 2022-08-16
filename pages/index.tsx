import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import FileModal from '@/components/modals/FileModal';
import UploadModal from '@/components/modals/UploadModal';
import Table from '@/components/table/Table';

import Filter from '@/components/filter/Filter';
import { IFileData } from '@/redux/slices/fileSlice';
import { setUploadModalOpen } from '@/redux/slices/modalSlice';
import { RootState } from '@/redux/store';
import { PageWithLayout } from '@/types/page';

export default function Home(_: PageWithLayout) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadedData, setLoadedData] = useState<IFileData[]>([]);
  const [numPages, setNumPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const { filename } = useSelector((state: RootState) => state.file);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!filename) return;
    const readCsv = async () => {
      setIsLoading(true);
      const response = await axios.post('/api/v1/data', { file: filename, page, filter });
      setLoadedData(response.data.data);
      setNumPages(response.data.pages);
      setIsLoading(false);
    };
    readCsv();
  }, [filename, page, filter]);

  return (
    <>
      <section className="flex flex-col gap-4 justify-center items-center min-h-screen min-w-screen bg-gradient-to-br from-indigo-100 to-blue-50">
        {isLoading && <Image src="/loader.svg" alt="Loading" height="400" width="400" />}
        {!isLoading && !filename && <Button onClick={() => dispatch(setUploadModalOpen(true))} title="Upload" />}
        {!isLoading && filename && (
          <>
            <Filter filter={filter} setFilter={setFilter} />
            <Table loadedData={loadedData} page={page} setPage={setPage} numPages={numPages} />
          </>
        )}
      </section>
      <UploadModal />
      <FileModal />
    </>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
