import ReactDOM from 'react-dom';


function Root(): React.ReactElement {
  return <h1>Hello, world.</h1>;
}

ReactDOM.render(
  <Root />,
  document.getElementById("root"),
);