/**
 * Created by michael on 07/02/2018.
 */

/* React */
import React, {Component} from 'react';

/* Redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/* External libs / components */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader} from 'material-ui/Card';
import Slider from 'material-ui/Slider';

/* My libs / components */
import {bounce_logic} from '../logic/bounce_logic';

/* Actions */
import {set_render_interval} from '../actions';

/* Style and CSS */
import {outer_card_style, text_style} from '../style/js/styles';

class Bounce extends Component {
    constructor(props) {
        super(props);
        this.render_id = setInterval(bounce_logic, this.props.render_interval);
    }

    componentWillReceiveProps (next_props) {
        if (this.props.render_interval !== next_props.render_interval) {
            clearInterval(this.render_id);
            setInterval(bounce_logic, this.props.render_interval);
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card style={outer_card_style}>
                        <CardHeader
                            title="Bounce"
                            subtitle="Click and see what happens."
                            textStyle={text_style}
                        />
                    </Card>

                    <Card style={outer_card_style}>
                        <CardHeader
                            title="Render speed"
                            subtitle="Choose the render speed of the balls."
                            textStyle={text_style}
                        />

                        <Slider min={1} max={1000} defaultValue={10} />
                    </Card>

                    <div id="main"><canvas id="canvas"></canvas></div>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        render_interval: state.render_interval
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        set_render_interval
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Bounce);