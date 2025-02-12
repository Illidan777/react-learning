import './singlePageComics.scss';
import useMarvelService from "../../services/UseMarvelService";
import SinglePageEntity from "../common/SinglePageEntity";
import {Helmet} from "react-helmet";

const SinglePageComics = () => {
    const {getComics} = useMarvelService();
    return (
        <SinglePageEntity
            goBackRoute="/comics"
            fetchFunction={(id) => getComics(id)}
            useServiceHook={useMarvelService}
        >
            {({title, description, pageCount, language, price}) => (
                <>
                    <Helmet>
                        <meta
                            name="description"
                            content={`${title} comics book`}
                        />
                        <title>{title}</title>
                    </Helmet>
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </>
            )}
        </SinglePageEntity>
    );
}

export default SinglePageComics;