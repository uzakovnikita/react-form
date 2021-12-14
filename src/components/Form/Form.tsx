import { Field, Formic, ErrorMessage } from '../formic';

import './Form.styles.scss';

const MyInput = ({name}: {name: string}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {name}
            <Field name={name} type='text'/>
            <ErrorMessage name={name} />
        </div>
    );
};

const MyForm = () => {
    return (
        <>
            <Formic
                onSubmit={(e: any) => {
                    e.preventDefault();
                    console.log('seeend')
                }}
                config={{
                    name: {
                        validates: [
                            {
                                nameOfRule: 'REQUIRED',
                            },
                            {
                                nameOfRule: 'RUSSIANS_LETTERS_ONLY',
                            },
                            {
                                nameOfRule: 'MAX_LENGTH',
                                customValue: 50,
                                message: 'Не больше 50 символов',
                            },
                            {
                                nameOfRule: 'HYPHEN_POSSIBLE_ONLY'
                            }
                        ],
                        normalize: 'name',
                    },
                    email: {
                        validates: [
                            {
                                nameOfRule: 'REQUIRED',
                                message: 'Поле обязательно для заполнения',
                            },
                            {
                                nameOfRule: 'IS_EMAIL',
                                message: 'Email должен быть валиден',
                            },
                            {
                                nameOfRule: 'ENGLIS_LETTERS_ONLY',
                            },
                            {
                                rule: () => /^.{0,30}$/g,
                                priority: 1,
                                message: 'Максимально 30 символов',
                            },
                        ],
                        normalize: 'email',
                    },
                    phone: {
                        validates: [
                            {
                                nameOfRule: 'REQUIRED',
                            },
                            {
                                nameOfRule: 'NUMBERS_ONLY',
                            },
                            {
                                nameOfRule: 'CODE_OF_OPERATOR',
                            },
                        ],
                        normalize: 'phone',
                    },
                    date: {
                        validates: [
                            {
                                nameOfRule: 'REQUIRED',
                                message: 'Дата обязательна для заполнения',
                            },
                            {
                                nameOfRule: 'MIN_DATE',
                                customValue: '01.01.2010',
                            },
                            {
                                nameOfRule: 'MAX_DATE_IS_TODAY',
                            },
                            {
                                nameOfRule: 'TRUE_DATE',
                            },
                        ],
                        normalize: 'date',
                    },
                }}
                triggers={{
                    onChange: false,
                    onSubmit: true,
                }}
                fieldErrorStyles={{
                    border: '1px solid red'
                }}
                formAttributes={{
                }}
            >
                {(trigger: () => void, disabled: boolean) => (
                    <>
                        <MyInput name="name"></MyInput>
                        <MyInput name="email"></MyInput>
                        <MyInput name="phone"></MyInput>
                        <MyInput name="date"></MyInput>

                        <button className="form__btn" onClick={trigger} style={{height: '20px', width: '50px'}}></button>
                    </>
                )}
            </Formic>
        </>
    );
};

export default MyForm;
