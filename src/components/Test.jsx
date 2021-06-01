import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';

class Test extends Component {

  constructor(props){
    super(props)
    this.state = {
      stat : null
    } 
  }


  getApiRequest() {

    const { name, url } = this.props;

    return {
      id:     `jenkins.test.${ name }`,
      params: {
        url : url,
        name : name
      }
    };
  }
  
  onApiData(data) {
    console.log(data)
    this.setState({
      stat : data.statistic
    });
  }
  
  render() {

    /*stat.passed, stat.skipped, stat.failed*/
    const { title } = this.props;
    const { stat } = this.state;
  
    
    return (
      <div className="jenkins__test__line">
				<div className="jenkins__test__name">{title}</div>
        { stat && 
          <div className="jenkins__test__container">
            <div className="jenkins__test__passed" title="Passed" style={{flex-grow : stat.passed}}></div>
            <div className="jenkins__test__skipped" title="Skipped" style={{flex-grow : stat.skipped}}></div>
            <div className="jenkins__test__failed" title="Failed" style={{flex-grow : stat.failed}}></div>
          </div>
        }
			</div>
    );
    }


}

  Test.displayName = 'Test';
  
  reactMixin(Test.prototype, ListenerMixin);
  reactMixin(Test.prototype, Mozaik.Mixin.ApiConsumer);
  
  export default Test;