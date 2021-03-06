import React, { Component } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment                          from 'moment';

class Test extends Component {

  constructor(props){
    super(props)
    this.state = {
      stat : null,
      time : null,
      error : null
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

    if('message' in data){
      this.setState({
        error : "Job de test introuvable"
      })
    } else {
      if('error' in data){
        this.setState(data)
      } else {
        this.setState({
          stat : data.statistic,
          time : data.time.stop
        })
      }
      
    }
  }
  
  render() {

    /*stat.passed, stat.skipped, stat.failed*/
    const { title, url, name } = this.props;
    const { stat, time, error } = this.state;


    let node = null

    if(stat){
      node = 
      <div className="jenkins__test__container">
          <div className="jenkins__test__value">
            <div>
              <span style={{color : "#00c167"}}>{stat.passed}</span>
              &nbsp;|&nbsp;
              <span style={{color : "#e1b12c"}}>{stat.skipped}</span>
              &nbsp;| &nbsp;
              <span style={{color : "#bd0000"}}>{stat.failed}</span>
            </div>
            <div>
              {`Executé le ${moment(time).format("DD/MM/YYYY [à] HH:mm")}`}
            </div>

          </div>
          <div className="jenkins__test__bar">
            <div className="jenkins__test__passed" title="Passed" style={{flexGrow : stat.passed}}></div>
            <div className="jenkins__test__skipped" title="Skipped" style={{flexGrow :stat.skipped}}></div>
            <div className="jenkins__test__failed" title="Failed" style={{flexGrow : stat.failed}}></div>
          </div>
        </div>
    } else {
      if(error){
        node = <div className="jenkins__test__container">{error}</div>
      } else {
        node = <div className="jenkins__test__container">En cours ...</div>
      }
    }
  
    
    return (
      <div className="jenkins__test__line" onClick={e => window.open(`${url}/job/${name}/allure`)}>
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