import React, { Component, Fragment } from 'react';
import { Input, Modal, notification,Icon } from 'antd';
import Captcha from './Captcha';
import 'antd/dist/antd.css';

/**
 * api: 获取验证码接口路径，默认值 '/api/getCaptcha.json'；
 * text: button按钮内容，默认值“弹出一个验证码弹窗”；
 * title: 弹窗标题，默认值“验证码”；
 * showIcon: 是否显示导出icon,默认值“true”；
 * handleExport: 执行导出函数，必传。
 */

export default class ExportButton extends Component {
  // static displayName = 'ExportButton';

  static defaultProps = {
    showIcon: true,
    text: '弹出一个验证码弹窗',
    title: '验证码',
  };

state = { visible: false, captcha: ''};

handleOnChange = (e) => {
  this.setState({
    captcha: e.target.value,
  });
}

handelOk = () => {
  const {handleExport} = this.props;
  const { captcha } = this.state;
  if (!captcha) {
    notification.open({
      message: '验证码不能为空',
      duration: 2,
    });
    return;
  }
  handleExport && handleExport(this.state.captcha);
  this.close();
}

show = () => {
  this.setState({visible: true });
}

//关闭弹窗，清空验证码
close = () => {
  this.setState({ visible: false, captcha: '' });
}

onBtnClick = (e) => {
  if(e.detail === 1){
    this.handelOk();
    return;
  }
  this.close();
}

render() {
  const { text, showIcon, title, api } = this.props;
  const { captcha, visible } = this.state;
  return (
    <Fragment>
      <span className="toolbar-btn export-btn" onClick={this.show}>
        {showIcon && <Icon type="export" />}
        <span style={{ verticalAlign: 'middle' }}>
          { text }
        </span>
      </span>
      {visible && <Modal 
        visible={visible}
        title={ title }
        style={{ width: 500, minHeight: 200 }}
        onOverlayClick={this.close}
        onOk={this.onBtnClick}
        onCancel={this.close}
      >
        <Fragment>
            <Input
              value={captcha}
              onChange={this.handleOnChange}
              size="default"
              maxLength={4}
              style={{ width: 70, minWidth: 'unset', maxWidth: 'unset', marginRight: 12 }}
            />
            <Captcha api={api}/>
        </Fragment>
      </Modal>
      }
    </Fragment>
  );
}
}