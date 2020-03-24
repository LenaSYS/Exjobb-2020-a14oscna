import React from 'react';
import ReactDOM from 'react-dom';

function CreateTable(props) {
    const thead = props.head;
    const hRow = thead.map((item, index) =>
        <th key={index}>{item}</th>
    );

    const tbody = props.body;
    console.log(tbody[0]);
    const bRow = tbody.map((item, index) =>
        <tr> {/* need to fix key */}
            <td key={item+index}>{item.Bolagsnamn}</td>
            <td key={item+index}>{item.Land}</td>
            <td key={item+index}>{item.Lista}</td>
            <td key={item+index}>{item.Sektor}</td>
            <td key={item+index}>{item.Bransch}</td>
            <td key={item+index}>{item.Ticker}</td>
            <td key={item+index}>{item.Instrument}</td>
            <td key={item+index}>{item.Rapport}</td>
            <td key={item+index}>{item.Kursutveckling}</td>
            <td key={item+index}>{item.Direktavkastning}</td>
            <td key={item+index}>{item.PE}</td>
            <td key={item+index}>{item.PS}</td>
            <td key={item+index}>{item.PB}</td>
        </tr>
    ); 
    return (       
        <table>
            
            <thead>
                <tr>
                    {hRow}
                </tr>
            </thead>
            <tbody>
                    {bRow}
            </tbody>
        </table>
    );
}

  class Artifact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHead: [],
            dataBody: []
        };
        this.getFile = this.getFile.bind(this);
    }

    getFile (e) {
        var rowSize = 100; //set number of rows to parse;
        var file = e.target.files[0];
        var reader = new FileReader();
        function parseNumbers (s) {
            if (s === "") return s;
            return parseFloat(s);
        };
        
        if (file) {
            reader.readAsText(file);         
            reader.onload = (e) => {
                
                var csv = e.target.result;
                var data = window.Papa.parse(csv, {
                    header : true, 
                    preview: rowSize,
                    complete: function(result){
                        result.data.forEach(x => {
                            x.Kursutveckling = parseNumbers(x.Kursutveckling);
                            x.Direktavkastning = parseNumbers(x.Direktavkastning);
                            x.PE = parseNumbers(x.PE);
                            x.PS = parseNumbers(x.PS);
                            x.PB = parseNumbers(x.PB);
                        });
                    }
                });      
                this.setState({
                    dataHead: data.meta.fields,
                    dataBody: data.data
                });                     
/*                 console.log(this.state.dataHead)
                console.log(this.state.dataBody)
                console.log(this); */
          };
        }
    }

    render() {
        return (
            <div>
            <h1>React version 16.13.1</h1>
            <div><input type="file" onChange={this.getFile} accept=".csv" /></div>          
            <label htmlFor="searchBox">Sök: <input type="text" id="searchBox"/></label>
            <CreateTable 
                head={this.state.dataHead}
                body={this.state.dataBody}
            />
            </div>
        );
    }
  }

ReactDOM.render(<Artifact />, document.getElementById('root'));

