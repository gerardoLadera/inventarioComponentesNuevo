export default function Day({children, active,date,handleDateClick}) {
    return (
        <div className={`day ${!active || active===null ? '' : 'active'}`} onClick={()=>handleDateClick(new Date(date))} >
            <p>
                {children}
            </p>
        </div>
    );
}