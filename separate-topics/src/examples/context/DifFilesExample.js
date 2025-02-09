import {useState} from "react";
import ContextForm from "./ContextForm";
import dataContext from "./context";

const {Provider} = dataContext;

function DifFileReactContextExample() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text',
        forceChangeMail: forceChangeMail
    });

    function forceChangeMail() {
        setData({...data, mail: 'test@gmail.com'})
    }

    return (
        <Provider value={data}>
            <ContextForm text={data.text}/>
            <button
                onClick={() => setData({
                    mail: "second@example.com",
                    text: 'another text',
                    forceChangeMail: forceChangeMail
                })}>
                Click me
            </button>
        </Provider>
    );
}

export default DifFileReactContextExample;