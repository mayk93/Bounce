/**
 * Created by michael on 07/02/2018.
 */

/* React */
import React, {Component} from 'react';

/* External libs / components */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader} from 'material-ui/Card';

/* Style and CSS */
import {outer_card_style, text_style} from '../style/js/styles';
import {flex_container} from '../style/js/Flex';


class Bounce extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Card style={outer_card_style}>
                    <CardHeader
                        title="Bounce"
                        subtitle="Click and see what happens."
                        textStyle={text_style}
                    />
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default Bounce;