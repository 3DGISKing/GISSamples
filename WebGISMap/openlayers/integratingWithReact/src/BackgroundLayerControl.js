import React from 'react';

class BackgroundLayerControl extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        const {props} = this;

        return (
            <React.Fragment>
                <li data-theme='b' onClick={alert()}> </li>
                <a > test
                  <img src={this.props.layer.thumbgallery}/>
                  <h3>{props.layer.label}</h3>
                  <p>{props.layer.title}</p>
                </a>
            </React.Fragment>
        )
    }
}

export default BackgroundLayerControl;