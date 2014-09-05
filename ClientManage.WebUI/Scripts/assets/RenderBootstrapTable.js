/***************************************
 * Created by samhwang1990@gmail.com on 14-9-2.
 ***************************************/

define(["BootstrapTable",'underscore'],function(BootstrapTable,_){
	function RenderBootstrapTable(options){
		var tableDefault = {
			striped:true,
			striped: true,
			search: true,
			showColumns: true,
			pagination: true,
			sidePagination:"client",
			pageSize: 10,
			pageList: [10, 25, 50, 100, 200],
			minimumCountColumns:2,
			url: undefined,
			formatLoadingMessage:function(){
				return '数据加载中，请稍后！'
			},
			formatRecordsPerPage:function(pageNumber){
				return pageNumber + '&nbsp;条每页';
			},
			formatShowingRows:function(pageFrom, pageTo, totalRows){
				//Showing %s to %s of %s rows
				return '第&nbsp;' + pageFrom + '&nbsp;条到第&nbsp;' + pageTo + '&nbsp;条&nbsp;共&nbsp;' + totalRows + '&nbsp;条&emsp;';
			},
			formatNoMatches:function(){
				return '没有找到符合条件的记录！'
			}
		}

		this.options = $.extend({},tableDefault,options,typeof options === 'object' && options);
	}

	RenderBootstrapTable.prototype.RenderFromData = function($el, data, columns, callback){
		var tableOptions = this.options;
		$el.bootstrapTable({
			data:data,
			columns:columns,
			striped: tableOptions.striped,
			pagination: tableOptions.pagination,
			sidePagination:tableOptions.sidePagination,
			pageSize: tableOptions.pageSize,
			pageList: tableOptions.pageList,
			search: tableOptions.search,
			showColumns: tableOptions.showColumns,
			minimumCountColumns: tableOptions.minimumCountColumns,
			formatLoadingMessage:tableOptions.formatLoadingMessage,
			formatRecordsPerPage:tableOptions.formatRecordsPerPage,
			formatShowingRows:tableOptions.formatShowingRows,
			formatNoMatches:tableOptions.formatNoMatches
		});
		if(callback !== undefined && _.isFunction(callback)){
			callback($el);
		}

	}

	return RenderBootstrapTable;
})
