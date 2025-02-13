import { Link, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import './common.scss'
import AppBanner from "../appBanner/AppBanner";

const setContent = (process, Component, data, goBackRoute, children) => {
    switch (process) {
        case 'waiting':
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            return <Component data={data} goBackRoute={goBackRoute} children={children} />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state!');
    }
};

const SinglePageEntity = ({ fetchFunction, useServiceHook, goBackRoute, children }) => {
    const { entityId } = useParams();
    const { clearError, process, setProcess } = useServiceHook();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!entityId) return;
        clearError();
        fetchFunction(entityId)
            .then(setData)
            .then(() => setProcess('confirmed'));
    }, [entityId]);

    return setContent(process, View, data, goBackRoute, children);
};

const View = ({ data, goBackRoute, children }) => {
    if (!data) return null;

    return (
        <>
            <AppBanner />
            <div className="singlePageEntity">
                <img src={data.thumbnail} alt={data.title} className="singlePageEntity__img" />
                <div className="singlePageEntity__info">
                    {children(data)}
                    <Link to={goBackRoute} className="singlePageEntity__back">Back to all</Link>
                </div>
            </div>
        </>
    );
};

export default SinglePageEntity;
