import { Link, Switch } from 'react-router-dom';

import { connect } from '$lib/dataManager';
import AuthRoute from '$lib/authRoute';
import AsyncComponent from '$lib/asyncComponent';

import Loading from './loading';
import actions, { key } from '../../globalStore';





// const mapStateToProps = v => ({
//   userInfo: v[key].userInfo,
// });
const mapStateToProps = v => {
  console.log(123);
  console.log(v);
  console.log(key);
  return {
    userInfo: v[key].userInfo,
  };
};

const Right = () => (
  <div>
    <h2>Right</h2>
  </div>
);

const Home = () => (
  <div>
    <h2>Home</h2>
    <ul>
      <li>
        <Link to="/left">Left</Link>
      </li>
      <li>
        <Link to="/right">right</Link>
      </li>
    </ul>
    <div>下面的这两个组件会根据不同的路径展示和销毁</div>
    <AuthRoute path="/left" >
      <AsyncComponent
        loading={() => (<Loading />)}
        component={() => import('./left').then(v =>
          new Promise(resolve => setTimeout(() => resolve(v), 2000)))} />
    </AuthRoute>
    <AuthRoute path="/right" component={Right} />
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

@connect(mapStateToProps, actions)
class Main extends React.Component {

  componentDidMount() {
    console.log('componentDidMount');
    console.log(this.props);
  }

  render() {
    const styleObject = { color: 'red' };

    const titleSSSSSS = (
      <h1 style={styleObject}>Title</h1>
    );

    return (
      <div>
        {aa === true ? titleSSSSSS : null}
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/about">关于</Link>
          </li>
        </ul>

        <div>下面这两个组件会先适配 <code>/about</code> 这个路由，再适配 <code>/</code> 这个路由</div>
        <Switch>
          <AuthRoute path="/about" component={About} />
          <AuthRoute path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Main;
