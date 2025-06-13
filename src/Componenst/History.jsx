import { useState } from "react";

const History = ({ history, sethistory, setselectedhistoryli, setdarkMode }) => {
  const [showSettings, setShowSettings] = useState(false);

  const fulldete = () => {
    localStorage.clear("his");
    sethistory([]);
  };

  const handleDelete = (indexToDelete) => {
    const updatedHistory = history.filter((_, i) => i !== indexToDelete);
    localStorage.setItem("his", JSON.stringify(updatedHistory));
    sethistory(updatedHistory);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-sky-300 dark:border-zinc-700 bg-sky-100 dark:bg-zinc-900">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Questions History</h2>
        <button
          onClick={fulldete}
          className="text-red-500 hover:text-red-600 transition-transform active:scale-105"
          title="Clear All"
        >
          <i className="ri-delete-bin-6-fill text-lg"></i>
        </button>
      </div>

      {/* History List */}
      <ul className="overflow-y-auto flex-1 px-3 py-2 space-y-2 custom-scrollbar h-[calc(100vh-120px)]">
        {history.map((item, index) => (
          <li
            onClick={() => setselectedhistoryli(item)}
            key={index}
            className="flex items-center justify-between text-sm bg-sky-200 dark:bg-zinc-700 hover:bg-sky-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-white rounded-lg px-3 py-2 cursor-pointer truncate transition-all duration-150"
          >
            <span className="truncate w-[85%]">{item}</span>
            {item.length > 0 && (
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                className="ri-close-line text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-transform active:scale-110"
              ></i>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <footer className="relative p-4 border-t border-sky-300 dark:border-zinc-700 bg-sky-100 dark:bg-zinc-900">
        {/* Theme selector above the settings button */}
        {showSettings && (
          <div className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-6 bg-white dark:bg-zinc-800 border border-purple-600 rounded-md p-3 shadow-lg animate-fade-in-up z-10">
            <label className="block text-sm mb-2 text-zinc-800 dark:text-white">Select Theme</label>
            <select
              onChange={(e) => setdarkMode(e.target.value)}
              className="w-full border border-purple-500 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        )}

        {/* Settings Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-sm text-zinc-800 dark:text-white bg-sky-200 dark:bg-zinc-800 px-4 py-2 rounded-md hover:bg-sky-300 dark:hover:bg-zinc-700 transition-all"
          >
            <i className="ri-settings-3-line text-lg"></i>
            Settings
          </button>
        </div>
      </footer>
    </div>
  );
};

export default History;
