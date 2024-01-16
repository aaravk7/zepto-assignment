import { User } from "../data";

interface SelectedBadgeProps {
  user: User & { delete?: boolean };
  onDelete: (email: string) => void;
}

function SelectedBadge({ user, onDelete }: SelectedBadgeProps) {
  return (
    <div
      key={user.email}
      className={`flex items-center gap-4 p-2 bg-slate-200 rounded-full justify-between border ${
        user.delete ? "border-blue-500" : ""
      }`}
    >
      <img
        className="h-6 w-6 rounded-full"
        src={user.image}
        alt="User Avatar"
      />
      <span>{user.name}</span>
      <button
        className="cursor-pointer hover:bg-slate-400 h-6 w-6 rounded-full grid place-content-center transition"
        onClick={() => onDelete(user.email)}
      >
        X
      </button>
    </div>
  );
}
export default SelectedBadge;
