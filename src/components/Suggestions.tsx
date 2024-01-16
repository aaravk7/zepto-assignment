import { User } from "../data";

interface SuggestionsProps {
  data: User[];
  onSelect: (user: User) => void;
}

function Suggestions({ data, onSelect }: SuggestionsProps) {
  return (
    <div className="absolute flex flex-col top-[70px] bg-white shadow-[0px_12px_18px_rgba(0,0,0,0.4)] rounded max-h-64 overflow-auto cursor-pointer">
      {data.map((user) => (
        <button
          key={user.email}
          className="grid grid-cols-2 gap-2 items-center hover:bg-slate-200 p-4 rounded"
          onClick={() => onSelect(user)}
        >
          <div className="flex gap-2 items-center">
            <img
              className="h-8 w-8 rounded-full"
              src={user.image}
              alt="User Avatar"
            />
            <h2 className="whitespace-nowrap font-bold">{user.name}</h2>
          </div>
          <span className="text-left">{user.email}</span>
        </button>
      ))}
    </div>
  );
}
export default Suggestions;
