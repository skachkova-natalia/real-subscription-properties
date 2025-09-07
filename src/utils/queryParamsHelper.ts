import {NavigateFunction} from 'react-router';

export const updateQueryParams = (navigate: NavigateFunction, name: string, params: string) => {
  const searchParams = new URLSearchParams(location.search);
  if (params) {
    searchParams.set(name, params);
    navigate({ search: searchParams.toString() }, { replace: true });
  } else {
    searchParams.delete(name);
  }
}
