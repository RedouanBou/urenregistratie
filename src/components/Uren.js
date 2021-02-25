import React, { PureComponent } from 'react';
import '../App.css';

import { Container, Table } from 'semantic-ui-react';

import axios from 'axios';
import ReactPaginate from 'react-paginate';

class Uren extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0
		}

        this.handlePageClick = this.handlePageClick.bind(this);
	}

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    };

    loadMoreData() {
		const data = this.state.orgtableData;
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
    }

	componentDidMount() {
		this.getData();
	}

    getData() {
        axios
            .get("https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d")
            .then(res => {
                var data = res.data;
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgtableData :res.data,
                    tableData:slice
                })
            });
    }

	render() {
		return (
			<Container className="container">
                <h1>Uren Registratie - DEVENTit</h1>
                <hr />
				<Table celled className="data-table">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Datum</Table.HeaderCell>
							<Table.HeaderCell>Dag</Table.HeaderCell>
							<Table.HeaderCell>Tijd</Table.HeaderCell>
							<Table.HeaderCell>Taken</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{
							this.state.tableData.map((obj, i) => {
								return (
									<Table.Row>
											<Table.Cell>{obj.datum}</Table.Cell>
											<Table.Cell>{obj.dag}</Table.Cell>
											<Table.Cell>{obj.begintijd} - {obj.eindtijd}</Table.Cell>
											<Table.Cell>{obj.werkzaamheden}</Table.Cell>
									</Table.Row>	
								)
							})
						}
					</Table.Body>
				</Table>
                <ReactPaginate 
                    previousLabel={"Vorige"}
                    nextLabel={"Volgende"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
			</Container>
		)
	}
}

export default Uren;
