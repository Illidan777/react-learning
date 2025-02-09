
import './app-filter.css';

const AppFilter = ({filter, onFilterSelect}) => {
    const buttonsData = [
        {name: 'all', label: 'All employees'},
        {name: 'like', label: 'To rise salary'},
        {name: 'moreThen1000', label: 'Filter by salary more than 1000$'},
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';

        return (
            <button
                onClick={() => onFilterSelect(name)}
                key={name}
                className={`btn ${clazz}`}
                type="button"
            >
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
}

export default AppFilter;