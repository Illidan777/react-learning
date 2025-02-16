import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/UseMarvelService";

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import setContent from "../../utils/setContent";

const RandomChar = () => {
    console.log('Start randomChar');

    const [char, setChar] = useState(null);
    const {clearError, process, setProcess, getCharacter} = useMarvelService();

    useEffect(() => {
        console.log('USE EFFECT')
        updateChar();
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        console.log('Update char')
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id).then(onCharLoaded).then(() => setProcess('confirmed'));

    }

    return (
        <div className="randomchar">

            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    console.log(data);
    const {name, description, thumbnail, homepage, wiki} = data;
    const imgClassList = thumbnail.includes('image_not_available') ? 'randomchar__img contain' : 'randomchar__img cover';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgClassList}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description.substring(0, 165) + '...' : 'There is no info about character!'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;