import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Textarea, Button } from "@tarojs/components"

import Dialog from "./Dialog"
import './AddQuestion.less'

export default class AddQuestion extends Component {

  state = {
    title: '',
    des: '',
    like: 0,
    appre: 0
  }

  onCancel = () => {
    this.props.onCloseQuestion && this.props.onCloseQuestion();
    console.log(this.props.onCloseQuestion)
  }

  onConfirm = () => {
    // 点击确定时采集数据、关闭窗体
    if (this.state.title && this.state.des) {
      let ques = this.state;
      this.props.onConfirmQuestion && this.props.onConfirmQuestion(ques)
      this.props.onCloseQuestion && this.props.onCloseQuestion();
    } else {
      Taro.showToast({title: '请输入标题与描述', icon:'none'})
    }
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  changeDes = (e) => {
    this.setState({
      des: e.target.value
    })
  }

  render() {
    return (
      <Dialog>
        <View className='add-question'>
          <View className='ques-body'>
            <Input focus onInput={this.changeTitle} className='ques-title' placeholder='请输入您的问题'/>
            <Textarea onInput={this.changeDes} className='ques-des' placeholder='请输入问题描述'/>
            <View className='btn-group'>
              <Button onClick={this.onCancel} className='btn-ques cancel'>取消</Button>
              <Button onClick={this.onConfirm} className='btn-ques confirm'>确定</Button>
            </View>
          </View>
        </View>
      </Dialog>
    )
  }

}
