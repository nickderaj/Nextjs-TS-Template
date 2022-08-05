import Modal from '@/components/elements/modals/Modal';
import Button from '../buttons/Button';
import Spinner from '../spinner/Spinner';

export interface IDevModalBody {
  isSubmitting: boolean;
  handleSeed: () => void;
  handleDeleteAll: () => void;
}

// JSX for the Dev Tools - not to be used in production
export default function DevModalBody({ isSubmitting, handleSeed, handleDeleteAll }: IDevModalBody) {
  return (
    <Modal>
      <div className="bg-neutral-50 z-50 rounded-md flex flex-col min-w-[330px] w-min h-min relative">
        {isSubmitting && (
          // Block any interaction with a loading spinner
          <div className="w-full h-full absolute rounded-md flex justify-center items-center backdrop-blur-[1.5px]">
            <Spinner />
          </div>
        )}
        <h4 className="text-base border-b py-3 px-6 mb-4">Dev Tools</h4>
        <div className="px-6 pb-4 flex flex-col">
          <div className="flex justify-between mb-3">
            <p>Seed Data</p>
            <Button type="button" variant="primary" title="SEED" onClick={handleSeed} />
          </div>
          <div className="flex justify-between mb-3">
            <p>Delete All</p>
            <Button type="button" variant="secondary" title="DELETE" onClick={handleDeleteAll} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
