import { useState } from 'react'
import './APP.css'

export default function Calendar(props) {
    const [date, setDate] = useState(new Date());

    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    }

    const hanleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    }

    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

    // 处理日期
    const daysofMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    }
    const firstDayofMonth = (year, month) => {
        return new Date(year, month, 1).getDay();   
    }
    const renderDates = () => {
        const days = [];
        const daysCount = daysofMonth(date.getFullYear(), date.getMonth());
        const firstDay = firstDayofMonth(date.getFullYear(), date.getMonth());
        // console.log(firstDay, daysCount, date.getFullYear(), date.getMonth());
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className='empty'></div>);
        }
        
        for (let j = 1; j <= daysCount; j++) {
            const clickhandler = () => {
                const curDate = new Date(date.getFullYear(), date.getMonth(), j);
                setDate(curDate);
                props.onChange?.(curDate);
            }
            if (j === date.getDate()) {
                days.push(<div key={j} className='day selected' onClick={() => clickhandler()}>{j}</div>)
            } else {
                days.push(<div key={j} className='day' onClick={clickhandler}>{j}</div>)
            }
        }
        return days;
    }

    return (
        <div className='calendar'>
            <div className="header">
                <button onClick={handlePrevMonth}>&lt;</button>
                <div>{date.getFullYear()}年{monthNames[date.getMonth()]}</div>
                <button onClick={hanleNextMonth}>&gt;</button>
            </div>
            <div className="days">
                <div className="day">日</div>
                <div className="day">一</div>
                <div className="day">二</div>
                <div className="day">三</div>
                <div className="day">四</div>
                <div className="day">五</div>
                <div className="day">六</div>
                {renderDates()}
            </div>
        </div>
    )
}
