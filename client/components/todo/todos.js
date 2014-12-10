/*globals define*/

define([
	"react",
	"text!./todos.xml",
	"xmlToJs",
	"./todolist.js",
	"./todoform.js"
], function (
	React,
	todosXml,
	xmlToJs,
	todoList,
	todoForm
) {

	return React.createClass({
		getInitialState: function () {
			return {
				items: []
			};
		},
		onSubmitTodo: function (newTodo) {
			var nextItems = this.state.items.concat([newTodo]);
			this.setState({
				items: nextItems
			});
		},
		render: function () {
			return xmlToJs(todosXml, {
				TodoList: todoList,
				TodoForm: todoForm,
				items: this.state.items,
				onSubmitTodo: this.onSubmitTodo
			});
		}
	});

});