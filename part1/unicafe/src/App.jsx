import { useState } from "react";
import Statistics from "./components/statistics";
import Button from "./components/button";
function App() {
    const [quality, setQuality] = useState({ good: 0, neutral: 0, bad: 0 });
    const [total, setTotal] = useState(0);
    const handleGood = () => {
        const rate = {
            ...quality,
            good: quality.good + 1,
        };
        setQuality(rate);
        setTotal(() => rate.good + quality.neutral + quality.bad);
    };
    const handleNeutral = () => {
        const rate = {
            ...quality,
            neutral: quality.neutral + 1,
        };
        setQuality(rate);
        setTotal(quality.good + rate.neutral + quality.bad);
    };
    const handleBad = () => {
        const rate = {
            ...quality,
            bad: quality.bad + 1,
        };
        setQuality(rate);
        setTotal(quality.good + quality.neutral + rate.bad);
    };
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-8">
            <h1 className="text-3xl font-bold">
                Unicafe customer feedback form
            </h1>
            <h2 className="text-2xl font-bold">Give feedback</h2>
            <div className="flex justify-center items-center gap-4">
                <Button onClick={handleGood} label="Good" />
                <Button onClick={handleNeutral} label="Neutral" />
                <Button onClick={handleBad} label="Bad" />
            </div>

            <Statistics
                good={quality.good}
                neutral={quality.neutral}
                bad={quality.bad}
                total={total}
                average={total === 0 ? 0 : (quality.good - quality.bad) / total}
            />
        </div>
    );
}

export default App;
