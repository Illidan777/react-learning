import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210,
        limit: 9,
        charEnded: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequestMore();
    }

    onRequestMore = (offset, limit) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(limit, offset)
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onCharsLoaded = (newChars) => {

        this.setState(({offset, limit, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + limit,
            charEnded: newChars.length < 9
        }));
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(items) {
        return (
            <ul className="char__grid">
                {items.map((char) => <CharListItem key={char.id} char={char}  onCharSelected={this.props.onCharSelected}/>)}
            </ul>
        )
    }

    render() {

        const {
            chars,
            loading,
            error,
            newItemsLoading,
            offset,
            limit,
            charEnded
        } = this.state;

        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequestMore(offset, limit)}>
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharListItem = ({char, onCharSelected}) => {
    const {name, thumbnail} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail.includes('image_not_available')) {
        imgStyle = {'objectFit' : 'unset'};
    }
    return (
        <li className="char__item" onClick={() => onCharSelected(char.id)}>
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;