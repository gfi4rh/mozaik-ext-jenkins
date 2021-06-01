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
    this.setState({
      stat : data.statistic
    });
  }
  
  render() {

    /*stat.passed, stat.skipped, stat.failed*/
    const { title } = this.props;
    const { stat } = this.state;


    let node = null

    if(stat){
      console.log(stat)

      let style = {
        passed : {
          "flex-grow" : stat.passed
        },
        skipped : {
          "flex-grow" : stat.skipped
        },
        failed : {
          "flex-grow" : stat.failed
        }
      }

      node = <div className="jenkins__test__container">
          <div className="jenkins__test__center jenkins__test__passed" title="Passed" style={style.passed}>{stat.passed}</div>
          <div className="jenkins__test__center jenkins__test__skipped" title="Skipped" style={style.skipped}>{stat.skipped}</div>
          <div className="jenkins__test__center jenkins__test__failed" title="Failed" style={style.failed}>{stat.failed}</div>
        </div>
    }
  
    
    return (
      <div className="jenkins__test__line">
				<div className="jenkins__test__name">{title}</div>
        {node}
			</div>
    );
    }


}

  Test.displayName = 'Test';
  
  reactMixin(Test.prototype, ListenerMixin);
  reactMixin(Test.prototype, Mozaik.Mixin.ApiConsumer);
  
  export default Test;