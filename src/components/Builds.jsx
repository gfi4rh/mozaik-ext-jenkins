import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import Build                           from './Build.jsx';


class Builds extends Component {

    constructor(props) {
        super(props);   
    }

    render() {

        const { jobs, url } = this.props;

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                </div>
                <div className="widget__body">
                    {jobs.map(e => <Build name={e.name} url={url} title={e.title}/>)}
                </div>
            </div>
        );
    }
}

Builds.displayName = 'Builds';

reactMixin(Builds.prototype, ListenerMixin);
reactMixin(Builds.prototype, Mozaik.Mixin.ApiConsumer);

export default Builds;
