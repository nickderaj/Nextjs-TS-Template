import Button from '@/components/elements/buttons/Button';
import { setLoginModalOpen, setLogoutModalOpen, setSignupModalOpen } from '@/redux/slices/modalSlice';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import AuthModal from '../modals/AuthModal';

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-neutral-50 to-neutral-100 shadow-sm py-2 px-6 sm:px-36">
      <h1 className="flex items-center gap-2 font-semibold text-sm py-2">Auth Example</h1>
      <div className="flex gap-2 sm:gap-3">
        {!user.email && (
          <>
            <Button onClick={() => dispatch(setSignupModalOpen())} variant="secondary" title="Sign Up" />
            <Button onClick={() => dispatch(setLoginModalOpen())} title="Log In" />
          </>
        )}
        {user.email && <Button onClick={() => dispatch(setLogoutModalOpen())} title="Log Out" />}
      </div>
      <AuthModal />
    </div>
  );
}
