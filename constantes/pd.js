module.exports = (app) => {
    const constantesPd = {
        connection :'mongodb://localhost:27017/produtos',
        connectionParams:  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    }
    return constantesPd
}