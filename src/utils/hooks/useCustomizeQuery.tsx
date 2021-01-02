import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { Customize } from '@prisma/client';
import { ProductInterface } from '../type.helper';

const fetchSingleCustomize = async (): Promise<{
  customize: Customize;
  product: ProductInterface;
}> => {
  const { data } = await axios.get<{ customize: Customize; product: ProductInterface }>(
    '/api/customizes'
  );
  return data;
};

export default function useCustomize() {
  return useQuery(['customize'], () => fetchSingleCustomize());
}
