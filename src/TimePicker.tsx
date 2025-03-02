import React, {useState} from 'react';

interface TimePickerProps {
    backgroundColor?: string;
    textColor?: string;
    timeFormat?: '12h' | '24h';
    onTimeChange?: (time: string) => void ;
    
};

const TimePicker: React.FC<TimePickerProps> = ({
    backgroundColor='#ffffff',
    textColor= '#000000',
    timeFormat= '24h',
    onTimeChange,
}) => {
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
    const hours = timeFormat === '12h' ? Array.from({length: 12}, (_, i) => i + 1) : Array.from({length: 24}, (_, i) => i);
    const minutes = Array.from({length: 60}, (_, i) => i);

    const handleTimeChange = (hour: number, minute: number) => {
        setSelectedHour(hour);
        setSelectedMinute(minute);
        const formattedTime = `${hour.toString().padStart(2, '0')}: ${minute.toString().padStart(2, '0')}`;
        if (onTimeChange) onTimeChange(formattedTime);
    };

    return(
        <div className='p-4 rounded-lg shadow-lg' style={{backgroundColor}}>
            <div className='flex justify-center space-x-4'>
                <select
                    className='p-2 border rounded-lg'
                    style={{color: textColor}}
                    onChange={(e) => handleTimeChange(parseInt(e.target.value), selectedMinute ?? 0)}
                    >
                        <option value=''> hour </option>
                        {hours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>
                    <select
                        className='p-2 border rounded-lg'
                        style={{color: textColor}}
                        onChange = {(e) => handleTimeChange(parseInt(e.target.value), selectedHour ?? 0)}
                        >
                            <option value=''> minute </option>
                            {minutes.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </select>
            </div>
        </div>
    )
}

export default TimePicker ;