// url:port/#key=value&key2=value2
// With B64: url:port/#key=value&key2=b64_<value>

class ClientParameters {
  params = [];
  constructor() {
    this.params = this.getParams();
  }

  /**
   * getParams
   * Returns key:value array of params provided by hash
   * @returns array
   */
  getParams() {
    let path = location.hash.split('#')[1];
    if (path == '') return null;
    let paramsEncoded = path.split('&');
    let params = {};
    for (const param of paramsEncoded) {
      let [key, value] = param.split('=');

      if (value.includes('b64_')) {
        value = value.replace('b64_', '');
        value = atob(value);
      }

      params[decodeURI(key)] = value
    }

    return params;
  }
}

function outputAllParams(params) {
  for (const key of Object.keys(params)) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<p>${key} = ${params[key]}</p>`
    );
  }
}

location.hash = '#content=mome&is=value';
let c = new ClientParameters();
let params = c.getParams();
outputAllParams(params);
