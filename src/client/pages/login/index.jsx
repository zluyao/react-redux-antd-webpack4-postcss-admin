import cn from 'classnames';
import autobind from 'autobind-decorator';
import style from './css';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { createForm } from 'rc-form';

import { connect } from '$lib/dataManager';
import actions, { key } from './store';
import actions2, { key as key2 } from '../../globalStore';


// Form.create();
const FormItem = Form.Item;
const mapStateToProps = v => ({
  isAuthed: v[key].isAuthed,
  userInfo: v[key2].userInfo,
});

@connect(mapStateToProps, { ...actions, ...actions2 })
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    style.use();
  }

  componentWillUnmount() {
    style.unuse();
  }

  @autobind
  async loginHandler() {

    await this.props.authAsync();
    await this.props.setUserInfo('zhengluyao');

    console.table(this.props);
    console.log(key);
    alert('授权成功，下面即将跳转主页！');
    this.props.history.push('/');
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const containerClassName = cn('a', 'b', {
      container: Date.now() % 2 + 3,
      abc: false,
    });
    // <button onClick={this.loginHandler}>点击登录成功</button>   <img className="bg" src={require('./images/bg.png')} />

    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    console.log('this.props', this.props);


    return (
      <div className={containerClassName}>
        <img className="bg" src={require('./images/bg.png')} />
        <div className="login-icon">xxx</div>
        <div className="login-word">登录</div>

        <Form onSubmit={this.loginHandler} className="login-form">

          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
            )}

          </FormItem>
          <FormItem className="login-btn-box">
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox style={{ color: '#fff' }}>是否记住密码？</Checkbox>,
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>

        <div className="login-company">Copyright © www.helianhealth.com, All Right Reserved</div>


      </div>
    );
  }
}

export default createForm()(Login);
