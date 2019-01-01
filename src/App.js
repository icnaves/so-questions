import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import './index.css'
import api from './transport'

class App extends Component {

  page = 0
  state = {
    isOpen: false,
    selected: 0,
  }

  componentDidMount = () => {
    this.fetchQuestions()
  }

  fetchQuestions = () => {
    const { fetch } = this.props
    this.page++;
    api.fetchQuestions(this.page)
    .then(res => fetch(res.data.items))
  }

  render() {
    const { questions } = this.props
    const { isOpen, selected } = this.state
    return (
      <div className={ isOpen ? "container no-scroll" : "container" }>
        <InfiniteScroll
            pageStart={0}
            loadMore={this.fetchQuestions}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <table className="table table-hover">
            <thead>
              <tr>
                <td>Автор</td>
                <td>Название</td>
                <td>Дата</td>
              </tr>
            </thead>
            <tbody>
              { questions.map((q, key) =>
                <tr onClick={ () => this.setState({ isOpen: true, selected: key }) } key={ key }>
                  <td>{ q.owner.display_name }</td>
                  <td>{ q.title }</td>
                  <td>{ moment.unix(q.creation_date).format('DD/MM/YYYY') }</td>
                </tr>
              )}
            </tbody>
          </table>
        </InfiniteScroll>

        {
          isOpen ? (
            <div className="modal show" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" onClick={ () => this.setState({ isOpen: false }) }>&times;</button>
                    <h4 className="modal-title">{ questions[selected].title }</h4>
                  </div>
                  <div className="modal-body" dangerouslySetInnerHTML={{ __html: `${questions[selected].body}` }}></div>
                  <div className="modal-footer">
                    <a className="btn btn-primary" href={ questions[selected].link } target="_blank">See on StackOverflow</a>
                    <button type="button" className="btn btn-default" onClick={ () => this.setState({ isOpen: false }) }>Close</button>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }

      </div>
    );
  }
}

export default connect(
  state => ({
    questions: state.questions.questions
  }),
  dispatch => ({
    fetch: questions => dispatch({ type: 'FETCH_QUESTIONS', payload: { questions } })
  })
)(App)
