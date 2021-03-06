function CreateTableHead(props) {
  if (props.head.length < 1) return null;
  
  const thead = props.head;
  const hRow = thead.map((item, index) => 
    React.createElement("th", {
      onClick: () => props.sortData(item),
      key: index
    }, item)
  );
  return React.createElement("thead", null, 
    React.createElement("tr", null, hRow));
}

function CreateTableBody(props) {
  if (props.body.length < 1) return null;
  
  const tbody = props.body.filter(x => {
    for (let val in x) {
      if (typeof x[val] === "string") {
        if (x[val].toUpperCase().indexOf(props.filter.toUpperCase()) !== -1) return true;
      } 
      else {
        if (x[val].toString().indexOf(props.filter) !== -1) return true;
      }
    }
    return false;
  });
  const bRow = tbody.map((item, index) => {
    return React.createElement("tr", {key: index}, 
      Object.keys(item).map((key) => {
        return React.createElement("td", {
          key: key + index
        }, item[key]);
    }));
  });
  return React.createElement("tbody", null, bRow);
}

class Artifact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHead: [],
      dataBody: [],
      filterString: ''
    };
    this.getFile = this.getFile.bind(this);
    this.sortData = this.sortData.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.sortedColumn = "Bolagsnamn";
    this.reverseOrder = true;
  }

  updateSearch(event) {
    this.setState({
    filterString: event.target.value
    });
  }

  sortData(column) {
    this.reverseOrder = this.sortedColumn === column ? !this.reverseOrder : false;
    this.sortedColumn = column;
    
    this.setState({
      dataBody: this.state.dataBody.sort((a, b) => {
        let x, y;

        if (typeof a[column] === "string" && typeof b[column] === "string") {
          x = a[column].toUpperCase();
          y = b[column].toUpperCase();
        } else {
          x = a[column];
          y = b[column];
        }

        if (this.reverseOrder) {
          return x < y ? 1 : -1;
        } else {
          return x > y ? 1 : -1;
        }
      })
    });
  }

  getFile(e) {
    var rowSize = 10000;
    var file = e.target.files[0];
    var reader = new FileReader();

    if (file) {
      reader.readAsText(file);

      reader.onload = e => {
        var csv = e.target.result;
        var data = window.Papa.parse(csv, {
          header: true,
          preview: rowSize,
          complete: function (result) {
            result.data.forEach(row => {
              Object.keys(row).forEach(col => {
                if (!isNaN(row[col])) {
                  row[col] = parseFloat(row[col])
                }
              });
            });
          }
        });
        this.setState({
          dataHead: data.meta.fields,
          dataBody: data.data
        });
      };
    }
  }

  render() {
    return React.createElement("div", null, 
    React.createElement("h1", {id: "start"}, "React version 16.13.1"), 
    React.createElement("span", {id: "sortRandom"}, "sort"), 
    React.createElement("span", {id: "filterRandom"}, "filter"), 
    React.createElement("div", null, 
      React.createElement("input", {type: "file",
        onChange: this.getFile,
        accept: ".csv"}
      )
    ), 
    React.createElement("label", {htmlFor: "searchBox"}, "S\xF6k:", 
      React.createElement("input", {
        type: "text",
        id: "searchBox",
        value: this.state.filterString,
        onChange: this.updateSearch}
      )
    ), 
    React.createElement("table", null, 
      React.createElement(CreateTableHead, {
        head: this.state.dataHead,
        sortData: this.sortData}
      ), 
      React.createElement(CreateTableBody, {
        body: this.state.dataBody,
        filter: this.state.filterString}
      )
    ));
  }
}

ReactDOM.render( React.createElement(Artifact, null), document.getElementById('root'));