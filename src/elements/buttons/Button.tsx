export interface IButton {
  title: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

// Reusable styled button with a primary and secondary variant, could add others like 'error' and 'warning' if needed
export default function Button({ title, onClick, variant = 'primary', type = 'button', disabled = false, className }: IButton) {
  const buttonClasses = () => {
    const commonClasses = 'border hover:shadow-md px-4 py-1 text-center text-sm rounded-full duration-300 transition-all';

    switch (variant) {
      case 'primary':
        return `bg-indigo-500 text-white hover:brightness-125 border-indigo-500 disabled:bg-neutral-500 disabled:border-neutral-500 ${commonClasses} ${className}`;
      case 'secondary':
        return `border-indigo-500 text-indigo-500 disabled:border-neutral-500 disabled:text-neutral-500  ${commonClasses} ${className}`;
    }
  };

  return (
    <button disabled={disabled} type={type} onClick={onClick} className={buttonClasses()}>
      {title}
    </button>
  );
}
