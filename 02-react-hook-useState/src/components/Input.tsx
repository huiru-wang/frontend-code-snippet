import { ChangeEvent } from "react";
import './App.css'

interface InputProps {
    value: string;
    onChange: (newValue: string) => void;
}

export const Input: React.FC<InputProps> = ({ value, onChange }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="card">
            <input type="text" value={value} onChange={handleChange} />
            <p>{value === "" ? ". . ." : (value || "")}</p>
        </div>
    )
};