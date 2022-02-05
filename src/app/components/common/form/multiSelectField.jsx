import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray = (options) => {
        return Object.keys(options).map((optionName) => ({
            label: options[optionName].name,
            value: options[optionName]._id
        }));
    };

    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className='mb-4'>
            <label className="form-label">
                {label}
            </label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray(options)}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select"
                name={name}
                defaultValue={optionsArray(defaultValue)}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultiSelectField;
