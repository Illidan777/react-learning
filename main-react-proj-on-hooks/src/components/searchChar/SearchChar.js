import './searchChar.scss';
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useState} from "react";
import useMarvelService from "../../services/UseMarvelService";
import Spinner from "../spinner/Spinner";

const SearchChar = () => {

    const [char, setChar] = useState(null),
        {error, loading, getCharacterByName} = useMarvelService();

    const findCharacterByName = (name) => {
        getCharacterByName(name).then((char) => setChar(char));
    }

    const errorMessage = error ? <div className="error">{error}</div> : null;
    const spinner = loading ? <Spinner/> : null;
    const success = !(loading || error || !char);
    const successMessage = success ? <div className="success">Character  {char.name} has been successfully found!</div> : null;
    const goToCharPageButton = success ?
        <button className="button button__secondary">
            <Link to={`/chars/${char.id}`} className="inner">To page</Link>
        </button> : null;

    return (

        <div className="searchCharForm">
            <Formik initialValues={{
                name: ''
            }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Name is required').min(2, 'Name should be at least 2 characters long'),
                    })}
                    onSubmit={(values) => findCharacterByName(values.name)}>
                <Form className="searchCharForm__form">
                    <h2 className="searchCharForm__title">Or find a character by name:</h2>
                    <div className="searchCharForm__form_row">
                        <Field id="name" name="name" type="text" placeholder="Enter name" />
                        <button
                            type="submit"
                            className="button button__main"
                            disabled={loading}
                        >
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <div className="searchCharForm__form_row">
                        <div>
                            {spinner}
                            {errorMessage}
                            {successMessage}
                            <ErrorMessage name="name" className="error" component="div"/>
                        </div>
                        {goToCharPageButton}
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default SearchChar;