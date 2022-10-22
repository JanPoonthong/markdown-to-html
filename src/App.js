import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { marked } from "marked";
import { readme } from "./components/blogs/readme";

class App extends Component {
  state = { markdown: "" };

  componentDidMount() {
    this.setState({
      markdown: marked.parse(readme),
    });
  }

  topic = () => {
    let { topicId } = useParams();
    return (
      <div>
        <section>
          <article
            dangerouslySetInnerHTML={{ __html: this.state.markdown }}
          ></article>
        </section>
      </div>
    );
  };

  topics = () => {
    let match = useRouteMatch();

    return (
      <div>
        <h2>Topics</h2>
        <Switch>
          <Route path={`${match.path}/:topicId`}>
            <this.topic />
          </Route>
          <Route path={match.path}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/topics">Topics</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/topics">
                <this.topics />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
