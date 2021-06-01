import http from 'api';
import { useQuery } from 'react-query';

interface Foo {
  name: string;
  age: number;
}

function fetchFoo()  {
  return http.get<Foo>('/foo')
}

export function useFoo() {
  return useQuery('foo', fetchFoo)
}