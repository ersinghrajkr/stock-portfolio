

module.exports = {
    appStatus
}
function appStatus(req, res){
    res.send({"appStatus": "Hello stock-portfolio!!!"});
}
