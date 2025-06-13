import { useEffect } from 'react';

const Input = ({ question, setquestion, selectedhistoryli, submitquestion }) => {
  useEffect(() => {
    if (selectedhistoryli) {
      submitquestion();
    }
  }, [selectedhistoryli]);

  return (
    <div className="w-[90%] md:w-[800px] mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitquestion();
        }}
        className="flex items-center justify-between p-3 h-14 border border-sky-200 dark:border-zinc-600 rounded-3xl bg-sky-100 dark:bg-zinc-800"
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setquestion(e.target.value)}
          placeholder="Ask anything"
          className="flex-1 bg-transparent outline-none overflow-x-auto overflow-y-auto placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-900 dark:text-white text-xl font-Happy-Monkey mr-4"
        />
        <button
          type="submit"
          className="text-blue-700 dark:text-white dark:hover:text-blue-400 hover:text-blue-500 transition-colors"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default Input;
