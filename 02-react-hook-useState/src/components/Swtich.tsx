import { FC } from "react";
import './App.css'

interface SwitchProps {
    checked: boolean;
    onChange: (newChecked: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({ checked, onChange }) => {

    const handleClick = () => {
        onChange(!checked);
    }

    return (
        <div className="card">
            <input type="checkbox" className="switch" checked={checked} onChange={handleClick} />
            <p>{checked ? "🉑" : "🚫"}</p>
        </div>
    )
}