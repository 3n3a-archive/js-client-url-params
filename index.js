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
    if (path == '') return Null;
    let paramsEncoded = path.split('&');
    let params = [];
    for (const param of paramsEncoded) {
      let [key, value] = param.split('=');

      if (value.includes('b64_')) {
        value = value.replace('b64_', '');
        value = atob(value);
      }

      params.push({ key: decodeURI(key), value: value });
    }

    return params;
  }
}

// location.hash = '#your=mome&is=value';
let c = new ClientParameters();
for (const param of c.getParams()) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<p>${param.key} = ${param.value}</p>`
  );
}
