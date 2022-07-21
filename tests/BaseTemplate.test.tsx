import BaseTemplate, { IBaseTemplate } from '@/components/templates/base/BaseTemplate';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Base Template', () => {
  // Initialise props
  let expectedProps: IBaseTemplate;

  // Give props sample values
  beforeEach(() => {
    expectedProps = {
      sampleTextProp: 'hello',
    };
  });

  // Run Tests
  it('is created and shows the sample text prop', () => {
    render(<BaseTemplate sampleTextProp={expectedProps.sampleTextProp} />);
    const div = screen.getByText(expectedProps.sampleTextProp);

    expect(div).toBeVisible();
  });
});
