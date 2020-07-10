import React from 'react';

class GifCard extends React.Component {
   
    render()
    {
        const {gif} = this.props;
        return (
            <li>
              <img src={gif.images.downsized.url} alt=""/>
            </li>
          )
    }
   
}

export default GifCard;