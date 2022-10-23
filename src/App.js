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
import * as allBlogs from "./components/blogs/";


class App extends Component {
  state = { title: null, markdown: null };

  page404 = () => {
    return (
      <div>
        <h1>Error: 404</h1>
      </div>
    );
  };

  topic = () => {
    let { title } = useParams();
    
    if (!allBlogs[title]) return this.page404();

    if(!this.state.markdown){
    this.setState({
      title: title.replace('-', ' '),
      markdown: marked.parse(allBlogs[title]),
    });
    }

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
        <h1>
        { this.state.title}

        </h1>
        <Switch>
          <Route path={`${match.path}/:title`}>
            <this.topic />
          </Route>
          <Route path={match.path}>
            <h3>Please select a blog.</h3>
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
                  <Link to="/blogs">Blogs</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/blogs">
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
