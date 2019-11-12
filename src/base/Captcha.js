import React, { Component } from 'react';
import styled from 'styled-components';

const CaptchaDiv = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  .captcha-image {
    height: 30px;
    vertical-align: middle;
  }
  .captcha-tips {
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
  }
`;
export default class Captcha extends Component {

  static defaultProps = {
    api: '/api/getCaptcha.json',
  };

  state = {
    imageUrl: null,
  };

  componentDidMount() {
    this.refreshCaptcha();
  }
  refreshCaptcha = async () => {
    let { api } = this.props;
    const result = await fetch(api).then(res => res);
    const imageUrl = result.data && result.data.imgLink
    this.setState({
      imageUrl,
    });
  };

  render() {
    const { className, style } = this.props;
    const { imageUrl } = this.state;

    return (
      <CaptchaDiv className={className} style={style} onClick={this.refreshCaptcha}>
        < img className="captcha-image" src={imageUrl} alt='验证码'/>
        <span className="captcha-tips">重新获取验证码</span>
      </CaptchaDiv>
    );
  }
}