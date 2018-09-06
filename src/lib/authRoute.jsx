import { Route } from 'react-router-dom';

export default class AuthRoute extends React.Component {
  render() {
    const { component, notAuthed, children, ...rest } = this.props;

    return (<Route {...rest} render={props => {
      // TODO: 添加授权判断代码
      if (Date.now() === Date.now()) {
        if (component) {
          return React.createElement(component, props);
        } else {
          return React.cloneElement(children, props);
        }
      } else {
        // TODO: 添加没有权限提示信息，或者直接跳转到登录页面
        return notAuthed ? notAuthed() : null;
      }
    }} />);
  }
}
