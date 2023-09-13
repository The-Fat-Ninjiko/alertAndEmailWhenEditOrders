/**
 * @NApiVersion 2.x
 * @ScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/email', 'N/ui/dialog'], 
/** 
* @param {email} email
* @param {dialog} dialog   
*/
function(email, dialog) {
    function pageInit(context)
    {
        var order = context.currentRecord;
        var status = order.getText('orderstatus');

        if(context.mode == 'edit' && status == 'Billed')
        {
            dialog.alert({
                title: 'Edit Warning',
                message: 'This order has already been billed. Auditors will be notified of this action.'
            });

            email.send({
                author     : -5,
                recipients : -5,
                subject    : 'User has edited a billed order',
                body       : 'Order ' + order.getValue('tranid') + 'has been recently opened.'
            });
        }
    }

    return{
        pageInit: pageInit
    };
    
});