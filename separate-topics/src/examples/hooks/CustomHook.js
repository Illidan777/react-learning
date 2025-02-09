import {useState} from 'react';
import {Container} from 'react-bootstrap';

function useInputWithValidate(initialValue) {
    const [value, setValue] = useState(initialValue);

    const onChange = event => {
        setValue(event.target.value);
    }

    const validateInput = () => {
        return value.search('\\d') >= 0
    }

    return {
        value, onChange, validateInput
    }
}

const CustomHook = () => {

    const input = useInputWithValidate('');
    const textArea = useInputWithValidate('');

    const color = input.validateInput() ? 'text-danger' : null

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <input value={`${input.value} / ${textArea.value}` } type="text" className="form-control" readOnly/>
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input
                        onChange={input.onChange}
                        type="email"
                        value={input.value}
                        className={`form-control ${color}`}
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea
                        onChange={textArea.onChange}
                        value={textArea.value}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}

function useCusHookCounter(initialValue) {
    const [counter, setCounter] = useState(initialValue);

    const incCounter = () => {
        if (counter < 50) {
            setCounter(counter => counter + 1)
        }
    }

    const decCounter = () => {
        if (counter > -50) {
            setCounter(counter => counter - 1)
        }
    }

    const rndCounter = () => {
        setCounter(+(Math.random() * (50 - -50) + -50).toFixed(0))
    }

    const resetCounter = () => {
        setCounter(initialValue)
    }

    return {counter, incCounter, decCounter, resetCounter, rndCounter}

}

const CusHookCounter = (props) => {
    const counterState = useCusHookCounter(props.counter);

    return (
        <div className="component">
            <div className="counter">{counterState.counter}</div>
            <div className="controls">
                <button onClick={counterState.incCounter}>INC</button>
                <button onClick={counterState.decCounter}>DEC</button>
                <button onClick={counterState.rndCounter}>RND</button>
                <button onClick={counterState.resetCounter}>RESET</button>
            </div>
        </div>
    )
}

const RndCounter = (props) => {
    const counterState = useCusHookCounter(props.counter);

    return (
        <div className="component">
            <div className="counter">{counterState.counter}</div>
            <div className="controls">
                <button onClick={counterState.rndCounter}>RND</button>
                <button onClick={counterState.resetCounter}>RESET</button>
            </div>
        </div>
    )
}

export {CusHookCounter, RndCounter}
export default CustomHook;
