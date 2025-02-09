import React, {Component, useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import UseRef from "./UseRef";
class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoplay: false,
            slide: 0
        }
    }

    componentDidMount() {
        document.title = `Slide ${this.state.slide}`
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.title = `Slide ${this.state.slide}`
    }

    changeSlide = (i) => {
        this.setState(({slide}) => ({
            slide: slide + i
        }))
    }

    toggleAutoplay = () => {
        this.setState(({autoplay}) => ({
            autoplay: !autoplay
        }))
    }

    render() {
        return (
            <Container>
                <div className="slider w-50 m-auto">
                    <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                    <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
                    <div className="buttons mt-3">
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(-1)}>-1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(1)}>+1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={this.toggleAutoplay}>toggle autoplay</button>
                    </div>
                </div>
            </Container>
        )
    }
}

const calcValue = () => {
    console.log('random')
    return Math.random() * (50 - 1) + 1
}

const countTotal = (num) => {
    console.log('counting')
    return num + 10
}

const HookSlider = (props) => {

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    const getSomeImages = useCallback(() => {
        console.log('fetching')
        return [
            'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
            'https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q='
        ]
    }, [])

    useEffect(() => {
        console.log('effect')
        document.title = `Slide ${slide}`
    }, []) // component did mount

    // watching slide
    useEffect(() => {
        console.log('effect update')
        document.title = `Slide ${slide}`

        window.addEventListener('click', logging)

        return () => { // component will unmount
            window.removeEventListener('click', logging)
        }

    }, [slide]) // component did update

    // watching autoplay
    useEffect(() => {
        console.log('autoplay')
    }, [autoplay])

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black',
    }), [slide])

    useEffect(() => {
        console.log('styles')
    }, [style])

    const total = useMemo(() => {
        return countTotal(slide)
    }, [slide]);

    function logging() {
        console.log('log!')
    }

    function changeSlide(i) {
        setSlide(slide => slide + i)
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }


    // const [state, setState] = useState({
    //     slide: 0,
    //     autoplay: false,
    // })
    //
    // function changeSlide(i) {
    //     setState(state => ({
    //         ...state,
    //         slide: state.slide + i
    //     }))
    // }
    //
    // function toggleAutoplay() {
    //     setState(state => ({
    //         ...state,
    //         autoplay: !state.autoplay
    //     }))
    // }


    return (
        <Container>
            <div className="slider w-50 m-auto">

                {/*  // dont work , only inside child components{*/}
                {/*    getSomeImages().map((url, i) => {*/}
                {/*        return (*/}
                {/*            <img*/}
                {/*                 key={i}*/}
                {/*                 className="d-block w-100"*/}
                {/*                 src={url}*/}
                {/*                 alt="slide"/>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}

                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slides {total}</div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay
                    </button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {
                images.map((url, i) => {
                    return (
                        <img
                            key={i}
                            className="d-block w-100"
                            src={url}
                            alt="slide"/>
                    )
                })
            }
        </>
    )
}


function OtherHookExamples() {
    const [slide, setSlide] = useState(true);

  return (
      <>
          {/*<Counter/>    */}
          <button onClick={() => setSlide(false)}>Click</button>
          {slide ? <HookSlider/> : null}
          <UseRef/>
      </>
  );
}

function Counter(props) {

    const[counter, setCounter] = React.useState(props.counter);

    function onIncrement() {
        setCounter(counter => counter + 1);
    }

    function onDecrement() {
        setCounter(counter => counter - 1);
    }

    function onRandom() {
        setCounter(Math.random() * (50 - (-50)) + (-50))
    }

    function onReset() {
        setCounter(props.counter);
    }

    return (
        <div className="app">
            <div className="counter">{counter}</div>
            <div className="controls">
                <button onClick={onIncrement}>INC</button>
                <button onClick={onDecrement}>DEC</button>
                <button onClick={onRandom}>RND</button>
                <button onClick={onReset}>RESET</button>
            </div>
        </div>
    )
}

export default OtherHookExamples;
