import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import Griddle from  'griddle-react';
import { BootstrapPager } from 'griddle-react-bootstrap';
import LinkComponent from '../table-griddle/LinkComponent';
import ActionsComponent from '../table-griddle/ActionsComponent';

class BlogGridExternal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            results: [],
            currentPage: 0,
            maxPages: 0,
            externalResultsPerPage: props.resultsPerPage,
            externalSortColumn: null,
            externalSortAscending: true,
            columns: [
                "id", "title", "content", "author", "publishedDate", "actions"
            ],
            columnsMetaData: [
                { "columnName": "id", "displayName": "ID" },
                { "columnName": "title", "displayName": "Title", "customComponent": LinkComponent },
                { "columnName": "content", "displayName": "Content" },
                { "columnName": "author", "displayName": "Author" },
                { "columnName": "publishedDate", "displayName": "Date" },
                {
                    "columnName": "actions",
                    "displayName": " ",
                    "locked": "true",
                    "cssClassName": "grid-actions-column",
                    "customComponent": ActionsComponent,
                    "deleteCallback": props.deleteCallback
                }
            ]
        };

        this.setPage = this.setPage.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.setPageSize = this.setPageSize.bind(this);

        this.getExternalData(); //get the data constructor
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            results: nextProps.posts,
            maxPages: Math.ceil(nextProps.count/this.state.externalResultsPerPage)
        });
    }

    //what page is currently viewed
    setPage(index){
        //This should interact with the data source to get the page at the given index
        index = index > this.state.maxPages ? this.state.maxPages : index < 1 ? 1 : index + 1;
        this.getExternalData(index);
    }

    //this will handle how the data is sorted
    sortData(sort, sortAscending, data){
        //ToDo: missing implementation
    }

    //this changes whether data is sorted in ascending or descending order
    changeSort(sort, sortAscending){
        //ToDo: missing implementation
    }

    //this method handles the filtering of the data
    setFilter(filter){
        //ToDo: missing implementation
    }

    //this method handles determining the page size
    setPageSize(size){
        //ToDo: missing implementation
    }

    getExternalData(page){
        page = page||1;

        this.props.actions.loadPosts(page)
            .then(() => {
                this.setState({
                    currentPage: page-1
                });
            });
    }

    render(){
        return (
            <Griddle
                    useGriddleStyles={this.props.useGridStyles}
                    tableClassName="table table-striped table-hover"
                    showFilter={this.props.showFilter}
                    columns={this.state.columns}
                    columnMetadata={this.state.columnsMetaData}
                    useCustomPagerComponent={this.props.useCustomPagerComponent}
                    customPagerComponent={BootstrapPager}
                    useExternal={true}
                    externalSetPage={this.setPage}
                    enableSort={false}
                    externalSetPageSize={this.setPageSize}
                    externalMaxPage={this.state.maxPages}
                    externalChangeSort={this.changeSort}
                    externalSetFilter={this.setFilter}
                    externalCurrentPage={this.state.currentPage}
                    results={this.state.results}
                    resultsPerPage={this.state.externalResultsPerPage}
                    externalSortColumn={this.state.externalSortColumn}
                    externalSortAscending={this.state.externalSortAscending}
            />
        );
    }
}

BlogGridExternal.defaultTypes = {
    resultsPerPage: 5,
    useGridStyles: true,
    showFilter: false,
    useCustomPagerComponent: false
};

BlogGridExternal.propTypes = {
    actions: PropTypes.object.isRequired,
    resultsPerPage: PropTypes.number,
    useGridStyles: PropTypes.bool,
    showFilter: PropTypes.bool,
    useCustomPagerComponent: PropTypes.bool,
    deleteCallback: PropTypes.func
};

function mapStatesToProps(state, ownProps) {
    return {
        state: state,
        posts: state.posts,
        count: state.count
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(BlogGridExternal);

