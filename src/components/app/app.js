import React, {Component} from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'Johnathan', salary: 800, increase: false, liked: true, id: 1},
				{name: "Cloose", salary: 1800, increase: true, liked: false, id: 2},
				{name: "Angela", salary: 300, increase: false, liked: false, id: 3},
			],
			maxId: 4,
			term: '', // Строчка, по которой будет происходить поиск сотрудника
			filter: 'all' // Сюда запишем выбранный фильтр
		}
	};

	// Объединённый метод, который хотим передать вниз
	onToggleProp = (id, prop) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				// Если id айтема равен id искомого объекта, то
				if (item.id === id) {
					// ... мы возвращаем новый объект со свойствами, которые было до и инвертированный increase
					return {...item, [prop]: !item[prop]}
				}
				return item;
			})
		}))
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			return { data: data.filter(elem => elem.id !== id) };
		});
	}

	addItem = (name, salary) => {
		const newItem = {
			name: name,
			salary: salary,
			increase: false,
			liked: false,
			id: this.maxId++
		}

		this.setState(({data}) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}
		});
	}

	searchEmployee = (items, term) => {
		// Если ничего не введено в поиск, то показываем все объекты
		if (term.length === 0) return items;

		return items.filter(item => {
			// indexOf() - поиск подстроки
			// Возвращаем только те элементы, где присутствует term
			return item.name.indexOf(term) > -1;
		});
	}

	// Метод, который будет регистрировать изменения стейта данных
	onUpdateSearch = (term) => {
		// {term: term}
		this.setState({term});
	}

	// Выбор фильтра
	filterPost = (items, filter) => {
		switch (filter) {
			case 'onIncrease':
				return items.filter(item => item.liked);
			case 'moreSalary':
				return items.filter(item => item.salary > 1000);
			default:
				return items;
		}
	}

	onFilterSelect = (filter) => {
		// {filter: filter}
		this.setState({filter});
	}

	render() {
		// Данные для реализации фильтрации на странице
		const {term, data, filter} = this.state;
		// Сразу передаём только те данные, которые подходят по поиску
		const visibleData = this.filterPost(this.searchEmployee(data, term), filter);

		// Считаем количество сотрудников
		const employees = this.state.data.length;
		// Количество сотрудников, идущих на повышение
		const increased = this.state.data.filter(item => item.increase === true).length;

		return (
			<div className="app">
				<AppInfo
					employees={employees}
					increased={increased}
				/>

				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch}/>
					{/*Чтобы сделать анимацию кнопки, нужно передать фильтр*/}
					<AppFilter
						onFilterSelect={this.onFilterSelect}
						filter={filter}
					/>
				</div>

				<EmployeesList
					// Это и есть пропсы
					// Сюда передаём отфильтрованные данные
					data={visibleData}
					onDelete={this.deleteItem}
					// А это те методы, которые передадутся в качестве props
					onToggleProp={this.onToggleProp}
				/>
				<EmployeesAddForm
					onAdd={this.addItem}
				/>
			</div>
		);
	}
}

export default App;