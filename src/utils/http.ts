import qs from "querystring";

export const httpGet = (url: string): any => {
  const result: any = fetch(url);
  return result;
}

export const httpPost = (url: string, params: any) => {
  const result = fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded',
      "Accept": 'application/json,text/plain,*/*'
    },
    body: qs.stringify(params)
  })
  return result
}