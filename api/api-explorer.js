const apiExplorerDebugger = require('debug')('app:api-explorer');

const regexpExpressRegexp = /^\/\^\\\/(?:(:?[\w\\.-]*(?:\\\/:?[\w\\.-]*)*)|(\(\?:\(\[\^\\\/]\+\?\)\)))\\\/.*/
const regexpExpressParam = /\(\?:\(\[\^\\\/]\+\?\)\)/g

const hasParams = (pathRegexp) => {
    return regexpExpressParam.test(pathRegexp);
}

const getRouteMethods = (route) => {
    let method = '';

    for (let r_method in route.methods) {
        if (r_method === '_all') continue
        method = (r_method.toUpperCase());
    }

    return method;
}

const parseExpressRoute = (route, basePath) => {
    return {
        path: basePath + (basePath && route.path === '/' ? '' : route.path),
        method: getRouteMethods(route)
    };
}

const parseExpressPath = (expressPathRegexp, params) => {
    let parsedPath = regexpExpressRegexp.exec(expressPathRegexp);
    const parsedRegexp = expressPathRegexp;
    const paramIdx = 0;

    while (hasParams(parsedRegexp)) {
        parsedRegexp = parsedRegexp.toString().replace(/\(\?:\(\[\^\\\/]\+\?\)\)/, ':' + params[paramIdx].name);
        paramIdx++;
    }

    if (parsedRegexp !== expressPathRegexp) {
        parsedPath = regexpExpressRegexp.exec(parsedRegexp);
    }

    parsedPath = parsedPath[1].replace(/\\\//g, '/');

    return parsedPath;
}

const parseEndpoints = (app, basePath, endpoints) => {

    const stack = app.stack || (app._router && app._router.stack);
  
    endpoints = endpoints || [];
    basePath = basePath || '';
  
    stack.forEach(function (stackItem) {
        if (stackItem.route) {
            endpoints.push(parseExpressRoute(stackItem.route, basePath));
        } else if (stackItem.name === 'router' || stackItem.name === 'bound dispatch') {
            if (regexpExpressRegexp.test(stackItem.regexp)) {
                const parsedPath = parseExpressPath(stackItem.regexp, stackItem.keys);
                parseEndpoints(stackItem.handle, basePath + '/' + parsedPath, endpoints);
            } else {
                parseEndpoints(stackItem.handle, basePath, endpoints);
            }
        }
    })
  
    return endpoints;
  }

function explore_api (app) {
    const routes = parseEndpoints(app);
    routes.forEach(route => {
        apiExplorerDebugger('route', route);
    })
}

module.exports = explore_api;