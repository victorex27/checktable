import React, { Component } from "react";


import TableWithCheckBox from "./TableWithCheckBox";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckedItems: [],
      dataBody: [],
      dataHeader: [],
      dropDownItemsGroup: []
    };
    
  }

  handleCheckboxAllClick(text) {
    const { dataBody } = this.state;


    if (text === "Select all") {
      this.setState({
        selectedCheckedItems: [ ...dataBody]
      });
    } else if (text === "UnSelect all") {
      this.setState({
        selectedCheckedItems: []
      });
    }

    
  }

  handleCheckboxChange(itemObject) {
    //const { items } = this.props;

    const { checked, item } = itemObject;
    const { selectedCheckedItems } = this.state;
    if (checked) {
      const checkedItems = [...selectedCheckedItems, item];


      this.setState({
        selectedCheckedItems: checkedItems
      });
      return;
    }

    const checkedItems = selectedCheckedItems.filter(
      obj => Number(obj.id) !== Number(item.id)
    );
    
    this.setState({
      selectedCheckedItems: checkedItems
    });
  }

  componentDidMount() {
    const dataHeader = [
      {
        name: "number",
        title: "Account Number",
        isCurrency: false,
        isDate: false,
        isNumber: true
      },
      {
        name: "type",
        title: "Account Type",
        isCurrency: false,
        isDate: false,
        isNumber: false
      },
      {
        name: "sol",
        title: "Account Sol",
        isCurrency: false,
        isDate: false,
        isNumber: false
      },
      {
        name: "currency",
        title: "Currency",
        isCurrency: true,
        isDate: false,
        isNumber: false
      },
      {
        name: "date",
        title: "Date",
        isCurrency: false,
        isDate: true,
        isNumber: false
      }
    ];

    const dataBody = [
      {
        id: 5,
        number: "1234567890",
        sol: "115",
        type: "Savings Account",
        currency: "100",
        date: "11/9/2018"
      },
      {
        id: 6,
        number: "1234586890",
        type: "Domicilliary Account",
        sol: "116",
        currency: "200",
        date: "2/20/2019"
      },
      {
        id: 8,
        number: "1234567890",
        type: "Savings Account",
        sol: "117",
        currency: "300",
        date: "3/3/2019"
      },
      {
        id: 10,
        number: "1847567890",
        type: "Savings Account",
        sol: "118",
        currency: "400",
        date: "3/25/2015"
      },
      {
        id: 11,
        number: "123444890",
        type: "Savings Account",
        sol: "119",
        currency: "500",
        date: "3/24/2018"
      },
      {
        id: 12,
        number: "1234544490",
        type: "Savings Account",
        sol: "112",
        currency: "600",
        date: "2/5/2012"
      }
    ];

    

    this.setState({
      dataBody,
      dataHeader
    });
  }


  render() {
    const { dataHeader, dataBody,selectedCheckedItems } = this.state;


    const dropDownItemsGroup = [
        ["Select all", "UnSelect all"],
        ["Bulk remove", "Bulk edit", "Separate actions"]
      ];
    

    return (
      <div>
        <TableWithCheckBox
          dataHeader={dataHeader}
          dataBody={dataBody}
          headerCheckBoxId="table2"
          name="bank_table2"
          dropDownItemsGroup={dropDownItemsGroup}
          selectedCheckedItems={selectedCheckedItems}
          handleCheckboxChange={this.handleCheckboxChange.bind(this)}
          handleCheckboxAllClick={this.handleCheckboxAllClick.bind(this)}
          
        />
      </div>
    );
  }
}

export default App;
