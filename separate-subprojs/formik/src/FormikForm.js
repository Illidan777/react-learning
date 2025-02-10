import {ErrorMessage, Field, Form, Formik, useField} from "formik";
import * as Yup from "yup";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input
                {...props}
                {...field}
            />
            {meta && meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <>
            <label className="checkbox">
                <input
                    type='checkbox'
                    {...props}
                    {...field}
                />
                {children}
            </label>

            {meta && meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const FormikForm = () => {

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required').min(2, 'Name should be at least 2 characters long'),
                email: Yup.string().required('Email is required').email('Email is incorrect'),
                amount: Yup.number().min(5, 'Not less than 5').required('Amount is required'),
                currency: Yup.string().required('Currency is required'),
                text: Yup.string().min(10, 'Name should be at least 10 characters long'),
                terms: Yup.boolean().required('Terms is required').oneOf([true], 'Terms is required'),
            })}
            onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                {/*<label htmlFor="name">Ваше имя</label>*/}
                {/*<Field*/}
                {/*    id="name"*/}
                {/*    name="name"*/}
                {/*    type="text"*/}
                {/*/>*/}
                {/*<ErrorMessage className="error" name="name" component="div"/>*/}
                {/*Put same logic to single composition component*/}
                <MyTextInput
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"
                />
                <label htmlFor="email">Ваша почта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage  name="email">
                    {email => <div className="error">{email}</div>}
                </ErrorMessage>
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div"/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                >
                    <ErrorMessage className="error" name="currency" component="div"/>
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
                </Field>
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div"/>
                <MyCheckbox
                    name='terms'
                >
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default FormikForm;