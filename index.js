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
    let path = location.hash.split('#')[1] ?? '';
    if (path == '') return null;
    let paramsEncoded = path.split('&');
    let params = {};
    for (const param of paramsEncoded) {
      let [key, value] = param.split('=');

      if (value.includes('b64_')) {
        value = value.replace('b64_', '');
        value = atob(value);
      }

      params[decodeURI(key)] = value;
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

function renderContent(body, head = null) {
  if (head) {
    document.head.innerHTML = head;
  }
  document.body.innerHTML = body;
}

// urlsafe b64
function safeBtoA(string) {
  return btoa(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

//location.hash = '#body=mome&head=value';
// example: #body=b64_PGltZyBzcmM9Imh0dHBzOi8vc291cmNlLnVuc3BsYXNoLmNvbS9yYW5kb20iLz4&head=b64_PGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3NwY3NzIj4
let c = new ClientParameters();
let params = c.getParams();
let hasParams = params != null;
if (hasParams && params.hasOwnProperty('body')) {
  let head = params.hasOwnProperty('head') ? params.head : null;
  renderContent(params.body, head);
} else {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<h2>Da input u provided</h2>`
  );
  hasParams ? outputAllParams(params) : '';
  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <h2>Create ur special url</h2>
    <label for="head">Paste the Head (optional)</label><br>
    <textarea id="head"></textarea><br><br>

    <label for="body">Paste the Body</label><br>
    <textarea id="body" required></textarea><br>

    <button id="gen">Generate</button>
    `
  );

  document.getElementById('gen').addEventListener('click', function () {
    let head = document.getElementById('head').value;
    let body = document.getElementById('body').value;
    if (body) {
      let url =
        location.origin +
        location.pathname +
        '#' +
        'body=b64_' +
        safeBtoA(body) +
        (head ? '&head=b64_' + head : '');

      document.body.insertAdjacentHTML(
        'beforeend',
        '<br><a href ="' + url + '">' + url + '</a>'
      );
    } else {
      console.log('no input for gen');
    }
  });
}
