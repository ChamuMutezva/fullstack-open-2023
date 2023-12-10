import StatisticLine from "./statisticLine";

// eslint-disable-next-line react/prop-types
function Statistics({ good, neutral, bad, total, average }) {
    const positiveFeedback = () => (total === 0 ? 0 : (good / total) * 100);

    return (
        <div className="shadow-lg w-full max-w-md p-10 bg-slate-100">
            <h3 className="text-lg font-bold">Statistics</h3>
            {total === 0 ? (
                <p>No feedback given</p>
            ) : (
                <table className="w-full table-auto border-separate border border-slate-400">
                    <tbody>
                        <StatisticLine label="Good" text={good} />
                        <StatisticLine label="Neutral" text={neutral} />
                        <StatisticLine label="Bad" text={bad} />
                        <StatisticLine label="All" text={total} />
                        <StatisticLine label="Average" text={average} />
                        <StatisticLine
                            label="positive"
                            text={`${positiveFeedback()} %`}
                        />
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Statistics;
