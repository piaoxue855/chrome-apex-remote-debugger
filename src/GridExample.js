/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";

var ExampleImage = require('./helpers/ExampleImage');
var FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');

const {Table, Column, Cell} = FixedDataTable;

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col].toLocaleString()}
  </Cell>
);

const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <a href="#">{data.getObjectAt(rowIndex)[col]}</a>
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

class ObjectDataExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000)
    };
  }

  onRowClick(rowNum) {
    this.props.onDataClick(this.state.dataList._cache[rowNum]);
  }

  render() {
    var {dataList} = this.state;
    return (
      <Table
        rowHeight={21}
        headerHeight={27}
        rowHeight={30}
        headerHeight={30}
        rowsCount={dataList.getSize()}
        width={500}
        height={500}
        onRowClick={(_, rowNum) => this.onRowClick(rowNum)}
        {...this.props}>
        <Column
          header={<Cell>First Name</Cell>}
          cell={<LinkCell data={dataList} col="firstName" />}
          fixed
          width={100}
        />
        <Column
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} col="lastName" />}
          fixed
          width={100}
        />
        <Column
          header={<Cell>City</Cell>}
          cell={<TextCell data={dataList} col="city" />}
          width={100}
        />
        <Column
          header={<Cell>Street</Cell>}
          cell={<TextCell data={dataList} col="street" />}
          width={200}
        />
        <Column
          header={<Cell>Zip Code</Cell>}
          cell={<TextCell data={dataList} col="zipCode" />}
          width={200}
        />
        <Column
          header={<Cell>Email</Cell>}
          cell={<LinkCell data={dataList} col="email" />}
          width={200}
        />
        <Column
          header={<Cell>DOB</Cell>}
          cell={<DateCell data={dataList} col="date" />}
          width={200}
        />
      </Table>
    );
  }
}

export default ObjectDataExample;