var Header = React.createClass({displayName: 'Header',
    render: function () {
        return (
            React.createElement("header", {className: "bar bar-nav"}, 
                React.createElement("a", {href: "#", className: "icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}), 
                React.createElement("h1", {className: "title"}, this.props.text)
            )
        );
    }
});

var SearchBar = React.createClass({displayName: 'SearchBar',
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
            React.createElement("div", {className: "bar bar-standard bar-header-secondary"}, 
                React.createElement("input", {type: "search", ref: "searchKey", onChange: this.searchHandler, value: this.props.searchKey})
            )

        );
    }
});

var EmployeeListItem = React.createClass({displayName: 'EmployeeListItem',
    render: function () {
        return (
            React.createElement("li", {className: "table-view-cell media"}, 
                React.createElement("a", {href: "#employees/" + this.props.employee.id}, 
                    React.createElement("img", {className: "media-object small pull-left", src: "pics/" + this.props.employee.firstName + "_" + this.props.employee.lastName + ".jpg"}), 
                    this.props.employee.firstName, " ", this.props.employee.lastName, 
                    React.createElement("p", null, this.props.employee.title)
                )
            )
        );
    }
});

var EmployeeList = React.createClass({displayName: 'EmployeeList',
    render: function () {
        var items = this.props.employees.map(function (employee) {
            return (
                React.createElement(EmployeeListItem, {key: employee.id, employee: employee})
            );
        });
        return (
            React.createElement("ul", {className: "table-view"}, 
                items
            )
        );
    }
});

var HomePage = React.createClass({displayName: 'HomePage',
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {text: "Employee Directory", back: "false"}), 
                React.createElement(SearchBar, {searchKey: this.props.searchKey, searchHandler: this.props.searchHandler}), 
                React.createElement("div", {className: "content"}, 
                    React.createElement(EmployeeList, {employees: this.props.employees})
                )
            )
        );
    }
});

var EmployeePage = React.createClass({displayName: 'EmployeePage',
    getInitialState: function() {
        return {employee: {}};
    },
    componentDidMount: function() {
        var self = this;
        this.props.service.findById(this.props.employeeId).done(function(result) {
            self.setState({employee: result});
        });
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {text: "Employee", back: "true"}), 
                React.createElement("div", {className: "card"}, 
                    React.createElement("ul", {className: "table-view"}, 
                        React.createElement("li", {className: "table-view-cell media"}, 
                            React.createElement("img", {className: "media-object big pull-left", src: "pics/" + this.state.employee.firstName + "_" + this.state.employee.lastName + ".jpg"}), 
                            React.createElement("h1", null, this.state.employee.firstName, " ", this.state.employee.lastName), 
                            React.createElement("p", null, this.state.employee.title)
                        ), 
                        React.createElement("li", {className: "table-view-cell media"}, 
                            React.createElement("a", {href: "tel:" + this.state.employee.officePhone, className: "push-right"}, 
                                React.createElement("span", {className: "media-object pull-left icon icon-call"}), 
                                React.createElement("div", {className: "media-body"}, 
                                "Call Office", 
                                    React.createElement("p", null, this.state.employee.officePhone)
                                )
                            )
                        ), 
                        React.createElement("li", {className: "table-view-cell media"}, 
                            React.createElement("a", {href: "tel:" + this.state.employee.mobilePhone, className: "push-right"}, 
                                React.createElement("span", {className: "media-object pull-left icon icon-call"}), 
                                React.createElement("div", {className: "media-body"}, 
                                "Call Mobile", 
                                    React.createElement("p", null, this.state.employee.mobilePhone)
                                )
                            )
                        ), 
                        React.createElement("li", {className: "table-view-cell media"}, 
                            React.createElement("a", {href: "sms:" + this.state.employee.mobilePhone, className: "push-right"}, 
                                React.createElement("span", {className: "media-object pull-left icon icon-sms"}), 
                                React.createElement("div", {className: "media-body"}, 
                                "SMS", 
                                    React.createElement("p", null, this.state.employee.mobilePhone)
                                )
                            )
                        ), 
                        React.createElement("li", {className: "table-view-cell media"}, 
                            React.createElement("a", {href: "mailto:" + this.state.employee.email, className: "push-right"}, 
                                React.createElement("span", {className: "media-object pull-left icon icon-email"}), 
                                React.createElement("div", {className: "media-body"}, 
                                "Email", 
                                    React.createElement("p", null, this.state.employee.email)
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

var App = React.createClass({displayName: 'App',
    getInitialState: function() {
        return {
            searchKey: '',
            employees: [],
            page: null
        }
    },
    searchHandler: function(searchKey) {
        var self = this;
        employeeService.findByName(searchKey).done(function(employees) {
            self.setState({searchKey:searchKey, employees: employees, page: React.createElement(HomePage, {searchKey: searchKey, searchHandler: self.searchHandler, employees: employees})});
        });
    },
    componentDidMount: function() {
        var self = this;
        router.addRoute('', function() {
            self.setState({page: React.createElement(HomePage, {searchKey: self.state.searchKey, searchHandler: self.searchHandler, employees: self.state.employees})});
        });
        router.addRoute('employees/:id', function(id) {
            self.setState({page: React.createElement(EmployeePage, {employeeId: id, service: employeeService})});
        });
        router.start();
    },
    render: function() {
        return this.state.page;
    }
});

React.render(React.createElement(App, null), document.body);