import React from 'react';
import ReactDOM from 'react-dom';

function CreateTable() {
    return (
        <table>
            <thead>
                <tr>
                    <th> 
                        head 1
                    </th>
                    <th> 
                        head 2
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        cell 1
                    </td>
                    <td>
                        cell 2
                    </td>
                </tr>
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
        
        if (file) {
            reader.readAsText(file);         
            reader.onload = (e) => {
                function parseNumbers (s) {
                    if (s === "") return s;
                    return parseFloat(s);
                };
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
                console.log(this.state.dataHead)
                console.log(this.state.dataBody)
                console.log(this);
          };
        }
    }

    render() {
      return (
        <div>
          <h1>React version 16.13.1</h1>
          <div><input type="file" onChange={this.getFile} accept=".csv" /></div>          
          <label htmlFor="searchBox">Sök: <input type="text" id="searchBox"/></label>
          <CreateTable/>
        </div>
      );
    }
  }

ReactDOM.render(<Artifact />, document.getElementById('root'));

