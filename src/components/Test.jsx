import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';

class Test extends Component {

  constructor(props){
    super(props)
    this.state({})
  }


  getApiRequest() {

    const { title, name, url } = this.props;

    return {
      id:     `jenkins.test.${ name }`,
      params: {
        url : url,
        name : name
      }
    };
  }
  
  onApiData(test) {
    console.log(test)
    /*this.setState({
      test : test.statistic
    });*/
  }
  
  render() {

    /*stat.passed, stat.skipped, stat.failed*/
    const { name } = this.props;
  
    
    return (
      <div className="jenkins__test__line">
				<div className="jenkins__test__name">{name}</div>
			</div>
    );
    }


}

  Test.displayName = 'Test';
  
  reactMixin(Test.prototype, ListenerMixin);
  reactMixin(Test.prototype, Mozaik.Mixin.ApiConsumer);
  
  export default Test;