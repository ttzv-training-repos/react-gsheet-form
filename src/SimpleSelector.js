import { Component } from "react";
import Form from 'react-bootstrap/Form';

class SimpleSelector extends Component{
    constructor(props){
        super(props);
    }

    render () {
        let optionsList = this.props.options;
        if (optionsList) {
            optionsList = this.props.options.map( (option, index) => (
                <option key={`this.props.name-${index}`}>{option}</option>
            ));
        }
        return (
            <Form.Group>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control as="select" size="md"
                                name={this.props.name} 
                                onChange={this.props.onChange} 
                                required={this.props.required}>
                    <option></option>
                    {optionsList}
                </Form.Control>
            </Form.Group>
        )
    }
}
export default SimpleSelector;