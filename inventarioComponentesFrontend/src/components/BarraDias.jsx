import Day from "./Day.jsx";

import { getWeekDay, equalsDates } from "../helpers/helpers.js";

import "../css/barraDias.css"

export default function BarraDias({dates, date ,handleDateClick}) {
    return (
        <div className="barra-dias">
            {dates.map((d) => {
                return <Day key={d.toString()} active={equalsDates(d, date)} date={d} handleDateClick={handleDateClick}>{getWeekDay(d.getDay())}<br/>{d.getDate()}</Day>
            })} 
        </div>
    );
}