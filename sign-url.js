module.exports = function(RED) {
    function RingCentralSignUrl(n) {
        RED.nodes.createNode(this, n);
        const node = this;
        node.creds = n.rccreds;
        node.credsNode = RED.nodes.getNode(node.creds);

        node.on('input', function(msg, send, done) {
            let signedUrl = '';
            const sign = () => {
                node.credsNode.platform.signUrl(msg.url)
                    .then((result) => signedUrl = result)
                    .catch((err) => node.error(err))
                    .finally(() => {
                        node.log(signedUrl)
                        msg.signedUrl = signedUrl;
                        send(msg);
                    });
                
            };

            if( !node.credsNode.platformReady ) {
                node.credsNode.addEventListener('rc-ready', function(evt) {
                    sign();
                    
                })
            }
            else {
                sign();
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
    RED.nodes.registerType("sign-url", RingCentralSignUrl);
}