import type { ComponentType } from 'react';
import MaruTemplate from './MaruTemplate';
import KilnTemplate from './KilnTemplate';
import NoctuaTemplate from './NoctuaTemplate';

export const localDummyTemplatePages: Record<
  string,
  { title: string; Page: ComponentType }
> = {
  maru: { title: 'MARU — 머무는 시간이 집이 된다', Page: MaruTemplate },
  kiln: { title: 'KILN — 흙이 형태가 되는 곳', Page: KilnTemplate },
  noctua: { title: 'NOCTUA — 밤이 되면, 이야기가 켜진다', Page: NoctuaTemplate },
};
