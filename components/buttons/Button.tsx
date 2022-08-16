export interface IButton {
  title: string;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({ title, onClick, secondary, disabled, type = 'button' }: IButton) {
  const buttonClasses = secondary
    ? `border-purple-400 bg-white text-purple-400 
      disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed
      hover:text-purple-500 hover:border-purple-500 hover:cursor-pointer`
    : `text-white border-purple-400 bg-purple-400
      disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed
      hover:bg-purple-500 hover:cursor-pointer`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border px-4 py-1 text-center rounded-xl duration-300 transition-all ${buttonClasses}`}
    >
      {title}
    </button>
  );
}
