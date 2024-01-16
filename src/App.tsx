import { useState } from "react";
import SelectedBadge from "./components/SelectedBadge";
import Suggestions from "./components/Suggestions";
import { DATA, User } from "./data";

function App() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(User & { delete?: boolean })[]>([]);

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      if (selected.find((item) => item.delete)) {
        setSelected((prev) => prev.slice(0, -1));
      } else {
        setSelected((prev) =>
          prev.map((item, index) =>
            index === selected.length - 1 ? { ...item, delete: true } : item
          )
        );
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setSelected((prev) =>
      prev.map((item) => (item.delete ? { ...item, delete: false } : item))
    );
  };

  const filteredData = DATA.filter(
    (item) =>
      item.name.includes(search) &&
      !selected.find((x) => x.email === item.email)
  );
  return (
    <div className="container mx-auto">
      <h1 className="text-blue-600 text-5xl font-bold text-center py-12">
        Pick Users
      </h1>
      <div className="w-full border-b-[3px] border-b-blue-600 py-2 flex gap-4 flex-wrap">
        {selected.map((item) => (
          <SelectedBadge
            user={item}
            onDelete={(email) =>
              setSelected((prev) => prev.filter((x) => x.email !== email))
            }
          />
        ))}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Add new user..."
            value={search}
            onKeyUp={handleBackspace}
            onChange={handleInputChange}
            className="py-2 outline-none w-full min-w-96"
          />
          <Suggestions
            data={filteredData}
            onSelect={(user) =>
              setSelected((prev) => [
                ...prev.map((item) =>
                  item.delete ? { ...item, delete: false } : item
                ),
                user,
              ])
            }
          />
        </div>
      </div>
    </div>
  );
}
export default App;
