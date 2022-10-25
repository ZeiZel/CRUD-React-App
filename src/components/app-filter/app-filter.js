import React, {Component} from "react";
import './app-filter.css';

class AppFilter extends Component {
    render() {
        // Выносим данные о кнопках в отдельный элемент
        const buttonsData = [
            {name: 'all', label: 'Все сотрудники', colored: false},
            {name: 'onIncrease', label: 'На повышение', colored: true},
            {name: 'moreSalary', label: 'ЗП больше 1000$', colored: false},
        ];

        const buttons = buttonsData.map(({name, label, colored}) => {
            // ! Класс активности будем назначать только той кнопке, которая отвечает за нужный фильтр
            const active = this.props.filter === name;
            const clazz = active ? 'btn-light' : 'btn-outline-light';

            // Сохраняем кнопки в массив
            return (
                <button className={`btn ${clazz}`}
                        type="button"
                        key={name}
                        // Вкладываем функцию, которую передали сюда в качестве пропсов
                        onClick={() => this.props.onFilterSelect(name)}
                >
                    {label}
                </button>
            );
        })

        return (
            <div className="btn-group">
                {/*И отображаем массив с кнопками*/}
                {buttons}
            </div>
        );
    }
}

export default AppFilter;