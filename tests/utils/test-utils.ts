import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

const customRender = (ui: any, options: object) => {
  render(ui, {
    ...options,
  });
};

export { customRender as render };
