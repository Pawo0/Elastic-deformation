import React from 'react';

const Spinner = ({ value, setValue }) => {
    return (
        <div>
            <label>
                Liczba elementów skończonych:
                <input
                    type="number"
                    min="2"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                />
            </label>
        </div>
    );
};

export default Spinner;
