import { useEffect, useState } from "react";
import {getWeek } from "../helpers/helpers";
import BarraDias from "../components/BarraDias";
export default function Index() {

    const [date, setDate] = useState(new Date());
    const [dates, setDates] = useState(getWeek(date));

    

    return (
        <div className="page">
            <div className="p-1">
                <h2 className="fecha">{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</h2>
                <h1>Bienvenido a SGI Components</h1>
            </div>
            <BarraDias dates={dates} date={date} />
            <ul className="texto inicial">
                <p>Inicio de sesión : {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}.</p>             
            </ul>
        </div>
    );
}