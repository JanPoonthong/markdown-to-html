import React, { Component, useState } from "react";
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
                <Blogs />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function Page404() {
  return (
    <div>
      <h1>Error: 404</h1>
    </div>
  );
};


function Blog() {
  const [titleParam, setTitleParam] = useState(null);
  const [markdown, setMarkdown] = useState(null);


  let { title } = useParams();

  if (!allBlogs[title]) return Page404();

  if (!markdown) {
    setTitleParam(title.replace('-', ' '));
    setMarkdown(marked.parse(allBlogs[title]));
  }

  return (
    <div>
      <section>
        <article
          dangerouslySetInnerHTML={{ __html: markdown }}
        ></article>
      </section>
    </div>
  );
};

function Blogs(props) {
  let match = useRouteMatch();

  return (
    <div>
      <h1>
        {props.titleParam}

      </h1>
      <Switch>
        <Route path={`${match.path}/:title`}>
          <Blog />
        </Route>
        <Route path={match.path}>
          <h3>Please select a blog.</h3>
        </Route>
      </Switch>
    </div>
  );
};


export default App;
