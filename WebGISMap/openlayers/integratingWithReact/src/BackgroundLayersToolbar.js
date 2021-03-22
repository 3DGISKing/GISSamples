import React from 'react';
import './BackgroundLayersToolbar.css'

import $ from 'jquery';
import BackgroundLayerControl from './BackgroundLayerControl'
import config from './config'

console.log(config);





class BackgroundLayersToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = config['baseLayers'];
    }

    componentDidMount() {
        $("#backgroundlayerstoolbar").attr('data-role', 'collapsible').attr('data-theme', 'b');
    }

    render() {
        const baseLayers = config['baseLayers']['layers'];

        return (
            <div id = "backgroundlayerstoolbar">
                <h4>Background</h4>
                <ul id="basemapslist" data-role="listview" >
                    {
                        baseLayers.map((item, key) =>
                            <BackgroundLayerControl layer = {item} key ={key}/>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default BackgroundLayersToolbar;