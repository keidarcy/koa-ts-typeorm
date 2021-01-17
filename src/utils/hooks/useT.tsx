import ja from '../ja.json';
import en from '../en.json';
import { useRouter } from 'next/router';

export const useT = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : ja;
  return t;
};
