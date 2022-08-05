import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

interface IPageNumber {
  pageNum: number;
  currentPage: number;
  handleGoToPage: MouseEventHandler;
}

function PageNumber({ pageNum, currentPage, handleGoToPage }: IPageNumber) {
  return (
    <button
      key={pageNum}
      id={String(pageNum)}
      className={`border w-8 h-8 text-xs rounded flex justify-center items-center border-emerald-400
        ${currentPage == pageNum ? 'bg-emerald-400 text-white font-bold' : ''}`}
      onClick={handleGoToPage}
    >
      {pageNum}
    </button>
  );
}

interface IPagination {
  numPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination({ numPages, currentPage, setCurrentPage }: IPagination) {
  const handleGoToPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setCurrentPage(+button.id);
  }; // will call external API

  return (
    <div className="flex gap-2 justify-center pt-3">
      {/* If number of pages < 10 */}
      {numPages <= 10 &&
        Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
          <PageNumber key={pageNum} pageNum={pageNum} currentPage={currentPage} handleGoToPage={handleGoToPage} />
        ))}
      {/* If number of pages >= 10 */}
      {numPages > 10 &&
        // current page is 1, 2, 3 or 4
        (currentPage == 1 || currentPage == 2 || currentPage == 3 || currentPage == 4) && (
          <>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((pageNum) => (
              <PageNumber key={pageNum} pageNum={pageNum} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            ))}
            ...
            <PageNumber pageNum={numPages - 2} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            <PageNumber pageNum={numPages - 1} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            <PageNumber pageNum={numPages} currentPage={currentPage} handleGoToPage={handleGoToPage} />
          </>
        )}
      {numPages > 10 &&
        // current page is 5 ... numPages - 3
        currentPage > 4 &&
        currentPage < numPages - 3 && (
          <>
            <PageNumber pageNum={1} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            ...
            <PageNumber pageNum={currentPage - 2} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            <PageNumber pageNum={currentPage - 1} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            <PageNumber pageNum={currentPage} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            <PageNumber pageNum={currentPage + 1} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            <PageNumber pageNum={currentPage + 2} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            ...
            <PageNumber pageNum={numPages} currentPage={currentPage} handleGoToPage={handleGoToPage} />
          </>
        )}
      {numPages > 10 &&
        // current page is one of the last 4
        currentPage >= numPages - 3 && (
          <>
            <PageNumber pageNum={1} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            <PageNumber pageNum={2} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            <PageNumber pageNum={3} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            ...
            {Array.from({ length: 5 }, (_, i) => i + numPages - 4).map((pageNum) => (
              <PageNumber key={pageNum} pageNum={pageNum} currentPage={currentPage} handleGoToPage={handleGoToPage} />
            ))}
          </>
        )}
    </div>
  );
}
