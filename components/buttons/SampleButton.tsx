export interface IButton {
  title: string;
  onClick: () => void;
}

export default function Button({ title, onClick }: IButton) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 text-center rounded hover:brightness-150 duration-300 transition-all"
    >
      {title}
    </button>
  );
}
