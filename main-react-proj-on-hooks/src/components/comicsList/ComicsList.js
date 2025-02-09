import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/UseMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]),
            [newItemsLoading, setNewItemsLoading] = useState(false),
            [offset, setOffset] = useState(0),
            [comicsEnded, setComicsEnded] = useState(false),
            {error, loading, getAllComics} = useMarvelService()

    useEffect(() => {
        onRequestMore(offset, true)
    }, [])

    const onRequestMore = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComics().then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        setComicsList(comics => [...comics, ...newComics])
        setNewItemsLoading(false)
        setOffset(offset => offset + 8)
        setComicsEnded(newComics.length < 8)
    }

    const renderItems = () => {
        const items = comicsList.map((comic, index) => {
            return (
                <li
                    key={index}
                    className="comics__item">
                    <Link to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems()
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading ? <Spinner/> : null;


    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {items}
            </ul>
            <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequestMore(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;