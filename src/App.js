import React from 'react';
import './App.css';
import './components/SearchField';
import './components/GifCard';
import SearchField from './components/SearchField';
import GifCard from './components/GifCard';

const RegularUrl = `http://api.giphy.com/v1/gifs/search?q=`;
const TrendingUrl = `http://api.giphy.com/v1/gifs/trending?api_key=933bSvsiYr89YZBd1agLpSZQoLQ6Gusl`;
const RandomUrl = `http://api.giphy.com/v1/gifs/random?api_key=933bSvsiYr89YZBd1agLpSZQoLQ6Gusl`;


class App extends React.Component
{
   constructor(props)
   {
       super(props)
       this.state = 
       {
            selectedOption: 'Regular',
            gifs:[],
            isLoading: false,
            error: null,
            
       };

   }

    handleOptionChange =  (changeEvent) =>{
        this.setState({
        selectedOption: changeEvent.target.value 
        });

        var API = '';
        if(changeEvent.target.value  === 'Regular')
            API = RegularUrl + document.getElementById("search").value + `&api_key=933bSvsiYr89YZBd1agLpSZQoLQ6Gusl`;
        else if(changeEvent.target.value  === 'Trending')
            API = TrendingUrl;
        else
            API = RandomUrl;
        fetch(API)
            .then(response => {
                
                if(response.ok)
                {
                    return response.json();
                }
                else{
                    throw new Error('wrong...');
                }
            })
            .then(data => {
                
                this.setState({
                    gifs: data.data, isLoading:false
                })
            })
            .catch(error => this.setState({error, isLoading:false}));
    }

    handleTermChange = (term) =>
    { 
            if(this.state.selectedOption !== 'Regular') return;
            this.setState({isLoading: true});
            
            this.setState({isLoading: true});
            fetch(RegularUrl + term.replace(/\s/g, '+') + `&api_key=933bSvsiYr89YZBd1agLpSZQoLQ6Gusl`)
            .then(response => {
                
                if(response.ok)
                {
                    return response.json();
                }
                else{
                    throw new Error('wrong...');
                }
            })
            .then(data => {
                
                this.setState({
                    gifs: data.data, isLoading:false
                })
            })
            .catch(error => this.setState({error, isLoading:false}));
           
    }
    render() {

        const { gifs, isLoading, error } = this.state;
 
        if (error ) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <div className="App">

                    <h1>GIPHY Search</h1>
                 
                    <div>
                        <label>
                            <input type="radio" id="Regular"  value="Regular" checked={this.state.selectedOption === 'Regular'} onChange={this.handleOptionChange} />Regular Search
                        </label>

                        <label>
                            <input type="radio" id="Trending"  value="Trending" checked={this.state.selectedOption === 'Trending'} onChange={this.handleOptionChange}/>Trending Search
                        </label>
                        <label>
                            <input type="radio" id="Random"  value="Random" checked={this.state.selectedOption === 'Random'} onChange={this.handleOptionChange}/>Random Search
                        </label>
                              
                        
                    </div>
                <div>
                    <SearchField onTermChange={this.handleTermChange}/>
                   
                </div>

                <div>
                    <ul>
                        {
                                Array.isArray(gifs) ?
                                (
                                    gifs.map((image, index) => {
                                        return (
                                            <GifCard key={image.id} gif={image} />
                                        )
                                     })    
                                )
                                :
                                (
                                       <GifCard key={gifs.id} gif={gifs} />  
                                )
                                   
                        }
                    </ul>
                </div>
            </div>
        );
    }
      
}
export default App;