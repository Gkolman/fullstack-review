import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }
  search (term) {
    console.log(`${term} was searched`);
    $.ajax( {
      url: '/repos',
      method: 'POST',
      data: {'data': term },
      success: () => {
        $.ajax( {
          url: '/repos',
          method: 'GET',
          success: (data) => {this.setState({repos: data})},
          error: (err) => {console.log('ajax err -> ', err)}
        })
      },
      error: (err) => {console.log('ajax err -> ', err)}
    })
  }
  componentWillMount() {
    console.log('this')
    $.ajax( {
      url: '/repos',
      method: 'GET',
      success: (data) => {
        // console.log('data from get -> ', data)
        this.setState({repos: data})
      },
      error: (err) => {console.log('ajax err -> ', err)}
    })
  }

  render () {
    console.log('rendered')
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));