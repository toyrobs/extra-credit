import React from 'react';

class SearchField extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange = (evt) => {
        this.setState({term : evt.target.value});
        if(evt.keyCode === 13)
          this.props.onTermChange(evt.target.value);
    }


    render() {
        return (
            <div className="search">
                <input type="text" id = "search" onKeyDown={this.onInputChange} placeholder="Search input goes here"/>
                
            </div>
        );
    }
}

export default SearchField;