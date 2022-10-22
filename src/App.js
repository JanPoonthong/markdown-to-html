import React, { Component } from "react";
import { marked } from "marked";
import { readme } from "./components/blogs/readme";


class App extends Component {
  state = { markdown: "" };
  
  componentDidMount() {
    this.setState({
      markdown: marked.parse(readme),
    });
  }

  render() {
    return (
      <div>
      <section>
        <article
          dangerouslySetInnerHTML={{ __html: this.state.markdown }}
        ></article>
      </section>
      </div>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}


export default App;
