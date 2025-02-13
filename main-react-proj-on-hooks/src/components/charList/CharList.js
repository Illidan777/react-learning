import './charList.scss';
import {useState, useEffect, useRef, useMemo} from "react";
import useMarvelService from "../../services/UseMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

const setContent = (process, Component, newItemsLoading) => {
    switch (process) {
        case 'waiting': {
            return <Spinner/>;
        }
        case 'loading': {
            return newItemsLoading ? <Component/> : <Spinner/>;
        }
        case 'confirmed': {
            return <Component/>;
        }
        case 'error': {
            return <ErrorMessage/>;
        }
        default: {
            throw new Error('Unexpected process state!');
        }
    }
}

const CharList = (props) => {

    const
        [chars, setChars] = useState([]),
        [newItemsLoading, setNewItemsLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [charEnded, setCharEnded] = useState(false),

        {process, setProcess, getAllCharacters} = useMarvelService()

    useEffect(() => {
        onRequestMore(offset, true)
    }, [])

    const onRequestMore = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharsLoaded = (newChars) => {
        setChars(chars => [...chars, ...newChars])
        setNewItemsLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(newChars.length < 9)
    }

    const itemsRefs = useRef([])

    const focusOnItem = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemsRefs.current[id].classList.add('char__item_selected')
        itemsRefs.current[id].focus()
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'image_not_available') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemsRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    // fixed problem with double render(from parent comp) and canceling focus on element
    const elements = useMemo(() => {
        return setContent(process, () => renderItems(chars), newItemsLoading);
    }, [process])

    return (
        <div className="char__list">
            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequestMore(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;