import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { Customize } from '@prisma/client';

const fetchSingleCustomize = async (): Promise<Customize> => {
  const { data } = await axios.get<Customize>('/api/customizes');
  console.log(data);
  return data;
};

export default function useCustomize<Customize>() {
  return useQuery(['customize'], () => fetchSingleCustomize());
}
