import { useEffect, useState } from "react";
import { DATA, User } from "./data";

function App() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(DATA);
  const [selected, setSelected] = useState<User[]>([]);
  const [toBeDeleted, setToBeDeleted] = useState(false);

  useEffect(() => {
    setToBeDeleted(false);
    setFilteredData(() =>
      DATA.filter(
        (item) =>
          item.name.includes(search) &&
          !selected.find((x) => x.email === item.email)
      )
    );
  }, [selected, search]);

  return (
    <div className="container mx-auto">
      <h1 className="text-blue-600 text-5xl font-bold text-center py-12">
        Pick Users
      </h1>
      <div className="w-full border-b-[3px] border-b-blue-600 py-2 flex gap-4 flex-wrap">
        {selected.map((item, index) => (
          <div
            key={item.email}
            className={`flex items-center gap-4 p-2 bg-slate-200 rounded-full justify-between border ${
              index === selected.length - 1 && toBeDeleted
                ? "border-blue-500"
                : ""
            }`}
          >
            <img
              className="h-6 w-6 rounded-full"
              src={item.image}
              alt="User Avatar"
            />
            <span>{item.name}</span>
            <button
              className="cursor-pointer hover:bg-slate-400 h-6 w-6 rounded-full grid place-content-center transition"
              onClick={() =>
                setSelected((prev) =>
                  prev.filter((x) => x.email !== item.email)
                )
              }
            >
              X
            </button>
          </div>
        ))}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Add new user..."
            value={search}
            onKeyUp={(e) => {
              if (e.key === "Backspace" && e.currentTarget.value === "") {
                if (toBeDeleted) {
                  setSelected((prev) => prev.slice(0, -1));
                } else {
                  setToBeDeleted(true);
                }
              }
            }}
            onChange={(e) => setSearch(e.currentTarget.value)}
            className="py-2 outline-none w-full min-w-96"
          />
          <div className="absolute flex flex-col top-[70px] bg-white shadow-[0px_12px_18px_rgba(0,0,0,0.4)] rounded max-h-64 overflow-auto cursor-pointer">
            {filteredData.map((user) => (
              <button
                key={user.email}
                className="grid grid-cols-2 gap-2 items-center hover:bg-slate-200 p-4 rounded"
                onClick={() => setSelected((prev) => [...prev, user])}
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
        </div>
      </div>
    </div>
  );
}
export default App;
