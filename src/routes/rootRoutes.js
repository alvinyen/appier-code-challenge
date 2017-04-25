module.exports = (app) => {
    app.get('/test', (req, res) => {
        console.log('http get request test ok');
        res.send('http get request test ok');
    });
}