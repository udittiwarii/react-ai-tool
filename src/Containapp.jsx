import { useEffect, useRef, useState } from "react";
import Input from "./Componenst/Input";
import History from "./Componenst/History";
import Chat from "./Componenst/Chat";
import { URL } from "./utiles/constants";

const Containapp = () => {
    const [question, setquestion] = useState('');
    const [results, setresults] = useState([]);
    const [history, sethistory] = useState(JSON.parse(localStorage.getItem('his')) || []);
    const [selectedhistoryli, setselectedhistoryli] = useState('');
    const [loader, setloader] = useState(false);
    const lastQuestionRef = useRef();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok && retries > 0) {
                await new Promise(res => setTimeout(res, delay));
                return fetchWithRetry(url, options, retries - 1, delay * 2);
            }
            return response;
        } catch (err) {
            if (retries > 0) {
                await new Promise(res => setTimeout(res, delay));
                return fetchWithRetry(url, options, retries - 1, delay * 2);
            }
            throw err;
        }
    };

    const submitquestion = async () => {
        if (!question && !selectedhistoryli) return;
        if (question) {
            let savehistory = JSON.parse(localStorage.getItem('his') || '[]');
            savehistory = savehistory.slice(0, 19);

            const formattedQuestion = question.charAt(0).toUpperCase() + question.slice(1).trim();
            let updatedHistory = [formattedQuestion, ...savehistory];
            updatedHistory = [...new Set(updatedHistory)];

            localStorage.setItem('his', JSON.stringify(updatedHistory));
            sethistory(updatedHistory);
            setselectedhistoryli('');
        }

        const payloaddata = question || selectedhistoryli;
        const payload = {
            contents: [{ parts: [{ text: payloaddata }] }]
        };

        setloader(true);

        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!content) {
                console.error("Unexpected response structure:", data);
                setloader(false);
                return;
            }

            const dataStrings = content.split("* ").map((item) => item.trim());

            const newResults = [
                ...results,
                { type: 'q', text: question || selectedhistoryli },
                { type: 'a', text: dataStrings }
            ];

            setresults(newResults);
            setquestion("");

            setTimeout(() => {
                lastQuestionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);

        } catch (error) {
            console.error("Error submitting question:", error);
        }

        setloader(false);
    };

    const [darkMode, setdarkMode] = useState(() => {
        return localStorage.getItem('mode') || 'dark';
    });

    useEffect(() => {
        if (darkMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('mode', darkMode);
    }, [darkMode]);

    return (
        <div className={darkMode === 'dark' ? 'dark' : 'light'}>
            <div className="grid grid-cols-1 md:grid-cols-5 h-screen font-sans relative overflow-hidden">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute top-4 left-4 z-50 p-2 mt-8 dark:bg-zinc-800 dark:text-white bg-sky-100 rounded md:hidden"
                >
                    {sidebarOpen ? <i className="mt-2 ri-close-large-line"></i> :
                        <i className="mt-2 ri-menu-add-line"></i>}
                </button>

                <aside
                    className={`
                        fixed top-0 left-0 z-40 h-full w-64 dark:bg-zinc-800 dark:text-white bg-sky-100 transform transition-transform duration-300
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        md:relative md:translate-x-0 md:w-full overflow-auto
                    `}
                >
                    <History
                        history={history}
                        sethistory={sethistory}
                        setselectedhistoryli={setselectedhistoryli}
                        setdarkMode={setdarkMode}
                        darkMode={darkMode}
                    />
                </aside>

                <main className="col-span-4 flex flex-col items-center w-full h-full">
                    <Chat
                        results={results}
                        loader={loader}
                        lastQuestionRef={lastQuestionRef}
                        submitquestion={submitquestion}
                    />

                    <Input
                        question={question}
                        setquestion={setquestion}
                        results={results}
                        setresults={setresults}
                        lastQuestionRef={lastQuestionRef}
                        selectedhistoryli={selectedhistoryli}
                        sethistory={sethistory}
                        loader={loader}
                        submitquestion={submitquestion}
                        setloader={setloader}
                    />
                </main>
            </div>
        </div>
    );
};

export default Containapp;
