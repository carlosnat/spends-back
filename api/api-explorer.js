const apiExplorerDebugger = require('debug')('app:api-explorer');
const stringHash = require('string-hash');

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

const PhoneBook = require('./phoneBook/phoneBook.schema');

function explore_api (app) {
    const routes = parseEndpoints(app);
    routes.forEach(async (route) => {
        const service = {
            service: 'api-family',
            path: route.path,
            method: route.method,
            hash: stringHash(`api-family${route.path}${route.method}`)
        };
        try {
            await PhoneBook.findOneAndUpdate(service, service, {upsert: true});
        } catch (error) {
            apiExplorerDebugger('error', error);
        }
    });
}

module.exports = explore_api;