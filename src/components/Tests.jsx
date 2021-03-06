import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import Test                            from './Test.jsx';


class Tests extends Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {

    const { tests, url } = this.props
    
    return (
      <div>
        <div className="widget__header">
          <span>
            <span className="widget__header__subject">{this.props.title}</span>
          </span>
        </div>
        <div className="widget__body">
          {tests.map(e => <Test title={e.title} name={e.name} url={url}/>)}
        </div>
      </div>
      );
    }
  }
  
  Tests.displayName = 'Tests';
  
  reactMixin(Tests.prototype, ListenerMixin);
  reactMixin(Tests.prototype, Mozaik.Mixin.ApiConsumer);
  
  export default Tests;
