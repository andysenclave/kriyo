import { JsonBodyType, HttpResponseInit, http, HttpResponse } from 'msw';
import seedGetMyPendingTasks from './seedData/tasksHandlers/seedGetMyPendingTasks';
import seedPostMyTask from './seedData/tasksHandlers/seedPostMyTask';

const mockRequestGet = (url: string, response: JsonBodyType, init?: HttpResponseInit) => {
  return http.get(url, () => {
    return HttpResponse.json(response, init);
  });
};

const mockRequestPost = (url: string, response: JsonBodyType, init?: HttpResponseInit) => {
  return http.post(url, () => {
    return HttpResponse.json(response, init);
  });
};

const mockRequestPut = (url: string, response: JsonBodyType, init?: HttpResponseInit) => {
  return http.put(url, () => {
    return HttpResponse.json(response, init);
  });
};

const mockRequestPatch = (url: string, response: JsonBodyType, init?: HttpResponseInit) => {
  return http.patch(url, () => {
    return HttpResponse.json(response, init);
  });
};

const mockRequestDelete = (url: string, response: JsonBodyType, init?: HttpResponseInit) => {
  return http.delete(url, () => {
    return HttpResponse.json(response, init);
  });
};

const mockRequestGetXml = (url: string, response: string, init?: HttpResponseInit) => {
  return http.get(url, () => {
    return HttpResponse.xml(response, init);
  });
};

const seedHandlers = [
  mockRequestGet(seedGetMyPendingTasks.url, seedGetMyPendingTasks.response),
  mockRequestPost(seedPostMyTask.url, seedPostMyTask.response),
];

export default seedHandlers;
