import { server } from "../src/app";

const port = normalizaPort(process.env.PORT || '1212');

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

server.listen(port, () => {
    console.log(`App listening on port ${port}`)
});