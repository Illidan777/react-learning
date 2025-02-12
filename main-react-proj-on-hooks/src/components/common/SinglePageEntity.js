import { Link, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import './common.scss'
import AppBanner from "../appBanner/AppBanner";

const SinglePageEntity = ({ goBackRoute, fetchFunction, useServiceHook, children }) => {
    const { entityId } = useParams();
    const { loading, error, clearError, ...service } = useServiceHook();
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log(entityId)
        if (!entityId) return;
        clearError();
        fetchFunction(entityId)
            .then(setData);
    }, [entityId]);

    if (error) return <ErrorMessage />;
    if (loading) return <Spinner />;
    if (!data) return null;

    return (
        <>
            <AppBanner/>
            <div className="singlePageEntity">
                <img src={data.thumbnail} alt={data.title} className="singlePageEntity__img"/>
                <div className="singlePageEntity__info">
                    {children(data)}
                    <Link to={goBackRoute} className="singlePageEntity__back">Back to all</Link>
                </div>
            </div>
        </>

    );
};

export default SinglePageEntity;
