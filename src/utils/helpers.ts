export const normalizePort = (val:string) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};

export const validateEmptyBody = (body:Body) => Object.keys(body).length === 0;

export function validateFieldsInBody<T>(body:T):boolean {
  // @ts-ignore
  const elements = Object.keys(body).map((elem) => (body[elem] === undefined || body[elem] === ''));
  return !!elements.find((e:Boolean) => e);
}
