module.exports = function(RED) {
    function SmsReceive(n) {
        RED.nodes.createNode(this, n);
        const node = this;
        node.creds = n.rccreds;
        node.credsNode = RED.nodes.getNode(node.creds);
        node.page = n.page;
        node.perPage = n['per-page'];

        node.on('input', function(msg, send, done) {
            let response = [];
            const receiveSms = () => {
                node.status({fill:"green",shape:"ring",text:"receiving"});
                node.credsNode.platform.get(`/restapi/v1.0/account/~/extension/~/message-store?direction=Inbound&dateFrom=${msg.dateFrom}&page=${node.page}&perPage=${node.perPage}`, {
                        messageType: ['SMS']
                    })
                    .then((resp)=> resp.json())
                    .then((result)=> {
                        response = result;
                    })
                    .catch(function(err){
                        node.error(err);
                    })
                    .finally(function(){
                        node.status({fill:"green",shape:"dot",text:"complete"});
                        setTimeout(() => {
                            node.status({});
                        }, 2500);
                        msg.response = response;
                        send(msg);
                        if (done) {
                            done();
                        }
                    });
            };

            if( !node.credsNode.platformReady ) {
                node.credsNode.addEventListener('rc-ready', function(evt) {
                    receiveSms();
                })
            }
            else {
                receiveSms();
            }
            
        });

        node.on('close', function(removed, done) {
            if (removed) {
                // This node has been deleted
            } else {
                // This node is being restarted
            }
            done();        
        });
    }
    RED.nodes.registerType("sms-receive", SmsReceive);
}