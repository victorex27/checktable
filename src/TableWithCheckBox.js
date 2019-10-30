import propTypes from "prop-types";
import React, { Component, Fragment } from "react";

import { formatter } from "./formatter";

class TableWithCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckedItems: [],
      name: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { selectedCheckedItems, name } = this.props;

    this.setState({
      selectedCheckedItems,
      name
    });
  }

  onClick(e) {
    e.preventDefault();
    const { handleCheckboxAllClick } = this.props;

    const text = e.target.id;
    handleCheckboxAllClick(text);
  }

  onChange(e) {
    const { handleCheckboxChange, dataBody } = this.props;

    const { id, checked } = e.target;

    const selectedItem = dataBody.find(body => Number(body.id) === Number(id));
    handleCheckboxChange({ item: selectedItem, checked });
  }

  render() {
    const {
      dropDownItemsGroup,
      headerCheckBoxId,
      dataHeader,
      dataBody,
      selectedCheckedItems
    } = this.props;

    console.log("selected checked items ", selectedCheckedItems);

    let selectedCheckedItemsId = selectedCheckedItems.reduce((arr, item) => {
      arr.push(item.id);

      return arr;
    }, []);

    let f = formatter(dataHeader, dataBody);
    const headerTitle = f.headerTitle;

    let headerName = f.headerName;

    const formatedBody = f.dataBody;

    let tableItems = formatedBody.map((item, index) => {
      let isChecked = false;

      if (selectedCheckedItemsId.includes(item.id)) {
        isChecked = true;
      }
      let row = [];
      headerName.forEach((name, index) => {
        row.push(<td key={index}> {item[name]} </td>);
      });

      return (
        <tr key={index}>
          <td>
          <span className="custom-control custom-control-nolabel custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={this.onChange.bind(this)}
              checked={isChecked}
              disabled={false}
              id={item.id}
            />
            <label className="custom-control-label" htmlFor={item.id}></label>
          </span>
          </td>
          {row}
        </tr>
      );
    });

    let isChecked = false;

    if (selectedCheckedItems.length === dataBody.length) {
      isChecked = true;
    }

    let firstGroupItems = dropDownItemsGroup[0].map((text, index) => {
      const hrefValue = "#";
      return (
        <Fragment key={index}>
          <div className="dropdown-divider"></div>

          <a
            className="dropdown-item"
            onClick={this.onClick.bind(this)}
            id={text}
            href={hrefValue}
          >
            {text}
          </a>
        </Fragment>
      );
    });

    let firstGroupItemsLength = firstGroupItems.length;

    const otherGroupItems = dropDownItemsGroup
      .slice(1)
      .map((dropDownItems, index) => {
        let values = [];

        // eslint-disable-next-line no-unused-vars
        for (const [subIndex, text] of dropDownItems.entries()) {
          let keyIndex = subIndex + index + firstGroupItemsLength;
          const hrefValue = "#";

          values.push(
            <Fragment key={keyIndex}>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                onClick={this.onClick.bind(this)}
                href={hrefValue}
              >
                {text}
              </a>
            </Fragment>
          );
        }
        return values;
      });

    const _items = headerTitle.map((detail, index) => (
      <td key={index}> {detail} </td>
    ));

    return (
      <table className="table table-striped">
        <thead className="thead-">
          <tr>
            <td>
              <div className="thead-dd dropdown">
                <span className="custom-control custom-control-nolabel custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={this.onChange.bind(this)}
                    checked={isChecked}
                    disabled={true}
                    id={headerCheckBoxId}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={headerCheckBoxId}
                  ></label>
                </span>
                <div
                  className="thead-btn"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="fa fa-caret-down"></span>
                </div>
                {firstGroupItems}
                {otherGroupItems}
              </div>
            </td>
            {_items}
          </tr>
        </thead>

        <tbody>{tableItems}</tbody>
      </table>
    );
  }
}

TableWithCheckBox.propTypes = {
  dropDownItemsGroup: propTypes.array,
  headerCheckBoxId: propTypes.string,
  dataHeader: propTypes.array.isRequired,
  dataBody: propTypes.array.isRequired,
  selectedCheckedItems: propTypes.array.isRequired
};

export default TableWithCheckBox;
