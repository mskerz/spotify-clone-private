// lib/HttpClient.ts
type RequestInterceptor = (input: RequestInfo, init?: RequestInit) => Promise<[RequestInfo, RequestInit?]>;
type ResponseInterceptor = (response: Response) => Promise<Response>;

export class HttpClient {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      [input, init] = await interceptor(input, init);
    }

    const response = await fetch(input, init);

    // Apply response interceptors
    let interceptedResponse = response;
    for (const interceptor of this.responseInterceptors) {
      interceptedResponse = await interceptor(interceptedResponse);
    }

    return interceptedResponse;
  }
}
