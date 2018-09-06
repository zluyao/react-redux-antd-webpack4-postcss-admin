export default class AsyncComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      Component: null,
    };
  }

  componentDidMount() {
    this.props.component().then(v => {
      if (this.isUnmount) {
        return;
      }

      this.setState({
        Component: v.__esModule ? v.default : v,
      });
    });
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  render() {
    const { loading, ...rest } = this.props
      , { Component } = this.state;

    if (Component) {
      return (<Component {...rest} />);
    } else {
      return loading ? loading() : null;
    }
  }
}
