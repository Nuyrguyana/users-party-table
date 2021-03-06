import React, { useEffect, useState } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { validator } from '../../../utils/validator';
import api from '../../../../api';
import { useHistory, useParams } from 'react-router-dom';

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [data, setData] = useState();
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
        if (target.name === 'profession') {
            console.log('prof', professions);
            const profKeys = Object.keys(professions);
            const profIndex = profKeys.findIndex((profKey) => professions[profKey]._id === target.value);
            setData((prevState) => {
                prevState.profession = professions[profKeys[profIndex]];
                return prevState;
            });
        } else if (target.name === 'qualities') {
            const qualKeys = Object.keys(qualities);
            const targetValues = target.value;
            const updatedQualitiesList = [];
            targetValues.forEach((val) => {
                const qualIndex = qualKeys.findIndex((qualKeys) => qualities[qualKeys]._id === val.value);
                updatedQualitiesList.push(qualities[qualKeys[qualIndex]]);
            });
            setData((prevState) => {
                prevState.qualities = updatedQualitiesList;
                return prevState;
            });
            console.log('data', data);
        } else {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };

    const validatorConfig = {
        email: {
            isRequired: { message: '?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????' },
            isEmail: {
                message: 'Email ???????????? ???? ??????????????????'
            }
        },
        profession: {
            isRequired: {
                message: '?????????????????????? ???????????????? ??????????????????'
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

    const handleClick = () => {
        api.users
            .update(userId, data)
            .then((data) => console.log(data));
        history.push(`/users/${userId}`);
    };
    if (data) {
        return <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 shadow p-4'>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="??????"
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
                            label='???????????????? ???????? ??????????????????'
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
                            label='???????????????? ?????? ??????'
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            name='qualities'
                            label='???????????????? ???????? ????????????????'
                            defaultValue={data.qualities}
                        />
                        <button
                            onClick={handleClick}
                            type='submit'
                            disabled={!isValid}
                            className='btn btn-primary w-100 mx-auto'
                        >
                            ????????????????
                        </button>
                    </form>
                </div>
            </div>
        </div>;
    } else {
        return 'Loading...';
    }
};

export default EditUserPage;
