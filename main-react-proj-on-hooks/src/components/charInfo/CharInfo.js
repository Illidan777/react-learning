import './charInfo.scss';
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/UseMarvelService";
import setContent from "../../utils/setContent";

const CharInfo = (props) => {

    const [char, setChar] = useState(null),
        {clearError, process, setProcess, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
        ;
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )

}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail.includes('image_not_available')) {
        imgStyle = {'objectFit': 'unset'};
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={thumbnail} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There are no comics about this character.'}
                {
                    comics.map((item, index) => {
                        if (index > 10) return
                        return (
                            <li key={index} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;