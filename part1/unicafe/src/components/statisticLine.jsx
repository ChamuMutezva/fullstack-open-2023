// eslint-disable-next-line react/prop-types
function StatisticLine({ text, label }) {
    return (
        <tr>
            <td className="border border-slate-300 text-xl">{label}</td>
            <td className="border border-slate-300 text-xl">{text} </td>
        </tr>
    );
}

export default StatisticLine;
