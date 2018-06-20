class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
      
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
      
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({users: responseJson.items}));
  }

  render() {
    return (
      <section>
        <form className={'search'} onSubmit={event => this.onSubmit(event)}>
          <img className={'git'} src={'https://avatars0.githubusercontent.com/u/9919?s=280&v=4'} alt={'GitHub'}/>
          <h1>GitHub</h1>
          <label htmlFor="searchText">Search or jump to</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <div className={'userList'}><UsersList users={this.state.users}/></div>
      </section>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    return (
      <div className={'userList'}>
        {this.users}
      </div>
    );
  }
}
    
class User extends React.Component {
  render() {
    return (
      <div className={'user'}>
        <img src={this.props.user.avatar_url} alt={'User GitHub'} style={{maxWidth: '100px'}}/>
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);