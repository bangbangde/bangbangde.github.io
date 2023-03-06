export default function(props) {
  const data = props.data;
  return <div>
    <h1>hello</h1>
    <code>{ JSON.stringify(data) }</code>
  </div>
}