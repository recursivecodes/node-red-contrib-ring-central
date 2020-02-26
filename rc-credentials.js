module.exports = function(RED) {
    const SDK = require('@ringcentral/sdk').SDK;

    function RingCentralCredentials(n) {
        RED.nodes.createNode(this,n);
        
        var node = this;
        node.username = node.credentials.username;
        node.server = node.credentials.server;
        node.clientid = node.credentials.clientid;
        node.extension = node.credentials.extension;

        const rcsdk = new SDK({
            server: node.credentials.server,
            clientId: node.credentials.clientid,
            clientSecret: node.credentials.clientsecret
        });
        
        node.platformReady = false;

        node.platform = rcsdk.platform();
        node.platform.login({
                username: node.credentials.username,
                password: node.credentials.password,
                extension: node.credentials.extension
            })
            .then(function(resp) {
                node.platformReady = true;
                node.emit("rc-ready", {
                    platform: node.platform
                });
            })
            .catch(function(err) {
                node.error(err);
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
    RED.nodes.registerType("rc-credentials", RingCentralCredentials, {
        credentials: {
            username: {type:"text"},
            extension: {type:"text"},
            password: {type:"password"},
            clientid: {type:"text"},
            clientsecret: {type:"password"},
            server: {type:"text"}
        }
    });
}