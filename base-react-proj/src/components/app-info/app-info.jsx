import './app-info.css';

const AppInfo = (props) => {
    const {employeeCount, forIncreaseCount} = props;
    return (
        <div className="app-info">
            <h1>Employee accounting in company N</h1>
            <h2>General employee count: {employeeCount}</h2>
            <h2>Benefit will receive: {forIncreaseCount}</h2>
        </div>
    )
}

export default AppInfo;