import React from 'react';
import ReactDOM from 'react-dom';


function TableRow(props) {
   return <tr>
            <td>{props.value.Bolagsnamn}</td>
            <td>{props.value.Land}</td>
            <td>{props.value.Lista}</td>
            <td>{props.value.Sektor}</td>
            <td>{props.value.Bransch}</td>
            <td>{props.value.Ticker}</td>
            <td>{props.value.Instrument}</td>
            <td>{props.value.Rapport}</td>
            <td>{props.value.Kursutveckling}</td>
            <td>{props.value.Direktavkastning}</td>
            <td>{props.value.PE}</td>
            <td>{props.value.PS}</td>
            <td>{props.value.PB}</td>
        </tr>
}

function CreateTable(props) {
    const thead = props.head;
    const hRow = thead.map((item, index) =>
        <th onClick={() => props.sortData(item)} key={index}>{item}</th>
    );

    const tbody = props.body;
    const bRow = tbody.map((item, index) =>
        <TableRow key={index} value={item} />
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
        this.sortData = this.sortData.bind(this);
        this.sortedColumn = "Bolagsnamn";
        this.reverseOrder = true;
    }

    sortData(column) {
        this.reverseOrder = (this.sortedColumn === column) ? !this.reverseOrder : false;
        this.sortedColumn = column;

        this.setState({
            dataBody: this.state.dataBody.sort((a,b) => {
                let x, y;

                if(typeof(a[column]) === "string" && typeof(b[column]) === "string") {
                    x = a[column].toUpperCase();
                    y = b[column].toUpperCase();
                }
                else{
                    x = a[column];
                    y = b[column];
                }

                if(this.reverseOrder) {
                    return (x < y) ? 1 : -1;  
                }
                else {
                    return (x > y) ? 1 : -1;   
                }            
            })
        })      
    }

    getFile (e) {
        var rowSize = 10; //set number of rows to parse;
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
                this.sortData(this.sortedColumn);                    
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
                sortData={this.sortData}
            />
            </div>
        );
    }
}

ReactDOM.render(<Artifact />, document.getElementById('root'));

