import { useEffect, useState } from "react";
import { checkHeading, Replacetostarh } from "./Healper";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Answers = ({ ans, index, totalresult }) => {
    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans || "");
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (typeof ans !== "string") {
            setHeading(false);
            setAnswer(ans || "");
            return;
        }

        if (checkHeading(ans)) {
            setHeading(true);
            setAnswer(Replacetostarh(ans));
            return;
        }

        const inlineTickOnly = ans.includes("`") && !ans.includes("```");
        const likelyCode = ans.match(
            /(for\s*\(|while\s*\(|function\s+|=>|console\.log|let\s|const\s|var\s)/
        );

        if ((inlineTickOnly || likelyCode) && !ans.includes("```")) {
            setHeading(false);
            setAnswer(`\`\`\`javascript\n${ans.replace(/`/g, "")}\n\`\`\``);
        } else {
            setHeading(false);
            setAnswer(ans);
        }
    }, [ans]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mediaQuery.matches);
        const handler = (e) => setIsDark(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const render = {
        code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
                <SyntaxHighlighter
                    {...props}
                    language={match[1]}
                    style={isDark ? dark : prism}
                    PreTag="div"
                    customStyle={{
                        borderRadius: "8px",
                        padding: "1rem",
                        fontSize: "0.9rem",
                        overflowX: "auto"
                    }}
                >
                    {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
            ) : (
                <code {...props} className={`${className} px-1 py-0.5 bg-gray-200 dark:bg-zinc-700 rounded`}>
                    {children}
                </code>
            );
        },
    };

    return (
        <>
            {index === 0 && totalresult > 1 ? (
                <span className="text-lg sm:text-xl dark:text-zinc-300 text-zinc-800 font-serif tracking-wide leading-snug block">
                    {answer}
                    <hr className="border-zinc-500 mt-2" />
                </span>
            ) : heading ? (
                <span className="text-base sm:text-lg font-bold tracking-wide italic pt-6 block font-serif dark:text-zinc-200 text-zinc-800">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={render}>
                        {answer}
                    </ReactMarkdown>
                </span>
            ) : (
                <span className="text-sm sm:text-base pl-4 dark:text-white text-zinc-800 font-sans leading-relaxed tracking-normal block">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={render}>
                        {answer}
                    </ReactMarkdown>
                </span>
            )}
        </>
    );
};

export default Answers;
