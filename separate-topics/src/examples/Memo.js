import {memo, PureComponent, useCallback, useState} from 'react';
import {Container} from 'react-bootstrap';

function propsCompare(prevProps, nextProps) {
    return prevProps.mail.name === nextProps.mail.name && prevProps.text === nextProps.text;
}

// If we use the Memo - component will not be rerender,
// if props that came did not change (only surface props comparison)
const Form = memo((props) => {

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input value={props.mail} type="email" className='form-control' id="exampleFormControlInput1"
                           placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1"
                              rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}, propsCompare)

class PureForm extends PureComponent {

    //implement custom logic of comparison for updating component,
    // but only for simple components, not pure. Similar for memo or PureComponent but for simple Components
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(this.props.mail.name === nextProps.mail.name) {
    //         return false;
    //     } return true;
    // }

    render() {
        return (
            <Container>
                <form className="w-50 border mt-5 p-3 m-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                        <input value={this.props.mail} type="email" className='form-control' id="exampleFormControlInput1"
                               placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea value={this.props.text} className="form-control" id="exampleFormControlTextarea1"
                                  rows="3"></textarea>
                    </div>
                </form>
            </Container>
        )
    }
}

function MemoTest() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text'
    });

    // function prop it is object, that is why each time this prop will be
    // diff because diff links to obj. There will be rerender even with memo. (but we can use 'useCallback' hook to step over this)
    const onLog = useCallback(() => {
        console.log('Function prop');
    }, [])

    return (
        <>
            <Form mail={data.mail} text={data.text} onLog={onLog}/>
            <PureForm mail={data.mail} text={data.text}/>
            <button
                onClick={() => setData({
                    mail: "second@example.com",
                    text: 'another text'
                })}>
                Click me
            </button>
        </>
    );
}

export default MemoTest;
