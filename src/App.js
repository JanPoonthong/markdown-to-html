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
import { allBlog } from "./components/blogs/";

class App extends Component {
  state = { markdown: "" };

  page404 = () => {
    return (
      <div>
        <h1>Error: 404</h1>
      </div>
    );
  };

  topic = () => {
    let { title } = useParams();
    console.log(allBlog);
    if (!allBlog[title]) return this.page404();

    this.setState({
      markdown: marked.parse(allBlog[title]),
    });

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
          <Route path={`${match.path}/:title`}>
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
