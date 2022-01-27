import React, { useEffect, useState } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { validator } from '../../../utils/validator';
import api from '../../../../api';
import { useParams } from 'react-router-dom';

const EditUserPage = () => {
    const { userId } = useParams();
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    });
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();

    useEffect(() => {
        api.professions
            .fetchAll()
            .then((data) => setProfessions(data));
        api.qualities
            .fetchAll()
            .then((data) => setQualities(data));
        api.users
            .getById(userId)
            .then((data) => setData(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: { message: 'Электронная почта обязательна для заполнения' },
            isEmail: {
                message: 'Email введен не корректно'
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите профессию'
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return <div className='container mt-5'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 shadow p-4'>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label='email'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <SelectField
                        label='Выберите вашу профессию'
                        defaultOption='Choose..'
                        options={professions}
                        onChange={handleChange}
                        value={data.profession}
                        error={errors.profession}
                        name='profession'
                    />
                    <RadioField
                        options={[
                            { name: 'Male', value: 'male' },
                            { name: 'Female', value: 'female' },
                            { name: 'Other', value: 'other' }
                        ]}
                        value={data.sex}
                        name='sex'
                        onChange={handleChange}
                        label='Выберите ваш пол'
                    />
                    <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        name='qualities'
                        label='Выберите ваши качества'
                        defaultValue={data.qualities}
                    />
                    <button
                        type='submit'
                        disabled={!isValid}
                        className='btn btn-primary w-100 mx-auto'
                    >
                Обновить
                    </button>
                </form>
            </div>
        </div>
    </div>;
};

export default EditUserPage;
