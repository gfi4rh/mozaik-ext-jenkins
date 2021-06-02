import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment                          from 'moment';

class Test extends Component {

  constructor(props){
    super(props)
    this.state = {
      stat : null
      time : null
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
      time : data.time.stop
    });
  }
  
  render() {

    /*stat.passed, stat.skipped, stat.failed*/
    const { title } = this.props;
    const { stat, time } = this.state;


    let node = null

    if(stat){
      node = 
      <div className="jenkins__test__container">
          <div className="jenkins__test__value">
            <div>
              <span style={{color : "#198452"}}>{stat.passed}</span>
              &nbsp;|&nbsp;
              <span style={{color : "#e1b12c"}}>{stat.skipped}</span>
              &nbsp;| &nbsp;
              <span style={{color : "#bd0000"}}>{stat.failed}</span>
            </div>
            <div>
              {`Exécuté le ${moment(time).format("DD/MM/YYYY [à] HH:mm")}`}
            </div>

          </div>
          <div className="jenkins__test__bar">
            <div className="jenkins__test__passed" title="Passed" style={{flexGrow : stat.passed}}></div>
            <div className="jenkins__test__skipped" title="Skipped" style={{flexGrow :stat.skipped}}></div>
            <div className="jenkins__test__failed" title="Failed" style={{flexGrow : stat.failed}}></div>
          </div>
        </div>
    } else {
      <div className="jenkins__test__container">En cours ...</div>
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