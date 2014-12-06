var Header = React.createClass({displayName: 'Header',
    render: function () {
        return (
            React.createElement("h1", {className: "title"}, this.props.text)
        );
    }
});

var SearchBar = React.createClass({displayName: 'SearchBar',
    render: function () {
        return (
            React.createElement("input", {type: "search"})
        );
    }
});

var EmployeeList = React.createClass({displayName: 'EmployeeList',
    render: function () {
        return (
            React.createElement("ul", null, 
                React.createElement("li", null, "Christophe Coenraets"), 
                React.createElement("li", null, "Lisa Jones")
            )
        );
    }
});

var HomePage = React.createClass({displayName: 'HomePage',
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {text: "Employee Directory"}), 
                React.createElement(SearchBar, null), 
                React.createElement(EmployeeList, null)
            )
        );
    }
});

React.render(
    React.createElement(HomePage, null),
    document.body
);