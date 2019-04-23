import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.less'

import like from '../../img/like.png';
import appre from '../../img/appre.png'

import AddQuestion from "./AddQuestion"

let getStore = (key) => {
  let str = Taro.getStorageSync(key)
  return str ? JSON.parse(str) : []
}

let setStore = (key, obj) => {
  let str = obj;
  if (typeof(obj) === 'object') {
    str = JSON.stringify(obj);
  }
  Taro.setStorageSync(key, str);
}

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    showQuesModal: false,
    quesList: getStore('questions'),
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toggleQuestion = () => {
    this.setState(prevState => ({ showQuesModal: !prevState.showQuesModal }))
  }

  getQuestion = (ques) => {
    // console.log(ques);
    // 进行问题校验
    this.setState((prevState) => ({
      quesList: [...prevState.quesList, ques]
    }), () => {
      console.log(this.state.quesList);
      setStore('questions', this.state.quesList);
    })
  }


  render () {
    let { quesList } = this.state;
    return (
      <View className='index'>
        <View className='title'>Taro问答实例</View>
        <View className='ques-list'>
          {
            quesList.map((item, index) => {
              return (
                <View key={index} className='ques'>
                  <View className='ques-left'>
                    <View className='ques-title'>问题:{item.title}</View>
                    <View className='ques-des'>描述:{item.des}</View>
                  </View>
                  <View className='ques-right'>
                    <Image className='right-img' src={like} onClick={this.addLike} />
                    <Text>{item.like}</Text>
                    <Image className='right-img' src={appre} />
                    <Text>{item.appre}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
        {this.state.showQuesModal && <AddQuestion onCloseQuestion={this.toggleQuestion} onConfirmQuestion={this.getQuestion} />}
        <Button onClick={this.toggleQuestion} className='btn-question'>提问</Button>
      </View>
    )
  }
}



