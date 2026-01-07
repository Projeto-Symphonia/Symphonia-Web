import React, { useEffect, useState } from "react";
import "./style.css";

function flatten(options) {
    if (!Array.isArray(options)) return [];
    const out = [];
    options.forEach((opt) => {
        if (opt && Array.isArray(opt.options)) {
            opt.options.forEach((o) => out.push(o));
        } else if (opt && opt.value !== undefined) {
            out.push(opt);
        }
    });
    return out;
}

export default function Select({
    options = [],
    value = null,
    onChange = () => {},
    placeholder = "Selecione...",
    className = "",
    id,
}) {
    const flat = flatten(options);
    const [selected, setSelected] = useState(value ? String(value.value) : "");

    useEffect(() => {
        setSelected(value ? String(value.value) : "");
    }, [value]);

    const handleChange = (e) => {
        const val = e.target.value;
        setSelected(val);
        const found = flat.find((o) => String(o.value) === val) || null;
        onChange(found);
    };

    return (
        <div className={`simple-select ${className}`.trim()}>
            <select id={id} value={selected} onChange={handleChange}>
                    {options.map((optGroup, gi) =>
                        Array.isArray(optGroup.options) ? (
                            <optgroup key={gi} label={optGroup.label}>
                                {optGroup.options.map((o) => (
                                    <option
                                        key={o.value}
                                        value={String(o.value)}
                                    >
                                        {o.label}
                                    </option>
                                ))}
                            </optgroup>
                        ) : (
                            <option
                                key={optGroup.value ?? gi}
                                value={String(optGroup.value)}
                            >
                                {optGroup.label ?? optGroup.value}
                            </option>
                        )
                    )}
            </select>
        </div>
    );
}
