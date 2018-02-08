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
import FloatingActionButton from 'material-ui/FloatingActionButton';


/* My libs / components */
import {Board} from '../logic/Board';

/* Actions */
import {set_render_interval} from '../actions';

/* Style and CSS */
import {outer_card_style, text_style} from '../style/js/styles';
import {flex_container, flex_90, flex_10} from '../style/js/Flex';


class Bounce extends Component {
    constructor(props) {
        super(props);
        this.board = new Board();
        this.render_id = setInterval(this.board.behave.bind(this.board), this.props.render_interval);
    }

    componentWillReceiveProps (next_props) {
        if (this.props.render_interval !== next_props.render_interval) {
            clearInterval(this.render_id);
            this.render_id = setInterval(this.board.behave.bind(this.board), next_props.render_interval);
        }
    }

    render() {
        console.log(this.props.render_interval);

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

                        <div style={flex_container}>
                            <div style={flex_90}>
                                <Slider min={1} max={1000} defaultValue={10} step={1}
                                        onChange={(event, new_value) => {this.props.set_render_interval(new_value)}}
                                />
                            </div>
                            <div style={flex_10}>
                                <FloatingActionButton backgroundColor="gray">
                                    <div style={{color: "white"}}>{this.props.render_interval}</div>
                                </FloatingActionButton>
                            </div>
                        </div>
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