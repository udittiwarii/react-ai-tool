import Answers from './Answers';

const Chat = ({ results, loader, lastQuestionRef }) => {
  return (
    <div className="w-full flex-1 overflow-y-auto px-4 md:px-0 pt-6 custom-scrollbar relative">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          <h1 className="text-3xl mt-8 sm:mt-0 md:text-4xl font-bold text-gray-800 dark:text-white tracking-wide">
            🔮 AI Chat – Ask Anything, Anytime!
          </h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative mx-auto w-full md:w-[840px] h-[540px] p-4 overflow-y-auto custom-scrollbar">

        {/* Rotating Loader (absolute position, over ul) */}
        {loader && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-purple-600 animate-spin fill-purple-600"
              viewBox="0 0 100 101"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 
                  100.591C22.3858 100.591 0 78.2051 0 
                  50.5908C0 22.9766 22.3858 0.59082 50 
                  0.59082C77.6142 0.59082 100 22.9766 
                  100 50.5908ZM9.08157 50.5908C9.08157 
                  73.1865 27.4043 91.5092 50 91.5092C72.5957 
                  91.5092 90.9184 73.1865 90.9184 50.5908C90.9184 
                  27.9951 72.5957 9.67236 50 9.67236C27.4043 
                  9.67236 9.08157 27.9951 9.08157 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 
                  97.8624 35.9116 97.0079 33.5538C95.2932 
                  28.8227 92.871 24.3692 89.8167 
                  20.348C85.8452 15.1192 80.8826 
                  10.7231 75.2124 7.41289C69.5422 
                  4.10268 63.2754 1.94025 56.7698 
                  1.05124C51.7666 0.367541 46.6976 
                  0.446843 41.7345 1.27873C39.2611 
                  1.69328 37.813 4.19778 38.4501 
                  6.62326C39.0873 9.04874 41.5694 
                  10.4717 44.0505 10.1071C47.8511 
                  9.54855 51.7191 9.52689 55.5402 
                  10.0491C60.864 10.7766 65.9928 
                  12.5457 70.6331 15.2552C75.2735 
                  17.9648 79.3347 21.5619 82.5849 
                  25.841C84.9175 28.9121 86.7996 
                  32.2913 88.1811 35.8758C89.083 
                  38.2158 91.5421 39.6781 93.9676 
                  39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}

        {/* Chat Messages */}
        <ul className="space-y-4 relative z-0">
          {results.map((item, index) => (
            <div
              key={`msg-${index}`}
              className={item.type === 'q' ? 'flex justify-end' : 'flex justify-start flex-col'}
            >
              {item.type === 'q' ? (
                <li
                  ref={index === results.length - 2 ? lastQuestionRef : null}
                  className="bg-sky-200 dark:bg-violet-700 text-zinc-800 dark:text-white px-4 py-3 rounded-bl-3xl rounded-tl-3xl rounded-br-3xl shadow-md max-w-[70%]"
                >
                  <Answers ans={item.text} index={index} totalresult={results.length} />
                </li>
              ) : (
                item.text.map((text, subIndex) => (
                  <li
                    key={`a-${index}-${subIndex}`}
                    className=" text-black dark:text-white px-4 py-3 max-w-[70%]"
                  >
                    <Answers ans={text} index={subIndex} totalresult={item.text.length} />
                  </li>
                ))
              )}
            </div>
          ))}

          {/* Typing Dot Loader inside chat */}
          {loader && (
            <li className="bg-sky-200 dark:bg-zinc-700 px-4 py-3 rounded-lg shadow-md max-w-[70%] ml-0">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-sky-50 dark:bg-zinc-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-sky-50 dark:bg-zinc-400 rounded-full animate-bounce delay-150" />
                <div className="w-2 h-2 bg-sky-50 dark:bg-zinc-400 rounded-full animate-bounce delay-300" />
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
