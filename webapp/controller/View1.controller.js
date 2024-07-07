sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, Filter, FilterOperator, FilterType, JSONModel) {
        "use strict";

        return Controller.extend("com.techm.masterdetail.controller.View1", {
            
            onListPress: function (oEvent) {
                var o = oEvent.getSource().getNumber();
                var oFilter = new Filter("OrderID", FilterOperator.EQ, o);
                this.getView().byId("table").getBinding("items").filter(oFilter, FilterType.Application);
                this.getSplitObj().to(this.createId("detail"));
            },
            onPressProd: function (oEvent) {
                var that = this;
                var pid = oEvent.getSource().getBindingContext().getProperty("ProductID");
                var omodel = this.getOwnerComponent().getModel();
                omodel.read("/Products(" + pid + ")",
                    {
                        success: function (oData) {
                            var jdata = new JSONModel(oData);
                            that.getView().byId("productform").setModel(jdata);
                            that.getSplitObj().to(that.createId("proddetail"));
                        }, error: function (oError) {
                            console.log(oError)
                        }
                    })
            },
            getSplitObj: function () {
                var result = this.byId("SplitCont");
                return result;
            }
        });
    });
