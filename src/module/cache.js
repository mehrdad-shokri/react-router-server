import { isWebpack, getWebpackId } from './info';

let pool = {};
const signature = (module, systemImport) => {
  const loadFunc =systemImport.toString();
  if (isWebpack(loadFunc)) {
    return getWebpackId(loadFunc);
  }
  return (`${module.parent.id}_${systemImport.toString()}`).replace(/[\(\)]/g, '_').replace(/[^0-9a-zA-Z\/_\\]/g, '');
}
export const add = (module, systemImport, result) => pool[signature(module, systemImport)] = result;
export const fetch = (module, systemImport) => pool[signature(module, systemImport)];
export const exists = (module, systemImport) => pool[signature(module, systemImport)] !== undefined;
export const all = () => pool;